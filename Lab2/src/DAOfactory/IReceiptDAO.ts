import { Receipt } from "../Entities/daoEntities/Receipt.js";
export interface ReceiptDAO {
  InsertReceipt(receipt: Receipt): Promise<void>;
  DeleteReceipt(receiptID: number): Promise<void>;
  GetReceiptByDiagnose(diagnoseIDs: number[]): Promise<Receipt[]>;
}
