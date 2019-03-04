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
var ModalPicker = require("nativescript-modal-datetimepicker");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var core_1 = require("@angular/core");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
var api_service_1 = require("../../core/services/api.service");
var navigation_service_1 = require("../../core/services/navigation.service");
var model_1 = require("../../core/model");
var auth_service_1 = require("../../core/services/auth-service");
var GrnEntryComponent = /** @class */ (function () {
    function GrnEntryComponent(apiser, auth, barcodeScanner, navigationService) {
        this.apiser = apiser;
        this.auth = auth;
        this.barcodeScanner = barcodeScanner;
        this.navigationService = navigationService;
        this.listitems = [];
        this.listpoitems = [];
        this.userid = auth.getUserID();
    }
    GrnEntryComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.dono.nativeElement.focus();
        }, 600);
        this.$qtyListener = rxjs_1.fromEvent(this.receiptQty.nativeElement, 'textChange')
            .debounceTime(400)
            .subscribe(function (event) {
            if (_this.fd_balance) {
                var qty = +event.value;
                if (!_this.onValidRecQty(qty)) {
                    _this.fd_recqty = 0;
                    _this.isRecQtyValid = false;
                    (new nativescript_snackbar_1.SnackBar()).simple("Qty cannot more then PO qty!");
                }
                else {
                    _this.isRecQtyValid = true;
                }
            }
        });
    };
    GrnEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isRecQtyValid = false;
        this.fd_date = new Date();
        this.iconQR = String.fromCharCode(0xf029);
        this.iconSpin = String.fromCharCode(0xf150);
        this.apiser.getGRNPOlist().subscribe(function (resp) {
            _this.polist = resp;
            _this.polist.map(function (x) {
                if (_this.listitems.findIndex(function (y) { return y.title == x.poNo; }) < 0) {
                    _this.listitems.push({
                        title: x.poNo
                    });
                }
            });
        });
    };
    GrnEntryComponent.prototype.ngOnDestroy = function () {
        try {
            if (this.$qtyListener) {
                console.log('qtyListener unsubscribe');
                this.$qtyListener.unsubscribe();
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    GrnEntryComponent.prototype.pickDate = function () {
        var _this = this;
        var picker = new ModalPicker.ModalDatetimepicker();
        picker.pickDate({
            theme: 'dark',
            is24HourView: false
        }).then(function (result) {
            _this.fd_date = _this.getDateResult(result);
        }).catch(function (error) {
            console.log('Error: ' + error);
            (new nativescript_snackbar_1.SnackBar()).simple(error);
        });
    };
    GrnEntryComponent.prototype.getDateResult = function (result) {
        return new Date(result['year'], result['month'] - 1, result['day']);
    };
    GrnEntryComponent.prototype.showPicker = function (option) {
        console.log(option);
        this.spinWork.nativeElement.dimmerColor = "transparent";
        this.spinWork.nativeElement.listWidth = "80%";
        this._lookoption = option;
        switch (option) {
            case "po":
                this.spinWork.nativeElement.hintText = "Select PO..";
                this.spinWork.nativeElement.source = this.listitems;
                break;
            case "item":
                this.spinWork.nativeElement.hintText = "Select Item..";
                this.spinWork.nativeElement.source = this.listpoitems;
                break;
        }
        this.spinWork.nativeElement.show(this.myContainer.nativeElement);
    };
    GrnEntryComponent.prototype.cancelFilterableList = function (e) {
        console.log('canceled');
    };
    GrnEntryComponent.prototype.itemTapped = function (args) {
        var _this = this;
        switch (this._lookoption) {
            case "po":
                this.fd_pono = args.selectedItem.title;
                this.polist.filter(function (w) { return w.poNo == _this.fd_pono; })
                    .map(function (x) {
                    _this.fd_vcode = x.vendCode;
                    _this.fd_vname = x.vendName;
                    _this.fd_relno = x.poRelNo;
                });
                this.getPOItems();
                break;
            case "item":
                var code_1 = args.selectedItem.title.split('.');
                this.fd_icode = code_1[1];
                this.poitemlist.filter(function (w) { return w.line == code_1[0]; })
                    .map(function (x) {
                    _this.fd_idesc = x.iDes,
                        _this.fd_poqty = x.poPurQty,
                        _this.fd_puruom = x.purchaseUOM,
                        _this.fd_balance = x.balanceQty,
                        _this.fd_line = x.line,
                        _this.fd_ttlrec = x.receivedQty,
                        _this.poitem = x;
                });
                this.receiptQty.nativeElement.focus();
        }
    };
    GrnEntryComponent.prototype.getPOItems = function () {
        var _this = this;
        this.listpoitems = [];
        this.apiser.getPOItems(this.fd_pono, this.fd_relno)
            .subscribe(function (resp) {
            console.log(resp);
            _this.poitemlist = resp;
            _this.poitemlist.map(function (x) {
                _this.listpoitems.push({
                    title: x.line + '.' + x.iCode,
                });
            });
        });
    };
    GrnEntryComponent.prototype.OnScan = function () {
        var _this = this;
        //[PONo]+'+'+[PORelNo]+'+'+[VendCode]+'+'+[ICode]+'+'+[Line]+'+'+[POQty]+'+'+[PurchaseUOM]
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
            _this.checkValidScanResult(result.text);
        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
            _this.barcodeScanner.stop();
        });
    };
    GrnEntryComponent.prototype.checkValidScanResult = function (scanText) {
        var data = scanText.split('+');
        if (data.length > 5) {
            var pohdr_1 = this.polist.filter(function (x) { return x.poNo == data[0] && x.poRelNo == data[1]; });
            if (pohdr_1.length > 0) {
                console.log('found PO');
                console.log(pohdr_1[0]);
                this.fd_pono = pohdr_1[0].poNo;
                this.fd_relno = pohdr_1[0].poRelNo;
                this.fd_vcode = pohdr_1[0].vendCode;
                this.fd_vname = pohdr_1[0].vendName;
                var podtl = null;
                if (this.poitemlist) {
                    podtl = this.poitemlist.find(function (x) { return x.poNo == pohdr_1[0].poNo &&
                        x.poRelNo == pohdr_1[0].poRelNo &&
                        x.iCode == data[3] &&
                        x.line == data[4]; });
                }
                if (podtl) {
                    //use existing poitem
                    this.displyItem(podtl);
                }
                else {
                    //not found fetch from server
                    this.getPOItemsFrScan(pohdr_1[0].poNo, pohdr_1[0].poRelNo, data);
                }
            }
        }
    };
    GrnEntryComponent.prototype.getPOItemsFrScan = function (pono, relno, data) {
        var _this = this;
        this.listpoitems = [];
        // console.log('get po item');
        this.apiser.getPOItems(pono, relno)
            .subscribe(function (resp) {
            _this.poitemlist = resp;
            _this.poitemlist.map(function (x) {
                _this.listpoitems.push({
                    title: x.line + '.' + x.iCode,
                });
            });
            var podtl = _this.poitemlist.find(function (x) { return x.poNo == pono &&
                x.poRelNo == relno &&
                x.iCode == data[3] &&
                x.line == data[4]; });
            _this.displyItem(podtl);
        });
    };
    GrnEntryComponent.prototype.displyItem = function (podtl) {
        try {
            if (podtl) {
                console.log('found item');
                this.fd_icode = podtl.iCode;
                this.fd_idesc = podtl.iDes;
                this.fd_poqty = podtl.poPurQty;
                this.fd_puruom = podtl.purchaseUOM;
                this.fd_balance = podtl.balanceQty;
                this.fd_line = podtl.line;
                this.fd_ttlrec = podtl.receivedQty;
                this.poitem = podtl;
            }
            else {
                console.log('item not found');
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    GrnEntryComponent.prototype.onValidRecQty = function (qtyrec) {
        var tolerance = +this.poitem.tolerance;
        //received but not posted yet
        var receivedQty = this.poitem.receivedQty;
        var ttlRecv = qtyrec + receivedQty;
        var tolqty = 0;
        if (tolerance > 0) {
            tolqty = Math.trunc(this.fd_poqty * (tolerance / 100));
        }
        var canRecQty = this.fd_balance + tolqty;
        return (ttlRecv <= canRecQty);
    };
    GrnEntryComponent.prototype.OnSaveTap = function (e) {
        var _this = this;
        if (this.fd_recqty == 0) {
            (new nativescript_snackbar_1.SnackBar()).simple("Invalid Qty...");
            return;
        }
        var item = this.populateGRNReceive();
        this.apiser.postGRNReceipt(item).subscribe(function (resp) {
            console.log(resp);
            if (resp.save == "yes") {
                (new nativescript_snackbar_1.SnackBar()).simple("Successfully uploaded...");
                _this.resetInput();
            }
            else {
                (new nativescript_snackbar_1.SnackBar()).simple("Error " + resp.error);
            }
        });
    };
    GrnEntryComponent.prototype.resetInput = function () {
        this.fd_icode = "";
        this.poitem = null;
        this.fd_idesc = "";
        this.fd_line = 0;
        this.fd_puruom = "";
        this.fd_poqty = 0;
        this.fd_balance = 0;
        this.fd_recqty = 0;
    };
    GrnEntryComponent.prototype.OnCancelTap = function (e) {
        this.navigationService.navigate(['/main'], { clearHistory: true });
    };
    GrnEntryComponent.prototype.populateGRNReceive = function () {
        var item = new model_1.GRNReceive();
        item.createdBy = this.userid;
        item.dateRec = this.fd_date;
        item.dono = this.fd_dono;
        item.iCode = this.fd_icode;
        item.iDes = this.fd_idesc;
        item.line = this.fd_line;
        item.packSz = this.poitem.packSz;
        item.poNo = this.fd_pono;
        item.poPurQty = this.poitem.poPurQty;
        item.poQty = this.poitem.poQty;
        item.poRelNo = +this.fd_relno;
        item.purchaseUOM = this.fd_puruom;
        item.recvQty = this.fd_recqty;
        item.recvStdQty = item.recvQty * this.poitem.packSz;
        item.stdUOM = this.poitem.stdUOM;
        item.tolerance = this.poitem.tolerance;
        return item;
    };
    __decorate([
        core_1.ViewChild('spinWork'),
        __metadata("design:type", core_1.ElementRef)
    ], GrnEntryComponent.prototype, "spinWork", void 0);
    __decorate([
        core_1.ViewChild('myContainer'),
        __metadata("design:type", core_1.ElementRef)
    ], GrnEntryComponent.prototype, "myContainer", void 0);
    __decorate([
        core_1.ViewChild("revqrt"),
        __metadata("design:type", core_1.ElementRef)
    ], GrnEntryComponent.prototype, "receiptQty", void 0);
    __decorate([
        core_1.ViewChild("dono"),
        __metadata("design:type", core_1.ElementRef)
    ], GrnEntryComponent.prototype, "dono", void 0);
    GrnEntryComponent = __decorate([
        core_1.Component({
            selector: 'ns-grn-entry',
            templateUrl: './grn-entry.component.html',
            styleUrls: ['./grn-entry.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [api_service_1.APIService,
            auth_service_1.AuthService,
            nativescript_barcodescanner_1.BarcodeScanner,
            navigation_service_1.NavigationService])
    ], GrnEntryComponent);
    return GrnEntryComponent;
}());
exports.GrnEntryComponent = GrnEntryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JuLWVudHJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdybi1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBaUU7QUFDakUsK0RBQWlEO0FBQ2pELHNDQUFtRztBQUNuRywyRUFBNkQ7QUFHN0QsNkJBQWlDO0FBQ2pDLGlDQUErQjtBQUMvQiwwQ0FBd0M7QUFHeEMsK0RBQTZEO0FBQzdELDZFQUEyRTtBQUMzRSwwQ0FBc0U7QUFDdEUsaUVBQStEO0FBVS9EO0lBb0NFLDJCQUFvQixNQUFpQixFQUNqQixJQUFnQixFQUNoQixjQUE4QixFQUM5QixpQkFBb0M7UUFIcEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBM0J4RCxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQWUsRUFBRSxDQUFDO1FBMkIxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUFBLGlCQXFCQztRQXBCQyxVQUFVLENBQUM7WUFDUixLQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFUixJQUFJLENBQUMsWUFBWSxHQUFFLGdCQUFTLENBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQzthQUMzQyxZQUFZLENBQUMsR0FBRyxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxVQUFDLEtBQVM7WUFDaEIsSUFBSSxLQUFJLENBQUMsVUFBVSxFQUFDO2dCQUNsQixJQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JB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O0lBQ3pCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFPLGlCQUFVO21EQUFDO0lBTnpCLGlCQUFpQjtRQVA3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztZQUN4QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FzQzJCLHdCQUFVO1lBQ1osMEJBQVc7WUFDQSw0Q0FBYztZQUNYLHNDQUFpQjtPQXZDN0MsaUJBQWlCLENBdVY3QjtJQUFELHdCQUFDO0NBQUEsQUF2VkQsSUF1VkM7QUF2VlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTW9kYWxQaWNrZXIgZnJvbSAnbmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kZWJvdW5jZVRpbWUnO1xuXG5cbmltcG9ydCB7IEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgc3BsaW5PYmplY3QsIEdSTlBPSXRlbSwgR1JOUmVjZWl2ZSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2F1dGgtc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtZ3JuLWVudHJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dybi1lbnRyeS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dybi1lbnRyeS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuXG5leHBvcnQgY2xhc3MgR3JuRW50cnlDb21wb25lbnQgXG4gaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kge1xuICAgIFxuICBAVmlld0NoaWxkKCdzcGluV29yaycpIHNwaW5Xb3JrOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdteUNvbnRhaW5lcicpIG15Q29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwicmV2cXJ0XCIpIHJlY2VpcHRRdHk6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJkb25vXCIpIGRvbm86IEVsZW1lbnRSZWY7XG5cbiAgcG9saXN0OmFueTtcbiAgcG9pdGVtbGlzdDphbnk7XG4gIGljb25RUjpzdHJpbmc7XG4gIGljb25TcGluOnN0cmluZztcbiAgbGlzdGl0ZW1zOnNwbGluT2JqZWN0W109W107XG4gIGxpc3Rwb2l0ZW1zOnNwbGluT2JqZWN0W109W107XG4gIF9sb29rb3B0aW9uOnN0cmluZztcbiAgcG9pdGVtOkdSTlBPSXRlbTtcblxuICBmZF9kYXRlOkRhdGU7XG4gIGZkX2Rvbm86c3RyaW5nO1xuICBmZF9wb25vOnN0cmluZztcbiAgZmRfcmVsbm86c3RyaW5nO1xuICBmZF92Y29kZTpzdHJpbmc7XG4gIGZkX3ZuYW1lOnN0cmluZztcbiAgZmRfaWNvZGU6c3RyaW5nO1xuICBmZF9pZGVzYzpzdHJpbmc7XG4gIGZkX2xpbmU6bnVtYmVyO1xuICBmZF9wdXJ1b206c3RyaW5nO1xuICBmZF9wb3F0eTpudW1iZXI7XG4gIGZkX2JhbGFuY2U6bnVtYmVyO1xuICBmZF9yZWNxdHk6bnVtYmVyO1xuICBmZF90dGxyZWM6bnVtYmVyO1xuXG4gICRxdHlMaXN0ZW5lcjphbnk7XG4gIGlzUmVjUXR5VmFsaWQ6Ym9vbGVhbjtcbiAgXG4gIHVzZXJpZDpzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpc2VyOkFQSVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgYXV0aDpBdXRoU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKSB7XG4gICAgIHRoaXMudXNlcmlkID0gYXV0aC5nZXRVc2VySUQoKTtcbiAgfVxuIFxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgdGhpcy5kb25vLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9LCA2MDApOyAgICBcblxuICAgIHRoaXMuJHF0eUxpc3RlbmVyPSBmcm9tRXZlbnQoXG4gICAgICAgdGhpcy5yZWNlaXB0UXR5Lm5hdGl2ZUVsZW1lbnQsICd0ZXh0Q2hhbmdlJylcbiAgICAgICAuZGVib3VuY2VUaW1lKDQwMClcbiAgICAgICAuc3Vic2NyaWJlKChldmVudDphbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZkX2JhbGFuY2Upe1xuICAgICAgICAgICAgICBjb25zdCBxdHkgPSArZXZlbnQudmFsdWU7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5vblZhbGlkUmVjUXR5KHF0eSkpe1xuICAgICAgICAgICAgICAgICAgIHRoaXMuZmRfcmVjcXR5PTA7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlY1F0eVZhbGlkID1mYWxzZTtcbiAgICAgICAgICAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlF0eSBjYW5ub3QgbW9yZSB0aGVuIFBPIHF0eSFcIik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIHRoaXMuaXNSZWNRdHlWYWxpZCA9dHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAgdGhpcy5pc1JlY1F0eVZhbGlkID1mYWxzZTtcbiAgICAgdGhpcy5mZF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgdGhpcy5pY29uUVI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDI5KTtcbiAgICAgdGhpcy5pY29uU3BpbiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMTUwKTtcbiAgICAgdGhpcy5hcGlzZXIuZ2V0R1JOUE9saXN0KCkuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgICAgICB0aGlzLnBvbGlzdD0gcmVzcDtcbiAgICAgICAgICB0aGlzLnBvbGlzdC5tYXAoeD0+e1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14LnBvTm8pPCAwKXtcbiAgICAgICAgICAgICAgdGhpcy5saXN0aXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTp4LnBvTm9cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICB9XG4gIFxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgdHJ5e1xuICAgICAgaWYgKHRoaXMuJHF0eUxpc3RlbmVyKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3F0eUxpc3RlbmVyIHVuc3Vic2NyaWJlJyk7XG4gICAgICAgIHRoaXMuJHF0eUxpc3RlbmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfWNhdGNoKGUpe1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgcGlja0RhdGUoKSB7XG4gICAgY29uc3QgcGlja2VyID0gbmV3IE1vZGFsUGlja2VyLk1vZGFsRGF0ZXRpbWVwaWNrZXIoKTtcbiAgICBwaWNrZXIucGlja0RhdGUoe1xuICAgICAgdGhlbWU6ICdkYXJrJyxcbiAgICAgIGlzMjRIb3VyVmlldzogZmFsc2VcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5mZF9kYXRlID0gdGhpcy5nZXREYXRlUmVzdWx0KHJlc3VsdCk7ICAgICAgXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBnZXREYXRlUmVzdWx0KHJlc3VsdDphbnkpe1xuICAgIHJldHVybiBuZXcgRGF0ZShyZXN1bHRbJ3llYXInXSxyZXN1bHRbJ21vbnRoJ10tMSxyZXN1bHRbJ2RheSddKTsgICAgXG4gIH1cbiAgXG4gIHNob3dQaWNrZXIob3B0aW9uOnN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKG9wdGlvbik7XG4gICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmRpbW1lckNvbG9yPVwidHJhbnNwYXJlbnRcIjtcbiAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQubGlzdFdpZHRoPVwiODAlXCI7XG4gICAgdGhpcy5fbG9va29wdGlvbiA9IG9wdGlvbjtcbiAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICBjYXNlIFwicG9cIjpcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmhpbnRUZXh0PVwiU2VsZWN0IFBPLi5cIlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc291cmNlPXRoaXMubGlzdGl0ZW1zO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJpdGVtXCI6XG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIlNlbGVjdCBJdGVtLi5cIlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc291cmNlPXRoaXMubGlzdHBvaXRlbXM7XG4gICAgICAgIGJyZWFrOyAgICBcbiAgICB9XG4gICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNob3codGhpcy5teUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KTtcblxuICB9XG5cbiAgY2FuY2VsRmlsdGVyYWJsZUxpc3QoZSkge1xuICAgIGNvbnNvbGUubG9nKCdjYW5jZWxlZCcpO1xuICB9XG5cbiAgaXRlbVRhcHBlZChhcmdzKSB7XG4gICAgc3dpdGNoKHRoaXMuX2xvb2tvcHRpb24pIHtcbiAgICAgIGNhc2UgXCJwb1wiOlxuICAgICAgICB0aGlzLmZkX3Bvbm8gPSBhcmdzLnNlbGVjdGVkSXRlbS50aXRsZTsgICAgIFxuICAgICAgICB0aGlzLnBvbGlzdC5maWx0ZXIodz0+dy5wb05vPT10aGlzLmZkX3Bvbm8pXG4gICAgICAgICAgICAubWFwKHg9PntcbiAgICAgICAgICAgICAgIHRoaXMuZmRfdmNvZGUgPSB4LnZlbmRDb2RlO1xuICAgICAgICAgICAgICAgdGhpcy5mZF92bmFtZSA9IHgudmVuZE5hbWU7XG4gICAgICAgICAgICAgICB0aGlzLmZkX3JlbG5vID0geC5wb1JlbE5vICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRQT0l0ZW1zKCk7ICAgICAgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgbGV0IGNvZGUgPSBhcmdzLnNlbGVjdGVkSXRlbS50aXRsZS5zcGxpdCgnLicpO1xuICAgICAgICB0aGlzLmZkX2ljb2RlID0gY29kZVsxXTtcbiAgICAgICAgdGhpcy5wb2l0ZW1saXN0LmZpbHRlcih3PT53LmxpbmU9PWNvZGVbMF0pXG4gICAgICAgICAgICAubWFwKHg9PntcbiAgICAgICAgICAgICAgIHRoaXMuZmRfaWRlc2M9IHguaURlcyxcbiAgICAgICAgICAgICAgIHRoaXMuZmRfcG9xdHkgPSB4LnBvUHVyUXR5LFxuICAgICAgICAgICAgICAgdGhpcy5mZF9wdXJ1b20gPXgucHVyY2hhc2VVT00sXG4gICAgICAgICAgICAgICB0aGlzLmZkX2JhbGFuY2UgPXguYmFsYW5jZVF0eSxcbiAgICAgICAgICAgICAgIHRoaXMuZmRfbGluZSA9IHgubGluZSxcbiAgICAgICAgICAgICAgIHRoaXMuZmRfdHRscmVjID0geC5yZWNlaXZlZFF0eSxcbiAgICAgICAgICAgICAgIHRoaXMucG9pdGVtPXggICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgIHRoaXMucmVjZWlwdFF0eS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UE9JdGVtcygpe1xuICAgIHRoaXMubGlzdHBvaXRlbXM9W107XG4gICAgdGhpcy5hcGlzZXIuZ2V0UE9JdGVtcyh0aGlzLmZkX3Bvbm8sdGhpcy5mZF9yZWxubylcbiAgICAgICAgLnN1YnNjcmliZShyZXNwPT57XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgICAgICAgIHRoaXMucG9pdGVtbGlzdD0gcmVzcDtcbiAgICAgICAgICAgdGhpcy5wb2l0ZW1saXN0Lm1hcCh4PT57XG4gICAgICAgICAgICAgIHRoaXMubGlzdHBvaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTp4LmxpbmUrJy4nK3guaUNvZGUsXG4gICAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIE9uU2Nhbigpe1xuICAgIC8vW1BPTm9dKycrJytbUE9SZWxOb10rJysnK1tWZW5kQ29kZV0rJysnK1tJQ29kZV0rJysnK1tMaW5lXSsnKycrW1BPUXR5XSsnKycrW1B1cmNoYXNlVU9NXVxuICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XG4gICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxuICAgICAgY2FuY2VsTGFiZWw6IFwiRVhJVC4gQWxzbywgdHJ5IHRoZSB2b2x1bWUgYnV0dG9ucyFcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJ0Nsb3NlJ1xuICAgICAgY2FuY2VsTGFiZWxCYWNrZ3JvdW5kQ29sb3I6IFwiIzMzMzMzM1wiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnIzAwMDAwMCcgKGJsYWNrKVxuICAgICAgbWVzc2FnZTogXCJVc2UgdGhlIHZvbHVtZSBidXR0b25zIGZvciBleHRyYSBsaWdodFwiLCAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgaXMgJ1BsYWNlIGEgYmFyY29kZSBpbnNpZGUgdGhlIHZpZXdmaW5kZXIgcmVjdGFuZ2xlIHRvIHNjYW4gaXQuJ1xuICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLCAgICAgICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgYmVlcE9uU2NhbjogdHJ1ZSwgICAgICAgICAgICAgLy8gUGxheSBvciBTdXBwcmVzcyBiZWVwIG9uIHNjYW4gKGRlZmF1bHQgdHJ1ZSlcbiAgICAgIHRvcmNoT246IGZhbHNlLCAgICAgICAgICAgICAgIC8vIGxhdW5jaCB3aXRoIHRoZSBmbGFzaGxpZ2h0IG9uIChkZWZhdWx0IGZhbHNlKVxuICAgICAgY2xvc2VDYWxsYmFjazogKCkgPT4geyBjb25zb2xlLmxvZyhcIlNjYW5uZXIgY2xvc2VkXCIpfSwgLy8gaW52b2tlZCB3aGVuIHRoZSBzY2FubmVyIHdhcyBjbG9zZWQgKHN1Y2Nlc3Mgb3IgYWJvcnQpXG4gICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCwgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgMTUwMCAobXMpLCBzZXQgdG8gMCB0byBkaXNhYmxlIGVjaG9pbmcgdGhlIHNjYW5uZWQgdGV4dFxuICAgIC8vIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbiwgICAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCB1bmRlZmluZWQgKHNlbnNvci1kcml2ZW4gb3JpZW50YXRpb24pLCBvdGhlciBvcHRpb25zOiBwb3J0cmFpdHxsYW5kc2NhcGVcbiAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWUgLy8gT24gaU9TIHlvdSBjYW4gc2VuZCB0aGUgdXNlciB0byB0aGUgc2V0dGluZ3MgYXBwIGlmIGFjY2VzcyB3YXMgcHJldmlvdXNseSBkZW5pZWRcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBQcm9taXNlIGlzIG5ldmVyIGludm9rZWQgd2hlbiBhICdjb250aW51b3VzU2NhbkNhbGxiYWNrJyBmdW5jdGlvbiBpcyBwcm92aWRlZFxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpOyBcbiAgICAgICAgdGhpcy5jaGVja1ZhbGlkU2NhblJlc3VsdChyZXN1bHQudGV4dCk7ICAgICAgICBcbiAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2Nhbi4gXCIgKyBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnN0b3AoKTtcbiAgICB9KTsgXG4gIH1cblxuICBjaGVja1ZhbGlkU2NhblJlc3VsdChzY2FuVGV4dDpzdHJpbmcpe1xuICAgIGxldCBkYXRhPSBzY2FuVGV4dC5zcGxpdCgnKycpO1xuICAgIGlmIChkYXRhLmxlbmd0aD41KXsgICAgICAgIFxuICAgICAgbGV0IHBvaGRyID0gdGhpcy5wb2xpc3QuZmlsdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICggeD0+eC4gcG9Obz09ZGF0YVswXSAmJngucG9SZWxObyA9PWRhdGFbMV0pO1xuICAgICAgaWYgKHBvaGRyLmxlbmd0aD4wKXsgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgY29uc29sZS5sb2coJ2ZvdW5kIFBPJyk7XG4gICAgICAgICBjb25zb2xlLmxvZyhwb2hkclswXSk7XG4gICAgICAgICB0aGlzLmZkX3Bvbm8gPSBwb2hkclswXS5wb05vO1xuICAgICAgICAgdGhpcy5mZF9yZWxubyA9IHBvaGRyWzBdLnBvUmVsTm87ICBcbiAgICAgICAgIHRoaXMuZmRfdmNvZGUgPSBwb2hkclswXS52ZW5kQ29kZTtcbiAgICAgICAgIHRoaXMuZmRfdm5hbWUgPSBwb2hkclswXS52ZW5kTmFtZTtcbiAgICAgICAgIFxuICAgICAgICAgbGV0IHBvZHRsPSBudWxsO1xuICAgICAgICAgaWYgKHRoaXMucG9pdGVtbGlzdCl7ICBcbiAgICAgICAgICAgICAgIHBvZHRsID0gdGhpcy5wb2l0ZW1saXN0LmZpbmRcbiAgICAgICAgICAgICAgICAgICAgICAgKHg9PngucG9Obz09cG9oZHJbMF0ucG9ObyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5wb1JlbE5vID09IHBvaGRyWzBdLnBvUmVsTm8gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHguaUNvZGU9PSBkYXRhWzNdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB4LmxpbmUgPT0gZGF0YVs0XSApO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKHBvZHRsKXtcbiAgICAgICAgICAgICAvL3VzZSBleGlzdGluZyBwb2l0ZW1cbiAgICAgICAgICAgICB0aGlzLmRpc3BseUl0ZW0ocG9kdGwpO1xuICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAvL25vdCBmb3VuZCBmZXRjaCBmcm9tIHNlcnZlclxuICAgICAgICAgICB0aGlzLmdldFBPSXRlbXNGclNjYW4ocG9oZHJbMF0ucG9Obyxwb2hkclswXS5wb1JlbE5vLGRhdGEpO1xuICAgICAgICAgfVxuICAgICAgfSAgICAgICBcbiAgXG4gICAgfVxuICAgfVxuICBcbiAgIGdldFBPSXRlbXNGclNjYW4ocG9ubyxyZWxubyxkYXRhKXtcbiAgICB0aGlzLmxpc3Rwb2l0ZW1zPVtdO1xuICAgLy8gY29uc29sZS5sb2coJ2dldCBwbyBpdGVtJyk7XG4gICAgdGhpcy5hcGlzZXIuZ2V0UE9JdGVtcyhwb25vLHJlbG5vKVxuICAgICAgICAuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgICAgICAgdGhpcy5wb2l0ZW1saXN0PSByZXNwO1xuICAgICAgICAgICB0aGlzLnBvaXRlbWxpc3QubWFwKHg9PntcbiAgICAgICAgICAgICAgdGhpcy5saXN0cG9pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOngubGluZSsnLicreC5pQ29kZSxcbiAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgICAgICAgIH0pO1xuICAgICAgICAgICBsZXQgcG9kdGwgPSB0aGlzLnBvaXRlbWxpc3QuZmluZFxuICAgICAgICAgICAgICAgICAgICAgICAoeD0+eC5wb05vPT1wb25vICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB4LnBvUmVsTm8gPT1yZWxubyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5pQ29kZT09IGRhdGFbM10gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubGluZSA9PSBkYXRhWzRdICk7XG4gICAgICAgICAgIHRoaXMuZGlzcGx5SXRlbShwb2R0bCk7ICAgICAgICBcbiAgICAgICAgfSk7XG4gIH1cblxuICBkaXNwbHlJdGVtKHBvZHRsKXtcbiAgICB0cnl7XG4gICAgIGlmIChwb2R0bCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmb3VuZCBpdGVtJykgOyAgICAgICAgXG4gICAgICAgIHRoaXMuZmRfaWNvZGUgPSBwb2R0bC5pQ29kZTsgICAgICAgICBcbiAgICAgICAgdGhpcy5mZF9pZGVzYz0gcG9kdGwuaURlcztcbiAgICAgICAgdGhpcy5mZF9wb3F0eSA9IHBvZHRsLnBvUHVyUXR5O1xuICAgICAgICB0aGlzLmZkX3B1cnVvbSA9cG9kdGwucHVyY2hhc2VVT007XG4gICAgICAgIHRoaXMuZmRfYmFsYW5jZSA9cG9kdGwuYmFsYW5jZVF0eTtcbiAgICAgICAgdGhpcy5mZF9saW5lID0gcG9kdGwubGluZTtcbiAgICAgICAgdGhpcy5mZF90dGxyZWMgPSBwb2R0bC5yZWNlaXZlZFF0eTtcbiAgICAgICAgdGhpcy5wb2l0ZW09cG9kdGw7XG4gICAgIH1lbHNlIHtcbiAgICAgICBjb25zb2xlLmxvZygnaXRlbSBub3QgZm91bmQnKTtcbiAgICAgfVxuICAgIH1jYXRjaChlKSB7XG4gICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgb25WYWxpZFJlY1F0eShxdHlyZWM6bnVtYmVyKXtcbiAgICBjb25zdCB0b2xlcmFuY2UgPSArdGhpcy5wb2l0ZW0udG9sZXJhbmNlO1xuICAgIC8vcmVjZWl2ZWQgYnV0IG5vdCBwb3N0ZWQgeWV0XG4gICAgY29uc3QgcmVjZWl2ZWRRdHkgPSB0aGlzLnBvaXRlbS5yZWNlaXZlZFF0eTsgXG4gICAgY29uc3QgdHRsUmVjdiA9IHF0eXJlYysgcmVjZWl2ZWRRdHk7XG4gICAgbGV0IHRvbHF0eT0wO1xuICAgIGlmICh0b2xlcmFuY2U+MCl7XG4gICAgICAgdG9scXR5ID0gTWF0aC50cnVuYyggdGhpcy5mZF9wb3F0eSAqICh0b2xlcmFuY2UvMTAwKSk7XG4gICAgfVxuICAgIGxldCBjYW5SZWNRdHkgPSAgdGhpcy5mZF9iYWxhbmNlKyB0b2xxdHk7XG4gICAgcmV0dXJuICh0dGxSZWN2IDw9IGNhblJlY1F0eSk7XG4gIH1cblxuICBPblNhdmVUYXAoZSl7XG4gICAgaWYgKHRoaXMuZmRfcmVjcXR5PT0wICl7XG4gICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkludmFsaWQgUXR5Li4uXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaXRlbTpHUk5SZWNlaXZlPSB0aGlzLnBvcHVsYXRlR1JOUmVjZWl2ZSgpO1xuICAgIHRoaXMuYXBpc2VyLnBvc3RHUk5SZWNlaXB0KGl0ZW0pLnN1YnNjcmliZShyZXNwPT57XG4gICAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICAgIGlmIChyZXNwLnNhdmU9PVwieWVzXCIpe1xuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlN1Y2Nlc3NmdWxseSB1cGxvYWRlZC4uLlwiKTtcbiAgICAgICAgdGhpcy5yZXNldElucHV0KCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJFcnJvciBcIityZXNwLmVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0SW5wdXQoKXtcbiAgICB0aGlzLmZkX2ljb2RlID1cIlwiO1xuICAgIHRoaXMucG9pdGVtID0gbnVsbDtcbiAgICB0aGlzLmZkX2lkZXNjPVwiXCJcbiAgICB0aGlzLmZkX2xpbmU9MDtcbiAgICB0aGlzLmZkX3B1cnVvbT1cIlwiO1xuICAgIHRoaXMuZmRfcG9xdHk9MDtcbiAgICB0aGlzLmZkX2JhbGFuY2U9MDtcbiAgICB0aGlzLmZkX3JlY3F0eT0wO1xuICB9XG5cbiAgT25DYW5jZWxUYXAoZSl7XG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9tYWluJ10se2NsZWFySGlzdG9yeTp0cnVlfSk7XG4gIH1cbiAgXG4gIHBvcHVsYXRlR1JOUmVjZWl2ZSgpOkdSTlJlY2VpdmV7XG4gICAgIGxldCBpdGVtOkdSTlJlY2VpdmUgPSBuZXcgR1JOUmVjZWl2ZSgpO1xuICAgICBpdGVtLmNyZWF0ZWRCeSA9dGhpcy51c2VyaWQ7XG4gICAgIGl0ZW0uZGF0ZVJlYyA9IHRoaXMuZmRfZGF0ZTtcbiAgICAgaXRlbS5kb25vID0gdGhpcy5mZF9kb25vO1xuICAgICBpdGVtLmlDb2RlID0gdGhpcy5mZF9pY29kZTtcbiAgICAgaXRlbS5pRGVzID0gdGhpcy5mZF9pZGVzYztcbiAgICAgaXRlbS5saW5lID0gdGhpcy5mZF9saW5lO1xuICAgICBpdGVtLnBhY2tTeiA9IHRoaXMucG9pdGVtLnBhY2tTejtcbiAgICAgaXRlbS5wb05vID0gdGhpcy5mZF9wb25vO1xuICAgICBpdGVtLnBvUHVyUXR5ID0gdGhpcy5wb2l0ZW0ucG9QdXJRdHk7XG4gICAgIGl0ZW0ucG9RdHkgPSB0aGlzLnBvaXRlbS5wb1F0eTtcbiAgICAgaXRlbS5wb1JlbE5vID0gK3RoaXMuZmRfcmVsbm87XG4gICAgIGl0ZW0ucHVyY2hhc2VVT00gPSB0aGlzLmZkX3B1cnVvbTtcbiAgICAgaXRlbS5yZWN2UXR5ID0gdGhpcy5mZF9yZWNxdHk7XG4gICAgIGl0ZW0ucmVjdlN0ZFF0eSA9IGl0ZW0ucmVjdlF0eSAqIHRoaXMucG9pdGVtLnBhY2tTejtcbiAgICAgaXRlbS5zdGRVT00gPSB0aGlzLnBvaXRlbS5zdGRVT007XG4gICAgIGl0ZW0udG9sZXJhbmNlID0gdGhpcy5wb2l0ZW0udG9sZXJhbmNlO1xuICAgICBcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuXG59XG4iXX0=