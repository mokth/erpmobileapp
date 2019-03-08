export interface ProdDef {
    icode :string;
    idesc :string;
    packsize :number;
    uom :string;
}

export interface ProdDefDetail {
        prodcode:string;
        wccode:string;
        wcicode:string;
        process:string;
        icode:string;
        idesc:string;
        uom:string;
        wh:string;
        stdqty:number;
        isdefault:boolean;
        seqno:number;
        procseqno:number;
        wcpacksize:number;
        wcuom:string;
}