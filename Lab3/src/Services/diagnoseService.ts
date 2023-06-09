import { MySQLDAOFactory } from "../MySQLDAOFactory/MySQLDAOFactory.js";
import { MergeArraysService } from "./mergeArrays.js";
import { DiagnoseReceipts } from "../Entities/daoEntities/diagnoseReceipts.js";
import { DiagnoseDto } from "../Entities/dtoEntities/diagnose.js";
import { Receipt } from "../Entities/daoEntities/Receipt.js";
import { ReceiptDto } from "../Entities/dtoEntities/receipt.js";
export class DiagnoseService {
  getViewReceipts = (daoArray: Receipt[]): ReceiptDto[] => {
    const receiptsDto: ReceiptDto[] = [];
    daoArray.forEach((receipt) => {
      receiptsDto.push(new ReceiptDto(receipt));
    });
    return receiptsDto;
  };
  getViewDiagnoses = (daoArray: DiagnoseReceipts[]): DiagnoseDto[] => {
    const diagnosesDto: DiagnoseDto[] = [];
    daoArray.forEach((diagnoseReceipt) => {
      const { receipts_, diagnose_ } = diagnoseReceipt;
      const receiptsDto = this.getViewReceipts(receipts_);
      diagnosesDto.push(new DiagnoseDto(diagnose_, receiptsDto));
    });
    return diagnosesDto;
  };
  formDiagnosesList = async (appointmentId: number): Promise<DiagnoseReceipts[]> => {
    const daoFactory = MySQLDAOFactory.getInstance();
    const diagnoseDao = daoFactory.GetDiagnoseDAO();
    const diagnoses = await diagnoseDao.getDiagnosesByAppointment(appointmentId);
    if (!diagnoses.length) return [];
    const diagnoseIds = diagnoses.map((diagnose) => diagnose.id_);
    const receiptDao = daoFactory.GetReceiptDAO();
    const receipts = await receiptDao.GetReceiptByDiagnose(diagnoseIds);
    const mergeService = new MergeArraysService();
    const diagnosesList = mergeService.mergeDiagnosesReceipts(diagnoses, receipts);
    return diagnosesList;
  };
}
