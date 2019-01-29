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
        this.navigationService.navigate(['/saleslist/lookitem']);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZXMtb3JkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZEO0FBRzdELDJFQUF5RTtBQUN6RSwrREFBaUQ7QUFDakQsc0RBQXFEO0FBQ3JELDBDQUFpRDtBQUNqRCwyRUFBMkQ7QUFDM0QsK0RBQWlFO0FBQ2pFLHVEQUFvRDtBQUdwRCw2RUFBMkU7QUFDM0UsZ0RBQThEO0FBQzlELDBDQUFtRjtBQUNuRiwwQ0FBNkM7QUFRN0M7SUFvQ0csNkJBQ3FCLFFBQW9CLEVBQ3BCLGNBQThCLEVBQzlCLElBQWUsRUFDZixpQkFBb0MsRUFDcEMsY0FBOEI7UUFKOUIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsU0FBSSxHQUFKLElBQUksQ0FBVztRQUNmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbkNwRCxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsYUFBUSxHQUFRLElBQUksQ0FBQztRQUVyQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBaUJwQixvQkFBZSxHQUFTLElBQUksQ0FBQztRQUc3QixhQUFRLEdBQVEsS0FBSyxDQUFDO1FBYWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxpQkFBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUMsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUUsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFNLEVBQUUsQ0FB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LElBb1ZDO0FBcFZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNuYWNrYmFyXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtCYXJjb2RlU2Nhbm5lcn0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcclxuaW1wb3J0ICogYXMgTW9kYWxQaWNrZXIgZnJvbSAnbmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyJztcclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XHJcblxyXG5pbXBvcnQgeyBpdGVtQ29kZSB9IGZyb20gJy4vaXRlbS1jb2RlJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlLCBBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFNhbGVzT2RlciwgU09JdGVtLCBDdXN0UHJvZmlsZUxpZ2h0LCBJdGVtTWFzdGVyIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbCc7XHJcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJy4uLy4uL2NvcmUvZW51bXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1zYWxlcy1vcmRlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NhbGVzLW9yZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zYWxlcy1vcmRlci5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZC50b1N0cmluZygpLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2FsZXNPcmRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxPbkRlc3Ryb3kge1xyXG4gIGN1c3RvbWVyOkN1c3RQcm9maWxlTGlnaHQ7XHJcbiAgaXRlbU1hc3RlcjpJdGVtTWFzdGVyO1xyXG4gIG9yZGVyOlNhbGVzT2RlcjtcclxuICBzb2l0ZW06U09JdGVtO1xyXG4gIHNvZGF0ZTphbnk7XHJcbiAgZmRfaWNvZGU6c3RyaW5nPVwiXCI7XHJcbiAgZmRfcXR5Om51bWJlcj0wO1xyXG4gIGZkX3ByaWNlOm51bWJlcj0wLjAwO1xyXG4gIGZkX2RlbGRhdGU6RGF0ZTtcclxuICBmZF9yZW1hcms6c3RyaW5nPVwiXCI7XHJcblxyXG4gIGl0ZW1zOlNPSXRlbVtdO1xyXG5cclxuICBpY29uU3BpbjpzdHJpbmc7XHJcbiAgaWNvbkFkZDpzdHJpbmc7XHJcbiAgaWNvblJlbW92ZTpzdHJpbmc7XHJcbiAgaWNvbkNhbGVuZGVyOnN0cmluZztcclxuICBpY29uRWRpdDpzdHJpbmc7XHJcbiAgaWNvblFSOnN0cmluZztcclxuXHJcbiAgc2VsZWN0ZWRDdXN0JDpCZWhhdmlvclN1YmplY3Q8YW55PjtcclxuICBjdXN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHR0bFF0eTpudW1iZXI7XHJcbiAgdHRsQW10Om51bWJlcjtcclxuXHJcbiAgaXNDb250cm9sRW5hYmxlOmJvb2xlYW49dHJ1ZTtcclxuICBpc0VkaXRNb2RlOmJvb2xlYW47XHJcbiAgZWRpdGVkSXRlbTpTT0l0ZW07XHJcbiAgZWRpdG1vZGU6c3RyaW5nPVwiTmV3XCI7XHJcbiAgX3Nvbm86c3RyaW5nO1xyXG4gIF9zb3JlbDpzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgX2RhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PGl0ZW1Db2RlPjtcclxuXHJcbiAgIGNvbnN0cnVjdG9yKCBcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXRpbHNlcnY6VXRpbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc2VydjpBUElTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lciAgIFxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgIHRoaXMub3JkZXIgPSBuZXcgU2FsZXNPZGVyKCk7XHJcbiAgICAgIHRoaXMub3JkZXIuc29ubz0nQVVUTyc7XHJcbiAgICAgIHRoaXMub3JkZXIuc29kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgdGhpcy5vcmRlci5pdGVtcyA9W107ICBcclxuICAgICAgdGhpcy5zb2l0ZW0gPSBuZXcgU09JdGVtKCk7ICAgIFxyXG4gICAgICB0aGlzLml0ZW1zPVtdOyAgICAgICAgICAgIFxyXG4gICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50dGxBbXQ9MDtcclxuICAgIHRoaXMudHRsUXR5PTA7XHJcbiAgICB0aGlzLnNldElDb25Db2RlKCk7ICBcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgc29ubyA9IHBhcmFtc1snc29ubyddO1xyXG4gICAgICAgICAgaWYgKHNvbm8pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcmFtICcrc29ubyk7XHJcbiAgICAgICAgICAgIGlmIChzb25vIT0nbmV3Jyl7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5cz0gKHNvbm8rXCJcIikuc3BsaXQoJ0AnKTtcclxuICAgICAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aD09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc29ubz1rZXlzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvcmVsPWtleXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0bW9kZT1cIkVkaXRcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQ29udHJvbEVuYWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRTYWxlc09yZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgdGhpcy5zZWxlY3RlZEN1c3QkPXRoaXMudXRpbHNlcnYuZ2V0QmVoYXZpb3JTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmN1c3RTdWJzY3JpcHRpb249IHRoaXMuc2VsZWN0ZWRDdXN0JC5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICAgIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5jdXN0b21lcil7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXIuY3VzdG5hbWU9IHJlc3AuZGF0YS5jdXN0TmFtZTtcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5jdXN0Y29kZSA9IHJlc3AuZGF0YS5jdXN0Q29kZTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgIH1lbHNlIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5tYXN0ZXJpdGVtKXtcclxuICAgICAgICAgICAgLy90aGlzLml0ZW1jb2RlPSByZXNwLmRhdGEuaUNvZGU7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU1hc3Rlcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnNldEl0ZW1EZXRhaWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XHJcbiAgICBpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcclxuICAgICAgIGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjRjRGNkY2XCIpOyAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZFNhbGVzT3JkZXIoKXtcclxuICAgIHRoaXMuc2Vydi5nZXRTYWxlc09yZGVyQnlLZXkodGhpcy5fc29ubysnQCcrdGhpcy5fc29yZWwpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgICAgICBpZiAocmVzcCl7XHJcbiAgICAgICAgICAgICB0aGlzLm9yZGVyID0gcmVzcDtcclxuICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLm9yZGVyLml0ZW1zO1xyXG4gICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SUNvbkNvZGUoKXtcclxuICAgIHRoaXMuaWNvblNwaW4gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjE1MCk7XHJcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1NSk7XHJcbiAgICB0aGlzLmljb25SZW1vdmUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1Nyk7XHJcbiAgICB0aGlzLmljb25DYWxlbmRlcj0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxMzMpO1xyXG4gICAgdGhpcy5pY29uRWRpdD0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxNGIpO1xyXG4gICAgdGhpcy5pY29uUVI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDI5KTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc2V0SXRlbURldGFpbCgpe1xyXG4gICAgdGhpcy5mZF9pY29kZT0gdGhpcy5pdGVtTWFzdGVyLmlDb2RlO1xyXG4gICAgdGhpcy5mZF9wcmljZT0gdGhpcy5pdGVtTWFzdGVyLnNlbGxpbmdQcmljZTsgICAgXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY3VzdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGFJdGVtcygpOiBPYnNlcnZhYmxlQXJyYXk8aXRlbUNvZGU+IHtcclxuICAgIHRoaXMuX2RhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5pdGVtcyk7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YUl0ZW1zO1xyXG4gfVxyXG4gICBcclxuICBwaWNrRGF0ZShvcHRpb246bnVtYmVyKSB7XHJcbiAgICBjb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIuTW9kYWxEYXRldGltZXBpY2tlcigpO1xyXG4gICAgcGlja2VyLnBpY2tEYXRlKHtcclxuICAgICAgdGhlbWU6ICdkYXJrJyxcclxuICAgICAgLy9tYXhEYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICBpczI0SG91clZpZXc6IGZhbHNlXHJcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKG9wdGlvbj09MSl7XHJcbiAgICAgICAgICB0aGlzLm9yZGVyLnNvZGF0ZSA9IHRoaXMuZ2V0RGF0ZVJlc3VsdChyZXN1bHQpO1xyXG4gICAgICB9ZWxzZSBpZiAob3B0aW9uPT0yKXtcclxuICAgICAgICB0aGlzLmZkX2RlbGRhdGUgPSB0aGlzLmdldERhdGVSZXN1bHQocmVzdWx0KTtcclxuICAgICB9XHJcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyb3IpO1xyXG4gICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShlcnJvcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldERhdGVSZXN1bHQocmVzdWx0OmFueSl7XHJcbiAgICByZXR1cm4gbmV3IERhdGUocmVzdWx0Wyd5ZWFyJ10scmVzdWx0Wydtb250aCddLTEscmVzdWx0WydkYXknXSk7ICAgIFxyXG4gIH1cclxuXHJcbiAgT25DdXN0b21lclRhcCgpe1xyXG4gICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXNsaXN0L2xvb2tjdXN0J10pO1xyXG4gIH1cclxuXHJcbiAgb25JdGVtVGFwKCl7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdC9sb29raXRlbSddKTtcclxuICB9XHJcblxyXG4gIG9uU2Nhbm5lclRhcCgpe1xyXG4gICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5oYXNDYW1lcmFQZXJtaXNzaW9uKCkudGhlbihyZXNwPT57XHJcbiAgICAgICAgICBpZiAocmVzcCl7XHJcbiAgICAgICAgICAgICAgdGhpcy5vblNjYW4oKSA7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiUmVxdWlyZSBDYW1lcmEgUGVybWlzc2lvbi4uLi5cIik7XHJcbiAgICAgICAgICB9ICBcclxuICAgICAgICB9LChlcnJvcik9PntcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICApOyAgICAgICAgICBcclxuICB9XHJcblxyXG4gIGdldEl0ZW1MaW5lTm8oKTpudW1iZXJ7XHJcbiAgICBsZXQgbGluZW5vOm51bWJlcj0xO1xyXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoPjApeyAgXHJcbiAgICAgICBsZXQgbWF4TGluZSA9IHRoaXMuaXRlbXMucmVkdWNlKCh4LHkpPT4oeC5saW5lID4geS5saW5lKT94OnkpO1xyXG4gICAgICAgbGluZW5vID0gKG1heExpbmUubGluZSAqMSkgKyAxO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmVubztcclxuICB9XHJcblxyXG4gIGdldE5ld0l0ZW0oKTpTT0l0ZW17XHJcbiAgICAgIGxldCBzb2l0ZW0gPSBuZXcgU09JdGVtKCk7XHJcbiAgICAgIGxldCBsaW5lbm8gPSB0aGlzLmdldEl0ZW1MaW5lTm8oKTtcclxuICAgICAgc29pdGVtLmxpbmUgPSBsaW5lbm87XHJcbiAgICAgIHNvaXRlbS5pZGVjID0gdGhpcy5pdGVtTWFzdGVyLmlEZXNjO1xyXG4gICAgICBzb2l0ZW0uaWNvZGU9IHRoaXMuZmRfaWNvZGU7XHJcbiAgICAgIHNvaXRlbS5wcmljZSA9IHRoaXMuZmRfcHJpY2U7XHJcbiAgICAgIHNvaXRlbS5kZWxkYXRlID0gdGhpcy5mZF9kZWxkYXRlO1xyXG4gICAgICBzb2l0ZW0ucmVtYXJrID0gdGhpcy5mZF9yZW1hcms7XHJcbiAgICAgIHNvaXRlbS5pZGVjID0gc29pdGVtLmxpbmUrXCIgXCIrIHRoaXMuaXRlbU1hc3Rlci5pRGVzYztcclxuICAgICAgc29pdGVtLnVvbSA9IHRoaXMuaXRlbU1hc3Rlci5zZWxsaW5nVU9NO1xyXG4gICAgICBzb2l0ZW0ucGFja3NpemUgPSB0aGlzLml0ZW1NYXN0ZXIuc3RkUGFja1NpemU7XHJcbiAgICAgIHNvaXRlbS5xdHkgPSB0aGlzLmZkX3F0eTtcclxuICAgICAgc29pdGVtLmFtb3VudCA9ICBzb2l0ZW0ucXR5ICogc29pdGVtLnByaWNlO1xyXG4gICByZXR1cm4gc29pdGVtO1xyXG4gIH1cclxuICBcclxuICBzZXRFZGl0SXRlbSgpe1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLmRlbGRhdGUgPSB0aGlzLmZkX2RlbGRhdGU7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0ucmVtYXJrID0gdGhpcy5mZF9yZW1hcms7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0ucHJpY2UgPSAgdGhpcy5mZF9wcmljZTtcclxuICAgIHRoaXMuZWRpdGVkSXRlbS5xdHkgPSB0aGlzLmZkX3F0eTtcclxuICAgIHRoaXMuZWRpdGVkSXRlbS5hbW91bnQgPSAgdGhpcy5lZGl0ZWRJdGVtLnF0eSAqIHRoaXMuZWRpdGVkSXRlbS5wcmljZTtcclxuICB9XHJcbiBcclxuICBjYWxjdWxhdGVUb3RhbCgpe1xyXG4gICAgdGhpcy50dGxRdHkgPSAwO1xyXG4gICAgdGhpcy50dGxBbXQgPTA7XHJcbiAgICB0aGlzLml0ZW1zLm1hcChpdG09PntcclxuICAgICAgdGhpcy50dGxRdHkgPSAodGhpcy50dGxRdHkgKjEpICsoaXRtLnF0eSAqMSk7XHJcbiAgICAgIHRoaXMudHRsQW10ID0gKHRoaXMudHRsQW10ICoxKSArIChpdG0ucXR5ICogaXRtLnByaWNlKTsgXHJcbiAgICB9KTtcclxuICB9XHJcbiAgT25BZGRJdGVtKCl7XHJcbiAgICAgIGlmICghdGhpcy52YWxpZGF0ZUl0ZW0oKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIFxyXG4gICAgICBsZXQgc29pdGVtOlNPSXRlbTtcclxuICAgICAgaWYgKHRoaXMuaXNFZGl0TW9kZSl7XHJcbiAgICAgICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSAtICh0aGlzLmVkaXRlZEl0ZW0ucXR5ICoxKTtcclxuICAgICAgICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpIC0gKHRoaXMuZWRpdGVkSXRlbS5xdHkgKiB0aGlzLmVkaXRlZEl0ZW0ucHJpY2UpOyAgXHJcbiAgICAgICAgIHRoaXMuc2V0RWRpdEl0ZW0oKTtcclxuICAgICAgICAgc29pdGVtID0gdGhpcy5lZGl0ZWRJdGVtO1xyXG4gICAgICB9ZWxzZSB7XHJcbiAgICAgICAgIHNvaXRlbSA9IHRoaXMuZ2V0TmV3SXRlbSgpO1xyXG4gICAgICAgICB0aGlzLml0ZW1zLnB1c2goc29pdGVtKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy50dGxRdHkgPSAodGhpcy50dGxRdHkgKjEpICsoc29pdGVtLnF0eSAqMSk7XHJcbiAgICAgIHRoaXMudHRsQW10ID0gKHRoaXMudHRsQW10ICoxKSArIChzb2l0ZW0ucXR5ICogc29pdGVtLnByaWNlKTsgICAgXHJcbiAgICAgIHRoaXMucmVzZXRJdGVtRW50cnkoKTtcclxuICB9XHJcblxyXG4gIFxyXG4gIG9uRWRpdEl0ZW0oaXRlbTpTT0l0ZW0pe1xyXG4gICAgdGhpcy5mZF9pY29kZT1pdGVtLmljb2RlO1xyXG4gICAgdGhpcy5mZF9wcmljZSA9IGl0ZW0ucHJpY2U7XHJcbiAgICB0aGlzLmZkX3F0eSA9IGl0ZW0ucXR5O1xyXG4gICAgdGhpcy5mZF9kZWxkYXRlID0gaXRlbS5kZWxkYXRlO1xyXG4gICAgdGhpcy5mZF9yZW1hcmsgPSBpdGVtLnJlbWFyaztcclxuICAgIHRoaXMuaXNFZGl0TW9kZT10cnVlO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtID0gaXRlbTtcclxuICB9XHJcblxyXG4gIG9uUmVtb3ZlSXRlbShpdGVtOlNPSXRlbSl7XHJcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoeD0+eC5saW5lICE9PSBpdGVtLmxpbmUpO1xyXG4gICAgdGhpcy50dGxRdHkgPSAodGhpcy50dGxRdHkgKjEpIC0gKGl0ZW0ucXR5ICoxKTtcclxuICAgIHRoaXMudHRsQW10ID0gKHRoaXMudHRsQW10ICoxKSAtIChpdGVtLnF0eSAqIGl0ZW0ucHJpY2UpOyAgXHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZUl0ZW0oKTpib29sZWFue1xyXG4gICAgICBpZiAoIXRoaXMuZmRfaWNvZGUgfHwgdGhpcy5mZF9pY29kZT09XCJcIil7XHJcbiAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJJdGVtIGNvZGUgaXMgYmxhbmsuLi5cIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmZkX3F0eT09MCl7XHJcbiAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJJbnZhbGlkIGl0ZW0gcXR5Li4uLlwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBcclxuICByZXNldEl0ZW1FbnRyeSgpe1xyXG4gICAgdGhpcy5mZF9pY29kZT1cIlwiO1xyXG4gICAgdGhpcy5mZF9wcmljZSA9MC4wMDtcclxuICAgIHRoaXMuZmRfcXR5ID0wO1xyXG4gICAgdGhpcy5mZF9yZW1hcmsgPVwiXCI7XHJcbiAgICAvL3RoaXMuZmRfZGVsZGF0ZSA9IG51bGw7XHJcbiAgICB0aGlzLmlzRWRpdE1vZGU9ZmFsc2U7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW09bnVsbDtcclxuICB9XHJcblxyXG4gIE9uU2F2ZVRhcChlKXtcclxuICAgIHRoaXMuc2F2ZU9yZGVyKCk7XHJcblxyXG4gICAgLy90aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gIH1cclxuXHJcbiAgT25DYW5jZWxUYXAoZSl7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdCddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gICAgLy90aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gIH1cclxuICBcclxuICAvL3NjYW5uZXJcclxuICBwdWJsaWMgb25TY2FuKCl7XHJcbiAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XHJcbiAgICAgICAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcclxuICAgICAgICAgICAgICBjYW5jZWxMYWJlbDogXCJFWElULiBBbHNvLCB0cnkgdGhlIHZvbHVtZSBidXR0b25zIVwiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnQ2xvc2UnXHJcbiAgICAgICAgICAgICAgY2FuY2VsTGFiZWxCYWNrZ3JvdW5kQ29sb3I6IFwiIzMzMzMzM1wiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnIzAwMDAwMCcgKGJsYWNrKVxyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVXNlIHRoZSB2b2x1bWUgYnV0dG9ucyBmb3IgZXh0cmEgbGlnaHRcIiwgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IGlzICdQbGFjZSBhIGJhcmNvZGUgaW5zaWRlIHRoZSB2aWV3ZmluZGVyIHJlY3RhbmdsZSB0byBzY2FuIGl0LidcclxuICAgICAgICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSwgICAvLyBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSwgICAgICAgIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgICAgICBiZWVwT25TY2FuOiB0cnVlLCAgICAgICAgICAgICAvLyBQbGF5IG9yIFN1cHByZXNzIGJlZXAgb24gc2NhbiAoZGVmYXVsdCB0cnVlKVxyXG4gICAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLCAgICAgICAgICAgICAgIC8vIGxhdW5jaCB3aXRoIHRoZSBmbGFzaGxpZ2h0IG9uIChkZWZhdWx0IGZhbHNlKVxyXG4gICAgICAgICAgICAgIGNsb3NlQ2FsbGJhY2s6ICgpID0+IHsgY29uc29sZS5sb2coXCJTY2FubmVyIGNsb3NlZFwiKX0sIC8vIGludm9rZWQgd2hlbiB0aGUgc2Nhbm5lciB3YXMgY2xvc2VkIChzdWNjZXNzIG9yIGFib3J0KVxyXG4gICAgICAgICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLCAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCAxNTAwIChtcyksIHNldCB0byAwIHRvIGRpc2FibGUgZWNob2luZyB0aGUgc2Nhbm5lZCB0ZXh0XHJcbiAgICAgICAgICAgIC8vIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbiwgICAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCB1bmRlZmluZWQgKHNlbnNvci1kcml2ZW4gb3JpZW50YXRpb24pLCBvdGhlciBvcHRpb25zOiBwb3J0cmFpdHxsYW5kc2NhcGVcclxuICAgICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlIC8vIE9uIGlPUyB5b3UgY2FuIHNlbmQgdGhlIHVzZXIgdG8gdGhlIHNldHRpbmdzIGFwcCBpZiBhY2Nlc3Mgd2FzIHByZXZpb3VzbHkgZGVuaWVkXHJcbiAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIFByb21pc2UgaXMgbmV2ZXIgaW52b2tlZCB3aGVuIGEgJ2NvbnRpbnVvdXNTY2FuQ2FsbGJhY2snIGZ1bmN0aW9uIGlzIHByb3ZpZGVkXHJcbiAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7ICAgICAgICBcclxuICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2Nhbi4gXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuICBcclxuICBzYXZlT3JkZXIoKXtcclxuICAgICBpZiAodGhpcy5lZGl0bW9kZT09XCJOZXdcIil7XHJcbiAgICAgICAgdGhpcy5vcmRlci5zb25vPVwiQVVUT1wiO1xyXG4gICAgICAgIHRoaXMub3JkZXIuc3RhdHVzPVwibmV3XCI7XHJcbiAgICAgICAgdGhpcy5vcmRlci5jdXN0cmVsPTE7XHJcbiAgICAgICAgdGhpcy5vcmRlci5pdGVtcz0gWy4uLnRoaXMuaXRlbXNdO1xyXG4gICAgIH1cclxuXHJcbiAgICAgdGhpcy5vcmRlci5ncm9zc2FtdD0gdGhpcy50dGxBbXQ7XHJcbiAgICAgdGhpcy5vcmRlci5hbW91bnQ9IHRoaXMudHRsQW10O1xyXG4gICAgIHRoaXMub3JkZXIudGF4ZXMgPTAuMDA7XHJcbiAgICAgY29uc29sZS5sb2codGhpcy5vcmRlcik7XHJcbiAgICAgdGhpcy5zZXJ2LnBvc3RTYWxlT3JkZXIodGhpcy5vcmRlcikuc3Vic2NyaWJlKHJlc3A9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcclxuICAgICAgICBpZihyZXNwLm9rPT0neWVzJyl7XHJcbiAgICAgICAgICB0aGlzLmFsZXJ0TXNnKHJlc3AuIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgfSk7ICAgICBcclxuICB9XHJcblxyXG4gIGFsZXJ0TXNnKG1zZykge1xyXG4gICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICB0aXRsZTogXCJNZXNzYWdlXCIsXHJcbiAgICAgICAgbWVzc2FnZTogbXNnLFxyXG4gICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgIH07XHJcblxyXG4gICAgYWxlcnQob3B0aW9ucykudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXNsaXN0J10se2NsZWFySGlzdG9yeTp0cnVlfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19