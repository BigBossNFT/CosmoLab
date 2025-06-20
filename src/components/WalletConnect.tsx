
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface WalletConnectProps {
  onBalanceChange?: (balance: string, hasEnoughBalance: boolean) => void;
}

const WalletConnect = ({ onBalanceChange }: WalletConnectProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [cosmoBalance, setCosmoBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Cosmo token contract address on BSC
  const COSMO_CONTRACT_ADDRESS = '0x60E5FfdE4230985757E5Dd486e33E85AfEfC557b';
  const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          await checkCosmoBalance(accounts[0]);
          
          toast({
            title: "Кошелек подключен",
            description: `Адрес: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          });
        }
      } else {
        toast({
          title: "Ошибка",
          description: "MetaMask не найден. Установите MetaMask для подключения кошелька.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error);
      toast({
        title: "Ошибка подключения",
        description: "Не удалось подключить кошелек",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const checkCosmoBalance = async (walletAddress: string) => {
    try {
      if (!window.ethereum) return;

      // Switch to BSC network if needed
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }], // BSC mainnet
      });

      // Get Cosmo token balance
      const balanceHex = await window.ethereum.request({
        method: 'eth_call',
        params: [{
          to: COSMO_CONTRACT_ADDRESS,
          data: `0x70a08231000000000000000000000000${walletAddress.slice(2)}`
        }, 'latest']
      });

      const balance = parseInt(balanceHex, 16);
      const formattedBalance = (balance / Math.pow(10, 18)).toFixed(6);
      setCosmoBalance(formattedBalance);

      // Check if balance is enough (equivalent to 2000 USDT)
      const hasEnoughBalance = await checkIfBalanceIsEnough(formattedBalance);
      
      if (onBalanceChange) {
        onBalanceChange(formattedBalance, hasEnoughBalance);
      }

    } catch (error) {
      console.error('Ошибка проверки баланса:', error);
    }
  };

  const checkIfBalanceIsEnough = async (balance: string): Promise<boolean> => {
    try {
      // For simplicity, we'll assume 1 Cosmo = 0.001 USDT (you should get real price from PancakeSwap API)
      // In production, you would fetch the actual price from PancakeSwap
      const cosmoAmount = parseFloat(balance);
      const estimatedUSDTValue = cosmoAmount * 0.001; // This is a placeholder - implement real price fetching
      
      return estimatedUSDTValue >= 2000;
    } catch (error) {
      console.error('Ошибка проверки курса:', error);
      return false;
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
    setCosmoBalance('0');
    if (onBalanceChange) {
      onBalanceChange('0', false);
    }
  };

  useEffect(() => {
    // Check if wallet is already connected
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            checkCosmoBalance(accounts[0]);
          }
        });
    }
  }, []);

  if (isConnected) {
    return (
      <div className="glass-effect rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-300">
            Кошелек: {address.slice(0, 6)}...{address.slice(-4)}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={disconnectWallet}
            className="text-red-400 hover:text-red-300"
          >
            Отключить
          </Button>
        </div>
        <div className="text-neon-green font-bold">
          Баланс Cosmo: {cosmoBalance}
        </div>
      </div>
    );
  }

  return (
    <Button 
      onClick={connectWallet}
      disabled={loading}
      className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-green text-white font-bold mb-6"
    >
      {loading ? 'Подключение...' : 'Подключить кошелек'}
    </Button>
  );
};

export default WalletConnect;
