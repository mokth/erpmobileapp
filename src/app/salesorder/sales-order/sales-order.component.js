"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var color_1 = require("tns-core-modules/color/color");
var router_1 = require("@angular/router");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var ModalPicker = require("nativescript-modal-datetimepicker");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var navigation_service_1 = require("../../core/services/navigation.service");
var services_1 = require("../../core/services");
var model_1 = require("../../core/model");
var enums_1 = require("../../core/enums");
var SalesOrderComponent = /** @class */ (function () {
    function SalesOrderComponent(utilserv, activatedRoute, serv, navigationService, barcodeScanner) {
        this.utilserv = utilserv;
        this.activatedRoute = activatedRoute;
        this.serv = serv;
        this.navigationService = navigationService;
        this.barcodeScanner = barcodeScanner;
        this.fd_icode = "";
        this.fd_qty = 0;
        this.fd_price = 0.00;
        this.fd_remark = "";
        this.isControlEnable = true;
        this.editmode = "New";
        this.order = new model_1.SalesOder();
        this.order.sono = 'AUTO';
        this.order.sodate = new Date();
        this.order.items = [];
        this.soitem = new model_1.SOItem();
        this.items = [];
    }
    SalesOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ttlAmt = 0;
        this.ttlQty = 0;
        this.setIConCode();
        this.activatedRoute.params.subscribe(function (params) {
            var sono = params['sono'];
            if (sono) {
                console.log('param ' + sono);
                if (sono != 'new') {
                    var keys = (sono + "").split('@');
                    if (keys.length == 2) {
                        _this._sono = keys[0];
                        _this._sorel = keys[1];
                        _this.editmode = "Edit";
                        _this.isControlEnable = false;
                        _this.loadSalesOrder();
                    }
                }
            }
        });
        this.selectedCust$ = this.utilserv.getBehaviorSubject();
        this.custSubscription = this.selectedCust$.subscribe(function (resp) {
            if (resp.type == enums_1.DataTable.customer) {
                _this.order.custname = resp.data.custName;
                _this.order.custcode = resp.data.custCode;
                _this.customer = resp.data;
            }
            else if (resp.type == enums_1.DataTable.masteritem) {
                //this.itemcode= resp.data.iCode;
                _this.itemMaster = resp.data;
                _this.setItemDetail();
            }
        });
    };
    SalesOrderComponent.prototype.onItemLoading = function (args) {
        if (args.index % 2 === 0) {
            args.view.backgroundColor = new color_1.Color("#F4F6F6");
        }
    };
    SalesOrderComponent.prototype.loadSalesOrder = function () {
        var _this = this;
        this.serv.getSalesOrderByKey(this._sono + '@' + this._sorel)
            .subscribe(function (resp) {
            if (resp) {
                _this.order = resp;
                _this.items = _this.order.items;
                _this.calculateTotal();
            }
        });
    };
    SalesOrderComponent.prototype.setIConCode = function () {
        this.iconSpin = String.fromCharCode(0xf150);
        this.iconAdd = String.fromCharCode(0xf055);
        this.iconRemove = String.fromCharCode(0xf057);
        this.iconCalender = String.fromCharCode(0xf133);
        this.iconEdit = String.fromCharCode(0xf14b);
        this.iconQR = String.fromCharCode(0xf029);
    };
    SalesOrderComponent.prototype.setItemDetail = function () {
        this.fd_icode = this.itemMaster.iCode;
        this.fd_price = this.itemMaster.sellingPrice;
    };
    SalesOrderComponent.prototype.ngOnDestroy = function () {
        this.custSubscription.unsubscribe();
    };
    Object.defineProperty(SalesOrderComponent.prototype, "dataItems", {
        get: function () {
            this._dataItems = new observable_array_1.ObservableArray(this.items);
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    SalesOrderComponent.prototype.pickDate = function (option) {
        var _this = this;
        var picker = new ModalPicker.ModalDatetimepicker();
        picker.pickDate({
            theme: 'dark',
            //maxDate: new Date(),
            is24HourView: false
        }).then(function (result) {
            if (option == 1) {
                _this.order.sodate = _this.getDateResult(result);
            }
            else if (option == 2) {
                _this.fd_deldate = _this.getDateResult(result);
            }
        }).catch(function (error) {
            console.log('Error: ' + error);
            (new nativescript_snackbar_1.SnackBar()).simple(error);
        });
    };
    SalesOrderComponent.prototype.getDateResult = function (result) {
        return new Date(result['year'], result['month'] - 1, result['day']);
    };
    SalesOrderComponent.prototype.OnCustomerTap = function () {
        this.navigationService.navigate(['/saleslist/lookcust']);
    };
    SalesOrderComponent.prototype.onItemTap = function () {
        this.navigationService.navigate(['/saleslistlookitem']);
    };
    SalesOrderComponent.prototype.onScannerTap = function () {
        var _this = this;
        this.barcodeScanner.hasCameraPermission().then(function (resp) {
            if (resp) {
                _this.onScan();
            }
            else {
                (new nativescript_snackbar_1.SnackBar()).simple("Require Camera Permission....");
            }
        }, function (error) {
            console.log(error);
        });
    };
    SalesOrderComponent.prototype.getItemLineNo = function () {
        var lineno = 1;
        if (this.items.length > 0) {
            var maxLine = this.items.reduce(function (x, y) { return (x.line > y.line) ? x : y; });
            lineno = (maxLine.line * 1) + 1;
        }
        return lineno;
    };
    SalesOrderComponent.prototype.getNewItem = function () {
        var soitem = new model_1.SOItem();
        var lineno = this.getItemLineNo();
        soitem.line = lineno;
        soitem.idec = this.itemMaster.iDesc;
        soitem.icode = this.fd_icode;
        soitem.price = this.fd_price;
        soitem.deldate = this.fd_deldate;
        soitem.remark = this.fd_remark;
        soitem.idec = soitem.line + " " + this.itemMaster.iDesc;
        soitem.uom = this.itemMaster.sellingUOM;
        soitem.packsize = this.itemMaster.stdPackSize;
        soitem.qty = this.fd_qty;
        soitem.amount = soitem.qty * soitem.price;
        return soitem;
    };
    SalesOrderComponent.prototype.setEditItem = function () {
        this.editedItem.deldate = this.fd_deldate;
        this.editedItem.remark = this.fd_remark;
        this.editedItem.price = this.fd_price;
        this.editedItem.qty = this.fd_qty;
        this.editedItem.amount = this.editedItem.qty * this.editedItem.price;
    };
    SalesOrderComponent.prototype.calculateTotal = function () {
        var _this = this;
        this.ttlQty = 0;
        this.ttlAmt = 0;
        this.items.map(function (itm) {
            _this.ttlQty = (_this.ttlQty * 1) + (itm.qty * 1);
            _this.ttlAmt = (_this.ttlAmt * 1) + (itm.qty * itm.price);
        });
    };
    SalesOrderComponent.prototype.OnAddItem = function () {
        if (!this.validateItem())
            return;
        var soitem;
        if (this.isEditMode) {
            this.ttlQty = (this.ttlQty * 1) - (this.editedItem.qty * 1);
            this.ttlAmt = (this.ttlAmt * 1) - (this.editedItem.qty * this.editedItem.price);
            this.setEditItem();
            soitem = this.editedItem;
        }
        else {
            soitem = this.getNewItem();
            this.items.push(soitem);
        }
        this.ttlQty = (this.ttlQty * 1) + (soitem.qty * 1);
        this.ttlAmt = (this.ttlAmt * 1) + (soitem.qty * soitem.price);
        this.resetItemEntry();
    };
    SalesOrderComponent.prototype.onEditItem = function (item) {
        this.fd_icode = item.icode;
        this.fd_price = item.price;
        this.fd_qty = item.qty;
        this.fd_deldate = item.deldate;
        this.fd_remark = item.remark;
        this.isEditMode = true;
        this.editedItem = item;
    };
    SalesOrderComponent.prototype.onRemoveItem = function (item) {
        this.items = this.items.filter(function (x) { return x.line !== item.line; });
        this.ttlQty = (this.ttlQty * 1) - (item.qty * 1);
        this.ttlAmt = (this.ttlAmt * 1) - (item.qty * item.price);
    };
    SalesOrderComponent.prototype.validateItem = function () {
        if (!this.fd_icode || this.fd_icode == "") {
            (new nativescript_snackbar_1.SnackBar()).simple("Item code is blank...");
            return false;
        }
        if (this.fd_qty == 0) {
            (new nativescript_snackbar_1.SnackBar()).simple("Invalid item qty....");
            return false;
        }
        return true;
    };
    SalesOrderComponent.prototype.resetItemEntry = function () {
        this.fd_icode = "";
        this.fd_price = 0.00;
        this.fd_qty = 0;
        this.fd_remark = "";
        //this.fd_deldate = null;
        this.isEditMode = false;
        this.editedItem = null;
    };
    SalesOrderComponent.prototype.OnSaveTap = function (e) {
        this.saveOrder();
        //this.navigationService.backToPreviousPage();
    };
    SalesOrderComponent.prototype.OnCancelTap = function (e) {
        this.navigationService.navigate(['/saleslist'], { clearHistory: true });
        //this.navigationService.backToPreviousPage();
    };
    //scanner
    SalesOrderComponent.prototype.onScan = function () {
        var _this = this;
        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            cancelLabel: "EXIT. Also, try the volume buttons!",
            cancelLabelBackgroundColor: "#333333",
            message: "Use the volume buttons for extra light",
            showFlipCameraButton: true,
            preferFrontCamera: false,
            showTorchButton: true,
            beepOnScan: true,
            torchOn: false,
            closeCallback: function () { console.log("Scanner closed"); },
            resultDisplayDuration: 500,
            // orientation: orientation,     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
            openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
        }).then(function (result) {
            // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
            console.log(result);
        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
            _this.barcodeScanner.stop();
        });
    };
    SalesOrderComponent.prototype.saveOrder = function () {
        var _this = this;
        if (this.editmode == "New") {
            this.order.sono = "AUTO";
            this.order.status = "new";
            this.order.custrel = 1;
            this.order.items = this.items.slice();
        }
        this.order.grossamt = this.ttlAmt;
        this.order.amount = this.ttlAmt;
        this.order.taxes = 0.00;
        console.log(this.order);
        this.serv.postSaleOrder(this.order).subscribe(function (resp) {
            console.log(resp);
            if (resp.ok == 'yes') {
                _this.alertMsg(resp.error);
            }
        });
    };
    SalesOrderComponent.prototype.alertMsg = function (msg) {
        var _this = this;
        var options = {
            title: "Message",
            message: msg,
            okButtonText: "OK"
        };
        dialogs_1.alert(options).then(function () {
            _this.navigationService.navigate(['/saleslist'], { clearHistory: true });
        });
    };
    SalesOrderComponent = __decorate([
        core_1.Component({
            selector: 'ns-sales-order',
            templateUrl: './sales-order.component.html',
            styleUrls: ['./sales-order.component.css'],
            moduleId: module.id.toString(),
        }),
        __metadata("design:paramtypes", [services_1.UtilService,
            router_1.ActivatedRoute,
            services_1.APIService,
            navigation_service_1.NavigationService,
            nativescript_barcodescanner_1.BarcodeScanner])
    ], SalesOrderComponent);
    return SalesOrderComponent;
}());
exports.SalesOrderComponent = SalesOrderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZXMtb3JkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZEO0FBRzdELDJFQUF5RTtBQUN6RSwrREFBaUQ7QUFDakQsc0RBQXFEO0FBQ3JELDBDQUFpRDtBQUNqRCwyRUFBMkQ7QUFDM0QsK0RBQWlFO0FBQ2pFLHVEQUFvRDtBQUdwRCw2RUFBMkU7QUFDM0UsZ0RBQThEO0FBQzlELDBDQUFtRjtBQUNuRiwwQ0FBNkM7QUFRN0M7SUFvQ0csNkJBQ3FCLFFBQW9CLEVBQ3BCLGNBQThCLEVBQzlCLElBQWUsRUFDZixpQkFBb0MsRUFDcEMsY0FBOEI7UUFKOUIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsU0FBSSxHQUFKLElBQUksQ0FBVztRQUNmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbkNwRCxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsYUFBUSxHQUFRLElBQUksQ0FBQztRQUVyQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBaUJwQixvQkFBZSxHQUFTLElBQUksQ0FBQztRQUc3QixhQUFRLEdBQVEsS0FBSyxDQUFDO1FBYWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxpQkFBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUMsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUUsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFNLEVBQUUsQ0FB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LElBb1ZDO0FBcFZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNuYWNrYmFyXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtCYXJjb2RlU2Nhbm5lcn0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcclxuaW1wb3J0ICogYXMgTW9kYWxQaWNrZXIgZnJvbSAnbmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyJztcclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XHJcblxyXG5pbXBvcnQgeyBpdGVtQ29kZSB9IGZyb20gJy4vaXRlbS1jb2RlJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlLCBBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFNhbGVzT2RlciwgU09JdGVtLCBDdXN0UHJvZmlsZUxpZ2h0LCBJdGVtTWFzdGVyIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbCc7XHJcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJy4uLy4uL2NvcmUvZW51bXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1zYWxlcy1vcmRlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NhbGVzLW9yZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zYWxlcy1vcmRlci5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZC50b1N0cmluZygpLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2FsZXNPcmRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxPbkRlc3Ryb3kge1xyXG4gIGN1c3RvbWVyOkN1c3RQcm9maWxlTGlnaHQ7XHJcbiAgaXRlbU1hc3RlcjpJdGVtTWFzdGVyO1xyXG4gIG9yZGVyOlNhbGVzT2RlcjtcclxuICBzb2l0ZW06U09JdGVtO1xyXG4gIHNvZGF0ZTphbnk7XHJcbiAgZmRfaWNvZGU6c3RyaW5nPVwiXCI7XHJcbiAgZmRfcXR5Om51bWJlcj0wO1xyXG4gIGZkX3ByaWNlOm51bWJlcj0wLjAwO1xyXG4gIGZkX2RlbGRhdGU6RGF0ZTtcclxuICBmZF9yZW1hcms6c3RyaW5nPVwiXCI7XHJcblxyXG4gIGl0ZW1zOlNPSXRlbVtdO1xyXG5cclxuICBpY29uU3BpbjpzdHJpbmc7XHJcbiAgaWNvbkFkZDpzdHJpbmc7XHJcbiAgaWNvblJlbW92ZTpzdHJpbmc7XHJcbiAgaWNvbkNhbGVuZGVyOnN0cmluZztcclxuICBpY29uRWRpdDpzdHJpbmc7XHJcbiAgaWNvblFSOnN0cmluZztcclxuXHJcbiAgc2VsZWN0ZWRDdXN0JDpCZWhhdmlvclN1YmplY3Q8YW55PjtcclxuICBjdXN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHR0bFF0eTpudW1iZXI7XHJcbiAgdHRsQW10Om51bWJlcjtcclxuXHJcbiAgaXNDb250cm9sRW5hYmxlOmJvb2xlYW49dHJ1ZTtcclxuICBpc0VkaXRNb2RlOmJvb2xlYW47XHJcbiAgZWRpdGVkSXRlbTpTT0l0ZW07XHJcbiAgZWRpdG1vZGU6c3RyaW5nPVwiTmV3XCI7XHJcbiAgX3Nvbm86c3RyaW5nO1xyXG4gIF9zb3JlbDpzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgX2RhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PGl0ZW1Db2RlPjtcclxuXHJcbiAgIGNvbnN0cnVjdG9yKCBcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXRpbHNlcnY6VXRpbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc2VydjpBUElTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lciAgIFxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgIHRoaXMub3JkZXIgPSBuZXcgU2FsZXNPZGVyKCk7XHJcbiAgICAgIHRoaXMub3JkZXIuc29ubz0nQVVUTyc7XHJcbiAgICAgIHRoaXMub3JkZXIuc29kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgdGhpcy5vcmRlci5pdGVtcyA9W107ICBcclxuICAgICAgdGhpcy5zb2l0ZW0gPSBuZXcgU09JdGVtKCk7ICAgIFxyXG4gICAgICB0aGlzLml0ZW1zPVtdOyAgICAgICAgICAgIFxyXG4gICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50dGxBbXQ9MDtcclxuICAgIHRoaXMudHRsUXR5PTA7XHJcbiAgICB0aGlzLnNldElDb25Db2RlKCk7ICBcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgc29ubyA9IHBhcmFtc1snc29ubyddO1xyXG4gICAgICAgICAgaWYgKHNvbm8pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcmFtICcrc29ubyk7XHJcbiAgICAgICAgICAgIGlmIChzb25vIT0nbmV3Jyl7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5cz0gKHNvbm8rXCJcIikuc3BsaXQoJ0AnKTtcclxuICAgICAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aD09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc29ubz1rZXlzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvcmVsPWtleXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0bW9kZT1cIkVkaXRcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQ29udHJvbEVuYWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRTYWxlc09yZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgdGhpcy5zZWxlY3RlZEN1c3QkPXRoaXMudXRpbHNlcnYuZ2V0QmVoYXZpb3JTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmN1c3RTdWJzY3JpcHRpb249IHRoaXMuc2VsZWN0ZWRDdXN0JC5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICAgIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5jdXN0b21lcil7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXIuY3VzdG5hbWU9IHJlc3AuZGF0YS5jdXN0TmFtZTtcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5jdXN0Y29kZSA9IHJlc3AuZGF0YS5jdXN0Q29kZTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgIH1lbHNlIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5tYXN0ZXJpdGVtKXtcclxuICAgICAgICAgICAgLy90aGlzLml0ZW1jb2RlPSByZXNwLmRhdGEuaUNvZGU7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU1hc3Rlcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnNldEl0ZW1EZXRhaWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XHJcbiAgICBpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcclxuICAgICAgIGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjRjRGNkY2XCIpOyAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZFNhbGVzT3JkZXIoKXtcclxuICAgIHRoaXMuc2Vydi5nZXRTYWxlc09yZGVyQnlLZXkodGhpcy5fc29ubysnQCcrdGhpcy5fc29yZWwpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgICAgICBpZiAocmVzcCl7XHJcbiAgICAgICAgICAgICB0aGlzLm9yZGVyID0gcmVzcDtcclxuICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLm9yZGVyLml0ZW1zO1xyXG4gICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SUNvbkNvZGUoKXtcclxuICAgIHRoaXMuaWNvblNwaW4gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjE1MCk7XHJcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1NSk7XHJcbiAgICB0aGlzLmljb25SZW1vdmUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1Nyk7XHJcbiAgICB0aGlzLmljb25DYWxlbmRlcj0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxMzMpO1xyXG4gICAgdGhpcy5pY29uRWRpdD0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxNGIpO1xyXG4gICAgdGhpcy5pY29uUVI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDI5KTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc2V0SXRlbURldGFpbCgpe1xyXG4gICAgdGhpcy5mZF9pY29kZT0gdGhpcy5pdGVtTWFzdGVyLmlDb2RlO1xyXG4gICAgdGhpcy5mZF9wcmljZT0gdGhpcy5pdGVtTWFzdGVyLnNlbGxpbmdQcmljZTsgICAgXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY3VzdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGFJdGVtcygpOiBPYnNlcnZhYmxlQXJyYXk8aXRlbUNvZGU+IHtcclxuICAgIHRoaXMuX2RhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5pdGVtcyk7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YUl0ZW1zO1xyXG4gfVxyXG4gICBcclxuICBwaWNrRGF0ZShvcHRpb246bnVtYmVyKSB7XHJcbiAgICBjb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIuTW9kYWxEYXRldGltZXBpY2tlcigpO1xyXG4gICAgcGlja2VyLnBpY2tEYXRlKHtcclxuICAgICAgdGhlbWU6ICdkYXJrJyxcclxuICAgICAgLy9tYXhEYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICBpczI0SG91clZpZXc6IGZhbHNlXHJcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKG9wdGlvbj09MSl7XHJcbiAgICAgICAgICB0aGlzLm9yZGVyLnNvZGF0ZSA9IHRoaXMuZ2V0RGF0ZVJlc3VsdChyZXN1bHQpO1xyXG4gICAgICB9ZWxzZSBpZiAob3B0aW9uPT0yKXtcclxuICAgICAgICB0aGlzLmZkX2RlbGRhdGUgPSB0aGlzLmdldERhdGVSZXN1bHQocmVzdWx0KTtcclxuICAgICB9XHJcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyb3IpO1xyXG4gICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShlcnJvcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldERhdGVSZXN1bHQocmVzdWx0OmFueSl7XHJcbiAgICByZXR1cm4gbmV3IERhdGUocmVzdWx0Wyd5ZWFyJ10scmVzdWx0Wydtb250aCddLTEscmVzdWx0WydkYXknXSk7ICAgIFxyXG4gIH1cclxuXHJcbiAgT25DdXN0b21lclRhcCgpe1xyXG4gICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXNsaXN0L2xvb2tjdXN0J10pO1xyXG4gIH1cclxuXHJcbiAgb25JdGVtVGFwKCl7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdGxvb2tpdGVtJ10pO1xyXG4gIH1cclxuXHJcbiAgb25TY2FubmVyVGFwKCl7XHJcbiAgICB0aGlzLmJhcmNvZGVTY2FubmVyLmhhc0NhbWVyYVBlcm1pc3Npb24oKS50aGVuKHJlc3A9PntcclxuICAgICAgICAgIGlmIChyZXNwKXtcclxuICAgICAgICAgICAgICB0aGlzLm9uU2NhbigpIDtcclxuICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJSZXF1aXJlIENhbWVyYSBQZXJtaXNzaW9uLi4uLlwiKTtcclxuICAgICAgICAgIH0gIFxyXG4gICAgICAgIH0sKGVycm9yKT0+e1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpOyBcclxuICAgICAgICB9XHJcbiAgICAgICk7ICAgICAgICAgIFxyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbUxpbmVObygpOm51bWJlcntcclxuICAgIGxldCBsaW5lbm86bnVtYmVyPTE7XHJcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGg+MCl7ICBcclxuICAgICAgIGxldCBtYXhMaW5lID0gdGhpcy5pdGVtcy5yZWR1Y2UoKHgseSk9Pih4LmxpbmUgPiB5LmxpbmUpP3g6eSk7XHJcbiAgICAgICBsaW5lbm8gPSAobWF4TGluZS5saW5lICoxKSArIDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluZW5vO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmV3SXRlbSgpOlNPSXRlbXtcclxuICAgICAgbGV0IHNvaXRlbSA9IG5ldyBTT0l0ZW0oKTtcclxuICAgICAgbGV0IGxpbmVubyA9IHRoaXMuZ2V0SXRlbUxpbmVObygpO1xyXG4gICAgICBzb2l0ZW0ubGluZSA9IGxpbmVubztcclxuICAgICAgc29pdGVtLmlkZWMgPSB0aGlzLml0ZW1NYXN0ZXIuaURlc2M7XHJcbiAgICAgIHNvaXRlbS5pY29kZT0gdGhpcy5mZF9pY29kZTtcclxuICAgICAgc29pdGVtLnByaWNlID0gdGhpcy5mZF9wcmljZTtcclxuICAgICAgc29pdGVtLmRlbGRhdGUgPSB0aGlzLmZkX2RlbGRhdGU7XHJcbiAgICAgIHNvaXRlbS5yZW1hcmsgPSB0aGlzLmZkX3JlbWFyaztcclxuICAgICAgc29pdGVtLmlkZWMgPSBzb2l0ZW0ubGluZStcIiBcIisgdGhpcy5pdGVtTWFzdGVyLmlEZXNjO1xyXG4gICAgICBzb2l0ZW0udW9tID0gdGhpcy5pdGVtTWFzdGVyLnNlbGxpbmdVT007XHJcbiAgICAgIHNvaXRlbS5wYWNrc2l6ZSA9IHRoaXMuaXRlbU1hc3Rlci5zdGRQYWNrU2l6ZTtcclxuICAgICAgc29pdGVtLnF0eSA9IHRoaXMuZmRfcXR5O1xyXG4gICAgICBzb2l0ZW0uYW1vdW50ID0gIHNvaXRlbS5xdHkgKiBzb2l0ZW0ucHJpY2U7XHJcbiAgIHJldHVybiBzb2l0ZW07XHJcbiAgfVxyXG4gIFxyXG4gIHNldEVkaXRJdGVtKCl7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0uZGVsZGF0ZSA9IHRoaXMuZmRfZGVsZGF0ZTtcclxuICAgIHRoaXMuZWRpdGVkSXRlbS5yZW1hcmsgPSB0aGlzLmZkX3JlbWFyaztcclxuICAgIHRoaXMuZWRpdGVkSXRlbS5wcmljZSA9ICB0aGlzLmZkX3ByaWNlO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLnF0eSA9IHRoaXMuZmRfcXR5O1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLmFtb3VudCA9ICB0aGlzLmVkaXRlZEl0ZW0ucXR5ICogdGhpcy5lZGl0ZWRJdGVtLnByaWNlO1xyXG4gIH1cclxuIFxyXG4gIGNhbGN1bGF0ZVRvdGFsKCl7XHJcbiAgICB0aGlzLnR0bFF0eSA9IDA7XHJcbiAgICB0aGlzLnR0bEFtdCA9MDtcclxuICAgIHRoaXMuaXRlbXMubWFwKGl0bT0+e1xyXG4gICAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgKyhpdG0ucXR5ICoxKTtcclxuICAgICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpICsgKGl0bS5xdHkgKiBpdG0ucHJpY2UpOyBcclxuICAgIH0pO1xyXG4gIH1cclxuICBPbkFkZEl0ZW0oKXtcclxuICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlSXRlbSgpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgXHJcbiAgICAgIGxldCBzb2l0ZW06U09JdGVtO1xyXG4gICAgICBpZiAodGhpcy5pc0VkaXRNb2RlKXtcclxuICAgICAgICAgdGhpcy50dGxRdHkgPSAodGhpcy50dGxRdHkgKjEpIC0gKHRoaXMuZWRpdGVkSXRlbS5xdHkgKjEpO1xyXG4gICAgICAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgLSAodGhpcy5lZGl0ZWRJdGVtLnF0eSAqIHRoaXMuZWRpdGVkSXRlbS5wcmljZSk7ICBcclxuICAgICAgICAgdGhpcy5zZXRFZGl0SXRlbSgpO1xyXG4gICAgICAgICBzb2l0ZW0gPSB0aGlzLmVkaXRlZEl0ZW07XHJcbiAgICAgIH1lbHNlIHtcclxuICAgICAgICAgc29pdGVtID0gdGhpcy5nZXROZXdJdGVtKCk7XHJcbiAgICAgICAgIHRoaXMuaXRlbXMucHVzaChzb2l0ZW0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgKyhzb2l0ZW0ucXR5ICoxKTtcclxuICAgICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpICsgKHNvaXRlbS5xdHkgKiBzb2l0ZW0ucHJpY2UpOyAgICBcclxuICAgICAgdGhpcy5yZXNldEl0ZW1FbnRyeSgpO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgb25FZGl0SXRlbShpdGVtOlNPSXRlbSl7XHJcbiAgICB0aGlzLmZkX2ljb2RlPWl0ZW0uaWNvZGU7XHJcbiAgICB0aGlzLmZkX3ByaWNlID0gaXRlbS5wcmljZTtcclxuICAgIHRoaXMuZmRfcXR5ID0gaXRlbS5xdHk7XHJcbiAgICB0aGlzLmZkX2RlbGRhdGUgPSBpdGVtLmRlbGRhdGU7XHJcbiAgICB0aGlzLmZkX3JlbWFyayA9IGl0ZW0ucmVtYXJrO1xyXG4gICAgdGhpcy5pc0VkaXRNb2RlPXRydWU7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0gPSBpdGVtO1xyXG4gIH1cclxuXHJcbiAgb25SZW1vdmVJdGVtKGl0ZW06U09JdGVtKXtcclxuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcih4PT54LmxpbmUgIT09IGl0ZW0ubGluZSk7XHJcbiAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgLSAoaXRlbS5xdHkgKjEpO1xyXG4gICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpIC0gKGl0ZW0ucXR5ICogaXRlbS5wcmljZSk7ICBcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlSXRlbSgpOmJvb2xlYW57XHJcbiAgICAgIGlmICghdGhpcy5mZF9pY29kZSB8fCB0aGlzLmZkX2ljb2RlPT1cIlwiKXtcclxuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkl0ZW0gY29kZSBpcyBibGFuay4uLlwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZmRfcXR5PT0wKXtcclxuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkludmFsaWQgaXRlbSBxdHkuLi4uXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIFxyXG4gIHJlc2V0SXRlbUVudHJ5KCl7XHJcbiAgICB0aGlzLmZkX2ljb2RlPVwiXCI7XHJcbiAgICB0aGlzLmZkX3ByaWNlID0wLjAwO1xyXG4gICAgdGhpcy5mZF9xdHkgPTA7XHJcbiAgICB0aGlzLmZkX3JlbWFyayA9XCJcIjtcclxuICAgIC8vdGhpcy5mZF9kZWxkYXRlID0gbnVsbDtcclxuICAgIHRoaXMuaXNFZGl0TW9kZT1mYWxzZTtcclxuICAgIHRoaXMuZWRpdGVkSXRlbT1udWxsO1xyXG4gIH1cclxuXHJcbiAgT25TYXZlVGFwKGUpe1xyXG4gICAgdGhpcy5zYXZlT3JkZXIoKTtcclxuXHJcbiAgICAvL3RoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgfVxyXG5cclxuICBPbkNhbmNlbFRhcChlKXtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXNsaXN0J10se2NsZWFySGlzdG9yeTp0cnVlfSk7XHJcbiAgICAvL3RoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgfVxyXG4gIFxyXG4gIC8vc2Nhbm5lclxyXG4gIHB1YmxpYyBvblNjYW4oKXtcclxuICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcclxuICAgICAgICAgICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxyXG4gICAgICAgICAgICAgIGNhbmNlbExhYmVsOiBcIkVYSVQuIEFsc28sIHRyeSB0aGUgdm9sdW1lIGJ1dHRvbnMhXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICdDbG9zZSdcclxuICAgICAgICAgICAgICBjYW5jZWxMYWJlbEJhY2tncm91bmRDb2xvcjogXCIjMzMzMzMzXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICcjMDAwMDAwJyAoYmxhY2spXHJcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJVc2UgdGhlIHZvbHVtZSBidXR0b25zIGZvciBleHRyYSBsaWdodFwiLCAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgaXMgJ1BsYWNlIGEgYmFyY29kZSBpbnNpZGUgdGhlIHZpZXdmaW5kZXIgcmVjdGFuZ2xlIHRvIHNjYW4gaXQuJ1xyXG4gICAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLCAgIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsICAgICAvLyBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLCAgICAgICAgLy8gZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAgICAgIGJlZXBPblNjYW46IHRydWUsICAgICAgICAgICAgIC8vIFBsYXkgb3IgU3VwcHJlc3MgYmVlcCBvbiBzY2FuIChkZWZhdWx0IHRydWUpXHJcbiAgICAgICAgICAgICAgdG9yY2hPbjogZmFsc2UsICAgICAgICAgICAgICAgLy8gbGF1bmNoIHdpdGggdGhlIGZsYXNobGlnaHQgb24gKGRlZmF1bHQgZmFsc2UpXHJcbiAgICAgICAgICAgICAgY2xvc2VDYWxsYmFjazogKCkgPT4geyBjb25zb2xlLmxvZyhcIlNjYW5uZXIgY2xvc2VkXCIpfSwgLy8gaW52b2tlZCB3aGVuIHRoZSBzY2FubmVyIHdhcyBjbG9zZWQgKHN1Y2Nlc3Mgb3IgYWJvcnQpXHJcbiAgICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IDE1MDAgKG1zKSwgc2V0IHRvIDAgdG8gZGlzYWJsZSBlY2hvaW5nIHRoZSBzY2FubmVkIHRleHRcclxuICAgICAgICAgICAgLy8gb3JpZW50YXRpb246IG9yaWVudGF0aW9uLCAgICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IHVuZGVmaW5lZCAoc2Vuc29yLWRyaXZlbiBvcmllbnRhdGlvbiksIG90aGVyIG9wdGlvbnM6IHBvcnRyYWl0fGxhbmRzY2FwZVxyXG4gICAgICAgICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWUgLy8gT24gaU9TIHlvdSBjYW4gc2VuZCB0aGUgdXNlciB0byB0aGUgc2V0dGluZ3MgYXBwIGlmIGFjY2VzcyB3YXMgcHJldmlvdXNseSBkZW5pZWRcclxuICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgUHJvbWlzZSBpcyBuZXZlciBpbnZva2VkIHdoZW4gYSAnY29udGludW91c1NjYW5DYWxsYmFjaycgZnVuY3Rpb24gaXMgcHJvdmlkZWRcclxuICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsgICAgICAgIFxyXG4gICAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBzY2FuLiBcIiArIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG4gIFxyXG4gIHNhdmVPcmRlcigpe1xyXG4gICAgIGlmICh0aGlzLmVkaXRtb2RlPT1cIk5ld1wiKXtcclxuICAgICAgICB0aGlzLm9yZGVyLnNvbm89XCJBVVRPXCI7XHJcbiAgICAgICAgdGhpcy5vcmRlci5zdGF0dXM9XCJuZXdcIjtcclxuICAgICAgICB0aGlzLm9yZGVyLmN1c3RyZWw9MTtcclxuICAgICAgICB0aGlzLm9yZGVyLml0ZW1zPSBbLi4udGhpcy5pdGVtc107XHJcbiAgICAgfVxyXG5cclxuICAgICB0aGlzLm9yZGVyLmdyb3NzYW10PSB0aGlzLnR0bEFtdDtcclxuICAgICB0aGlzLm9yZGVyLmFtb3VudD0gdGhpcy50dGxBbXQ7XHJcbiAgICAgdGhpcy5vcmRlci50YXhlcyA9MC4wMDtcclxuICAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyKTtcclxuICAgICB0aGlzLnNlcnYucG9zdFNhbGVPcmRlcih0aGlzLm9yZGVyKS5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xyXG4gICAgICAgIGlmKHJlc3Aub2s9PSd5ZXMnKXtcclxuICAgICAgICAgIHRoaXMuYWxlcnRNc2cocmVzcC4gZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICB9KTsgICAgIFxyXG4gIH1cclxuXHJcbiAgYWxlcnRNc2cobXNnKSB7XHJcbiAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgIHRpdGxlOiBcIk1lc3NhZ2VcIixcclxuICAgICAgICBtZXNzYWdlOiBtc2csXHJcbiAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgfTtcclxuXHJcbiAgICBhbGVydChvcHRpb25zKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3QnXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=