
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
      console.log('Starting wallet connection...');
      
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
        console.log('Wallet connected:', walletAddress);
        setAccount(walletAddress);
        setIsConnected(true);

        // Проверяем существующего пользователя
        console.log('Checking for existing user...');
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('*')
          .eq('wallet_address', walletAddress)
          .maybeSingle();

        console.log('Existing user check result:', { existingUser, selectError });

        if (selectError) {
          console.error('Error checking existing user:', selectError);
          throw selectError;
        }

        if (!existingUser) {
          // Создаем нового пользователя
          console.log('Creating new user...');
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({ 
              wallet_address: walletAddress,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          console.log('New user creation result:', { newUser, insertError });

          if (insertError) {
            console.error('Error creating user:', insertError);
            toast({
              title: "Ошибка",
              description: `Не удалось создать пользователя: ${insertError.message}`,
              variant: "destructive"
            });
            return;
          }
          setUser(newUser);
          console.log('New user created successfully:', newUser);
        } else {
          setUser(existingUser);
          console.log('Using existing user:', existingUser);
        }

        toast({
          title: "Кошелек подключен",
          description: `Адрес: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
          className: "border-neon-blue/30 bg-cosmos-dark/90 text-neon-blue"
        });
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Ошибка подключения",
        description: error.message || "Не удалось подключить кошелек",
        variant: "destructive",
        className: "border-red-500/30 bg-cosmos-dark/90 text-red-400"
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
      className: "border-neon-blue/30 bg-cosmos-dark/90 text-neon-blue"
    });
  };

  // Проверяем подключение при загрузке
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
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
              .maybeSingle();

            setUser(userData);
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();

    // Слушаем изменения аккаунта
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
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
