import { Diagnose } from "./Diagnose.js";
import { Receipt } from "./Receipt.js";
export class DiagnoseReceipts {
  private diagnose_: Diagnose;
  private receipts_: Receipt[];
  constructor(diagnose: Diagnose, receipts: Receipt[]) {
    this.diagnose_ = diagnose;
    this.receipts_ = receipts;
  }
  get diagnose() {
    return this.diagnose_;
  }
  get receipts() {
    return this.receipts_;
  }
}
