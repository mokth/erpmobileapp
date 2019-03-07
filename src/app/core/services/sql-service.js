"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Sqlite = require("nativescript-sqlite");
var SQLService = /** @class */ (function () {
    function SQLService() {
    }
    SQLService.prototype.getdbConnection = function () {
        return new Sqlite('settings');
    };
    SQLService.prototype.closedbConnection = function () {
        new Sqlite('settings')
            .then(function (db) {
            db.close();
        });
    };
    SQLService.prototype.createDB = function () {
        var sql = "CREATE TABLE IF NOT EXISTS setting (\n                           uid INTEGER PRIMARY KEY UNIQUE NOT NULL,\n                           apiurl STRING (200) NOT NULL,\n                           erpurl STRING (200))";
        this.getdbConnection()
            .then(function (db) { return db.execSQL(sql)
            .then(function () { console.log("CREATE TABLE"); }); }, function (error) { console.log("CREATE TABLE ERROR", error); }),
            function (error) { console.log("CREATE TABLE ERROR", error); };
    };
    SQLService.prototype.update = function (apiurl, erpurl) {
        return this.getdbConnection()
            .then(function (db) { return db.get("select * from setting")
            .then(function (rows) {
            if (rows && rows.length > 0) {
                db.execSQL("update setting set apiurl='" + apiurl + "',erpurl='" + erpurl + "'");
            }
            else {
                db.execSQL("insert into setting (uid,apiurl,erpurl) VALUES (?,?,?)", [1, apiurl, erpurl]);
            }
        }); });
    };
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
    SQLService.prototype.getSetting = function () {
        this.getdbConnection()
            .then(function (db) { return db.get("select * from setting"); })
            .then(function (rows) {
            if (rows) {
                console.log(rows);
                //   console.log(rows[1]);
                //   console.log(rows[2]);
                return { "api": rows[1], "erp": rows[2] };
            }
            else {
                return { "api": '', "erp": '' };
            }
        });
    };
    SQLService.prototype.getSettingPromise = function () {
        return this.getdbConnection()
            .then(function (db) { return db.get("select * from setting"); });
    };
    SQLService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SQLService);
    return SQLService;
}());
exports.SQLService = SQLService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcWwtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQU01QztJQUFBO0lBK0VBLENBQUM7SUE3RVUsb0NBQWUsR0FBdEI7UUFDSSxPQUFPLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxzQ0FBaUIsR0FBeEI7UUFDSSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUM7YUFDakIsSUFBSSxDQUFDLFVBQUMsRUFBRTtZQUNMLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLDZCQUFRLEdBQWY7UUFDSSxJQUFJLEdBQUcsR0FBVyxzTkFHc0IsQ0FBQztRQUV6QyxJQUFJLENBQUMsZUFBZSxFQUFFO2FBQ2pCLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2FBQ3RCLElBQUksQ0FBQyxjQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFEcEMsQ0FDb0MsRUFDNUMsVUFBQSxLQUFLLElBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxVQUFBLEtBQUssSUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTlELENBQUM7SUFFTSwyQkFBTSxHQUFiLFVBQWMsTUFBYyxFQUFFLE1BQWM7UUFDM0MsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFO2FBQ3JCLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDdEMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNOLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUUsQ0FBQyxFQUFFO2dCQUN4QixFQUFFLENBQUMsT0FBTyxDQUFDLDZCQUE2QixHQUFDLE1BQU0sR0FBQyxZQUFZLEdBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQyxDQUFBO2FBRTNFO2lCQUFNO2dCQUNILEVBQUUsQ0FBQyxPQUFPLENBQUMsd0RBQXdELEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7YUFFNUY7UUFDTCxDQUFDLENBQUMsRUFUTSxDQVNOLENBQ0wsQ0FBQztJQUNWLENBQUM7SUFFRCxrREFBa0Q7SUFDbEQsNkJBQTZCO0lBQzdCLHNEQUFzRDtJQUN0RCw4QkFBOEI7SUFDOUIsZ0RBQWdEO0lBQ2hELCtGQUErRjtJQUMvRiwyQ0FBMkM7SUFDM0Msa0ZBQWtGO0lBQ2xGLDJCQUEyQjtJQUMzQixnSEFBZ0g7SUFDaEgsc0VBQXNFO0lBQ3RFLHFGQUFxRjtJQUNyRixvQkFBb0I7SUFDcEIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixJQUFJO0lBRUcsK0JBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFO2FBQ25CLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBRSxPQUFBLEVBQUUsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQzthQUN6QyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQ04sSUFBSSxJQUFJLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkIsMEJBQTBCO2dCQUMxQiwwQkFBMEI7Z0JBQ3hCLE9BQU8sRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQzthQUN4QztpQkFBSztnQkFDSixPQUFPLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLENBQUM7YUFDNUI7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUVULENBQUM7SUFFTSxzQ0FBaUIsR0FBeEI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUU7YUFDeEIsSUFBSSxDQUFDLFVBQUEsRUFBRSxJQUFFLE9BQUEsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUE7SUFDaEQsQ0FBQztJQTlFUSxVQUFVO1FBSnRCLGlCQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNyQixDQUFDO09BRVcsVUFBVSxDQStFdEI7SUFBRCxpQkFBQztDQUFBLEFBL0VELElBK0VDO0FBL0VZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNRTFNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBnZXRkYkNvbm5lY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTcWxpdGUoJ3NldHRpbmdzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlZGJDb25uZWN0aW9uKCkge1xyXG4gICAgICAgIG5ldyBTcWxpdGUoJ3NldHRpbmdzJylcclxuICAgICAgICAgICAgLnRoZW4oKGRiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYi5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlREIoKSB7XHJcbiAgICAgICAgbGV0IHNxbDogc3RyaW5nID0gYENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIHNldHRpbmcgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB1aWQgSU5URUdFUiBQUklNQVJZIEtFWSBVTklRVUUgTk9UIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwaXVybCBTVFJJTkcgKDIwMCkgTk9UIE5VTEwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycHVybCBTVFJJTkcgKDIwMCkpYDtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRkYkNvbm5lY3Rpb24oKVxyXG4gICAgICAgICAgICAudGhlbihkYiA9PiBkYi5leGVjU1FMKHNxbClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtjb25zb2xlLmxvZyhcIkNSRUFURSBUQUJMRVwiKTsgfSksXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7IGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEVSUk9SXCIsIGVycm9yKTsgfSksXHJcbiAgICAgICAgICAgIGVycm9yID0+IHsgY29uc29sZS5sb2coXCJDUkVBVEUgVEFCTEUgRVJST1JcIiwgZXJyb3IpOyB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoYXBpdXJsOiBzdHJpbmcsIGVycHVybDogc3RyaW5nKSB7XHJcbiAgICAgcmV0dXJuIHRoaXMuZ2V0ZGJDb25uZWN0aW9uKClcclxuICAgICAgICAgICAgLnRoZW4oZGIgPT4gZGIuZ2V0KFwic2VsZWN0ICogZnJvbSBzZXR0aW5nXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyb3dzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93cyAmJiByb3dzLmxlbmd0aD4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5leGVjU1FMKFwidXBkYXRlIHNldHRpbmcgc2V0IGFwaXVybD0nXCIrYXBpdXJsK1wiJyxlcnB1cmw9J1wiK2VycHVybCtcIidcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGIuZXhlY1NRTChcImluc2VydCBpbnRvIHNldHRpbmcgKHVpZCxhcGl1cmwsZXJwdXJsKSBWQUxVRVMgKD8sPyw/KVwiLCBbMSwgYXBpdXJsLCBlcnB1cmxdKVxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyB1cGRhdGUoYXBpdXJsOiBzdHJpbmcsIGVycHVybDogc3RyaW5nKSB7XHJcbiAgICAvLyAgICAgdGhpcy5nZXRkYkNvbm5lY3Rpb24oKVxyXG4gICAgLy8gICAgICAgICAudGhlbihkYiA9PiBkYi5nZXQoXCJzZWxlY3QgKiBmcm9tIHNldHRpbmdcIilcclxuICAgIC8vICAgICAgICAgICAgIC50aGVuKHJvd3MgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChyb3dzICYmIHJvd3MubGVuZ3RoPiAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRiLmV4ZWNTUUwoXCJ1cGRhdGUgc2V0dGluZyBzZXQgYXBpdXJsPSdcIithcGl1cmwrXCInLGVycHVybD0nXCIrZXJwdXJsK1wiJ1wiKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyB9KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLCBlcnJvciA9PiB7IGNvbnNvbGUubG9nKCdlcnJvciB1cGRhdGUgdGFibGUnLCBlcnJvcikgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRiLmV4ZWNTUUwoXCJpbnNlcnQgaW50byBzZXR0aW5nICh1aWQsYXBpdXJsLGVycHVybCkgVkFMVUVTICg/LD8sPylcIiwgWzEsIGFwaXVybCwgZXJwdXJsXSlcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtjb25zb2xlLmxvZygnaW5zZXJ0ZWQuLi4uJykgfSlcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICwgZXJyb3IgPT4geyBjb25zb2xlLmxvZygnZXJyb3IgaW5zZXJ0aW5nIHRhYmxlJywgZXJyb3IpIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICApO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZXR0aW5nKCl7XHJcbiAgICAgICAgdGhpcy5nZXRkYkNvbm5lY3Rpb24oKVxyXG4gICAgICAgICAgLnRoZW4oZGI9PmRiLmdldChcInNlbGVjdCAqIGZyb20gc2V0dGluZ1wiKSlcclxuICAgICAgICAgIC50aGVuKHJvd3MgPT4geyBcclxuICAgICAgICAgICAgICBpZiAocm93cykge1xyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvd3MpO1xyXG4gICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhyb3dzWzFdKTtcclxuICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2cocm93c1syXSk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7XCJhcGlcIjpyb3dzWzFdLFwiZXJwXCI6cm93c1syXX07XHJcbiAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcImFwaVwiOicnLFwiZXJwXCI6Jyd9O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZXR0aW5nUHJvbWlzZSgpe1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRkYkNvbm5lY3Rpb24oKVxyXG4gICAgICAgICAgLnRoZW4oZGI9PmRiLmdldChcInNlbGVjdCAqIGZyb20gc2V0dGluZ1wiKSlcclxuICAgIH1cclxufSJdfQ==