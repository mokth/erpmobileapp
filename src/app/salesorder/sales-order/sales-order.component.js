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
var application = require("tns-core-modules/application");
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
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = true;
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZXMtb3JkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZEO0FBRzdELDJFQUF5RTtBQUN6RSwrREFBaUQ7QUFDakQsc0RBQXFEO0FBQ3JELDBDQUFpRDtBQUNqRCwyRUFBMkQ7QUFDM0QsK0RBQWlFO0FBQ2pFLHVEQUFvRDtBQUdwRCw2RUFBMkU7QUFDM0UsZ0RBQThEO0FBQzlELDBDQUFtRjtBQUNuRiwwQ0FBNkM7QUFDN0MsMERBQTREO0FBUTVEO0lBb0NHLDZCQUNxQixRQUFvQixFQUNwQixjQUE4QixFQUM5QixJQUFlLEVBQ2YsaUJBQW9DLEVBQ3BDLGNBQThCO1FBSjlCLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQW5DcEQsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLGFBQVEsR0FBUSxJQUFJLENBQUM7UUFFckIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQWlCcEIsb0JBQWUsR0FBUyxJQUFJLENBQUM7UUFHN0IsYUFBUSxHQUFRLEtBQUssQ0FBQztRQWFsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFFLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUks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QUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7U0FDL0IsQ0FBQzt5Q0FzQytCLHNCQUFXO1lBQ0osdUJBQWM7WUFDekIscUJBQVU7WUFDSSxzQ0FBaUI7WUFDcEIsNENBQWM7T0F6Q3pDLG1CQUFtQixDQTBWL0I7SUFBRCwwQkFBQztDQUFBLEFBMVZELElBMFZDO0FBMVZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNuYWNrYmFyXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtCYXJjb2RlU2Nhbm5lcn0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcclxuaW1wb3J0ICogYXMgTW9kYWxQaWNrZXIgZnJvbSAnbmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyJztcclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XHJcblxyXG5pbXBvcnQgeyBpdGVtQ29kZSB9IGZyb20gJy4vaXRlbS1jb2RlJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlLCBBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFNhbGVzT2RlciwgU09JdGVtLCBDdXN0UHJvZmlsZUxpZ2h0LCBJdGVtTWFzdGVyIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbCc7XHJcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJy4uLy4uL2NvcmUvZW51bXMnO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtc2FsZXMtb3JkZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zYWxlcy1vcmRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2FsZXMtb3JkZXIuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQudG9TdHJpbmcoKSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNhbGVzT3JkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsT25EZXN0cm95IHtcclxuICBjdXN0b21lcjpDdXN0UHJvZmlsZUxpZ2h0O1xyXG4gIGl0ZW1NYXN0ZXI6SXRlbU1hc3RlcjtcclxuICBvcmRlcjpTYWxlc09kZXI7XHJcbiAgc29pdGVtOlNPSXRlbTtcclxuICBzb2RhdGU6YW55O1xyXG4gIGZkX2ljb2RlOnN0cmluZz1cIlwiO1xyXG4gIGZkX3F0eTpudW1iZXI9MDtcclxuICBmZF9wcmljZTpudW1iZXI9MC4wMDtcclxuICBmZF9kZWxkYXRlOkRhdGU7XHJcbiAgZmRfcmVtYXJrOnN0cmluZz1cIlwiO1xyXG5cclxuICBpdGVtczpTT0l0ZW1bXTtcclxuXHJcbiAgaWNvblNwaW46c3RyaW5nO1xyXG4gIGljb25BZGQ6c3RyaW5nO1xyXG4gIGljb25SZW1vdmU6c3RyaW5nO1xyXG4gIGljb25DYWxlbmRlcjpzdHJpbmc7XHJcbiAgaWNvbkVkaXQ6c3RyaW5nO1xyXG4gIGljb25RUjpzdHJpbmc7XHJcblxyXG4gIHNlbGVjdGVkQ3VzdCQ6QmVoYXZpb3JTdWJqZWN0PGFueT47XHJcbiAgY3VzdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICB0dGxRdHk6bnVtYmVyO1xyXG4gIHR0bEFtdDpudW1iZXI7XHJcblxyXG4gIGlzQ29udHJvbEVuYWJsZTpib29sZWFuPXRydWU7XHJcbiAgaXNFZGl0TW9kZTpib29sZWFuO1xyXG4gIGVkaXRlZEl0ZW06U09JdGVtO1xyXG4gIGVkaXRtb2RlOnN0cmluZz1cIk5ld1wiO1xyXG4gIF9zb25vOnN0cmluZztcclxuICBfc29yZWw6c3RyaW5nO1xyXG5cclxuICBwcml2YXRlIF9kYXRhSXRlbXM6IE9ic2VydmFibGVBcnJheTxpdGVtQ29kZT47XHJcblxyXG4gICBjb25zdHJ1Y3RvciggXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHV0aWxzZXJ2OlV0aWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNlcnY6QVBJU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIgICBcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICB0aGlzLm9yZGVyID0gbmV3IFNhbGVzT2RlcigpO1xyXG4gICAgICB0aGlzLm9yZGVyLnNvbm89J0FVVE8nO1xyXG4gICAgICB0aGlzLm9yZGVyLnNvZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHRoaXMub3JkZXIuaXRlbXMgPVtdOyAgXHJcbiAgICAgIHRoaXMuc29pdGVtID0gbmV3IFNPSXRlbSgpOyAgICBcclxuICAgICAgdGhpcy5pdGVtcz1bXTsgICAgICAgICAgICBcclxuICAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudHRsQW10PTA7XHJcbiAgICB0aGlzLnR0bFF0eT0wO1xyXG4gICAgdGhpcy5zZXRJQ29uQ29kZSgpOyAgXHJcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgIGNvbnN0IHNvbm8gPSBwYXJhbXNbJ3Nvbm8nXTtcclxuICAgICAgICAgIGlmIChzb25vKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXJhbSAnK3Nvbm8pO1xyXG4gICAgICAgICAgICBpZiAoc29ubyE9J25ldycpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleXM9IChzb25vK1wiXCIpLnNwbGl0KCdAJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGg9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nvbm89a2V5c1swXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3JlbD1rZXlzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdG1vZGU9XCJFZGl0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NvbnRyb2xFbmFibGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkU2FsZXNPcmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgIHRoaXMuc2VsZWN0ZWRDdXN0JD10aGlzLnV0aWxzZXJ2LmdldEJlaGF2aW9yU3ViamVjdCgpO1xyXG4gICAgdGhpcy5jdXN0U3Vic2NyaXB0aW9uPSB0aGlzLnNlbGVjdGVkQ3VzdCQuc3Vic2NyaWJlKHJlc3A9PntcclxuICAgICAgICBpZiAocmVzcC50eXBlPT1EYXRhVGFibGUuY3VzdG9tZXIpe1xyXG4gICAgICAgICAgICB0aGlzLm9yZGVyLmN1c3RuYW1lPSByZXNwLmRhdGEuY3VzdE5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXIuY3VzdGNvZGUgPSByZXNwLmRhdGEuY3VzdENvZGU7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXI9IHJlc3AuZGF0YTtcclxuICAgICAgICB9ZWxzZSBpZiAocmVzcC50eXBlPT1EYXRhVGFibGUubWFzdGVyaXRlbSl7XHJcbiAgICAgICAgICAgIC8vdGhpcy5pdGVtY29kZT0gcmVzcC5kYXRhLmlDb2RlO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1NYXN0ZXI9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5zZXRJdGVtRGV0YWlsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcclxuICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIG9uSXRlbUxvYWRpbmcoYXJnczogTGlzdFZpZXdFdmVudERhdGEpe1xyXG4gICAgaWYgKGFyZ3MuaW5kZXggJSAyID09PSAwKSB7XHJcbiAgICAgICBhcmdzLnZpZXcuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiI0Y0RjZGNlwiKTsgICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvYWRTYWxlc09yZGVyKCl7XHJcbiAgICB0aGlzLnNlcnYuZ2V0U2FsZXNPcmRlckJ5S2V5KHRoaXMuX3Nvbm8rJ0AnK3RoaXMuX3NvcmVsKVxyXG4gICAgICAgIC5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICAgICAgaWYgKHJlc3Ape1xyXG4gICAgICAgICAgICAgdGhpcy5vcmRlciA9IHJlc3A7XHJcbiAgICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5vcmRlci5pdGVtcztcclxuICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWwoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldElDb25Db2RlKCl7XHJcbiAgICB0aGlzLmljb25TcGluID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxNTApO1xyXG4gICAgdGhpcy5pY29uQWRkID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwNTUpO1xyXG4gICAgdGhpcy5pY29uUmVtb3ZlID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwNTcpO1xyXG4gICAgdGhpcy5pY29uQ2FsZW5kZXI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMTMzKTtcclxuICAgIHRoaXMuaWNvbkVkaXQ9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMTRiKTtcclxuICAgIHRoaXMuaWNvblFSPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjAyOSk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHNldEl0ZW1EZXRhaWwoKXtcclxuICAgIHRoaXMuZmRfaWNvZGU9IHRoaXMuaXRlbU1hc3Rlci5pQ29kZTtcclxuICAgIHRoaXMuZmRfcHJpY2U9IHRoaXMuaXRlbU1hc3Rlci5zZWxsaW5nUHJpY2U7ICAgIFxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmN1c3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRhSXRlbXMoKTogT2JzZXJ2YWJsZUFycmF5PGl0ZW1Db2RlPiB7XHJcbiAgICB0aGlzLl9kYXRhSXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuaXRlbXMpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFJdGVtcztcclxuIH1cclxuICAgXHJcbiAgcGlja0RhdGUob3B0aW9uOm51bWJlcikge1xyXG4gICAgY29uc3QgcGlja2VyID0gbmV3IE1vZGFsUGlja2VyLk1vZGFsRGF0ZXRpbWVwaWNrZXIoKTtcclxuICAgIHBpY2tlci5waWNrRGF0ZSh7XHJcbiAgICAgIHRoZW1lOiAnZGFyaycsXHJcbiAgICAgIC8vbWF4RGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgaXMyNEhvdXJWaWV3OiBmYWxzZVxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChvcHRpb249PTEpe1xyXG4gICAgICAgICAgdGhpcy5vcmRlci5zb2RhdGUgPSB0aGlzLmdldERhdGVSZXN1bHQocmVzdWx0KTtcclxuICAgICAgfWVsc2UgaWYgKG9wdGlvbj09Mil7XHJcbiAgICAgICAgdGhpcy5mZF9kZWxkYXRlID0gdGhpcy5nZXREYXRlUmVzdWx0KHJlc3VsdCk7XHJcbiAgICAgfVxyXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIGVycm9yKTtcclxuICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlUmVzdWx0KHJlc3VsdDphbnkpe1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHJlc3VsdFsneWVhciddLHJlc3VsdFsnbW9udGgnXS0xLHJlc3VsdFsnZGF5J10pOyAgICBcclxuICB9XHJcblxyXG4gIE9uQ3VzdG9tZXJUYXAoKXtcclxuICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdC9sb29rY3VzdCddKTtcclxuICB9XHJcblxyXG4gIG9uSXRlbVRhcCgpe1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3QvbG9va2l0ZW0nXSk7XHJcbiAgfVxyXG5cclxuICBvblNjYW5uZXJUYXAoKXtcclxuICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuaGFzQ2FtZXJhUGVybWlzc2lvbigpLnRoZW4ocmVzcD0+e1xyXG4gICAgICAgICAgaWYgKHJlc3Ape1xyXG4gICAgICAgICAgICAgIHRoaXMub25TY2FuKCkgO1xyXG4gICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlJlcXVpcmUgQ2FtZXJhIFBlcm1pc3Npb24uLi4uXCIpO1xyXG4gICAgICAgICAgfSAgXHJcbiAgICAgICAgfSwoZXJyb3IpPT57XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7IFxyXG4gICAgICAgIH1cclxuICAgICAgKTsgICAgICAgICAgXHJcbiAgfVxyXG5cclxuICBnZXRJdGVtTGluZU5vKCk6bnVtYmVye1xyXG4gICAgbGV0IGxpbmVubzpudW1iZXI9MTtcclxuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aD4wKXsgIFxyXG4gICAgICAgbGV0IG1heExpbmUgPSB0aGlzLml0ZW1zLnJlZHVjZSgoeCx5KT0+KHgubGluZSA+IHkubGluZSk/eDp5KTtcclxuICAgICAgIGxpbmVubyA9IChtYXhMaW5lLmxpbmUgKjEpICsgMTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaW5lbm87XHJcbiAgfVxyXG5cclxuICBnZXROZXdJdGVtKCk6U09JdGVte1xyXG4gICAgICBsZXQgc29pdGVtID0gbmV3IFNPSXRlbSgpO1xyXG4gICAgICBsZXQgbGluZW5vID0gdGhpcy5nZXRJdGVtTGluZU5vKCk7XHJcbiAgICAgIHNvaXRlbS5saW5lID0gbGluZW5vO1xyXG4gICAgICBzb2l0ZW0uaWRlYyA9IHRoaXMuaXRlbU1hc3Rlci5pRGVzYztcclxuICAgICAgc29pdGVtLmljb2RlPSB0aGlzLmZkX2ljb2RlO1xyXG4gICAgICBzb2l0ZW0ucHJpY2UgPSB0aGlzLmZkX3ByaWNlO1xyXG4gICAgICBzb2l0ZW0uZGVsZGF0ZSA9IHRoaXMuZmRfZGVsZGF0ZTtcclxuICAgICAgc29pdGVtLnJlbWFyayA9IHRoaXMuZmRfcmVtYXJrO1xyXG4gICAgICBzb2l0ZW0uaWRlYyA9IHNvaXRlbS5saW5lK1wiIFwiKyB0aGlzLml0ZW1NYXN0ZXIuaURlc2M7XHJcbiAgICAgIHNvaXRlbS51b20gPSB0aGlzLml0ZW1NYXN0ZXIuc2VsbGluZ1VPTTtcclxuICAgICAgc29pdGVtLnBhY2tzaXplID0gdGhpcy5pdGVtTWFzdGVyLnN0ZFBhY2tTaXplO1xyXG4gICAgICBzb2l0ZW0ucXR5ID0gdGhpcy5mZF9xdHk7XHJcbiAgICAgIHNvaXRlbS5hbW91bnQgPSAgc29pdGVtLnF0eSAqIHNvaXRlbS5wcmljZTtcclxuICAgcmV0dXJuIHNvaXRlbTtcclxuICB9XHJcbiAgXHJcbiAgc2V0RWRpdEl0ZW0oKXtcclxuICAgIHRoaXMuZWRpdGVkSXRlbS5kZWxkYXRlID0gdGhpcy5mZF9kZWxkYXRlO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLnJlbWFyayA9IHRoaXMuZmRfcmVtYXJrO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLnByaWNlID0gIHRoaXMuZmRfcHJpY2U7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0ucXR5ID0gdGhpcy5mZF9xdHk7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0uYW1vdW50ID0gIHRoaXMuZWRpdGVkSXRlbS5xdHkgKiB0aGlzLmVkaXRlZEl0ZW0ucHJpY2U7XHJcbiAgfVxyXG4gXHJcbiAgY2FsY3VsYXRlVG90YWwoKXtcclxuICAgIHRoaXMudHRsUXR5ID0gMDtcclxuICAgIHRoaXMudHRsQW10ID0wO1xyXG4gICAgdGhpcy5pdGVtcy5tYXAoaXRtPT57XHJcbiAgICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSArKGl0bS5xdHkgKjEpO1xyXG4gICAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgKyAoaXRtLnF0eSAqIGl0bS5wcmljZSk7IFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIE9uQWRkSXRlbSgpe1xyXG4gICAgICBpZiAoIXRoaXMudmFsaWRhdGVJdGVtKCkpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBcclxuICAgICAgbGV0IHNvaXRlbTpTT0l0ZW07XHJcbiAgICAgIGlmICh0aGlzLmlzRWRpdE1vZGUpe1xyXG4gICAgICAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgLSAodGhpcy5lZGl0ZWRJdGVtLnF0eSAqMSk7XHJcbiAgICAgICAgIHRoaXMudHRsQW10ID0gKHRoaXMudHRsQW10ICoxKSAtICh0aGlzLmVkaXRlZEl0ZW0ucXR5ICogdGhpcy5lZGl0ZWRJdGVtLnByaWNlKTsgIFxyXG4gICAgICAgICB0aGlzLnNldEVkaXRJdGVtKCk7XHJcbiAgICAgICAgIHNvaXRlbSA9IHRoaXMuZWRpdGVkSXRlbTtcclxuICAgICAgfWVsc2Uge1xyXG4gICAgICAgICBzb2l0ZW0gPSB0aGlzLmdldE5ld0l0ZW0oKTtcclxuICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHNvaXRlbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSArKHNvaXRlbS5xdHkgKjEpO1xyXG4gICAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgKyAoc29pdGVtLnF0eSAqIHNvaXRlbS5wcmljZSk7ICAgIFxyXG4gICAgICB0aGlzLnJlc2V0SXRlbUVudHJ5KCk7XHJcbiAgfVxyXG5cclxuICBcclxuICBvbkVkaXRJdGVtKGl0ZW06U09JdGVtKXtcclxuICAgIHRoaXMuZmRfaWNvZGU9aXRlbS5pY29kZTtcclxuICAgIHRoaXMuZmRfcHJpY2UgPSBpdGVtLnByaWNlO1xyXG4gICAgdGhpcy5mZF9xdHkgPSBpdGVtLnF0eTtcclxuICAgIHRoaXMuZmRfZGVsZGF0ZSA9IGl0ZW0uZGVsZGF0ZTtcclxuICAgIHRoaXMuZmRfcmVtYXJrID0gaXRlbS5yZW1hcms7XHJcbiAgICB0aGlzLmlzRWRpdE1vZGU9dHJ1ZTtcclxuICAgIHRoaXMuZWRpdGVkSXRlbSA9IGl0ZW07XHJcbiAgfVxyXG5cclxuICBvblJlbW92ZUl0ZW0oaXRlbTpTT0l0ZW0pe1xyXG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKHg9PngubGluZSAhPT0gaXRlbS5saW5lKTtcclxuICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSAtIChpdGVtLnF0eSAqMSk7XHJcbiAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgLSAoaXRlbS5xdHkgKiBpdGVtLnByaWNlKTsgIFxyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGVJdGVtKCk6Ym9vbGVhbntcclxuICAgICAgaWYgKCF0aGlzLmZkX2ljb2RlIHx8IHRoaXMuZmRfaWNvZGU9PVwiXCIpe1xyXG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSXRlbSBjb2RlIGlzIGJsYW5rLi4uXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5mZF9xdHk9PTApe1xyXG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW52YWxpZCBpdGVtIHF0eS4uLi5cIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgXHJcbiAgcmVzZXRJdGVtRW50cnkoKXtcclxuICAgIHRoaXMuZmRfaWNvZGU9XCJcIjtcclxuICAgIHRoaXMuZmRfcHJpY2UgPTAuMDA7XHJcbiAgICB0aGlzLmZkX3F0eSA9MDtcclxuICAgIHRoaXMuZmRfcmVtYXJrID1cIlwiO1xyXG4gICAgLy90aGlzLmZkX2RlbGRhdGUgPSBudWxsO1xyXG4gICAgdGhpcy5pc0VkaXRNb2RlPWZhbHNlO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtPW51bGw7XHJcbiAgfVxyXG5cclxuICBPblNhdmVUYXAoZSl7XHJcbiAgICB0aGlzLnNhdmVPcmRlcigpO1xyXG5cclxuICAgIC8vdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICB9XHJcblxyXG4gIE9uQ2FuY2VsVGFwKGUpe1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3QnXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcclxuICAgIC8vdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICB9XHJcbiAgXHJcbiAgLy9zY2FubmVyXHJcbiAgcHVibGljIG9uU2Nhbigpe1xyXG4gICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xyXG4gICAgICAgICAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXHJcbiAgICAgICAgICAgICAgY2FuY2VsTGFiZWw6IFwiRVhJVC4gQWxzbywgdHJ5IHRoZSB2b2x1bWUgYnV0dG9ucyFcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJ0Nsb3NlJ1xyXG4gICAgICAgICAgICAgIGNhbmNlbExhYmVsQmFja2dyb3VuZENvbG9yOiBcIiMzMzMzMzNcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJyMwMDAwMDAnIChibGFjaylcclxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIlVzZSB0aGUgdm9sdW1lIGJ1dHRvbnMgZm9yIGV4dHJhIGxpZ2h0XCIsIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCBpcyAnUGxhY2UgYSBiYXJjb2RlIGluc2lkZSB0aGUgdmlld2ZpbmRlciByZWN0YW5nbGUgdG8gc2NhbiBpdC4nXHJcbiAgICAgICAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsICAgLy8gZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSwgICAgIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsICAgICAgICAvLyBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSwgICAgICAgICAgICAgLy8gUGxheSBvciBTdXBwcmVzcyBiZWVwIG9uIHNjYW4gKGRlZmF1bHQgdHJ1ZSlcclxuICAgICAgICAgICAgICB0b3JjaE9uOiBmYWxzZSwgICAgICAgICAgICAgICAvLyBsYXVuY2ggd2l0aCB0aGUgZmxhc2hsaWdodCBvbiAoZGVmYXVsdCBmYWxzZSlcclxuICAgICAgICAgICAgICBjbG9zZUNhbGxiYWNrOiAoKSA9PiB7IGNvbnNvbGUubG9nKFwiU2Nhbm5lciBjbG9zZWRcIil9LCAvLyBpbnZva2VkIHdoZW4gdGhlIHNjYW5uZXIgd2FzIGNsb3NlZCAoc3VjY2VzcyBvciBhYm9ydClcclxuICAgICAgICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCwgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgMTUwMCAobXMpLCBzZXQgdG8gMCB0byBkaXNhYmxlIGVjaG9pbmcgdGhlIHNjYW5uZWQgdGV4dFxyXG4gICAgICAgICAgICAvLyBvcmllbnRhdGlvbjogb3JpZW50YXRpb24sICAgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgdW5kZWZpbmVkIChzZW5zb3ItZHJpdmVuIG9yaWVudGF0aW9uKSwgb3RoZXIgb3B0aW9uczogcG9ydHJhaXR8bGFuZHNjYXBlXHJcbiAgICAgICAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZSAvLyBPbiBpT1MgeW91IGNhbiBzZW5kIHRoZSB1c2VyIHRvIHRoZSBzZXR0aW5ncyBhcHAgaWYgYWNjZXNzIHdhcyBwcmV2aW91c2x5IGRlbmllZFxyXG4gICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyBQcm9taXNlIGlzIG5ldmVyIGludm9rZWQgd2hlbiBhICdjb250aW51b3VzU2NhbkNhbGxiYWNrJyBmdW5jdGlvbiBpcyBwcm92aWRlZFxyXG4gICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpOyAgICAgICAgXHJcbiAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNjYW4uIFwiICsgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbiAgXHJcbiAgc2F2ZU9yZGVyKCl7XHJcbiAgICAgaWYgKHRoaXMuZWRpdG1vZGU9PVwiTmV3XCIpe1xyXG4gICAgICAgIHRoaXMub3JkZXIuc29ubz1cIkFVVE9cIjtcclxuICAgICAgICB0aGlzLm9yZGVyLnN0YXR1cz1cIm5ld1wiO1xyXG4gICAgICAgIHRoaXMub3JkZXIuY3VzdHJlbD0xO1xyXG4gICAgICAgIHRoaXMub3JkZXIuaXRlbXM9IFsuLi50aGlzLml0ZW1zXTtcclxuICAgICB9XHJcblxyXG4gICAgIHRoaXMub3JkZXIuZ3Jvc3NhbXQ9IHRoaXMudHRsQW10O1xyXG4gICAgIHRoaXMub3JkZXIuYW1vdW50PSB0aGlzLnR0bEFtdDtcclxuICAgICB0aGlzLm9yZGVyLnRheGVzID0wLjAwO1xyXG4gICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXIpO1xyXG4gICAgIHRoaXMuc2Vydi5wb3N0U2FsZU9yZGVyKHRoaXMub3JkZXIpLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XHJcbiAgICAgICAgaWYocmVzcC5vaz09J3llcycpe1xyXG4gICAgICAgICAgdGhpcy5hbGVydE1zZyhyZXNwLiBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgIH0pOyAgICAgXHJcbiAgfVxyXG5cclxuICBhbGVydE1zZyhtc2cpIHtcclxuICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgdGl0bGU6IFwiTWVzc2FnZVwiLFxyXG4gICAgICAgIG1lc3NhZ2U6IG1zZyxcclxuICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICB9O1xyXG5cclxuICAgIGFsZXJ0KG9wdGlvbnMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdCddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==