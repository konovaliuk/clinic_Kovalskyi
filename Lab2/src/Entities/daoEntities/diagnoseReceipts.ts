import { Diagnose } from "./Diagnose.js";
import { Receipt } from "./Receipt.js";
export class DiagnoseReceipts {
  private diagnose: Diagnose;
  private receipts: Receipt[];
  constructor(diagnose: Diagnose, receipts: Receipt[]) {
    this.diagnose = diagnose;
    this.receipts = receipts;
  }
  get diagnose_() {
    return this.diagnose;
  }
  get receipts_() {
    return this.receipts;
  }
}
