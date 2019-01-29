export interface GRNPOInfo {
    poNo:string;
    poRelNo:number;
    poDt:Date;
    vendCode:string;
    vendName:string;
}

export interface GRNPOItem {
    poNo:string;
    poRelNo:number;
    line:number;
    iCode:string;
    iDes:string;
    tolerance:number;
    poQty:number;
    poPurQty:number;
    recvQty:number;
    balanceQty:number;
    packSz:number;
    stdUOM:string;
    purchaseUOM:string;
    poDesc:string;
}

export class GRNReceive {
   public poNo: string;
   public poRelNo: number;
   public dono: string;
   public dateRec: Date;
   public line: number;
   public iCode: string;
   public iDes: string;
   public tolerance: number;
   public poQty: number;
   public poPurQty: number;
   public recvQty: number;
   public recvStdQty: number;
   public packSz: number;
   public stdUOM: string;
   public purchaseUOM: string;
   public createdBy: string;
}