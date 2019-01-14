"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ModalPicker = require("nativescript-modal-datetimepicker");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var color_1 = require("tns-core-modules/color/color");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
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
    SalesOrderComponent.prototype.OnAddItem = function () {
        if (!this.validateItem())
            return;
        var soitem;
        if (this.isEditMode) {
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
        this.navigationService.backToPreviousPage();
    };
    SalesOrderComponent.prototype.OnCancelTap = function (e) {
        this.navigationService.backToPreviousPage();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FsZXMtb3JkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELCtEQUFpRTtBQUdqRSwyRUFBeUU7QUFDekUsK0RBQWlEO0FBQ2pELHNEQUFxRDtBQUNyRCwyRUFBMkQ7QUFHM0QsNkVBQTJFO0FBQzNFLGdEQUE4RDtBQUc5RCwwQ0FBcUQ7QUFDckQsMENBQWlEO0FBQ2pELDBDQUE2QztBQVE3QztJQWtDRyw2QkFBcUIsaUJBQW9DLEVBQ3BDLFFBQW9CLEVBQ3BCLGNBQThCLEVBQzlCLElBQWUsRUFDZixjQUE4QjtRQUo5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFoQ3BELGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixhQUFRLEdBQVEsSUFBSSxDQUFDO1FBaUJyQixvQkFBZSxHQUFTLElBQUksQ0FBQztRQUc3QixhQUFRLEdBQVEsS0FBSyxDQUFDO1FBV2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxpQkFBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUUsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUYsc0NBQVEsR0FBUjtRQUFBLGlCQThCQztRQTdCQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1FB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LEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FtQ3lDLHNDQUFpQjtZQUMzQixzQkFBVztZQUNKLHVCQUFjO1lBQ3pCLHFCQUFVO1lBQ0MsNENBQWM7T0F0Q3pDLG1CQUFtQixDQW9SL0I7SUFBRCwwQkFBQztDQUFBLEFBcFJELElBb1JDO0FBcFJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIE1vZGFsUGlja2VyIGZyb20gJ25hdGl2ZXNjcmlwdC1tb2RhbC1kYXRldGltZXBpY2tlcic7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc25hY2tiYXJcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvcic7XG5pbXBvcnQge0JhcmNvZGVTY2FubmVyfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuXG5pbXBvcnQgeyBpdGVtQ29kZSB9IGZyb20gJy4vaXRlbS1jb2RlJztcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbFNlcnZpY2UsIEFQSVNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IEN1c3RQcm9maWxlTGlnaHQgfSBmcm9tICcuLi8uLi8uLi8uLi9wbGF0Zm9ybXMvYW5kcm9pZC9hcHAvc3JjL21haW4vYXNzZXRzL2FwcC9hcHAvY29yZS9tb2RlbC9jdXN0b21lcic7XG5pbXBvcnQgeyBJdGVtTWFzdGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGxhdGZvcm1zL2FuZHJvaWQvYXBwL3NyYy9tYWluL2Fzc2V0cy9hcHAvYXBwL2NvcmUvbW9kZWwvaXRlbS1tYXN0ZXInO1xuaW1wb3J0IHsgU2FsZXNPZGVyLCBTT0l0ZW0gfSBmcm9tICd+L2FwcC9jb3JlL21vZGVsJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJ34vYXBwL2NvcmUvZW51bXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1zYWxlcy1vcmRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zYWxlcy1vcmRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NhbGVzLW9yZGVyLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbn0pXG5leHBvcnQgY2xhc3MgU2FsZXNPcmRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxPbkRlc3Ryb3kge1xuICBjdXN0b21lcjpDdXN0UHJvZmlsZUxpZ2h0O1xuICBpdGVtTWFzdGVyOkl0ZW1NYXN0ZXI7XG4gIG9yZGVyOlNhbGVzT2RlcjtcbiAgc29pdGVtOlNPSXRlbTtcbiAgc29kYXRlOmFueTtcbiAgZmRfaWNvZGU6c3RyaW5nPVwiXCI7XG4gIGZkX3F0eTpudW1iZXI9MDtcbiAgZmRfcHJpY2U6bnVtYmVyPTAuMDA7XG5cbiAgaXRlbXM6U09JdGVtW107XG5cbiAgaWNvblNwaW46c3RyaW5nO1xuICBpY29uQWRkOnN0cmluZztcbiAgaWNvblJlbW92ZTpzdHJpbmc7XG4gIGljb25DYWxlbmRlcjpzdHJpbmc7XG4gIGljb25FZGl0OnN0cmluZztcbiAgaWNvblFSOnN0cmluZztcblxuICBzZWxlY3RlZEN1c3QkOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBjdXN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgdHRsUXR5Om51bWJlcjtcbiAgdHRsQW10Om51bWJlcjtcblxuICBpc0NvbnRyb2xFbmFibGU6Ym9vbGVhbj10cnVlO1xuICBpc0VkaXRNb2RlOmJvb2xlYW47XG4gIGVkaXRlZEl0ZW06U09JdGVtO1xuICBlZGl0bW9kZTpzdHJpbmc9XCJOZXdcIjtcbiAgX3Nvbm86c3RyaW5nO1xuICBfc29yZWw6c3RyaW5nO1xuXG4gIHByaXZhdGUgX2RhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PGl0ZW1Db2RlPjtcblxuICAgY29uc3RydWN0b3IoIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXRpbHNlcnY6VXRpbFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzZXJ2OkFQSVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIgICApIHtcbiAgICAgIHRoaXMub3JkZXIgPSBuZXcgU2FsZXNPZGVyKCk7XG4gICAgICB0aGlzLm9yZGVyLml0ZW1zID1bXTsgIFxuICAgICAgdGhpcy5zb2l0ZW0gPSBuZXcgU09JdGVtKCk7ICAgIFxuICAgICAgdGhpcy5pdGVtcz1bXTsgICAgICAgICAgICBcbiAgIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnR0bEFtdD0wO1xuICAgIHRoaXMudHRsUXR5PTA7XG4gICAgdGhpcy5zZXRJQ29uQ29kZSgpOyAgICBcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIGNvbnN0IHNvbm8gPSBwYXJhbXNbJ3Nvbm8nXTtcbiAgICAgIGlmIChzb25vKSB7XG4gICAgICAgICBjb25zb2xlLmxvZygncGFyYW0gJytzb25vKTtcbiAgICAgICAgIGxldCBrZXlzPSAoc29ubytcIlwiKS5zcGxpdCgnQCcpO1xuICAgICAgICAgaWYgKGtleXMubGVuZ3RoPT0yKXtcbiAgICAgICAgICAgICB0aGlzLl9zb25vPWtleXNbMF07XG4gICAgICAgICAgICAgdGhpcy5fc29yZWw9a2V5c1sxXTtcbiAgICAgICAgICAgICB0aGlzLmVkaXRtb2RlPVwiRWRpdFwiO1xuICAgICAgICAgICAgIHRoaXMuaXNDb250cm9sRW5hYmxlPWZhbHNlO1xuICAgICAgICAgICAgIHRoaXMubG9hZFNhbGVzT3JkZXIoKTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLnNlbGVjdGVkQ3VzdCQ9dGhpcy51dGlsc2Vydi5nZXRCZWhhdmlvclN1YmplY3QoKTtcbiAgICB0aGlzLmN1c3RTdWJzY3JpcHRpb249IHRoaXMuc2VsZWN0ZWRDdXN0JC5zdWJzY3JpYmUocmVzcD0+e1xuICAgICAgICBpZiAocmVzcC50eXBlPT1EYXRhVGFibGUuY3VzdG9tZXIpe1xuICAgICAgICAgICAgdGhpcy5vcmRlci5jdXN0bmFtZT0gcmVzcC5kYXRhLmN1c3ROYW1lO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lcj0gcmVzcC5kYXRhO1xuICAgICAgICB9ZWxzZSBpZiAocmVzcC50eXBlPT1EYXRhVGFibGUubWFzdGVyaXRlbSl7XG4gICAgICAgICAgICAvL3RoaXMuaXRlbWNvZGU9IHJlc3AuZGF0YS5pQ29kZTtcbiAgICAgICAgICAgIHRoaXMuaXRlbU1hc3Rlcj0gcmVzcC5kYXRhO1xuICAgICAgICAgICAgdGhpcy5zZXRJdGVtRGV0YWlsKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBcbiAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XG4gICAgaWYgKGFyZ3MuaW5kZXggJSAyID09PSAwKSB7XG4gICAgICAgYXJncy52aWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiNGNEY2RjZcIik7ICAgICAgXG4gICAgfVxuICB9XG5cbiAgbG9hZFNhbGVzT3JkZXIoKXtcbiAgICB0aGlzLnNlcnYuZ2V0U2FsZXNPcmRlckJ5S2V5KHRoaXMuX3Nvbm8rJ0AnK3RoaXMuX3NvcmVsKVxuICAgICAgICAuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgICAgICBpZiAocmVzcCl7XG4gICAgICAgICAgICAgdGhpcy5vcmRlciA9IHJlc3A7XG4gICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMub3JkZXIuaXRlbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIHNldElDb25Db2RlKCl7XG4gICAgdGhpcy5pY29uU3BpbiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMTUwKTtcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1NSk7XG4gICAgdGhpcy5pY29uUmVtb3ZlID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwNTcpO1xuICAgIHRoaXMuaWNvbkNhbGVuZGVyPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjEzMyk7XG4gICAgdGhpcy5pY29uRWRpdD0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxNGIpO1xuICAgIHRoaXMuaWNvblFSPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjAyOSk7XG4gICAgXG4gIH1cblxuICBzZXRJdGVtRGV0YWlsKCl7XG4gICAgdGhpcy5mZF9pY29kZT0gdGhpcy5pdGVtTWFzdGVyLmlDb2RlO1xuICAgIHRoaXMuZmRfcHJpY2U9IHRoaXMuaXRlbU1hc3Rlci5zZWxsaW5nUHJpY2U7ICAgIFxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jdXN0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxpdGVtQ29kZT4ge1xuICAgIHRoaXMuX2RhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5pdGVtcyk7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFJdGVtcztcbiB9XG4gICBcbiAgcGlja0RhdGUoKSB7XG4gICAgY29uc3QgcGlja2VyID0gbmV3IE1vZGFsUGlja2VyLk1vZGFsRGF0ZXRpbWVwaWNrZXIoKTtcbiAgICBwaWNrZXIucGlja0RhdGUoe1xuICAgICAgdGhlbWU6ICdkYXJrJyxcbiAgICAgIC8vbWF4RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgIGlzMjRIb3VyVmlldzogZmFsc2VcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICB0aGlzLm9yZGVyLnNvZGF0ZSA9IHRoaXMuZ2V0U29EYXRlKHJlc3VsdCk7XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRTb0RhdGUocmVzdWx0OmFueSl7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHJlc3VsdFsneWVhciddLHJlc3VsdFsnbW9udGgnXS0xLHJlc3VsdFsnZGF5J10pOyAgICBcbiAgfVxuXG4gIE9uQ3VzdG9tZXJUYXAoKXtcbiAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9sb29rY3VzdCddKTtcbiAgfVxuXG4gIG9uSXRlbVRhcChlKXtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL2xvb2tpdGVtJ10pO1xuICB9XG5cbiAgb25TY2FubmVyVGFwKGUpe1xuICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuaGFzQ2FtZXJhUGVybWlzc2lvbigpLnRoZW4ocmVzcD0+e1xuICAgICAgICAgIGlmIChyZXNwKXtcbiAgICAgICAgICAgICAgdGhpcy5vblNjYW4oKSA7XG4gICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJSZXF1aXJlIENhbWVyYSBQZXJtaXNzaW9uLi4uLlwiKTtcbiAgICAgICAgICB9ICBcbiAgICAgICAgfSwoZXJyb3IpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpOyBcbiAgICAgICAgfVxuICAgICAgKTsgICAgICAgICAgXG4gIH1cblxuICBcblxuICBnZXRJdGVtTGluZU5vKCk6bnVtYmVye1xuICAgIGxldCBsaW5lbm86bnVtYmVyPTE7XG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoPjApeyAgXG4gICAgICAgbGV0IG1heExpbmUgPSB0aGlzLml0ZW1zLnJlZHVjZSgoeCx5KT0+KHgubGluZSA+IHkubGluZSk/eDp5KTtcbiAgICAgICBsaW5lbm8gPSAobWF4TGluZS5saW5lICoxKSArIDE7XG4gICAgfVxuICAgIHJldHVybiBsaW5lbm87XG4gIH1cblxuICBnZXROZXdJdGVtKCk6U09JdGVte1xuICAgICAgbGV0IHNvaXRlbSA9IG5ldyBTT0l0ZW0oKTtcbiAgICAgIGxldCBsaW5lbm8gPSB0aGlzLmdldEl0ZW1MaW5lTm8oKTtcbiAgICAgIHNvaXRlbS5saW5lID0gbGluZW5vO1xuICAgICAgc29pdGVtLmlkZWMgPSB0aGlzLml0ZW1NYXN0ZXIuaURlc2M7XG4gICAgICBzb2l0ZW0uaWNvZGU9IHRoaXMuZmRfaWNvZGU7XG4gICAgICBzb2l0ZW0ucHJpY2UgPSB0aGlzLmZkX3ByaWNlO1xuICAgICAgc29pdGVtLmlkZWMgPSBzb2l0ZW0ubGluZStcIiBcIisgdGhpcy5pdGVtTWFzdGVyLmlEZXNjO1xuICAgICAgc29pdGVtLnVvbSA9IHRoaXMuaXRlbU1hc3Rlci5zZWxsaW5nVU9NO1xuICAgICAgc29pdGVtLnBhY2tzaXplID0gdGhpcy5pdGVtTWFzdGVyLnN0ZFBhY2tTaXplO1xuICAgICAgc29pdGVtLnF0eSA9IHRoaXMuZmRfcXR5O1xuICAgICAgc29pdGVtLmFtb3VudCA9ICBzb2l0ZW0ucXR5ICogc29pdGVtLnByaWNlO1xuICAgcmV0dXJuIHNvaXRlbTtcbiAgfVxuICBcbiAgc2V0RWRpdEl0ZW0oKXtcbiAgICB0aGlzLmVkaXRlZEl0ZW0ucHJpY2UgPSAgdGhpcy5mZF9wcmljZTtcbiAgICB0aGlzLmVkaXRlZEl0ZW0ucXR5ID0gdGhpcy5mZF9xdHk7XG4gICAgdGhpcy5lZGl0ZWRJdGVtLmFtb3VudCA9ICB0aGlzLmVkaXRlZEl0ZW0ucXR5ICogdGhpcy5lZGl0ZWRJdGVtLnByaWNlO1xuICB9XG5cbiAgT25BZGRJdGVtKCl7XG4gICAgICBpZiAoIXRoaXMudmFsaWRhdGVJdGVtKCkpXG4gICAgICAgIHJldHVybjtcbiAgICAgIFxuICAgICAgbGV0IHNvaXRlbTpTT0l0ZW07XG4gICAgICBpZiAodGhpcy5pc0VkaXRNb2RlKXtcbiAgICAgICAgIHRoaXMuc2V0RWRpdEl0ZW0oKTtcbiAgICAgICAgIHNvaXRlbSA9IHRoaXMuZWRpdGVkSXRlbTtcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgIHNvaXRlbSA9IHRoaXMuZ2V0TmV3SXRlbSgpO1xuICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHNvaXRlbSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSArKHNvaXRlbS5xdHkgKjEpO1xuICAgICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpICsgKHNvaXRlbS5xdHkgKiBzb2l0ZW0ucHJpY2UpOyAgICBcbiAgICAgIHRoaXMucmVzZXRJdGVtRW50cnkoKTtcbiAgfVxuXG4gIFxuICBvbkVkaXRJdGVtKGl0ZW06U09JdGVtKXtcbiAgICB0aGlzLmZkX2ljb2RlPWl0ZW0uaWNvZGU7XG4gICAgdGhpcy5mZF9wcmljZSA9IGl0ZW0ucHJpY2U7XG4gICAgdGhpcy5mZF9xdHkgPSBpdGVtLnF0eTtcbiAgICB0aGlzLmlzRWRpdE1vZGU9dHJ1ZTtcbiAgICB0aGlzLmVkaXRlZEl0ZW0gPSBpdGVtO1xuICB9XG5cbiAgb25SZW1vdmVJdGVtKGl0ZW06U09JdGVtKXtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoeD0+eC5saW5lICE9PSBpdGVtLmxpbmUpO1xuICAgIHRoaXMudHRsUXR5ID0gKHRoaXMudHRsUXR5ICoxKSAtIChpdGVtLnF0eSAqMSk7XG4gICAgdGhpcy50dGxBbXQgPSAodGhpcy50dGxBbXQgKjEpIC0gKGl0ZW0ucXR5ICogaXRlbS5wcmljZSk7ICBcbiAgfVxuXG4gIHZhbGlkYXRlSXRlbSgpOmJvb2xlYW57XG4gICAgICBpZiAoIXRoaXMuZmRfaWNvZGUgfHwgdGhpcy5mZF9pY29kZT09XCJcIil7XG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSXRlbSBjb2RlIGlzIGJsYW5rLi4uXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5mZF9xdHk9PTApe1xuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkludmFsaWQgaXRlbSBxdHkuLi4uXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG4gIFxuICByZXNldEl0ZW1FbnRyeSgpe1xuICAgIHRoaXMuZmRfaWNvZGU9XCJcIjtcbiAgICB0aGlzLmZkX3ByaWNlID0wLjAwO1xuICAgIHRoaXMuZmRfcXR5ID0wO1xuICAgIHRoaXMuaXNFZGl0TW9kZT1mYWxzZTtcbiAgICB0aGlzLmVkaXRlZEl0ZW09bnVsbDtcbiAgfVxuXG4gIE9uU2F2ZVRhcChlKXtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICB9XG5cbiAgT25DYW5jZWxUYXAoZSl7XG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgfVxuICBcbiAgLy9zY2FubmVyXG4gIHB1YmxpYyBvblNjYW4oKXtcbiAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XG4gICAgICAgICAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXG4gICAgICAgICAgICAgIGNhbmNlbExhYmVsOiBcIkVYSVQuIEFsc28sIHRyeSB0aGUgdm9sdW1lIGJ1dHRvbnMhXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICdDbG9zZSdcbiAgICAgICAgICAgICAgY2FuY2VsTGFiZWxCYWNrZ3JvdW5kQ29sb3I6IFwiIzMzMzMzM1wiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnIzAwMDAwMCcgKGJsYWNrKVxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIlVzZSB0aGUgdm9sdW1lIGJ1dHRvbnMgZm9yIGV4dHJhIGxpZ2h0XCIsIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCBpcyAnUGxhY2UgYSBiYXJjb2RlIGluc2lkZSB0aGUgdmlld2ZpbmRlciByZWN0YW5nbGUgdG8gc2NhbiBpdC4nXG4gICAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLCAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsICAgICAgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgIGJlZXBPblNjYW46IHRydWUsICAgICAgICAgICAgIC8vIFBsYXkgb3IgU3VwcHJlc3MgYmVlcCBvbiBzY2FuIChkZWZhdWx0IHRydWUpXG4gICAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLCAgICAgICAgICAgICAgIC8vIGxhdW5jaCB3aXRoIHRoZSBmbGFzaGxpZ2h0IG9uIChkZWZhdWx0IGZhbHNlKVxuICAgICAgICAgICAgICBjbG9zZUNhbGxiYWNrOiAoKSA9PiB7IGNvbnNvbGUubG9nKFwiU2Nhbm5lciBjbG9zZWRcIil9LCAvLyBpbnZva2VkIHdoZW4gdGhlIHNjYW5uZXIgd2FzIGNsb3NlZCAoc3VjY2VzcyBvciBhYm9ydClcbiAgICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IDE1MDAgKG1zKSwgc2V0IHRvIDAgdG8gZGlzYWJsZSBlY2hvaW5nIHRoZSBzY2FubmVkIHRleHRcbiAgICAgICAgICAgIC8vIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbiwgICAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCB1bmRlZmluZWQgKHNlbnNvci1kcml2ZW4gb3JpZW50YXRpb24pLCBvdGhlciBvcHRpb25zOiBwb3J0cmFpdHxsYW5kc2NhcGVcbiAgICAgICAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZSAvLyBPbiBpT1MgeW91IGNhbiBzZW5kIHRoZSB1c2VyIHRvIHRoZSBzZXR0aW5ncyBhcHAgaWYgYWNjZXNzIHdhcyBwcmV2aW91c2x5IGRlbmllZFxuICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIFByb21pc2UgaXMgbmV2ZXIgaW52b2tlZCB3aGVuIGEgJ2NvbnRpbnVvdXNTY2FuQ2FsbGJhY2snIGZ1bmN0aW9uIGlzIHByb3ZpZGVkXG4gICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpOyAgICAgICAgXG4gICAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2Nhbi4gXCIgKyBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG4gIFxufVxuIl19