import { Receipt } from "../Entities/Receipt.js";
export interface ReceiptDAO {
  InsertReceipt(receipt: Receipt): Promise<void>;
  DeleteReceipt(receiptID: number): Promise<void>;
  GetReceiptByDiagnose(diagnoseIDs: number[]): Promise<Receipt[]>;
}
