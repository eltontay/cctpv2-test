import { WalletButton } from "@/components/wallet-button";
import { TransferForm } from "@/components/transfer-form";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <WalletButton />
        </div>
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Cross-Chain USDC Transfer
          </h1>
          
          <TransferForm />
        </div>
      </div>
    </div>
  );
}
