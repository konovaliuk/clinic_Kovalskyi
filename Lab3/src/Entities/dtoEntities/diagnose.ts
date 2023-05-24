import { Diagnose } from "../daoEntities/Diagnose.js";
import { ReceiptDto } from "./receipt.js";
export class DiagnoseDto {
  private disease_: string;
  private recommendations_: string | null;
  private receipts_: ReceiptDto[] | undefined;
  constructor(diagnose: Diagnose, receipts: ReceiptDto[]) {
    this.disease_ = diagnose.disease_;
    this.recommendations_ = diagnose.recommendations_;
    this.receipts_ = receipts;
  }
  get disease() {
    return this.disease_;
  }
  get recommendations() {
    return this.recommendations_;
  }
  get receipts() {
    return this.receipts_;
  }
}
