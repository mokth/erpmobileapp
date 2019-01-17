"use strict";
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
        this.isControlEnable = true;
        this.editmode = "New";
        this.order = new model_1.SalesOder();
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
    SalesOrderComponent.prototype.pickDate = function () {
        var _this = this;
        var picker = new ModalPicker.ModalDatetimepicker();
        picker.pickDate({
            theme: 'dark',
            //maxDate: new Date(),
            is24HourView: false
        }).then(function (result) {
            console.log(result);
            _this.order.sodate = _this.getSoDate(result);
        }).catch(function (error) {
            console.log('Error: ' + error);
        });
    };
    SalesOrderComponent.prototype.getSoDate = function (result) {
        return new Date(result['year'], result['month'] - 1, result['day']);
    };
    SalesOrderComponent.prototype.OnCustomerTap = function () {
        this.navigationService.navigate(['/lookcust']);
    };
    SalesOrderComponent.prototype.onItemTap = function (e) {
        this.navigationService.navigate(['/lookitem']);
    };
    SalesOrderComponent.prototype.onScannerTap = function (e) {
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
        soitem.idec = soitem.line + " " + this.itemMaster.iDesc;
        soitem.uom = this.itemMaster.sellingUOM;
        soitem.packsize = this.itemMaster.stdPackSize;
        soitem.qty = this.fd_qty;
        soitem.amount = soitem.qty * soitem.price;
        return soitem;
    };
    SalesOrderComponent.prototype.setEditItem = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZXMtb3JkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBRzdELDJFQUF5RTtBQUN6RSwrREFBaUQ7QUFDakQsc0RBQXFEO0FBQ3JELDJFQUEyRDtBQUMzRCwrREFBaUU7QUFDakUsdURBQW9EO0FBR3BELDZFQUEyRTtBQUMzRSxnREFBOEQ7QUFDOUQsMENBQW1GO0FBQ25GLDBDQUFpRDtBQUNqRCwwQ0FBNkM7QUFRN0M7SUFrQ0csNkJBQXFCLGlCQUFvQyxFQUNwQyxRQUFvQixFQUNwQixjQUE4QixFQUM5QixJQUFlLEVBQ2YsY0FBOEI7UUFKOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixTQUFJLEdBQUosSUFBSSxDQUFXO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBaENwRCxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsYUFBUSxHQUFRLElBQUksQ0FBQztRQWlCckIsb0JBQWUsR0FBUyxJQUFJLENBQUM7UUFHN0IsYUFBUSxHQUFRLEtBQUssQ0FBQztRQVdsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFFLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVGLHNDQUFRLEdBQVI7UUFBQSxpQkErQkM7UUE5QkMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFD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LEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7WUFDMUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBbUN5QyxzQ0FBaUI7WUFDM0Isc0JBQVc7WUFDSix1QkFBYztZQUN6QixxQkFBVTtZQUNDLDRDQUFjO09BdEN6QyxtQkFBbUIsQ0FrVS9CO0lBQUQsMEJBQUM7Q0FBQSxBQWxVRCxJQWtVQztBQWxVWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3IvY29sb3InO1xyXG5pbXBvcnQge0JhcmNvZGVTY2FubmVyfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xyXG5pbXBvcnQgKiBhcyBNb2RhbFBpY2tlciBmcm9tICduYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcclxuXHJcbmltcG9ydCB7IGl0ZW1Db2RlIH0gZnJvbSAnLi9pdGVtLWNvZGUnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXRpbFNlcnZpY2UsIEFQSVNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3NlcnZpY2VzJztcclxuaW1wb3J0IHsgU2FsZXNPZGVyLCBTT0l0ZW0sIEN1c3RQcm9maWxlTGlnaHQsIEl0ZW1NYXN0ZXIgfSBmcm9tICd+L2FwcC9jb3JlL21vZGVsJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tICd+L2FwcC9jb3JlL2VudW1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtc2FsZXMtb3JkZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zYWxlcy1vcmRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2FsZXMtb3JkZXIuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTYWxlc09yZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LE9uRGVzdHJveSB7XHJcbiAgY3VzdG9tZXI6Q3VzdFByb2ZpbGVMaWdodDtcclxuICBpdGVtTWFzdGVyOkl0ZW1NYXN0ZXI7XHJcbiAgb3JkZXI6U2FsZXNPZGVyO1xyXG4gIHNvaXRlbTpTT0l0ZW07XHJcbiAgc29kYXRlOmFueTtcclxuICBmZF9pY29kZTpzdHJpbmc9XCJcIjtcclxuICBmZF9xdHk6bnVtYmVyPTA7XHJcbiAgZmRfcHJpY2U6bnVtYmVyPTAuMDA7XHJcblxyXG4gIGl0ZW1zOlNPSXRlbVtdO1xyXG5cclxuICBpY29uU3BpbjpzdHJpbmc7XHJcbiAgaWNvbkFkZDpzdHJpbmc7XHJcbiAgaWNvblJlbW92ZTpzdHJpbmc7XHJcbiAgaWNvbkNhbGVuZGVyOnN0cmluZztcclxuICBpY29uRWRpdDpzdHJpbmc7XHJcbiAgaWNvblFSOnN0cmluZztcclxuXHJcbiAgc2VsZWN0ZWRDdXN0JDpCZWhhdmlvclN1YmplY3Q8YW55PjtcclxuICBjdXN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHR0bFF0eTpudW1iZXI7XHJcbiAgdHRsQW10Om51bWJlcjtcclxuXHJcbiAgaXNDb250cm9sRW5hYmxlOmJvb2xlYW49dHJ1ZTtcclxuICBpc0VkaXRNb2RlOmJvb2xlYW47XHJcbiAgZWRpdGVkSXRlbTpTT0l0ZW07XHJcbiAgZWRpdG1vZGU6c3RyaW5nPVwiTmV3XCI7XHJcbiAgX3Nvbm86c3RyaW5nO1xyXG4gIF9zb3JlbDpzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgX2RhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PGl0ZW1Db2RlPjtcclxuXHJcbiAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXRpbHNlcnY6VXRpbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc2VydjpBUElTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIgICApIHtcclxuICAgICAgdGhpcy5vcmRlciA9IG5ldyBTYWxlc09kZXIoKTtcclxuICAgICAgdGhpcy5vcmRlci5pdGVtcyA9W107ICBcclxuICAgICAgdGhpcy5zb2l0ZW0gPSBuZXcgU09JdGVtKCk7ICAgIFxyXG4gICAgICB0aGlzLml0ZW1zPVtdOyAgICAgICAgICAgIFxyXG4gICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50dGxBbXQ9MDtcclxuICAgIHRoaXMudHRsUXR5PTA7XHJcbiAgICB0aGlzLnNldElDb25Db2RlKCk7ICAgIFxyXG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgIGNvbnN0IHNvbm8gPSBwYXJhbXNbJ3Nvbm8nXTtcclxuICAgICAgaWYgKHNvbm8pIHtcclxuICAgICAgICAgY29uc29sZS5sb2coJ3BhcmFtICcrc29ubyk7XHJcbiAgICAgICAgIGxldCBrZXlzPSAoc29ubytcIlwiKS5zcGxpdCgnQCcpO1xyXG4gICAgICAgICBpZiAoa2V5cy5sZW5ndGg9PTIpe1xyXG4gICAgICAgICAgICAgdGhpcy5fc29ubz1rZXlzWzBdO1xyXG4gICAgICAgICAgICAgdGhpcy5fc29yZWw9a2V5c1sxXTtcclxuICAgICAgICAgICAgIHRoaXMuZWRpdG1vZGU9XCJFZGl0XCI7XHJcbiAgICAgICAgICAgICB0aGlzLmlzQ29udHJvbEVuYWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgIHRoaXMubG9hZFNhbGVzT3JkZXIoKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdGhpcy5zZWxlY3RlZEN1c3QkPXRoaXMudXRpbHNlcnYuZ2V0QmVoYXZpb3JTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmN1c3RTdWJzY3JpcHRpb249IHRoaXMuc2VsZWN0ZWRDdXN0JC5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICAgIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5jdXN0b21lcil7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXIuY3VzdG5hbWU9IHJlc3AuZGF0YS5jdXN0TmFtZTtcclxuICAgICAgICAgICAgdGhpcy5vcmRlci5jdXN0Y29kZSA9IHJlc3AuZGF0YS5jdXN0Q29kZTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgIH1lbHNlIGlmIChyZXNwLnR5cGU9PURhdGFUYWJsZS5tYXN0ZXJpdGVtKXtcclxuICAgICAgICAgICAgLy90aGlzLml0ZW1jb2RlPSByZXNwLmRhdGEuaUNvZGU7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU1hc3Rlcj0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnNldEl0ZW1EZXRhaWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XHJcbiAgICBpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcclxuICAgICAgIGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjRjRGNkY2XCIpOyAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZFNhbGVzT3JkZXIoKXtcclxuICAgIHRoaXMuc2Vydi5nZXRTYWxlc09yZGVyQnlLZXkodGhpcy5fc29ubysnQCcrdGhpcy5fc29yZWwpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgICAgICBpZiAocmVzcCl7XHJcbiAgICAgICAgICAgICB0aGlzLm9yZGVyID0gcmVzcDtcclxuICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLm9yZGVyLml0ZW1zO1xyXG4gICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SUNvbkNvZGUoKXtcclxuICAgIHRoaXMuaWNvblNwaW4gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjE1MCk7XHJcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1NSk7XHJcbiAgICB0aGlzLmljb25SZW1vdmUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1Nyk7XHJcbiAgICB0aGlzLmljb25DYWxlbmRlcj0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxMzMpO1xyXG4gICAgdGhpcy5pY29uRWRpdD0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxNGIpO1xyXG4gICAgdGhpcy5pY29uUVI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDI5KTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc2V0SXRlbURldGFpbCgpe1xyXG4gICAgdGhpcy5mZF9pY29kZT0gdGhpcy5pdGVtTWFzdGVyLmlDb2RlO1xyXG4gICAgdGhpcy5mZF9wcmljZT0gdGhpcy5pdGVtTWFzdGVyLnNlbGxpbmdQcmljZTsgICAgXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY3VzdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGFJdGVtcygpOiBPYnNlcnZhYmxlQXJyYXk8aXRlbUNvZGU+IHtcclxuICAgIHRoaXMuX2RhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5pdGVtcyk7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YUl0ZW1zO1xyXG4gfVxyXG4gICBcclxuICBwaWNrRGF0ZSgpIHtcclxuICAgIGNvbnN0IHBpY2tlciA9IG5ldyBNb2RhbFBpY2tlci5Nb2RhbERhdGV0aW1lcGlja2VyKCk7XHJcbiAgICBwaWNrZXIucGlja0RhdGUoe1xyXG4gICAgICB0aGVtZTogJ2RhcmsnLFxyXG4gICAgICAvL21heERhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgIGlzMjRIb3VyVmlldzogZmFsc2VcclxuICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICB0aGlzLm9yZGVyLnNvZGF0ZSA9IHRoaXMuZ2V0U29EYXRlKHJlc3VsdCk7XHJcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTb0RhdGUocmVzdWx0OmFueSl7XHJcbiAgICByZXR1cm4gbmV3IERhdGUocmVzdWx0Wyd5ZWFyJ10scmVzdWx0Wydtb250aCddLTEscmVzdWx0WydkYXknXSk7ICAgIFxyXG4gIH1cclxuXHJcbiAgT25DdXN0b21lclRhcCgpe1xyXG4gICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbG9va2N1c3QnXSk7XHJcbiAgfVxyXG5cclxuICBvbkl0ZW1UYXAoZSl7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL2xvb2tpdGVtJ10pO1xyXG4gIH1cclxuXHJcbiAgb25TY2FubmVyVGFwKGUpe1xyXG4gICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5oYXNDYW1lcmFQZXJtaXNzaW9uKCkudGhlbihyZXNwPT57XHJcbiAgICAgICAgICBpZiAocmVzcCl7XHJcbiAgICAgICAgICAgICAgdGhpcy5vblNjYW4oKSA7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiUmVxdWlyZSBDYW1lcmEgUGVybWlzc2lvbi4uLi5cIik7XHJcbiAgICAgICAgICB9ICBcclxuICAgICAgICB9LChlcnJvcik9PntcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICApOyAgICAgICAgICBcclxuICB9XHJcblxyXG4gIFxyXG5cclxuICBnZXRJdGVtTGluZU5vKCk6bnVtYmVye1xyXG4gICAgbGV0IGxpbmVubzpudW1iZXI9MTtcclxuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aD4wKXsgIFxyXG4gICAgICAgbGV0IG1heExpbmUgPSB0aGlzLml0ZW1zLnJlZHVjZSgoeCx5KT0+KHgubGluZSA+IHkubGluZSk/eDp5KTtcclxuICAgICAgIGxpbmVubyA9IChtYXhMaW5lLmxpbmUgKjEpICsgMTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaW5lbm87XHJcbiAgfVxyXG5cclxuICBnZXROZXdJdGVtKCk6U09JdGVte1xyXG4gICAgICBsZXQgc29pdGVtID0gbmV3IFNPSXRlbSgpO1xyXG4gICAgICBsZXQgbGluZW5vID0gdGhpcy5nZXRJdGVtTGluZU5vKCk7XHJcbiAgICAgIHNvaXRlbS5saW5lID0gbGluZW5vO1xyXG4gICAgICBzb2l0ZW0uaWRlYyA9IHRoaXMuaXRlbU1hc3Rlci5pRGVzYztcclxuICAgICAgc29pdGVtLmljb2RlPSB0aGlzLmZkX2ljb2RlO1xyXG4gICAgICBzb2l0ZW0ucHJpY2UgPSB0aGlzLmZkX3ByaWNlO1xyXG4gICAgICBzb2l0ZW0uaWRlYyA9IHNvaXRlbS5saW5lK1wiIFwiKyB0aGlzLml0ZW1NYXN0ZXIuaURlc2M7XHJcbiAgICAgIHNvaXRlbS51b20gPSB0aGlzLml0ZW1NYXN0ZXIuc2VsbGluZ1VPTTtcclxuICAgICAgc29pdGVtLnBhY2tzaXplID0gdGhpcy5pdGVtTWFzdGVyLnN0ZFBhY2tTaXplO1xyXG4gICAgICBzb2l0ZW0ucXR5ID0gdGhpcy5mZF9xdHk7XHJcbiAgICAgIHNvaXRlbS5hbW91bnQgPSAgc29pdGVtLnF0eSAqIHNvaXRlbS5wcmljZTtcclxuICAgcmV0dXJuIHNvaXRlbTtcclxuICB9XHJcbiAgXHJcbiAgc2V0RWRpdEl0ZW0oKXtcclxuICAgIHRoaXMuZWRpdGVkSXRlbS5wcmljZSA9ICB0aGlzLmZkX3ByaWNlO1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLnF0eSA9IHRoaXMuZmRfcXR5O1xyXG4gICAgdGhpcy5lZGl0ZWRJdGVtLmFtb3VudCA9ICB0aGlzLmVkaXRlZEl0ZW0ucXR5ICogdGhpcy5lZGl0ZWRJdGVtLnByaWNlO1xyXG4gIH1cclxuIFxyXG4gIGNhbGN1bGF0ZVRvdGFsKCl7XHJcbiAgICB0aGlzLnR0bFF0eSA9IDA7XHJcbiAgICB0aGlzLnR0bEFtdCA9MDtcclxuICAgIHRoaXMuaXRlbXMubWFwKGl0bT0+e1xyXG4gICAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgKyhpdG0ucXR5ICoxKTtcclxuICAgICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpICsgKGl0bS5xdHkgKiBpdG0ucHJpY2UpOyBcclxuICAgIH0pO1xyXG4gIH1cclxuICBPbkFkZEl0ZW0oKXtcclxuICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlSXRlbSgpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgXHJcbiAgICAgIGxldCBzb2l0ZW06U09JdGVtO1xyXG4gICAgICBpZiAodGhpcy5pc0VkaXRNb2RlKXtcclxuICAgICAgICAgdGhpcy50dGxRdHkgPSAodGhpcy50dGxRdHkgKjEpIC0gKHRoaXMuZWRpdGVkSXRlbS5xdHkgKjEpO1xyXG4gICAgICAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgLSAodGhpcy5lZGl0ZWRJdGVtLnF0eSAqIHRoaXMuZWRpdGVkSXRlbS5wcmljZSk7ICBcclxuICAgICAgICAgdGhpcy5zZXRFZGl0SXRlbSgpO1xyXG4gICAgICAgICBzb2l0ZW0gPSB0aGlzLmVkaXRlZEl0ZW07XHJcbiAgICAgIH1lbHNlIHtcclxuICAgICAgICAgc29pdGVtID0gdGhpcy5nZXROZXdJdGVtKCk7XHJcbiAgICAgICAgIHRoaXMuaXRlbXMucHVzaChzb2l0ZW0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnR0bFF0eSA9ICh0aGlzLnR0bFF0eSAqMSkgKyhzb2l0ZW0ucXR5ICoxKTtcclxuICAgICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpICsgKHNvaXRlbS5xdHkgKiBzb2l0ZW0ucHJpY2UpOyAgICBcclxuICAgICAgdGhpcy5yZXNldEl0ZW1FbnRyeSgpO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgb25FZGl0SXRlbShpdGVtOlNPSXRlbSl7XHJcbiAgICB0aGlzLmZkX2ljb2RlPWl0ZW0uaWNvZGU7XHJcbiAgICB0aGlzLmZkX3ByaWNlID0gaXRlbS5wcmljZTtcclxuICAgIHRoaXMuZmRfcXR5ID0gaXRlbS5xdHk7XHJcbiAgICB0aGlzLmlzRWRpdE1vZGU9dHJ1ZTtcclxuICAgIHRoaXMuZWRpdGVkSXRlbSA9IGl0ZW07XHJcbiAgfVxyXG5cclxuICBvblJlbW92ZUl0ZW0oaXRlbTpTT0l0ZW0pe1xyXG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKHg9PngubGluZSAhPT0gaXRlbS5saW5lKTtcclxuICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSAtIChpdGVtLnF0eSAqMSk7XHJcbiAgICB0aGlzLnR0bEFtdCA9ICh0aGlzLnR0bEFtdCAqMSkgLSAoaXRlbS5xdHkgKiBpdGVtLnByaWNlKTsgIFxyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGVJdGVtKCk6Ym9vbGVhbntcclxuICAgICAgaWYgKCF0aGlzLmZkX2ljb2RlIHx8IHRoaXMuZmRfaWNvZGU9PVwiXCIpe1xyXG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSXRlbSBjb2RlIGlzIGJsYW5rLi4uXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5mZF9xdHk9PTApe1xyXG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW52YWxpZCBpdGVtIHF0eS4uLi5cIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgXHJcbiAgcmVzZXRJdGVtRW50cnkoKXtcclxuICAgIHRoaXMuZmRfaWNvZGU9XCJcIjtcclxuICAgIHRoaXMuZmRfcHJpY2UgPTAuMDA7XHJcbiAgICB0aGlzLmZkX3F0eSA9MDtcclxuICAgIHRoaXMuaXNFZGl0TW9kZT1mYWxzZTtcclxuICAgIHRoaXMuZWRpdGVkSXRlbT1udWxsO1xyXG4gIH1cclxuXHJcbiAgT25TYXZlVGFwKGUpe1xyXG4gICAgdGhpcy5zYXZlT3JkZXIoKTtcclxuXHJcbiAgICAvL3RoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgfVxyXG5cclxuICBPbkNhbmNlbFRhcChlKXtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXNsaXN0J10se2NsZWFySGlzdG9yeTp0cnVlfSk7XHJcbiAgICAvL3RoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgfVxyXG4gIFxyXG4gIC8vc2Nhbm5lclxyXG4gIHB1YmxpYyBvblNjYW4oKXtcclxuICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcclxuICAgICAgICAgICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxyXG4gICAgICAgICAgICAgIGNhbmNlbExhYmVsOiBcIkVYSVQuIEFsc28sIHRyeSB0aGUgdm9sdW1lIGJ1dHRvbnMhXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICdDbG9zZSdcclxuICAgICAgICAgICAgICBjYW5jZWxMYWJlbEJhY2tncm91bmRDb2xvcjogXCIjMzMzMzMzXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICcjMDAwMDAwJyAoYmxhY2spXHJcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJVc2UgdGhlIHZvbHVtZSBidXR0b25zIGZvciBleHRyYSBsaWdodFwiLCAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgaXMgJ1BsYWNlIGEgYmFyY29kZSBpbnNpZGUgdGhlIHZpZXdmaW5kZXIgcmVjdGFuZ2xlIHRvIHNjYW4gaXQuJ1xyXG4gICAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLCAgIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsICAgICAvLyBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLCAgICAgICAgLy8gZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAgICAgIGJlZXBPblNjYW46IHRydWUsICAgICAgICAgICAgIC8vIFBsYXkgb3IgU3VwcHJlc3MgYmVlcCBvbiBzY2FuIChkZWZhdWx0IHRydWUpXHJcbiAgICAgICAgICAgICAgdG9yY2hPbjogZmFsc2UsICAgICAgICAgICAgICAgLy8gbGF1bmNoIHdpdGggdGhlIGZsYXNobGlnaHQgb24gKGRlZmF1bHQgZmFsc2UpXHJcbiAgICAgICAgICAgICAgY2xvc2VDYWxsYmFjazogKCkgPT4geyBjb25zb2xlLmxvZyhcIlNjYW5uZXIgY2xvc2VkXCIpfSwgLy8gaW52b2tlZCB3aGVuIHRoZSBzY2FubmVyIHdhcyBjbG9zZWQgKHN1Y2Nlc3Mgb3IgYWJvcnQpXHJcbiAgICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IDE1MDAgKG1zKSwgc2V0IHRvIDAgdG8gZGlzYWJsZSBlY2hvaW5nIHRoZSBzY2FubmVkIHRleHRcclxuICAgICAgICAgICAgLy8gb3JpZW50YXRpb246IG9yaWVudGF0aW9uLCAgICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IHVuZGVmaW5lZCAoc2Vuc29yLWRyaXZlbiBvcmllbnRhdGlvbiksIG90aGVyIG9wdGlvbnM6IHBvcnRyYWl0fGxhbmRzY2FwZVxyXG4gICAgICAgICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWUgLy8gT24gaU9TIHlvdSBjYW4gc2VuZCB0aGUgdXNlciB0byB0aGUgc2V0dGluZ3MgYXBwIGlmIGFjY2VzcyB3YXMgcHJldmlvdXNseSBkZW5pZWRcclxuICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgUHJvbWlzZSBpcyBuZXZlciBpbnZva2VkIHdoZW4gYSAnY29udGludW91c1NjYW5DYWxsYmFjaycgZnVuY3Rpb24gaXMgcHJvdmlkZWRcclxuICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsgICAgICAgIFxyXG4gICAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBzY2FuLiBcIiArIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG4gIFxyXG4gIHNhdmVPcmRlcigpe1xyXG4gICAgIGlmICh0aGlzLmVkaXRtb2RlPT1cIk5ld1wiKXtcclxuICAgICAgICB0aGlzLm9yZGVyLnNvbm89XCJBVVRPXCI7XHJcbiAgICAgICAgdGhpcy5vcmRlci5zdGF0dXM9XCJuZXdcIjtcclxuICAgICAgICB0aGlzLm9yZGVyLmN1c3RyZWw9MTtcclxuICAgICAgICB0aGlzLm9yZGVyLml0ZW1zPSBbLi4udGhpcy5pdGVtc107XHJcbiAgICAgfVxyXG5cclxuICAgICB0aGlzLm9yZGVyLmdyb3NzYW10PSB0aGlzLnR0bEFtdDtcclxuICAgICB0aGlzLm9yZGVyLmFtb3VudD0gdGhpcy50dGxBbXQ7XHJcbiAgICAgdGhpcy5vcmRlci50YXhlcyA9MC4wMDtcclxuICAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyKTtcclxuICAgICB0aGlzLnNlcnYucG9zdFNhbGVPcmRlcih0aGlzLm9yZGVyKS5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xyXG4gICAgICAgIGlmKHJlc3Aub2s9PSd5ZXMnKXtcclxuICAgICAgICAgIHRoaXMuYWxlcnRNc2cocmVzcC4gZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICB9KTsgICAgIFxyXG4gIH1cclxuXHJcbiAgYWxlcnRNc2cobXNnKSB7XHJcbiAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgIHRpdGxlOiBcIk1lc3NhZ2VcIixcclxuICAgICAgICBtZXNzYWdlOiBtc2csXHJcbiAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcclxuICAgICAgfTtcclxuXHJcbiAgICBhbGVydChvcHRpb25zKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3QnXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=