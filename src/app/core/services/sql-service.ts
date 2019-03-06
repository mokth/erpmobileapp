import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Injectable({
    providedIn: 'root'
})

export class SQLService {

    public getdbConnection() {
        return new Sqlite('settings');
    }

    public closedbConnection() {
        new Sqlite('settings')
            .then((db) => {
                db.close();
            });
    }

    public createDB() {
        let sql: string = `CREATE TABLE IF NOT EXISTS setting (
                           uid INTEGER PRIMARY KEY UNIQUE NOT NULL,
                           apiurl STRING (200) NOT NULL,
                           erpurl STRING (200))`;

        this.getdbConnection()
            .then(db => db.execSQL(sql)
                .then(() => {console.log("CREATE TABLE"); }),
                error => { console.log("CREATE TABLE ERROR", error); }),
            error => { console.log("CREATE TABLE ERROR", error); }

    }

    public update(apiurl: string, erpurl: string) {
     return this.getdbConnection()
            .then(db => db.get("select * from setting")
                .then(rows => {
                    if (rows && rows.length> 0) {
                        db.execSQL("update setting set apiurl='"+apiurl+"',erpurl='"+erpurl+"'")
                        
                    } else {
                        db.execSQL("insert into setting (uid,apiurl,erpurl) VALUES (?,?,?)", [1, apiurl, erpurl])
                  
                    }
                })
            );
    }

    // public update(apiurl: string, erpurl: string) {
    //     this.getdbConnection()
    //         .then(db => db.get("select * from setting")
    //             .then(rows => {
    //                 if (rows && rows.length> 0) {
    //                     db.execSQL("update setting set apiurl='"+apiurl+"',erpurl='"+erpurl+"'")
    //                         .then(() => { })
    //                         , error => { console.log('error update table', error) }
    //                 } else {
    //                     db.execSQL("insert into setting (uid,apiurl,erpurl) VALUES (?,?,?)", [1, apiurl, erpurl])
    //                         .then(() => {console.log('inserted....') })
    //                         , error => { console.log('error inserting table', error) }
    //                 }
    //             })
    //         );
    // }

    public getSetting(){
        this.getdbConnection()
          .then(db=>db.get("select * from setting"))
          .then(rows => { 
              if (rows) {
                 console.log(rows);
                //   console.log(rows[1]);
                //   console.log(rows[2]);
                  return {"api":rows[1],"erp":rows[2]};
              }else {
                return {"api":'',"erp":''};
              }
           })
           
    }

    public getSettingPromise(){
      return this.getdbConnection()
          .then(db=>db.get("select * from setting"))
    }
}