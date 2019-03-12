export interface ItemMaster
{
     iCode :string;
     iDesc :string;
     iType :string;
     iClass :string;
     iSubClass :string;
     sellingPrice :number;
     sellingUOM :string;
     stdPackSize :number;
     defWarehouse :string;
     barcode :string;
     imageUrl:string;
}

export interface QtyBalance
{
    warehouse :string;
    lotno :string;
    status :string;
    uom :string;
    qty :number;
    trxdate:Date;
}