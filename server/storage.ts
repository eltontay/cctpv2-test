import { transfers, type Transfer, type InsertTransfer } from "@shared/schema";

export interface IStorage {
  createTransfer(transfer: InsertTransfer): Promise<Transfer>;
  getTransfer(id: number): Promise<Transfer | undefined>;
  updateTransferStatus(id: number, status: string): Promise<Transfer | undefined>;
}

export class MemStorage implements IStorage {
  private transfers: Map<number, Transfer>;
  private currentId: number;

  constructor() {
    this.transfers = new Map();
    this.currentId = 1;
  }

  async createTransfer(transfer: InsertTransfer): Promise<Transfer> {
    const id = this.currentId++;
    const newTransfer: Transfer = {
      ...transfer,
      id,
      createdAt: new Date(),
      status: "pending",
      transactionHash: null,
      attestationStatus: null
    };
    this.transfers.set(id, newTransfer);
    return newTransfer;
  }

  async getTransfer(id: number): Promise<Transfer | undefined> {
    return this.transfers.get(id);
  }

  async updateTransferStatus(id: number, status: string): Promise<Transfer | undefined> {
    const transfer = this.transfers.get(id);
    if (transfer) {
      const updatedTransfer = { ...transfer, status };
      this.transfers.set(id, updatedTransfer);
      return updatedTransfer;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
