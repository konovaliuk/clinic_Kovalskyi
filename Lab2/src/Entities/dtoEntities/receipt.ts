import { Receipt } from "../daoEntities/Receipt.js";
export class ReceiptDto {
  private medicine_: string;
  private dose_: string | null;
  constructor(receipt: Receipt) {
    this.medicine_ = receipt.medicine_;
    this.dose_ = receipt.dose_;
  }
  get medicine() {
    return this.medicine_;
  }
  get dose() {
    return this.dose_;
  }
}
