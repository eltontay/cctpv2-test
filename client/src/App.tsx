import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { http, createConfig, WagmiProvider } from 'wagmi';
import { sepolia, avalancheFuji } from 'viem/chains';
import { injected } from 'wagmi/connectors';
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

const config = createConfig({
  chains: [sepolia, avalancheFuji],
  transports: {
    [sepolia.id]: http(),
    [avalancheFuji.id]: http(),
  },
  connectors: [
    injected()
  ],
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;