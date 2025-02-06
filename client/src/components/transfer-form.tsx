import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount, useChainId, useWriteContract, useSwitchChain } from 'wagmi';
import { parseUnits } from 'viem';
import { CHAIN_CONFIG } from '../lib/config';
import { tokenMessengerAbi, usdcAbi } from '../lib/contracts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { insertTransferSchema } from '@shared/schema';

export function TransferForm() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { toast } = useToast();
  const { writeContractAsync: approveUSDC } = useWriteContract();
  const { writeContractAsync: depositForBurn } = useWriteContract();

  const form = useForm({
    resolver: zodResolver(insertTransferSchema),
    defaultValues: {
      sourceChain: 'ethereum',
      destinationChain: 'avalanche',
      amount: '',
      senderAddress: address || '',
      recipientAddress: ''
    }
  });

  const onSubmit = async (data: any) => {
    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    const sourceConfig = CHAIN_CONFIG[data.sourceChain as keyof typeof CHAIN_CONFIG];
    const destConfig = CHAIN_CONFIG[data.destinationChain as keyof typeof CHAIN_CONFIG];

    if (chainId !== sourceConfig.id) {
      await switchChain({ chainId: sourceConfig.id });
    }

    try {
      // Approve USDC
      const amount = parseUnits(data.amount, 6);
      await approveUSDC({
        address: sourceConfig.usdc,
        abi: usdcAbi,
        functionName: 'approve',
        args: [sourceConfig.tokenMessenger, amount]
      });

      // Deposit for burn
      const recipientAddressInBytes32 = `0x000000000000000000000000${data.recipientAddress.slice(2)}`;
      await depositForBurn({
        address: sourceConfig.tokenMessenger,
        abi: tokenMessengerAbi,
        functionName: 'depositForBurn',
        args: [
          amount,
          destConfig.domain,
          recipientAddressInBytes32,
          sourceConfig.usdc,
          "0x" + "0".repeat(64),
          0n,
          1000n
        ]
      });

      toast({
        title: "Transfer initiated",
        description: "Your transfer has been initiated. Please wait for confirmation."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Transaction failed",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cross-Chain USDC Transfer</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sourceChain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Chain</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source chain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(CHAIN_CONFIG).map(([id, config]) => (
                        <SelectItem key={id} value={id}>
                          {config.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destinationChain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Chain</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination chain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(CHAIN_CONFIG).map(([id, config]) => (
                        <SelectItem key={id} value={id}>
                          {config.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USDC)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.000001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
            >
              Transfer USDC
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}