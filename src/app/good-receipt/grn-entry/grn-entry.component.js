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
var nativescript_snackbar_1 = require("nativescript-snackbar");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ModalPicker = require("nativescript-modal-datetimepicker");
var api_service_1 = require("../../core/services/api.service");
var navigation_service_1 = require("../../core/services/navigation.service");
var model_1 = require("../../core/model");
var auth_service_1 = require("../../core/services/auth-service");
var application = require("tns-core-modules/application");
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
            .pipe(operators_1.debounceTime(400)).subscribe(function (event) {
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
        //disable device back button on Android
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = true;
            });
        }
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
        core_1.ViewChild('spinWorkGR'),
        __metadata("design:type", core_1.ElementRef)
    ], GrnEntryComponent.prototype, "spinWork", void 0);
    __decorate([
        core_1.ViewChild('myContainerGR'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JuLWVudHJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdybi1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUc7QUFDbkcsK0RBQWlEO0FBQ2pELDJFQUE2RDtBQUM3RCw2QkFBaUM7QUFDakMsNENBQTZDO0FBQzdDLCtEQUFpRTtBQUVqRSwrREFBNkQ7QUFDN0QsNkVBQTJFO0FBQzNFLDBDQUFzRTtBQUN0RSxpRUFBK0Q7QUFDL0QsMERBQTREO0FBVTVEO0lBb0NFLDJCQUFvQixNQUFpQixFQUNqQixJQUFnQixFQUNoQixjQUE4QixFQUM5QixpQkFBb0M7UUFIcEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBM0J4RCxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQWUsRUFBRSxDQUFDO1FBMkIxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUFBLGlCQXNCQztRQXJCQyxVQUFVLENBQUM7WUFDUixLQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFUixJQUFJLENBQUMsWUFBWSxHQUFFLGdCQUFTLENBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQzthQUMzQyxJQUFJLENBQ0gsd0JBQVksQ0FBQyxHQUFHLENBQUMsQ0FDakIsQ0FBRSxTQUFTLENBQUMsVUFBQyxLQUFTO1lBQ25CLElBQUksS0FBSSxDQUFDLFVBQVUsRUFBQztnQkFDbEIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENB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TUFBTSxDQUFDLFNBQVMsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUF6VndCO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFXLGlCQUFVO3VEQUFDO0lBQ2xCO1FBQTNCLGdCQUFTLENBQUMsZUFBZSxDQUFDO2tDQUFjLGlCQUFVOzBEQUFDO0lBQy9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFhLGlCQUFVO3lEQUFDO0lBQ3pCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFPLGlCQUFVO21EQUFDO0lBTnpCLGlCQUFpQjtRQVA3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztZQUN4QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FzQzJCLHdCQUFVO1lBQ1osMEJBQVc7WUFDQSw0Q0FBYztZQUNYLHNDQUFpQjtPQXZDN0MsaUJBQWlCLENBOFY3QjtJQUFELHdCQUFDO0NBQUEsQUE5VkQsSUE4VkM7QUE5VlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zbmFja2Jhcic7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgTW9kYWxQaWNrZXIgZnJvbSAnbmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyJztcblxuaW1wb3J0IHsgQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBzcGxpbk9iamVjdCwgR1JOUE9JdGVtLCBHUk5SZWNlaXZlIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbCc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYXV0aC1zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWdybi1lbnRyeScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncm4tZW50cnkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncm4tZW50cnkuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcblxuZXhwb3J0IGNsYXNzIEdybkVudHJ5Q29tcG9uZW50IFxuIGltcGxlbWVudHMgT25Jbml0LEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcbiAgICBcbiAgQFZpZXdDaGlsZCgnc3BpbldvcmtHUicpIHNwaW5Xb3JrOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdteUNvbnRhaW5lckdSJykgbXlDb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJyZXZxcnRcIikgcmVjZWlwdFF0eTogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImRvbm9cIikgZG9ubzogRWxlbWVudFJlZjtcblxuICBwb2xpc3Q6YW55O1xuICBwb2l0ZW1saXN0OmFueTtcbiAgaWNvblFSOnN0cmluZztcbiAgaWNvblNwaW46c3RyaW5nO1xuICBsaXN0aXRlbXM6c3BsaW5PYmplY3RbXT1bXTtcbiAgbGlzdHBvaXRlbXM6c3BsaW5PYmplY3RbXT1bXTtcbiAgX2xvb2tvcHRpb246c3RyaW5nO1xuICBwb2l0ZW06R1JOUE9JdGVtO1xuXG4gIGZkX2RhdGU6RGF0ZTtcbiAgZmRfZG9ubzpzdHJpbmc7XG4gIGZkX3Bvbm86c3RyaW5nO1xuICBmZF9yZWxubzpzdHJpbmc7XG4gIGZkX3Zjb2RlOnN0cmluZztcbiAgZmRfdm5hbWU6c3RyaW5nO1xuICBmZF9pY29kZTpzdHJpbmc7XG4gIGZkX2lkZXNjOnN0cmluZztcbiAgZmRfbGluZTpudW1iZXI7XG4gIGZkX3B1cnVvbTpzdHJpbmc7XG4gIGZkX3BvcXR5Om51bWJlcjtcbiAgZmRfYmFsYW5jZTpudW1iZXI7XG4gIGZkX3JlY3F0eTpudW1iZXI7XG4gIGZkX3R0bHJlYzpudW1iZXI7XG5cbiAgJHF0eUxpc3RlbmVyOmFueTtcbiAgaXNSZWNRdHlWYWxpZDpib29sZWFuO1xuICBcbiAgdXNlcmlkOnN0cmluZztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlzZXI6QVBJU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICAgdGhpcy51c2VyaWQgPSBhdXRoLmdldFVzZXJJRCgpO1xuICB9XG4gXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICB0aGlzLmRvbm8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0sIDYwMCk7ICAgIFxuXG4gICAgdGhpcy4kcXR5TGlzdGVuZXI9IGZyb21FdmVudChcbiAgICAgICB0aGlzLnJlY2VpcHRRdHkubmF0aXZlRWxlbWVudCwgJ3RleHRDaGFuZ2UnKVxuICAgICAgIC5waXBlKFxuICAgICAgICAgZGVib3VuY2VUaW1lKDQwMClcbiAgICAgICAgKSAuc3Vic2NyaWJlKChldmVudDphbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZkX2JhbGFuY2Upe1xuICAgICAgICAgICAgICBjb25zdCBxdHkgPSArZXZlbnQudmFsdWU7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5vblZhbGlkUmVjUXR5KHF0eSkpe1xuICAgICAgICAgICAgICAgICAgIHRoaXMuZmRfcmVjcXR5PTA7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlY1F0eVZhbGlkID1mYWxzZTtcbiAgICAgICAgICAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlF0eSBjYW5ub3QgbW9yZSB0aGVuIFBPIHF0eSFcIik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIHRoaXMuaXNSZWNRdHlWYWxpZCA9dHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAgdGhpcy5pc1JlY1F0eVZhbGlkID1mYWxzZTtcbiAgICAgdGhpcy5mZF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgdGhpcy5pY29uUVI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDI5KTtcbiAgICAgdGhpcy5pY29uU3BpbiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMTUwKTtcbiAgICAgdGhpcy5hcGlzZXIuZ2V0R1JOUE9saXN0KCkuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgICAgICB0aGlzLnBvbGlzdD0gcmVzcDtcbiAgICAgICAgICB0aGlzLnBvbGlzdC5tYXAoeD0+e1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14LnBvTm8pPCAwKXtcbiAgICAgICAgICAgICAgdGhpcy5saXN0aXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTp4LnBvTm9cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgIC8vZGlzYWJsZSBkZXZpY2UgYmFjayBidXR0b24gb24gQW5kcm9pZFxuICAgICAgaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcbiAgICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChhcmdzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gIH1cbiAgXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICB0cnl7XG4gICAgICBpZiAodGhpcy4kcXR5TGlzdGVuZXIpe1xuICAgICAgICBjb25zb2xlLmxvZygncXR5TGlzdGVuZXIgdW5zdWJzY3JpYmUnKTtcbiAgICAgICAgdGhpcy4kcXR5TGlzdGVuZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9Y2F0Y2goZSl7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cblxuICBwaWNrRGF0ZSgpIHtcbiAgICBjb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIuTW9kYWxEYXRldGltZXBpY2tlcigpO1xuICAgIHBpY2tlci5waWNrRGF0ZSh7XG4gICAgICB0aGVtZTogJ2RhcmsnLFxuICAgICAgaXMyNEhvdXJWaWV3OiBmYWxzZVxuICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLmZkX2RhdGUgPSB0aGlzLmdldERhdGVSZXN1bHQocmVzdWx0KTsgICAgICBcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIGVycm9yKTtcbiAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldERhdGVSZXN1bHQocmVzdWx0OmFueSl7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHJlc3VsdFsneWVhciddLHJlc3VsdFsnbW9udGgnXS0xLHJlc3VsdFsnZGF5J10pOyAgICBcbiAgfVxuICBcbiAgc2hvd1BpY2tlcihvcHRpb246c3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2cob3B0aW9uKTtcbiAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuZGltbWVyQ29sb3I9XCJ0cmFuc3BhcmVudFwiO1xuICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5saXN0V2lkdGg9XCI4MCVcIjtcbiAgICB0aGlzLl9sb29rb3B0aW9uID0gb3B0aW9uO1xuICAgIHN3aXRjaChvcHRpb24pIHtcbiAgICAgIGNhc2UgXCJwb1wiOlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuaGludFRleHQ9XCJTZWxlY3QgUE8uLlwiXG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5zb3VyY2U9dGhpcy5saXN0aXRlbXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmhpbnRUZXh0PVwiU2VsZWN0IEl0ZW0uLlwiXG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5zb3VyY2U9dGhpcy5saXN0cG9pdGVtcztcbiAgICAgICAgYnJlYWs7ICAgIFxuICAgIH1cbiAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc2hvdyh0aGlzLm15Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpO1xuXG4gIH1cblxuICBjYW5jZWxGaWx0ZXJhYmxlTGlzdChlKSB7XG4gICAgY29uc29sZS5sb2coJ2NhbmNlbGVkJyk7XG4gIH1cblxuICBpdGVtVGFwcGVkKGFyZ3MpIHtcbiAgICBzd2l0Y2godGhpcy5fbG9va29wdGlvbikge1xuICAgICAgY2FzZSBcInBvXCI6XG4gICAgICAgIHRoaXMuZmRfcG9ubyA9IGFyZ3Muc2VsZWN0ZWRJdGVtLnRpdGxlOyAgICAgXG4gICAgICAgIHRoaXMucG9saXN0LmZpbHRlcih3PT53LnBvTm89PXRoaXMuZmRfcG9ubylcbiAgICAgICAgICAgIC5tYXAoeD0+e1xuICAgICAgICAgICAgICAgdGhpcy5mZF92Y29kZSA9IHgudmVuZENvZGU7XG4gICAgICAgICAgICAgICB0aGlzLmZkX3ZuYW1lID0geC52ZW5kTmFtZTtcbiAgICAgICAgICAgICAgIHRoaXMuZmRfcmVsbm8gPSB4LnBvUmVsTm8gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdldFBPSXRlbXMoKTsgICAgICAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiaXRlbVwiOlxuICAgICAgICBsZXQgY29kZSA9IGFyZ3Muc2VsZWN0ZWRJdGVtLnRpdGxlLnNwbGl0KCcuJyk7XG4gICAgICAgIHRoaXMuZmRfaWNvZGUgPSBjb2RlWzFdO1xuICAgICAgICB0aGlzLnBvaXRlbWxpc3QuZmlsdGVyKHc9PncubGluZT09Y29kZVswXSlcbiAgICAgICAgICAgIC5tYXAoeD0+e1xuICAgICAgICAgICAgICAgdGhpcy5mZF9pZGVzYz0geC5pRGVzLFxuICAgICAgICAgICAgICAgdGhpcy5mZF9wb3F0eSA9IHgucG9QdXJRdHksXG4gICAgICAgICAgICAgICB0aGlzLmZkX3B1cnVvbSA9eC5wdXJjaGFzZVVPTSxcbiAgICAgICAgICAgICAgIHRoaXMuZmRfYmFsYW5jZSA9eC5iYWxhbmNlUXR5LFxuICAgICAgICAgICAgICAgdGhpcy5mZF9saW5lID0geC5saW5lLFxuICAgICAgICAgICAgICAgdGhpcy5mZF90dGxyZWMgPSB4LnJlY2VpdmVkUXR5LFxuICAgICAgICAgICAgICAgdGhpcy5wb2l0ZW09eCAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgdGhpcy5yZWNlaXB0UXR5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXRQT0l0ZW1zKCl7XG4gICAgdGhpcy5saXN0cG9pdGVtcz1bXTtcbiAgICB0aGlzLmFwaXNlci5nZXRQT0l0ZW1zKHRoaXMuZmRfcG9ubyx0aGlzLmZkX3JlbG5vKVxuICAgICAgICAuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICAgICAgICAgdGhpcy5wb2l0ZW1saXN0PSByZXNwO1xuICAgICAgICAgICB0aGlzLnBvaXRlbWxpc3QubWFwKHg9PntcbiAgICAgICAgICAgICAgdGhpcy5saXN0cG9pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOngubGluZSsnLicreC5pQ29kZSxcbiAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgT25TY2FuKCl7XG4gICAgLy9bUE9Ob10rJysnK1tQT1JlbE5vXSsnKycrW1ZlbmRDb2RlXSsnKycrW0lDb2RlXSsnKycrW0xpbmVdKycrJytbUE9RdHldKycrJytbUHVyY2hhc2VVT01dXG4gICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcbiAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXG4gICAgICBjYW5jZWxMYWJlbDogXCJFWElULiBBbHNvLCB0cnkgdGhlIHZvbHVtZSBidXR0b25zIVwiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnQ2xvc2UnXG4gICAgICBjYW5jZWxMYWJlbEJhY2tncm91bmRDb2xvcjogXCIjMzMzMzMzXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICcjMDAwMDAwJyAoYmxhY2spXG4gICAgICBtZXNzYWdlOiBcIlVzZSB0aGUgdm9sdW1lIGJ1dHRvbnMgZm9yIGV4dHJhIGxpZ2h0XCIsIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCBpcyAnUGxhY2UgYSBiYXJjb2RlIGluc2lkZSB0aGUgdmlld2ZpbmRlciByZWN0YW5nbGUgdG8gc2NhbiBpdC4nXG4gICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSwgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsICAgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsICAgICAgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICBiZWVwT25TY2FuOiB0cnVlLCAgICAgICAgICAgICAvLyBQbGF5IG9yIFN1cHByZXNzIGJlZXAgb24gc2NhbiAoZGVmYXVsdCB0cnVlKVxuICAgICAgdG9yY2hPbjogZmFsc2UsICAgICAgICAgICAgICAgLy8gbGF1bmNoIHdpdGggdGhlIGZsYXNobGlnaHQgb24gKGRlZmF1bHQgZmFsc2UpXG4gICAgICBjbG9zZUNhbGxiYWNrOiAoKSA9PiB7IGNvbnNvbGUubG9nKFwiU2Nhbm5lciBjbG9zZWRcIil9LCAvLyBpbnZva2VkIHdoZW4gdGhlIHNjYW5uZXIgd2FzIGNsb3NlZCAoc3VjY2VzcyBvciBhYm9ydClcbiAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLCAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCAxNTAwIChtcyksIHNldCB0byAwIHRvIGRpc2FibGUgZWNob2luZyB0aGUgc2Nhbm5lZCB0ZXh0XG4gICAgLy8gb3JpZW50YXRpb246IG9yaWVudGF0aW9uLCAgICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IHVuZGVmaW5lZCAoc2Vuc29yLWRyaXZlbiBvcmllbnRhdGlvbiksIG90aGVyIG9wdGlvbnM6IHBvcnRyYWl0fGxhbmRzY2FwZVxuICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZSAvLyBPbiBpT1MgeW91IGNhbiBzZW5kIHRoZSB1c2VyIHRvIHRoZSBzZXR0aW5ncyBhcHAgaWYgYWNjZXNzIHdhcyBwcmV2aW91c2x5IGRlbmllZFxuICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIC8vIE5vdGUgdGhhdCB0aGlzIFByb21pc2UgaXMgbmV2ZXIgaW52b2tlZCB3aGVuIGEgJ2NvbnRpbnVvdXNTY2FuQ2FsbGJhY2snIGZ1bmN0aW9uIGlzIHByb3ZpZGVkXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7IFxuICAgICAgICB0aGlzLmNoZWNrVmFsaWRTY2FuUmVzdWx0KHJlc3VsdC50ZXh0KTsgICAgICAgIFxuICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBzY2FuLiBcIiArIGVycm9yTWVzc2FnZSk7XG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc3RvcCgpO1xuICAgIH0pOyBcbiAgfVxuXG4gIGNoZWNrVmFsaWRTY2FuUmVzdWx0KHNjYW5UZXh0OnN0cmluZyl7XG4gICAgbGV0IGRhdGE9IHNjYW5UZXh0LnNwbGl0KCcrJyk7XG4gICAgaWYgKGRhdGEubGVuZ3RoPjUpeyAgICAgICAgXG4gICAgICBsZXQgcG9oZHIgPSB0aGlzLnBvbGlzdC5maWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgKCB4PT54LiBwb05vPT1kYXRhWzBdICYmeC5wb1JlbE5vID09ZGF0YVsxXSk7XG4gICAgICBpZiAocG9oZHIubGVuZ3RoPjApeyAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICBjb25zb2xlLmxvZygnZm91bmQgUE8nKTtcbiAgICAgICAgIGNvbnNvbGUubG9nKHBvaGRyWzBdKTtcbiAgICAgICAgIHRoaXMuZmRfcG9ubyA9IHBvaGRyWzBdLnBvTm87XG4gICAgICAgICB0aGlzLmZkX3JlbG5vID0gcG9oZHJbMF0ucG9SZWxObzsgIFxuICAgICAgICAgdGhpcy5mZF92Y29kZSA9IHBvaGRyWzBdLnZlbmRDb2RlO1xuICAgICAgICAgdGhpcy5mZF92bmFtZSA9IHBvaGRyWzBdLnZlbmROYW1lO1xuICAgICAgICAgXG4gICAgICAgICBsZXQgcG9kdGw9IG51bGw7XG4gICAgICAgICBpZiAodGhpcy5wb2l0ZW1saXN0KXsgIFxuICAgICAgICAgICAgICAgcG9kdGwgPSB0aGlzLnBvaXRlbWxpc3QuZmluZFxuICAgICAgICAgICAgICAgICAgICAgICAoeD0+eC5wb05vPT1wb2hkclswXS5wb05vICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB4LnBvUmVsTm8gPT0gcG9oZHJbMF0ucG9SZWxObyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5pQ29kZT09IGRhdGFbM10gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHgubGluZSA9PSBkYXRhWzRdICk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAocG9kdGwpe1xuICAgICAgICAgICAgIC8vdXNlIGV4aXN0aW5nIHBvaXRlbVxuICAgICAgICAgICAgIHRoaXMuZGlzcGx5SXRlbShwb2R0bCk7XG4gICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgIC8vbm90IGZvdW5kIGZldGNoIGZyb20gc2VydmVyXG4gICAgICAgICAgIHRoaXMuZ2V0UE9JdGVtc0ZyU2Nhbihwb2hkclswXS5wb05vLHBvaGRyWzBdLnBvUmVsTm8sZGF0YSk7XG4gICAgICAgICB9XG4gICAgICB9ICAgICAgIFxuICBcbiAgICB9XG4gICB9XG4gIFxuICAgZ2V0UE9JdGVtc0ZyU2Nhbihwb25vLHJlbG5vLGRhdGEpe1xuICAgIHRoaXMubGlzdHBvaXRlbXM9W107XG4gICAvLyBjb25zb2xlLmxvZygnZ2V0IHBvIGl0ZW0nKTtcbiAgICB0aGlzLmFwaXNlci5nZXRQT0l0ZW1zKHBvbm8scmVsbm8pXG4gICAgICAgIC5zdWJzY3JpYmUocmVzcD0+e1xuICAgICAgICAgICB0aGlzLnBvaXRlbWxpc3Q9IHJlc3A7XG4gICAgICAgICAgIHRoaXMucG9pdGVtbGlzdC5tYXAoeD0+e1xuICAgICAgICAgICAgICB0aGlzLmxpc3Rwb2l0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6eC5saW5lKycuJyt4LmlDb2RlLFxuICAgICAgICAgICAgICB9KTsgICAgICAgICAgICBcbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIGxldCBwb2R0bCA9IHRoaXMucG9pdGVtbGlzdC5maW5kXG4gICAgICAgICAgICAgICAgICAgICAgICh4PT54LnBvTm89PXBvbm8gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHgucG9SZWxObyA9PXJlbG5vICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB4LmlDb2RlPT0gZGF0YVszXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5saW5lID09IGRhdGFbNF0gKTtcbiAgICAgICAgICAgdGhpcy5kaXNwbHlJdGVtKHBvZHRsKTsgICAgICAgIFxuICAgICAgICB9KTtcbiAgfVxuXG4gIGRpc3BseUl0ZW0ocG9kdGwpe1xuICAgIHRyeXtcbiAgICAgaWYgKHBvZHRsKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZvdW5kIGl0ZW0nKSA7ICAgICAgICBcbiAgICAgICAgdGhpcy5mZF9pY29kZSA9IHBvZHRsLmlDb2RlOyAgICAgICAgIFxuICAgICAgICB0aGlzLmZkX2lkZXNjPSBwb2R0bC5pRGVzO1xuICAgICAgICB0aGlzLmZkX3BvcXR5ID0gcG9kdGwucG9QdXJRdHk7XG4gICAgICAgIHRoaXMuZmRfcHVydW9tID1wb2R0bC5wdXJjaGFzZVVPTTtcbiAgICAgICAgdGhpcy5mZF9iYWxhbmNlID1wb2R0bC5iYWxhbmNlUXR5O1xuICAgICAgICB0aGlzLmZkX2xpbmUgPSBwb2R0bC5saW5lO1xuICAgICAgICB0aGlzLmZkX3R0bHJlYyA9IHBvZHRsLnJlY2VpdmVkUXR5O1xuICAgICAgICB0aGlzLnBvaXRlbT1wb2R0bDtcbiAgICAgfWVsc2Uge1xuICAgICAgIGNvbnNvbGUubG9nKCdpdGVtIG5vdCBmb3VuZCcpO1xuICAgICB9XG4gICAgfWNhdGNoKGUpIHtcbiAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cblxuICBvblZhbGlkUmVjUXR5KHF0eXJlYzpudW1iZXIpe1xuICAgIGNvbnN0IHRvbGVyYW5jZSA9ICt0aGlzLnBvaXRlbS50b2xlcmFuY2U7XG4gICAgLy9yZWNlaXZlZCBidXQgbm90IHBvc3RlZCB5ZXRcbiAgICBjb25zdCByZWNlaXZlZFF0eSA9IHRoaXMucG9pdGVtLnJlY2VpdmVkUXR5OyBcbiAgICBjb25zdCB0dGxSZWN2ID0gcXR5cmVjKyByZWNlaXZlZFF0eTtcbiAgICBsZXQgdG9scXR5PTA7XG4gICAgaWYgKHRvbGVyYW5jZT4wKXtcbiAgICAgICB0b2xxdHkgPSBNYXRoLnRydW5jKCB0aGlzLmZkX3BvcXR5ICogKHRvbGVyYW5jZS8xMDApKTtcbiAgICB9XG4gICAgbGV0IGNhblJlY1F0eSA9ICB0aGlzLmZkX2JhbGFuY2UrIHRvbHF0eTtcbiAgICByZXR1cm4gKHR0bFJlY3YgPD0gY2FuUmVjUXR5KTtcbiAgfVxuXG4gIE9uU2F2ZVRhcChlKXtcbiAgICBpZiAodGhpcy5mZF9yZWNxdHk9PTAgKXtcbiAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW52YWxpZCBRdHkuLi5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBpdGVtOkdSTlJlY2VpdmU9IHRoaXMucG9wdWxhdGVHUk5SZWNlaXZlKCk7XG4gICAgdGhpcy5hcGlzZXIucG9zdEdSTlJlY2VpcHQoaXRlbSkuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgICAgaWYgKHJlc3Auc2F2ZT09XCJ5ZXNcIil7XG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiU3VjY2Vzc2Z1bGx5IHVwbG9hZGVkLi4uXCIpO1xuICAgICAgICB0aGlzLnJlc2V0SW5wdXQoKTtcbiAgICAgIH1lbHNle1xuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkVycm9yIFwiK3Jlc3AuZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRJbnB1dCgpe1xuICAgIHRoaXMuZmRfaWNvZGUgPVwiXCI7XG4gICAgdGhpcy5wb2l0ZW0gPSBudWxsO1xuICAgIHRoaXMuZmRfaWRlc2M9XCJcIlxuICAgIHRoaXMuZmRfbGluZT0wO1xuICAgIHRoaXMuZmRfcHVydW9tPVwiXCI7XG4gICAgdGhpcy5mZF9wb3F0eT0wO1xuICAgIHRoaXMuZmRfYmFsYW5jZT0wO1xuICAgIHRoaXMuZmRfcmVjcXR5PTA7XG4gIH1cblxuICBPbkNhbmNlbFRhcChlKXtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL21haW4nXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcbiAgfVxuICBcbiAgcG9wdWxhdGVHUk5SZWNlaXZlKCk6R1JOUmVjZWl2ZXtcbiAgICAgbGV0IGl0ZW06R1JOUmVjZWl2ZSA9IG5ldyBHUk5SZWNlaXZlKCk7XG4gICAgIGl0ZW0uY3JlYXRlZEJ5ID10aGlzLnVzZXJpZDtcbiAgICAgaXRlbS5kYXRlUmVjID0gdGhpcy5mZF9kYXRlO1xuICAgICBpdGVtLmRvbm8gPSB0aGlzLmZkX2Rvbm87XG4gICAgIGl0ZW0uaUNvZGUgPSB0aGlzLmZkX2ljb2RlO1xuICAgICBpdGVtLmlEZXMgPSB0aGlzLmZkX2lkZXNjO1xuICAgICBpdGVtLmxpbmUgPSB0aGlzLmZkX2xpbmU7XG4gICAgIGl0ZW0ucGFja1N6ID0gdGhpcy5wb2l0ZW0ucGFja1N6O1xuICAgICBpdGVtLnBvTm8gPSB0aGlzLmZkX3Bvbm87XG4gICAgIGl0ZW0ucG9QdXJRdHkgPSB0aGlzLnBvaXRlbS5wb1B1clF0eTtcbiAgICAgaXRlbS5wb1F0eSA9IHRoaXMucG9pdGVtLnBvUXR5O1xuICAgICBpdGVtLnBvUmVsTm8gPSArdGhpcy5mZF9yZWxubztcbiAgICAgaXRlbS5wdXJjaGFzZVVPTSA9IHRoaXMuZmRfcHVydW9tO1xuICAgICBpdGVtLnJlY3ZRdHkgPSB0aGlzLmZkX3JlY3F0eTtcbiAgICAgaXRlbS5yZWN2U3RkUXR5ID0gaXRlbS5yZWN2UXR5ICogdGhpcy5wb2l0ZW0ucGFja1N6O1xuICAgICBpdGVtLnN0ZFVPTSA9IHRoaXMucG9pdGVtLnN0ZFVPTTtcbiAgICAgaXRlbS50b2xlcmFuY2UgPSB0aGlzLnBvaXRlbS50b2xlcmFuY2U7XG4gICAgIFxuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbn1cbiJdfQ==