import type { Transaction } from "../types/Transaction";
import { request } from "./api";

export interface CreateTransactionPayload {
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
}

export function createTransaction(payload: CreateTransactionPayload): Promise<void> {
  return request<void>("/transactions", {
    method: "POST",
    body: payload
  });
}

export function getTransactionsByAccount(accountNumber: string): Promise<Transaction[]> {
  return request<Transaction[]>(`/transactions/${accountNumber}`, {
    method: "GET"
  });
}
