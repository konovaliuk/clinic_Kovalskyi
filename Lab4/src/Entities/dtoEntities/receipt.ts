import { Receipt } from "../daoEntities/Receipt.js";
export class ReceiptDto {
  private medicine_: string;
  private dose_: string | null;
  constructor(receipt: Receipt) {
    this.medicine_ = receipt.medicine;
    this.dose_ = receipt.dose;
  }
  get medicine() {
    return this.medicine_;
  }
  get dose() {
    return this.dose_;
  }
}
