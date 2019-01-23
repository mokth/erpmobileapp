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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZXMtb3JkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZEO0FBRzdELDJFQUF5RTtBQUN6RSwrREFBaUQ7QUFDakQsc0RBQXFEO0FBQ3JELDJFQUEyRDtBQUMzRCwrREFBaUU7QUFDakUsdURBQW9EO0FBR3BELDZFQUEyRTtBQUMzRSxnREFBOEQ7QUFDOUQsMENBQW1GO0FBQ25GLDBDQUFpRDtBQUNqRCwwQ0FBNkM7QUFRN0M7SUFvQ0csNkJBQXFCLGlCQUFvQyxFQUNwQyxRQUFvQixFQUNwQixjQUE4QixFQUM5QixJQUFlLEVBQ2YsY0FBOEI7UUFKOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixTQUFJLEdBQUosSUFBSSxDQUFXO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbENwRCxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsYUFBUSxHQUFRLElBQUksQ0FBQztRQUVyQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBaUJwQixvQkFBZSxHQUFTLElBQUksQ0FBQztRQUc3QixhQUFRLEdBQVEsS0FBSyxDQUFDO1FBWWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxpQkFBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUMsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUUsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFNLEVBQUUsQ0FB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bnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3IvY29sb3InO1xyXG5pbXBvcnQge0JhcmNvZGVTY2FubmVyfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xyXG5pbXBvcnQgKiBhcyBNb2RhbFBpY2tlciBmcm9tICduYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcclxuXHJcbmltcG9ydCB7IGl0ZW1Db2RlIH0gZnJvbSAnLi9pdGVtLWNvZGUnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXRpbFNlcnZpY2UsIEFQSVNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3NlcnZpY2VzJztcclxuaW1wb3J0IHsgU2FsZXNPZGVyLCBTT0l0ZW0sIEN1c3RQcm9maWxlTGlnaHQsIEl0ZW1NYXN0ZXIgfSBmcm9tICd+L2FwcC9jb3JlL21vZGVsJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tICd+L2FwcC9jb3JlL2VudW1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtc2FsZXMtb3JkZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zYWxlcy1vcmRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2FsZXMtb3JkZXIuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTYWxlc09yZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LE9uRGVzdHJveSB7XHJcbiAgY3VzdG9tZXI6Q3VzdFByb2ZpbGVMaWdodDtcclxuICBpdGVtTWFzdGVyOkl0ZW1NYXN0ZXI7XHJcbiAgb3JkZXI6U2FsZXNPZGVyO1xyXG4gIHNvaXRlbTpTT0l0ZW07XHJcbiAgc29kYXRlOmFueTtcclxuICBmZF9pY29kZTpzdHJpbmc9XCJcIjtcclxuICBmZF9xdHk6bnVtYmVyPTA7XHJcbiAgZmRfcHJpY2U6bnVtYmVyPTAuMDA7XHJcbiAgZmRfZGVsZGF0ZTpEYXRlO1xyXG4gIGZkX3JlbWFyazpzdHJpbmc9XCJcIjtcclxuXHJcbiAgaXRlbXM6U09JdGVtW107XHJcblxyXG4gIGljb25TcGluOnN0cmluZztcclxuICBpY29uQWRkOnN0cmluZztcclxuICBpY29uUmVtb3ZlOnN0cmluZztcclxuICBpY29uQ2FsZW5kZXI6c3RyaW5nO1xyXG4gIGljb25FZGl0OnN0cmluZztcclxuICBpY29uUVI6c3RyaW5nO1xyXG5cclxuICBzZWxlY3RlZEN1c3QkOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xyXG4gIGN1c3RTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgdHRsUXR5Om51bWJlcjtcclxuICB0dGxBbXQ6bnVtYmVyO1xyXG5cclxuICBpc0NvbnRyb2xFbmFibGU6Ym9vbGVhbj10cnVlO1xyXG4gIGlzRWRpdE1vZGU6Ym9vbGVhbjtcclxuICBlZGl0ZWRJdGVtOlNPSXRlbTtcclxuICBlZGl0bW9kZTpzdHJpbmc9XCJOZXdcIjtcclxuICBfc29ubzpzdHJpbmc7XHJcbiAgX3NvcmVsOnN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBfZGF0YUl0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8aXRlbUNvZGU+O1xyXG5cclxuICAgY29uc3RydWN0b3IoIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1dGlsc2VydjpVdGlsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzZXJ2OkFQSVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lciAgIFxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgIHRoaXMub3JkZXIgPSBuZXcgU2FsZXNPZGVyKCk7XHJcbiAgICAgIHRoaXMub3JkZXIuc29ubz0nQVVUTyc7XHJcbiAgICAgIHRoaXMub3JkZXIuc29kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgdGhpcy5vcmRlci5pdGVtcyA9W107ICBcclxuICAgICAgdGhpcy5zb2l0ZW0gPSBuZXcgU09JdGVtKCk7ICAgIFxyXG4gICAgICB0aGlzLml0ZW1zPVtdOyAgICAgICAgICAgIFxyXG4gICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50dGxBbXQ9MDtcclxuICAgIHRoaXMudHRsUXR5PTA7XHJcbiAgICB0aGlzLnNldElDb25Db2RlKCk7ICAgIFxyXG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgIGNvbnN0IHNvbm8gPSBwYXJhbXNbJ3Nvbm8nXTtcclxuICAgICAgaWYgKHNvbm8pIHtcclxuICAgICAgICAgY29uc29sZS5sb2coJ3BhcmFtICcrc29ubyk7XHJcbiAgICAgICAgIGxldCBrZXlzPSAoc29ubytcIlwiKS5zcGxpdCgnQCcpO1xyXG4gICAgICAgICBpZiAoa2V5cy5sZW5ndGg9PTIpe1xyXG4gICAgICAgICAgICAgdGhpcy5fc29ubz1rZXlzWzBdO1xyXG4gICAgICAgICAgICAgdGhpcy5fc29yZWw9a2V5c1sxXTtcclxuICAgICAgICAgICAgIHRoaXMuZWRpdG1vZGU9XCJFZGl0XCI7XHJcbiAgICAgICAgICAgICB0aGlzLmlzQ29udHJvbEVuYWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgIHRoaXMubG9hZFNhbGVzT3JkZXIoKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdGhpcy5zZWxlY3RlZEN1c3QkPXRoaXMudXRpbHNlcnYuZ2V0QmVoYXZpb3JTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmN1c3RTdWJzY3JpcHRpb249IHRoaXMuc2VsZWN0ZWRDdXN0JC5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICAgIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5jdXN0b21lcil7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXIuY3VzdG5hbWU9IHJlc3AuZGF0YS5jdXN0TmFtZTtcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5jdXN0Y29kZSA9IHJlc3AuZGF0YS5jdXN0Q29kZTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgIH1lbHNlIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5tYXN0ZXJpdGVtKXtcclxuICAgICAgICAgICAgLy90aGlzLml0ZW1jb2RlPSByZXNwLmRhdGEuaUNvZGU7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU1hc3Rlcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnNldEl0ZW1EZXRhaWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XHJcbiAgICBpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcclxuICAgICAgIGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjRjRGNkY2XCIpOyAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZFNhbGVzT3JkZXIoKXtcclxuICAgIHRoaXMuc2Vydi5nZXRTYWxlc09yZGVyQnlLZXkodGhpcy5fc29ubysnQCcrdGhpcy5fc29yZWwpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgICAgICBpZiAocmVzcCl7XHJcbiAgICAgICAgICAgICB0aGlzLm9yZGVyID0gcmVzcDtcclxuICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLm9yZGVyLml0ZW1zO1xyXG4gICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SUNvbkNvZGUoKXtcclxuICAgIHRoaXMuaWNvblNwaW4gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjE1MCk7XHJcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1NSk7XHJcbiAgICB0aGlzLmljb25SZW1vdmUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1Nyk7XHJcbiAgICB0aGlzLmljb25DYWxlbmRlcj0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxMzMpO1xyXG4gICAgdGhpcy5pY29uRWRpdD0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxNGIpO1xyXG4gICAgdGhpcy5pY29uUVI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDI5KTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc2V0SXRlbURldGFpbCgpe1xyXG4gICAgdGhpcy5mZF9pY29kZT0gdGhpcy5pdGVtTWFzdGVyLmlDb2RlO1xyXG4gICAgdGhpcy5mZF9wcmljZT0gdGhpcy5pdGVtTWFzdGVyLnNlbGxpbmdQcmljZTsgICAgXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY3VzdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGFJdGVtcygpOiBPYnNlcnZhYmxlQXJyYXk8aXRlbUNvZGU+IHtcclxuICAgIHRoaXMuX2RhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5pdGVtcyk7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YUl0ZW1zO1xyXG4gfVxyXG4gICBcclxuICBwaWNrRGF0ZShvcHRpb246bnVtYmVyKSB7XHJcbiAgICBjb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIuTW9kYWxEYXRldGltZXBpY2tlcigpO1xyXG4gICAgcGlja2VyLnBpY2tEYXRlKHtcclxuICAgICAgdGhlbWU6ICdkYXJrJyxcclxuICAgICAgLy9tYXhEYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICBpczI0SG91clZpZXc6IGZhbHNlXHJcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKG9wdGlvbj09MSl7XHJcbiAgICAgICAgICB0aGlzLm9yZGVyLnNvZGF0ZSA9IHRoaXMuZ2V0RGF0ZVJlc3VsdChyZXN1bHQpO1xyXG4gICAgICB9ZWxzZSBpZiAob3B0aW9uPT0yKXtcclxuICAgICAgICB0aGlzLmZkX2RlbGRhdGUgPSB0aGlzLmdldERhdGVSZXN1bHQocmVzdWx0KTtcclxuICAgICB9XHJcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyb3IpO1xyXG4gICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShlcnJvcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldERhdGVSZXN1bHQocmVzdWx0OmFueSl7XHJcbiAgICByZXR1cm4gbmV3IERhdGUocmVzdWx0Wyd5ZWFyJ10scmVzdWx0Wydtb250aCddLTEscmVzdWx0WydkYXknXSk7ICAgIFxyXG4gIH1cclxuXHJcbiAgT25DdXN0b21lclRhcCgpe1xyXG4gICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbG9va2N1c3QnXSk7XHJcbiAgfVxyXG5cclxuICBvbkl0ZW1UYXAoKXtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbG9va2l0ZW0nXSk7XHJcbiAgfVxyXG5cclxuICBvblNjYW5uZXJUYXAoKXtcclxuICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuaGFzQ2FtZXJhUGVybWlzc2lvbigpLnRoZW4ocmVzcD0+e1xyXG4gICAgICAgICAgaWYgKHJlc3Ape1xyXG4gICAgICAgICAgICAgIHRoaXMub25TY2FuKCkgO1xyXG4gICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlJlcXVpcmUgQ2FtZXJhIFBlcm1pc3Npb24uLi4uXCIpO1xyXG4gICAgICAgICAgfSAgXHJcbiAgICAgICAgfSwoZXJyb3IpPT57XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7IFxyXG4gICAgICAgIH1cclxuICAgICAgKTsgICAgICAgICAgXHJcbiAgfVxyXG5cclxuICBnZXRJdGVtTGluZU5vKCk6bnVtYmVye1xyXG4gICAgbGV0IGxpbmVubzpudW1iZXI9MTtcclxuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aD4wKXsgIFxyXG4gICAgICAgbGV0IG1heExpbmUgPSB0aGlzLml0ZW1zLnJlZHVjZSgoeCx5KT0+KHgubGluZSA+IHkubGluZSk/eDp5KTtcclxuICAgICAgIGxpbmVubyA9IChtYXhMaW5lLmxpbmUgKjEpICsgMTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaW5lbm87XHJcbiAgfVxyXG5cclxuICBnZXROZXdJdGVtKCk6U09JdGVte1xyXG4gICAgICBsZXQgc29pdGVtID0gbmV3IFNPSXRlbSgpO1xyXG4gICAgICBsZXQgbGluZW5vID0gdGhpcy5nZXRJdGVtTGluZU5vKCk7XHJcbiAgICAgIHNvaXRlbS5saW5lID0gbGluZW5vO1xyXG4gICAgICBzb2l0ZW0uaWRlYyA9IHRoaXMuaXRlbU1hc3Rlci5pRGVzYztcclxuICAgICAgc29pdGVtLmljb2RlPSB0aGlzLmZkX2ljb2RlO1xyXG4gICAgICBzb2l0ZW0ucHJpY2UgPSB0aGlzLmZkX3ByaWNlO1xyXG4gICAgICBzb2l0ZW0uZGVsZGF0ZSA9IHRoaXMuZmRfZGVsZGF0ZTtcclxuICAgICAgc29pdGVtLnJlbWFyayA9IHRoaXMuZmRfcmVtYXJrO1xyXG4gICAgICBzb2l0ZW0uaWRlYyA9IHNvaXRlbS5saW5lK1wiIFwiKyB0aGlzLml0ZW1NYXN0ZXIuaURlc2M7XHJcbiAgICAgIHNvaXRlbS51b20gPSB0aGlzLml0ZW1NYXN0ZXIuc2VsbGluZ1VPTTtcclxuICAgICAgc29pdGVtLnBhY2tzaXplID0gdGhpcy5pdGVtTWFzdGVyLnN0ZFBhY2tTaXplO1xyXG4gICAgICBzb2l0ZW0ucXR5ID0gdGhpcy5mZF9xdHk7XHJcbiAgICAgIHNvaXRlbS5hbW91bnQgPSAgc29pdGVtLnF0eSAqIHNvaXRlbS5wcmljZTtcclxuICAgcmV0dXJuIHNvaXRlbTtcclxuICB9XHJcbiAgXHJcbiAgc2V0RWRpdEl0ZW0oKXtcclxuICAgIHRoaXMuZWRpdGVkSXRlbS5kZWxkYXRlID0gdGhpcy5mZF9kZWxkYXRlO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLnJlbWFyayA9IHRoaXMuZmRfcmVtYXJrO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLnByaWNlID0gIHRoaXMuZmRfcHJpY2U7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0ucXR5ID0gdGhpcy5mZF9xdHk7XHJcbiAgICB0aGlzLmVkaXRlZEl0ZW0uYW1vdW50ID0gIHRoaXMuZWRpdGVkSXRlbS5xdHkgKiB0aGlzLmVkaXRlZEl0ZW0ucHJpY2U7XHJcbiAgfVxyXG4gXHJcbiAgY2FsY3VsYXRlVG90YWwoKXtcclxuICAgIHRoaXMudHRsUXR5ID0gMDtcclxuICAgIHRoaXMudHRsQW10ID0wO1xyXG4gICAgdGhpcy5pdGVtcy5tYXAoaXRtPT57XHJcbiAgICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSArKGl0bS5xdHkgKjEpO1xyXG4gICAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgKyAoaXRtLnF0eSAqIGl0bS5wcmljZSk7IFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIE9uQWRkSXRlbSgpe1xyXG4gICAgICBpZiAoIXRoaXMudmFsaWRhdGVJdGVtKCkpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBcclxuICAgICAgbGV0IHNvaXRlbTpTT0l0ZW07XHJcbiAgICAgIGlmICh0aGlzLmlzRWRpdE1vZGUpe1xyXG4gICAgICAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgLSAodGhpcy5lZGl0ZWRJdGVtLnF0eSAqMSk7XHJcbiAgICAgICAgIHRoaXMudHRsQW10ID0gKHRoaXMudHRsQW10ICoxKSAtICh0aGlzLmVkaXRlZEl0ZW0ucXR5ICogdGhpcy5lZGl0ZWRJdGVtLnByaWNlKTsgIFxyXG4gICAgICAgICB0aGlzLnNldEVkaXRJdGVtKCk7XHJcbiAgICAgICAgIHNvaXRlbSA9IHRoaXMuZWRpdGVkSXRlbTtcclxuICAgICAgfWVsc2Uge1xyXG4gICAgICAgICBzb2l0ZW0gPSB0aGlzLmdldE5ld0l0ZW0oKTtcclxuICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHNvaXRlbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSArKHNvaXRlbS5xdHkgKjEpO1xyXG4gICAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgKyAoc29pdGVtLnF0eSAqIHNvaXRlbS5wcmljZSk7ICAgIFxyXG4gICAgICB0aGlzLnJlc2V0SXRlbUVudHJ5KCk7XHJcbiAgfVxyXG5cclxuICBcclxuICBvbkVkaXRJdGVtKGl0ZW06U09JdGVtKXtcclxuICAgIHRoaXMuZmRfaWNvZGU9aXRlbS5pY29kZTtcclxuICAgIHRoaXMuZmRfcHJpY2UgPSBpdGVtLnByaWNlO1xyXG4gICAgdGhpcy5mZF9xdHkgPSBpdGVtLnF0eTtcclxuICAgIHRoaXMuZmRfZGVsZGF0ZSA9IGl0ZW0uZGVsZGF0ZTtcclxuICAgIHRoaXMuZmRfcmVtYXJrID0gaXRlbS5yZW1hcms7XHJcbiAgICB0aGlzLmlzRWRpdE1vZGU9dHJ1ZTtcclxuICAgIHRoaXMuZWRpdGVkSXRlbSA9IGl0ZW07XHJcbiAgfVxyXG5cclxuICBvblJlbW92ZUl0ZW0oaXRlbTpTT0l0ZW0pe1xyXG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKHg9PngubGluZSAhPT0gaXRlbS5saW5lKTtcclxuICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSAtIChpdGVtLnF0eSAqMSk7XHJcbiAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgLSAoaXRlbS5xdHkgKiBpdGVtLnByaWNlKTsgIFxyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGVJdGVtKCk6Ym9vbGVhbntcclxuICAgICAgaWYgKCF0aGlzLmZkX2ljb2RlIHx8IHRoaXMuZmRfaWNvZGU9PVwiXCIpe1xyXG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSXRlbSBjb2RlIGlzIGJsYW5rLi4uXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5mZF9xdHk9PTApe1xyXG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW52YWxpZCBpdGVtIHF0eS4uLi5cIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgXHJcbiAgcmVzZXRJdGVtRW50cnkoKXtcclxuICAgIHRoaXMuZmRfaWNvZGU9XCJcIjtcclxuICAgIHRoaXMuZmRfcHJpY2UgPTAuMDA7XHJcbiAgICB0aGlzLmZkX3F0eSA9MDtcclxuICAgIHRoaXMuZmRfcmVtYXJrID1cIlwiO1xyXG4gICAgLy90aGlzLmZkX2RlbGRhdGUgPSBudWxsO1xyXG4gICAgdGhpcy5pc0VkaXRNb2RlPWZhbHNlO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtPW51bGw7XHJcbiAgfVxyXG5cclxuICBPblNhdmVUYXAoZSl7XHJcbiAgICB0aGlzLnNhdmVPcmRlcigpO1xyXG5cclxuICAgIC8vdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICB9XHJcblxyXG4gIE9uQ2FuY2VsVGFwKGUpe1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3QnXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcclxuICAgIC8vdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICB9XHJcbiAgXHJcbiAgLy9zY2FubmVyXHJcbiAgcHVibGljIG9uU2Nhbigpe1xyXG4gICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xyXG4gICAgICAgICAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXHJcbiAgICAgICAgICAgICAgY2FuY2VsTGFiZWw6IFwiRVhJVC4gQWxzbywgdHJ5IHRoZSB2b2x1bWUgYnV0dG9ucyFcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJ0Nsb3NlJ1xyXG4gICAgICAgICAgICAgIGNhbmNlbExhYmVsQmFja2dyb3VuZENvbG9yOiBcIiMzMzMzMzNcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJyMwMDAwMDAnIChibGFjaylcclxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIlVzZSB0aGUgdm9sdW1lIGJ1dHRvbnMgZm9yIGV4dHJhIGxpZ2h0XCIsIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCBpcyAnUGxhY2UgYSBiYXJjb2RlIGluc2lkZSB0aGUgdmlld2ZpbmRlciByZWN0YW5nbGUgdG8gc2NhbiBpdC4nXHJcbiAgICAgICAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsICAgLy8gZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSwgICAgIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsICAgICAgICAvLyBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSwgICAgICAgICAgICAgLy8gUGxheSBvciBTdXBwcmVzcyBiZWVwIG9uIHNjYW4gKGRlZmF1bHQgdHJ1ZSlcclxuICAgICAgICAgICAgICB0b3JjaE9uOiBmYWxzZSwgICAgICAgICAgICAgICAvLyBsYXVuY2ggd2l0aCB0aGUgZmxhc2hsaWdodCBvbiAoZGVmYXVsdCBmYWxzZSlcclxuICAgICAgICAgICAgICBjbG9zZUNhbGxiYWNrOiAoKSA9PiB7IGNvbnNvbGUubG9nKFwiU2Nhbm5lciBjbG9zZWRcIil9LCAvLyBpbnZva2VkIHdoZW4gdGhlIHNjYW5uZXIgd2FzIGNsb3NlZCAoc3VjY2VzcyBvciBhYm9ydClcclxuICAgICAgICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCwgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgMTUwMCAobXMpLCBzZXQgdG8gMCB0byBkaXNhYmxlIGVjaG9pbmcgdGhlIHNjYW5uZWQgdGV4dFxyXG4gICAgICAgICAgICAvLyBvcmllbnRhdGlvbjogb3JpZW50YXRpb24sICAgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgdW5kZWZpbmVkIChzZW5zb3ItZHJpdmVuIG9yaWVudGF0aW9uKSwgb3RoZXIgb3B0aW9uczogcG9ydHJhaXR8bGFuZHNjYXBlXHJcbiAgICAgICAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZSAvLyBPbiBpT1MgeW91IGNhbiBzZW5kIHRoZSB1c2VyIHRvIHRoZSBzZXR0aW5ncyBhcHAgaWYgYWNjZXNzIHdhcyBwcmV2aW91c2x5IGRlbmllZFxyXG4gICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyBQcm9taXNlIGlzIG5ldmVyIGludm9rZWQgd2hlbiBhICdjb250aW51b3VzU2NhbkNhbGxiYWNrJyBmdW5jdGlvbiBpcyBwcm92aWRlZFxyXG4gICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpOyAgICAgICAgXHJcbiAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNjYW4uIFwiICsgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbiAgXHJcbiAgc2F2ZU9yZGVyKCl7XHJcbiAgICAgaWYgKHRoaXMuZWRpdG1vZGU9PVwiTmV3XCIpe1xyXG4gICAgICAgIHRoaXMub3JkZXIuc29ubz1cIkFVVE9cIjtcclxuICAgICAgICB0aGlzLm9yZGVyLnN0YXR1cz1cIm5ld1wiO1xyXG4gICAgICAgIHRoaXMub3JkZXIuY3VzdHJlbD0xO1xyXG4gICAgICAgIHRoaXMub3JkZXIuaXRlbXM9IFsuLi50aGlzLml0ZW1zXTtcclxuICAgICB9XHJcblxyXG4gICAgIHRoaXMub3JkZXIuZ3Jvc3NhbXQ9IHRoaXMudHRsQW10O1xyXG4gICAgIHRoaXMub3JkZXIuYW1vdW50PSB0aGlzLnR0bEFtdDtcclxuICAgICB0aGlzLm9yZGVyLnRheGVzID0wLjAwO1xyXG4gICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXIpO1xyXG4gICAgIHRoaXMuc2Vydi5wb3N0U2FsZU9yZGVyKHRoaXMub3JkZXIpLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XHJcbiAgICAgICAgaWYocmVzcC5vaz09J3llcycpe1xyXG4gICAgICAgICAgdGhpcy5hbGVydE1zZyhyZXNwLiBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgIH0pOyAgICAgXHJcbiAgfVxyXG5cclxuICBhbGVydE1zZyhtc2cpIHtcclxuICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgdGl0bGU6IFwiTWVzc2FnZVwiLFxyXG4gICAgICAgIG1lc3NhZ2U6IG1zZyxcclxuICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICB9O1xyXG5cclxuICAgIGFsZXJ0KG9wdGlvbnMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdCddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==