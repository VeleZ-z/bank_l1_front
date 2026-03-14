export interface Transaction {
  id: number;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
  timestamp: string;
}
