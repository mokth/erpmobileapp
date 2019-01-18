export class SalesOder{
    public sono:string;
    public custrel:number;
    public status:string
    public pono:string;
    public sodate:Date;
    public custcode:string;
    public custname:string;
    public remark:string
    public grossamt:number;
    public taxes:number;
    public amount:number;
    public items:SOItem[];
}

export class SOItem{
    public line:number;
    public icode:string
    public idec:string;
    public uom:string
    public price:number;
    public qty:number;
    public deldate:Date;
    public remark:string;
    public stdqty:number;
    public amount:number;
    public packsize:number;
}