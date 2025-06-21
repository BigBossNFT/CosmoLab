
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';
import { Wallet, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

const Web3AuthButton = () => {
  const { account, isConnected, isLoading, connectWallet, disconnectWallet } = useWeb3();

  if (isLoading) {
    return (
      <Button disabled className="bg-gradient-to-r from-neon-purple to-neon-blue">
        Подключение...
      </Button>
    );
  }

  if (!isConnected) {
    return (
      <Button 
        onClick={connectWallet}
        className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-green text-white font-bold px-6 py-2 rounded-full transition-all duration-300"
      >
        <Wallet className="w-4 h-4 mr-2" />
        Войти
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-gradient-to-r from-neon-green to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white font-bold px-4 py-2 rounded-full">
          <User className="w-4 h-4 mr-2" />
          {account?.slice(0, 6)}...{account?.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-effect border-neon-blue/30">
        <DropdownMenuItem asChild>
          <Link to="/matrix-dashboard" className="flex items-center cursor-pointer">
            <User className="w-4 h-4 mr-2" />
            Личный кабинет
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnectWallet} className="flex items-center cursor-pointer text-red-400">
          <LogOut className="w-4 h-4 mr-2" />
          Отключить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Web3AuthButton;
