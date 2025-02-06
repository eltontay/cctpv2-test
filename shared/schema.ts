import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const transfers = pgTable("transfers", {
  id: serial("id").primaryKey(),
  sourceChain: text("source_chain").notNull(),
  destinationChain: text("destination_chain").notNull(),
  amount: text("amount").notNull(),
  senderAddress: text("sender_address").notNull(),
  recipientAddress: text("recipient_address").notNull(),
  status: text("status").notNull().default("pending"),
  transactionHash: text("transaction_hash"),
  attestationStatus: text("attestation_status"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTransferSchema = createInsertSchema(transfers)
  .omit({ id: true, createdAt: true });

export type InsertTransfer = z.infer<typeof insertTransferSchema>;
export type Transfer = typeof transfers.$inferSelect;
