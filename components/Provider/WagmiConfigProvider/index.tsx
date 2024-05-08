'use client';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { setToken } from '@/helper/user-token';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/config/wagmi';
import { LangContext } from '../Lang';

interface WagmiConfigProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const ChainConfigContext = createContext({
  updateInitialChainId: (chainId: number) => {}
});

const WagmiConfigProvider: FC<WagmiConfigProviderProps> = ({ children }) => {
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

  if (typeof window === 'object') {
    if (query.get('origin') === 'mantle' && query.get('token')) {
      setToken(query.get('token') as string);
    }
  } else {
    // server
  }

  const [initialChainId, setInitialChainId] = useState<number>();

  const { lang } = useContext(LangContext);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={lang} initialChain={initialChainId}>
          <ChainConfigContext.Provider value={{ updateInitialChainId: setInitialChainId }}>
            {children}
          </ChainConfigContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiConfigProvider;