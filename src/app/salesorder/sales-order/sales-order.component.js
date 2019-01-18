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
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var ModalPicker = require("nativescript-modal-datetimepicker");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var navigation_service_1 = require("~/app/core/services/navigation.service");
var services_1 = require("~/app/core/services");
var model_1 = require("~/app/core/model");
var router_1 = require("@angular/router");
var enums_1 = require("~/app/core/enums");
var SalesOrderComponent = /** @class */ (function () {
    function SalesOrderComponent(navigationService, utilserv, activatedRoute, serv, barcodeScanner) {
        this.navigationService = navigationService;
        this.utilserv = utilserv;
        this.activatedRoute = activatedRoute;
        this.serv = serv;
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
                var keys = (sono + "").split('@');
                if (keys.length == 2) {
                    _this._sono = keys[0];
                    _this._sorel = keys[1];
                    _this.editmode = "Edit";
                    _this.isControlEnable = false;
                    _this.loadSalesOrder();
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
        this.navigationService.navigate(['/lookcust']);
    };
    SalesOrderComponent.prototype.onItemTap = function () {
        this.navigationService.navigate(['/lookitem']);
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
        this.fd_deldate = null;
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
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [navigation_service_1.NavigationService,
            services_1.UtilService,
            router_1.ActivatedRoute,
            services_1.APIService,
            nativescript_barcodescanner_1.BarcodeScanner])
    ], SalesOrderComponent);
    return SalesOrderComponent;
}());
exports.SalesOrderComponent = SalesOrderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZXMtb3JkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZEO0FBRzdELDJFQUF5RTtBQUN6RSwrREFBaUQ7QUFDakQsc0RBQXFEO0FBQ3JELDJFQUEyRDtBQUMzRCwrREFBaUU7QUFDakUsdURBQW9EO0FBR3BELDZFQUEyRTtBQUMzRSxnREFBOEQ7QUFDOUQsMENBQW1GO0FBQ25GLDBDQUFpRDtBQUNqRCwwQ0FBNkM7QUFRN0M7SUFvQ0csNkJBQXFCLGlCQUFvQyxFQUNwQyxRQUFvQixFQUNwQixjQUE4QixFQUM5QixJQUFlLEVBQ2YsY0FBOEI7UUFKOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixTQUFJLEdBQUosSUFBSSxDQUFXO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbENwRCxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsYUFBUSxHQUFRLElBQUksQ0FBQztRQUVyQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBaUJwQixvQkFBZSxHQUFTLElBQUksQ0FBQztRQUc3QixhQUFRLEdBQVEsS0FBSyxDQUFDO1FBV2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxpQkFBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUMsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUUsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFNLEVBQUUsQ0FB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ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNuYWNrYmFyXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvcic7XHJcbmltcG9ydCB7QmFyY29kZVNjYW5uZXJ9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcbmltcG9ydCAqIGFzIE1vZGFsUGlja2VyIGZyb20gJ25hdGl2ZXNjcmlwdC1tb2RhbC1kYXRldGltZXBpY2tlcic7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5cclxuaW1wb3J0IHsgaXRlbUNvZGUgfSBmcm9tICcuL2l0ZW0tY29kZSc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVdGlsU2VydmljZSwgQVBJU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvc2VydmljZXMnO1xyXG5pbXBvcnQgeyBTYWxlc09kZXIsIFNPSXRlbSwgQ3VzdFByb2ZpbGVMaWdodCwgSXRlbU1hc3RlciB9IGZyb20gJ34vYXBwL2NvcmUvbW9kZWwnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJ34vYXBwL2NvcmUvZW51bXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1zYWxlcy1vcmRlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NhbGVzLW9yZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zYWxlcy1vcmRlci5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNhbGVzT3JkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsT25EZXN0cm95IHtcclxuICBjdXN0b21lcjpDdXN0UHJvZmlsZUxpZ2h0O1xyXG4gIGl0ZW1NYXN0ZXI6SXRlbU1hc3RlcjtcclxuICBvcmRlcjpTYWxlc09kZXI7XHJcbiAgc29pdGVtOlNPSXRlbTtcclxuICBzb2RhdGU6YW55O1xyXG4gIGZkX2ljb2RlOnN0cmluZz1cIlwiO1xyXG4gIGZkX3F0eTpudW1iZXI9MDtcclxuICBmZF9wcmljZTpudW1iZXI9MC4wMDtcclxuICBmZF9kZWxkYXRlOkRhdGU7XHJcbiAgZmRfcmVtYXJrOnN0cmluZz1cIlwiO1xyXG5cclxuICBpdGVtczpTT0l0ZW1bXTtcclxuXHJcbiAgaWNvblNwaW46c3RyaW5nO1xyXG4gIGljb25BZGQ6c3RyaW5nO1xyXG4gIGljb25SZW1vdmU6c3RyaW5nO1xyXG4gIGljb25DYWxlbmRlcjpzdHJpbmc7XHJcbiAgaWNvbkVkaXQ6c3RyaW5nO1xyXG4gIGljb25RUjpzdHJpbmc7XHJcblxyXG4gIHNlbGVjdGVkQ3VzdCQ6QmVoYXZpb3JTdWJqZWN0PGFueT47XHJcbiAgY3VzdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICB0dGxRdHk6bnVtYmVyO1xyXG4gIHR0bEFtdDpudW1iZXI7XHJcblxyXG4gIGlzQ29udHJvbEVuYWJsZTpib29sZWFuPXRydWU7XHJcbiAgaXNFZGl0TW9kZTpib29sZWFuO1xyXG4gIGVkaXRlZEl0ZW06U09JdGVtO1xyXG4gIGVkaXRtb2RlOnN0cmluZz1cIk5ld1wiO1xyXG4gIF9zb25vOnN0cmluZztcclxuICBfc29yZWw6c3RyaW5nO1xyXG5cclxuICBwcml2YXRlIF9kYXRhSXRlbXM6IE9ic2VydmFibGVBcnJheTxpdGVtQ29kZT47XHJcblxyXG4gICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHV0aWxzZXJ2OlV0aWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNlcnY6QVBJU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYmFyY29kZVNjYW5uZXI6IEJhcmNvZGVTY2FubmVyICAgKSB7XHJcbiAgICAgIHRoaXMub3JkZXIgPSBuZXcgU2FsZXNPZGVyKCk7XHJcbiAgICAgIHRoaXMub3JkZXIuc29ubz0nQVVUTyc7XHJcbiAgICAgIHRoaXMub3JkZXIuc29kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgdGhpcy5vcmRlci5pdGVtcyA9W107ICBcclxuICAgICAgdGhpcy5zb2l0ZW0gPSBuZXcgU09JdGVtKCk7ICAgIFxyXG4gICAgICB0aGlzLml0ZW1zPVtdOyAgICAgICAgICAgIFxyXG4gICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50dGxBbXQ9MDtcclxuICAgIHRoaXMudHRsUXR5PTA7XHJcbiAgICB0aGlzLnNldElDb25Db2RlKCk7ICAgIFxyXG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgIGNvbnN0IHNvbm8gPSBwYXJhbXNbJ3Nvbm8nXTtcclxuICAgICAgaWYgKHNvbm8pIHtcclxuICAgICAgICAgY29uc29sZS5sb2coJ3BhcmFtICcrc29ubyk7XHJcbiAgICAgICAgIGxldCBrZXlzPSAoc29ubytcIlwiKS5zcGxpdCgnQCcpO1xyXG4gICAgICAgICBpZiAoa2V5cy5sZW5ndGg9PTIpe1xyXG4gICAgICAgICAgICAgdGhpcy5fc29ubz1rZXlzWzBdO1xyXG4gICAgICAgICAgICAgdGhpcy5fc29yZWw9a2V5c1sxXTtcclxuICAgICAgICAgICAgIHRoaXMuZWRpdG1vZGU9XCJFZGl0XCI7XHJcbiAgICAgICAgICAgICB0aGlzLmlzQ29udHJvbEVuYWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgIHRoaXMubG9hZFNhbGVzT3JkZXIoKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdGhpcy5zZWxlY3RlZEN1c3QkPXRoaXMudXRpbHNlcnYuZ2V0QmVoYXZpb3JTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmN1c3RTdWJzY3JpcHRpb249IHRoaXMuc2VsZWN0ZWRDdXN0JC5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICAgIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5jdXN0b21lcil7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXIuY3VzdG5hbWU9IHJlc3AuZGF0YS5jdXN0TmFtZTtcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5jdXN0Y29kZSA9IHJlc3AuZGF0YS5jdXN0Q29kZTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgIH1lbHNlIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5tYXN0ZXJpdGVtKXtcclxuICAgICAgICAgICAgLy90aGlzLml0ZW1jb2RlPSByZXNwLmRhdGEuaUNvZGU7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU1hc3Rlcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnNldEl0ZW1EZXRhaWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XHJcbiAgICBpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcclxuICAgICAgIGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjRjRGNkY2XCIpOyAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZFNhbGVzT3JkZXIoKXtcclxuICAgIHRoaXMuc2Vydi5nZXRTYWxlc09yZGVyQnlLZXkodGhpcy5fc29ubysnQCcrdGhpcy5fc29yZWwpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgICAgICBpZiAocmVzcCl7XHJcbiAgICAgICAgICAgICB0aGlzLm9yZGVyID0gcmVzcDtcclxuICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLm9yZGVyLml0ZW1zO1xyXG4gICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SUNvbkNvZGUoKXtcclxuICAgIHRoaXMuaWNvblNwaW4gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjE1MCk7XHJcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1NSk7XHJcbiAgICB0aGlzLmljb25SZW1vdmUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1Nyk7XHJcbiAgICB0aGlzLmljb25DYWxlbmRlcj0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxMzMpO1xyXG4gICAgdGhpcy5pY29uRWRpdD0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxNGIpO1xyXG4gICAgdGhpcy5pY29uUVI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDI5KTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc2V0SXRlbURldGFpbCgpe1xyXG4gICAgdGhpcy5mZF9pY29kZT0gdGhpcy5pdGVtTWFzdGVyLmlDb2RlO1xyXG4gICAgdGhpcy5mZF9wcmljZT0gdGhpcy5pdGVtTWFzdGVyLnNlbGxpbmdQcmljZTsgICAgXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY3VzdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGFJdGVtcygpOiBPYnNlcnZhYmxlQXJyYXk8aXRlbUNvZGU+IHtcclxuICAgIHRoaXMuX2RhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5pdGVtcyk7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YUl0ZW1zO1xyXG4gfVxyXG4gICBcclxuICBwaWNrRGF0ZShvcHRpb246bnVtYmVyKSB7XHJcbiAgICBjb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIuTW9kYWxEYXRldGltZXBpY2tlcigpO1xyXG4gICAgcGlja2VyLnBpY2tEYXRlKHtcclxuICAgICAgdGhlbWU6ICdkYXJrJyxcclxuICAgICAgLy9tYXhEYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICBpczI0SG91clZpZXc6IGZhbHNlXHJcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKG9wdGlvbj09MSl7XHJcbiAgICAgICAgICB0aGlzLm9yZGVyLnNvZGF0ZSA9IHRoaXMuZ2V0RGF0ZVJlc3VsdChyZXN1bHQpO1xyXG4gICAgICB9ZWxzZSBpZiAob3B0aW9uPT0yKXtcclxuICAgICAgICB0aGlzLmZkX2RlbGRhdGUgPSB0aGlzLmdldERhdGVSZXN1bHQocmVzdWx0KTtcclxuICAgICB9XHJcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyb3IpO1xyXG4gICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShlcnJvcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldERhdGVSZXN1bHQocmVzdWx0OmFueSl7XHJcbiAgICByZXR1cm4gbmV3IERhdGUocmVzdWx0Wyd5ZWFyJ10scmVzdWx0Wydtb250aCddLTEscmVzdWx0WydkYXknXSk7ICAgIFxyXG4gIH1cclxuXHJcbiAgT25DdXN0b21lclRhcCgpe1xyXG4gICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbG9va2N1c3QnXSk7XHJcbiAgfVxyXG5cclxuICBvbkl0ZW1UYXAoKXtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbG9va2l0ZW0nXSk7XHJcbiAgfVxyXG5cclxuICBvblNjYW5uZXJUYXAoKXtcclxuICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuaGFzQ2FtZXJhUGVybWlzc2lvbigpLnRoZW4ocmVzcD0+e1xyXG4gICAgICAgICAgaWYgKHJlc3Ape1xyXG4gICAgICAgICAgICAgIHRoaXMub25TY2FuKCkgO1xyXG4gICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlJlcXVpcmUgQ2FtZXJhIFBlcm1pc3Npb24uLi4uXCIpO1xyXG4gICAgICAgICAgfSAgXHJcbiAgICAgICAgfSwoZXJyb3IpPT57XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7IFxyXG4gICAgICAgIH1cclxuICAgICAgKTsgICAgICAgICAgXHJcbiAgfVxyXG5cclxuICBcclxuXHJcbiAgZ2V0SXRlbUxpbmVObygpOm51bWJlcntcclxuICAgIGxldCBsaW5lbm86bnVtYmVyPTE7XHJcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGg+MCl7ICBcclxuICAgICAgIGxldCBtYXhMaW5lID0gdGhpcy5pdGVtcy5yZWR1Y2UoKHgseSk9Pih4LmxpbmUgPiB5LmxpbmUpP3g6eSk7XHJcbiAgICAgICBsaW5lbm8gPSAobWF4TGluZS5saW5lICoxKSArIDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluZW5vO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmV3SXRlbSgpOlNPSXRlbXtcclxuICAgICAgbGV0IHNvaXRlbSA9IG5ldyBTT0l0ZW0oKTtcclxuICAgICAgbGV0IGxpbmVubyA9IHRoaXMuZ2V0SXRlbUxpbmVObygpO1xyXG4gICAgICBzb2l0ZW0ubGluZSA9IGxpbmVubztcclxuICAgICAgc29pdGVtLmlkZWMgPSB0aGlzLml0ZW1NYXN0ZXIuaURlc2M7XHJcbiAgICAgIHNvaXRlbS5pY29kZT0gdGhpcy5mZF9pY29kZTtcclxuICAgICAgc29pdGVtLnByaWNlID0gdGhpcy5mZF9wcmljZTtcclxuICAgICAgc29pdGVtLmRlbGRhdGUgPSB0aGlzLmZkX2RlbGRhdGU7XHJcbiAgICAgIHNvaXRlbS5yZW1hcmsgPSB0aGlzLmZkX3JlbWFyaztcclxuICAgICAgc29pdGVtLmlkZWMgPSBzb2l0ZW0ubGluZStcIiBcIisgdGhpcy5pdGVtTWFzdGVyLmlEZXNjO1xyXG4gICAgICBzb2l0ZW0udW9tID0gdGhpcy5pdGVtTWFzdGVyLnNlbGxpbmdVT007XHJcbiAgICAgIHNvaXRlbS5wYWNrc2l6ZSA9IHRoaXMuaXRlbU1hc3Rlci5zdGRQYWNrU2l6ZTtcclxuICAgICAgc29pdGVtLnF0eSA9IHRoaXMuZmRfcXR5O1xyXG4gICAgICBzb2l0ZW0uYW1vdW50ID0gIHNvaXRlbS5xdHkgKiBzb2l0ZW0ucHJpY2U7XHJcbiAgIHJldHVybiBzb2l0ZW07XHJcbiAgfVxyXG4gIFxyXG4gIHNldEVkaXRJdGVtKCl7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0uZGVsZGF0ZSA9IHRoaXMuZmRfZGVsZGF0ZTtcclxuICAgIHRoaXMuZWRpdGVkSXRlbS5yZW1hcmsgPSB0aGlzLmZkX3JlbWFyaztcclxuICAgIHRoaXMuZWRpdGVkSXRlbS5wcmljZSA9ICB0aGlzLmZkX3ByaWNlO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLnF0eSA9IHRoaXMuZmRfcXR5O1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLmFtb3VudCA9ICB0aGlzLmVkaXRlZEl0ZW0ucXR5ICogdGhpcy5lZGl0ZWRJdGVtLnByaWNlO1xyXG4gIH1cclxuIFxyXG4gIGNhbGN1bGF0ZVRvdGFsKCl7XHJcbiAgICB0aGlzLnR0bFF0eSA9IDA7XHJcbiAgICB0aGlzLnR0bEFtdCA9MDtcclxuICAgIHRoaXMuaXRlbXMubWFwKGl0bT0+e1xyXG4gICAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgKyhpdG0ucXR5ICoxKTtcclxuICAgICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpICsgKGl0bS5xdHkgKiBpdG0ucHJpY2UpOyBcclxuICAgIH0pO1xyXG4gIH1cclxuICBPbkFkZEl0ZW0oKXtcclxuICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlSXRlbSgpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgXHJcbiAgICAgIGxldCBzb2l0ZW06U09JdGVtO1xyXG4gICAgICBpZiAodGhpcy5pc0VkaXRNb2RlKXtcclxuICAgICAgICAgdGhpcy50dGxRdHkgPSAodGhpcy50dGxRdHkgKjEpIC0gKHRoaXMuZWRpdGVkSXRlbS5xdHkgKjEpO1xyXG4gICAgICAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgLSAodGhpcy5lZGl0ZWRJdGVtLnF0eSAqIHRoaXMuZWRpdGVkSXRlbS5wcmljZSk7ICBcclxuICAgICAgICAgdGhpcy5zZXRFZGl0SXRlbSgpO1xyXG4gICAgICAgICBzb2l0ZW0gPSB0aGlzLmVkaXRlZEl0ZW07XHJcbiAgICAgIH1lbHNlIHtcclxuICAgICAgICAgc29pdGVtID0gdGhpcy5nZXROZXdJdGVtKCk7XHJcbiAgICAgICAgIHRoaXMuaXRlbXMucHVzaChzb2l0ZW0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgKyhzb2l0ZW0ucXR5ICoxKTtcclxuICAgICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpICsgKHNvaXRlbS5xdHkgKiBzb2l0ZW0ucHJpY2UpOyAgICBcclxuICAgICAgdGhpcy5yZXNldEl0ZW1FbnRyeSgpO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgb25FZGl0SXRlbShpdGVtOlNPSXRlbSl7XHJcbiAgICB0aGlzLmZkX2ljb2RlPWl0ZW0uaWNvZGU7XHJcbiAgICB0aGlzLmZkX3ByaWNlID0gaXRlbS5wcmljZTtcclxuICAgIHRoaXMuZmRfcXR5ID0gaXRlbS5xdHk7XHJcbiAgICB0aGlzLmZkX2RlbGRhdGUgPSBpdGVtLmRlbGRhdGU7XHJcbiAgICB0aGlzLmZkX3JlbWFyayA9IGl0ZW0ucmVtYXJrO1xyXG4gICAgdGhpcy5pc0VkaXRNb2RlPXRydWU7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0gPSBpdGVtO1xyXG4gIH1cclxuXHJcbiAgb25SZW1vdmVJdGVtKGl0ZW06U09JdGVtKXtcclxuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcih4PT54LmxpbmUgIT09IGl0ZW0ubGluZSk7XHJcbiAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgLSAoaXRlbS5xdHkgKjEpO1xyXG4gICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpIC0gKGl0ZW0ucXR5ICogaXRlbS5wcmljZSk7ICBcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlSXRlbSgpOmJvb2xlYW57XHJcbiAgICAgIGlmICghdGhpcy5mZF9pY29kZSB8fCB0aGlzLmZkX2ljb2RlPT1cIlwiKXtcclxuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkl0ZW0gY29kZSBpcyBibGFuay4uLlwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZmRfcXR5PT0wKXtcclxuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkludmFsaWQgaXRlbSBxdHkuLi4uXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIFxyXG4gIHJlc2V0SXRlbUVudHJ5KCl7XHJcbiAgICB0aGlzLmZkX2ljb2RlPVwiXCI7XHJcbiAgICB0aGlzLmZkX3ByaWNlID0wLjAwO1xyXG4gICAgdGhpcy5mZF9xdHkgPTA7XHJcbiAgICB0aGlzLmZkX3JlbWFyayA9XCJcIjtcclxuICAgIHRoaXMuZmRfZGVsZGF0ZSA9IG51bGw7XHJcbiAgICB0aGlzLmlzRWRpdE1vZGU9ZmFsc2U7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW09bnVsbDtcclxuICB9XHJcblxyXG4gIE9uU2F2ZVRhcChlKXtcclxuICAgIHRoaXMuc2F2ZU9yZGVyKCk7XHJcblxyXG4gICAgLy90aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gIH1cclxuXHJcbiAgT25DYW5jZWxUYXAoZSl7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdCddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gICAgLy90aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gIH1cclxuICBcclxuICAvL3NjYW5uZXJcclxuICBwdWJsaWMgb25TY2FuKCl7XHJcbiAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XHJcbiAgICAgICAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcclxuICAgICAgICAgICAgICBjYW5jZWxMYWJlbDogXCJFWElULiBBbHNvLCB0cnkgdGhlIHZvbHVtZSBidXR0b25zIVwiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnQ2xvc2UnXHJcbiAgICAgICAgICAgICAgY2FuY2VsTGFiZWxCYWNrZ3JvdW5kQ29sb3I6IFwiIzMzMzMzM1wiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnIzAwMDAwMCcgKGJsYWNrKVxyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVXNlIHRoZSB2b2x1bWUgYnV0dG9ucyBmb3IgZXh0cmEgbGlnaHRcIiwgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IGlzICdQbGFjZSBhIGJhcmNvZGUgaW5zaWRlIHRoZSB2aWV3ZmluZGVyIHJlY3RhbmdsZSB0byBzY2FuIGl0LidcclxuICAgICAgICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSwgICAvLyBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSwgICAgICAgIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgICAgICBiZWVwT25TY2FuOiB0cnVlLCAgICAgICAgICAgICAvLyBQbGF5IG9yIFN1cHByZXNzIGJlZXAgb24gc2NhbiAoZGVmYXVsdCB0cnVlKVxyXG4gICAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLCAgICAgICAgICAgICAgIC8vIGxhdW5jaCB3aXRoIHRoZSBmbGFzaGxpZ2h0IG9uIChkZWZhdWx0IGZhbHNlKVxyXG4gICAgICAgICAgICAgIGNsb3NlQ2FsbGJhY2s6ICgpID0+IHsgY29uc29sZS5sb2coXCJTY2FubmVyIGNsb3NlZFwiKX0sIC8vIGludm9rZWQgd2hlbiB0aGUgc2Nhbm5lciB3YXMgY2xvc2VkIChzdWNjZXNzIG9yIGFib3J0KVxyXG4gICAgICAgICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLCAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCAxNTAwIChtcyksIHNldCB0byAwIHRvIGRpc2FibGUgZWNob2luZyB0aGUgc2Nhbm5lZCB0ZXh0XHJcbiAgICAgICAgICAgIC8vIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbiwgICAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCB1bmRlZmluZWQgKHNlbnNvci1kcml2ZW4gb3JpZW50YXRpb24pLCBvdGhlciBvcHRpb25zOiBwb3J0cmFpdHxsYW5kc2NhcGVcclxuICAgICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlIC8vIE9uIGlPUyB5b3UgY2FuIHNlbmQgdGhlIHVzZXIgdG8gdGhlIHNldHRpbmdzIGFwcCBpZiBhY2Nlc3Mgd2FzIHByZXZpb3VzbHkgZGVuaWVkXHJcbiAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIFByb21pc2UgaXMgbmV2ZXIgaW52b2tlZCB3aGVuIGEgJ2NvbnRpbnVvdXNTY2FuQ2FsbGJhY2snIGZ1bmN0aW9uIGlzIHByb3ZpZGVkXHJcbiAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7ICAgICAgICBcclxuICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2Nhbi4gXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuICBcclxuICBzYXZlT3JkZXIoKXtcclxuICAgICBpZiAodGhpcy5lZGl0bW9kZT09XCJOZXdcIil7XHJcbiAgICAgICAgdGhpcy5vcmRlci5zb25vPVwiQVVUT1wiO1xyXG4gICAgICAgIHRoaXMub3JkZXIuc3RhdHVzPVwibmV3XCI7XHJcbiAgICAgICAgdGhpcy5vcmRlci5jdXN0cmVsPTE7XHJcbiAgICAgICAgdGhpcy5vcmRlci5pdGVtcz0gWy4uLnRoaXMuaXRlbXNdO1xyXG4gICAgIH1cclxuXHJcbiAgICAgdGhpcy5vcmRlci5ncm9zc2FtdD0gdGhpcy50dGxBbXQ7XHJcbiAgICAgdGhpcy5vcmRlci5hbW91bnQ9IHRoaXMudHRsQW10O1xyXG4gICAgIHRoaXMub3JkZXIudGF4ZXMgPTAuMDA7XHJcbiAgICAgY29uc29sZS5sb2codGhpcy5vcmRlcik7XHJcbiAgICAgdGhpcy5zZXJ2LnBvc3RTYWxlT3JkZXIodGhpcy5vcmRlcikuc3Vic2NyaWJlKHJlc3A9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcclxuICAgICAgICBpZihyZXNwLm9rPT0neWVzJyl7XHJcbiAgICAgICAgICB0aGlzLmFsZXJ0TXNnKHJlc3AuIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgfSk7ICAgICBcclxuICB9XHJcblxyXG4gIGFsZXJ0TXNnKG1zZykge1xyXG4gICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICB0aXRsZTogXCJNZXNzYWdlXCIsXHJcbiAgICAgICAgbWVzc2FnZTogbXNnLFxyXG4gICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgIH07XHJcblxyXG4gICAgYWxlcnQob3B0aW9ucykudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXNsaXN0J10se2NsZWFySGlzdG9yeTp0cnVlfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19