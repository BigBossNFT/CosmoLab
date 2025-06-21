
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  user: any;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      if (!window.ethereum) {
        toast({
          title: "Ошибка",
          description: "MetaMask не найден. Установите MetaMask для продолжения.",
          variant: "destructive"
        });
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const walletAddress = accounts[0].toLowerCase();
        setAccount(walletAddress);
        setIsConnected(true);

        // Проверяем или создаем пользователя в Supabase
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('wallet_address', walletAddress)
          .single();

        if (!existingUser) {
          // Создаем нового пользователя
          const { data: newUser, error } = await supabase
            .from('users')
            .insert({ wallet_address: walletAddress })
            .select()
            .single();

          if (error) {
            console.error('Error creating user:', error);
            toast({
              title: "Ошибка",
              description: "Не удалось создать пользователя",
              variant: "destructive"
            });
            return;
          }
          setUser(newUser);
        } else {
          setUser(existingUser);
        }

        toast({
          title: "Кошелек подключен",
          description: `Адрес: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
        });
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Ошибка подключения",
        description: error.message || "Не удалось подключить кошелек",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setUser(null);
    toast({
      title: "Кошелек отключен",
      description: "Ваш кошелек был отключен",
    });
  };

  // Проверяем подключение при загрузке
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const walletAddress = accounts[0].toLowerCase();
          setAccount(walletAddress);
          setIsConnected(true);

          // Получаем данные пользователя
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('wallet_address', walletAddress)
            .single();

          setUser(userData);
        }
      }
    };

    checkConnection();

    // Слушаем изменения аккаунта
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{
      account,
      isConnected,
      isLoading,
      connectWallet,
      disconnectWallet,
      user
    }}>
      {children}
    </Web3Context.Provider>
  );
};
