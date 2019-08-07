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
var ModalPicker = require("nativescript-modal-datetimepicker");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var services_1 = require("../../core/services");
var navigation_service_1 = require("../../core/services/navigation.service");
var model_1 = require("../../core/model");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var application = require("tns-core-modules/application");
var DailyOutputComponent = /** @class */ (function () {
    function DailyOutputComponent(apiser, barcodeScanner, navigationService) {
        this.apiser = apiser;
        this.barcodeScanner = barcodeScanner;
        this.navigationService = navigationService;
        this.listitems = [];
        this.wclistitems = [];
        this.proclistitems = [];
        this.macclistitems = [];
        this.maccodes = [];
        this.oprcodes = [];
        this.showError = false;
        this.showspin = false;
        this.showspin2 = false;
        this.fd_date = new Date();
        this.fd_time = new Date();
    }
    DailyOutputComponent.prototype.ngOnInit = function () {
        this.iconQR = String.fromCharCode(0xf029);
        this.iconSpin = String.fromCharCode(0xf150);
        this.getWorkOrder();
        this.getWorkOperators();
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = true;
            });
        }
    };
    DailyOutputComponent.prototype.getWorkOrder = function () {
        var _this = this;
        this.apiser.getDailyWorkOrders().subscribe(function (resp) {
            _this.showError = false;
            _this.wolist = resp.value;
            _this.wolist.map(function (x) {
                if (_this.listitems.findIndex(function (y) { return y.title == x.scheCode; }) < 0) {
                    _this.listitems.push({
                        title: x.scheCode
                    });
                }
            });
            _this.showspin = true;
        }, function (err) {
            _this.showspin = false;
            _this.showError = true;
            _this.errmsg = "Error fetching Work Orders from server.";
        });
    };
    DailyOutputComponent.prototype.getWorkOperators = function () {
        var _this = this;
        this.apiser.getProdRefCodes().subscribe(function (resp) {
            _this.refcodes = resp.value;
            if (_this.refcodes) {
                _this.refcodes.map(function (x) {
                    if (x.codeType == "mac") {
                        _this.maccodes.push(x);
                    }
                    else if (x.codeType == "opr") {
                        _this.oprcodes.push({
                            title: x.code
                        });
                    }
                });
                _this.showspin2 = true;
            }
        }, function (err) {
            _this.showspin2 = false;
            _this.showError = true;
            _this.errmsg = "Error fetching data from server.";
        });
    };
    DailyOutputComponent.prototype.cancelFilterableList = function (e) {
        console.log('canceled');
    };
    DailyOutputComponent.prototype.itemTapped = function (args) {
        var _this = this;
        console.log(args.selectedItem.title);
        console.log(this._lookoption);
        switch (this._lookoption) {
            case "wo":
                this.fd_wo = args.selectedItem.title;
                this.wolist.filter(function (w) { return w.scheCode == _this.fd_wo; })
                    .map(function (x) {
                    _this.fd_prod = x.prodCode;
                });
                break;
            case "center":
                this.fd_wccode = args.selectedItem.title;
                break;
            case "process":
                this.fd_procee = args.selectedItem.title;
                break;
            case "planMac":
                this.fd_macplan = args.selectedItem.title;
                break;
            case "actMac":
                this.fd_macact = args.selectedItem.title;
                break;
            case "operator":
                this.fd_operator = args.selectedItem.title;
                break;
        }
    };
    DailyOutputComponent.prototype.showPicker = function (option) {
        console.log(option);
        this.spinWork.nativeElement.dimmerColor = "transparent";
        this.spinWork.nativeElement.listWidth = "80%";
        this._lookoption = option;
        switch (option) {
            case "wo":
                this.spinWork.nativeElement.hintText = "Work Order..";
                this.spinWork.nativeElement.source = this.listitems;
                break;
            case "center":
                this.getWorkCenters();
                this.spinWork.nativeElement.hintText = "Work Center..";
                this.spinWork.nativeElement.source = this.wclistitems;
                break;
            case "process":
                this.getWorkProcess();
                this.spinWork.nativeElement.hintText = "Work Process..";
                this.spinWork.nativeElement.source = this.wclistitems;
                break;
            case "planMac":
                this.getWorkMachine();
                this.spinWork.nativeElement.hintText = "Plan Machine..";
                this.spinWork.nativeElement.source = this.wclistitems;
                break;
            case "actMac":
                this.getWorkAllMachine();
                this.spinWork.nativeElement.hintText = "Actual Machine..";
                this.spinWork.nativeElement.source = this.wclistitems;
                break;
            case "operator":
                this.getOperators();
                this.spinWork.nativeElement.hintText = "Operator..";
                this.spinWork.nativeElement.source = this.wclistitems;
                break;
        }
        this.spinWork.nativeElement.show(this.myContainer.nativeElement);
    };
    DailyOutputComponent.prototype.getWorkCenters = function () {
        var _this = this;
        this.wclistitems = [];
        this.wolist.filter(function (w) { return w.scheCode == _this.fd_wo; })
            .map(function (x) {
            if (_this.wclistitems.findIndex(function (y) { return y.title == x.wcCode; }) < 0) {
                _this.wclistitems.push({
                    title: x.wcCode
                });
            }
        });
    };
    DailyOutputComponent.prototype.getWorkProcess = function () {
        var _this = this;
        this.wclistitems = [];
        this.wolist.filter(function (w) { return w.scheCode == _this.fd_wo && w.wcCode == _this.fd_wccode; })
            .map(function (x) {
            if (_this.wclistitems.findIndex(function (y) { return y.title == x.nextProcess; }) < 0) {
                _this.wclistitems.push({
                    title: x.nextProcess
                });
            }
        });
    };
    DailyOutputComponent.prototype.getOperators = function () {
        this.wclistitems = [];
        this.wclistitems = this.oprcodes.slice();
    };
    DailyOutputComponent.prototype.getWorkMachine = function () {
        var _this = this;
        this.wclistitems = [];
        this.wolist.filter(function (w) { return w.scheCode == _this.fd_wo &&
            w.wcCode == _this.fd_wccode &&
            w.nextProcess == _this.fd_procee; })
            .map(function (x) {
            if (_this.wclistitems.findIndex(function (y) { return y.title == x.machineCode; }) < 0) {
                _this.wclistitems.push({
                    title: x.machineCode
                });
            }
        });
    };
    DailyOutputComponent.prototype.getWorkAllMachine = function () {
        var _this = this;
        this.wclistitems = [];
        console.log(this.maccodes);
        this.maccodes.filter(function (w) { return w.name == _this.fd_procee; })
            .map(function (x) {
            if (_this.wclistitems.findIndex(function (y) { return y.title == x.code; }) < 0) {
                _this.wclistitems.push({
                    title: x.code
                });
            }
        });
    };
    DailyOutputComponent.prototype.pickDate = function () {
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
    DailyOutputComponent.prototype.pickTime = function () {
        var _this = this;
        var picker = new ModalPicker.ModalDatetimepicker();
        picker.pickTime({
            theme: 'dark',
            is24HourView: true
        }).then(function (result) {
            _this.fd_time = _this.getTimeResult(result);
        }).catch(function (error) {
            console.log('Error: ' + error);
            (new nativescript_snackbar_1.SnackBar()).simple(error);
        });
    };
    DailyOutputComponent.prototype.getDateResult = function (result) {
        console.log(result);
        return new Date(result['year'], result['month'] - 1, result['day']);
    };
    DailyOutputComponent.prototype.getTimeResult = function (result) {
        var d = new Date();
        return new Date(d.getFullYear(), d.getMonth() - 1, d.getDate(), result['hour'], result['minute'], 0, 0);
    };
    DailyOutputComponent.prototype.OnScan = function () {
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
            _this.checkValidScanResult(result.text);
        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
            _this.barcodeScanner.stop();
        });
    };
    DailyOutputComponent.prototype.checkValidScanResult = function (scanText) {
        var data = scanText.split('+');
        if (data.length > 5) {
            var workorder = this.wolist.filter(function (x) { return x.scheCode == data[0] &&
                x.relNo == data[1] &&
                x.wcCode == data[2] &&
                x.wciCode == data[3] &&
                x.nextProcess == data[4]; });
            if (workorder) {
                this.fd_wo = data[0];
                this.fd_wccode = data[2];
                this.fd_procee = data[4];
                this.fd_macplan = data[5];
                this.fd_macact = data[5];
                this.fd_prod = data[5];
                this.fd_operator = "";
            }
            else {
                (new nativescript_snackbar_1.SnackBar()).simple("Work Order info not found...");
            }
        }
    };
    DailyOutputComponent.prototype.OnSaveTap = function (e) {
        var _this = this;
        var daily = this.populateDailyInput();
        this.apiser.postDailyInput(daily).subscribe(function (resp) {
            console.log(resp);
            var data = resp.value;
            _this.showError = true;
            if (data.ok == "yes") {
                _this.errmsg = "Successfully uploaded...";
                _this.resetInput();
            }
            else {
                _this.errmsg = data.error;
            }
        }, function (err) {
            _this.showError = true;
            _this.errmsg = err.statusText;
        });
    };
    DailyOutputComponent.prototype.resetInput = function () {
        this.fd_good = 0;
        this.fd_macact = "";
        this.fd_operator = "";
        this.fd_procee = "";
        this.fd_prod = "";
        this.fd_reject = 0;
        this.fd_scrap = 0;
        this.fd_wccode = "";
        this.fd_wo = "";
    };
    DailyOutputComponent.prototype.OnCancelTap = function (e) {
        this.navigationService.navigate(['/main'], { clearHistory: true });
    };
    DailyOutputComponent.prototype.populateDailyInput = function () {
        var daily = new model_1.DailyInput();
        daily.date = new Date();
        daily.timeSlot = this.fd_time.getHours() + ":" + this.fd_time.getMinutes();
        daily.scheCode = this.fd_wo;
        daily.relNo = 1;
        daily.wCCode = this.fd_wccode;
        daily.processCode = this.fd_procee;
        daily.machineCode = this.fd_macplan;
        daily.machineCodeAct = this.fd_macact;
        daily.operatorAct = this.fd_operator;
        daily.qtyAct = this.fd_good || 0;
        daily.qtyScrap = this.fd_scrap || 0;
        daily.qtyReject = this.fd_reject || 0;
        var workorder = this.wolist.filter(function (x) { return x.scheCode == daily.scheCode &&
            x.wcCode == daily.wCCode &&
            x.nextProcess == daily.processCode; });
        if (workorder) {
            daily.wCICode = workorder[0].wciCode;
            daily.prodCode = workorder[0].prodCode;
            daily.operator = workorder[0].operator;
            console.log(daily);
        }
        else {
            console.log('Invalid work order info...');
        }
        return daily;
    };
    __decorate([
        core_1.ViewChild('spinWork'),
        __metadata("design:type", core_1.ElementRef)
    ], DailyOutputComponent.prototype, "spinWork", void 0);
    __decorate([
        core_1.ViewChild('myContainer'),
        __metadata("design:type", core_1.ElementRef)
    ], DailyOutputComponent.prototype, "myContainer", void 0);
    DailyOutputComponent = __decorate([
        core_1.Component({
            selector: 'ns-daily-output',
            templateUrl: './daily-output.component.html',
            styleUrls: ['./daily-output.component.css'],
            moduleId: module.id.toString(),
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            nativescript_barcodescanner_1.BarcodeScanner,
            navigation_service_1.NavigationService])
    ], DailyOutputComponent);
    return DailyOutputComponent;
}());
exports.DailyOutputComponent = DailyOutputComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFpbHktb3V0cHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhaWx5LW91dHB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUU7QUFHekUsK0RBQWlFO0FBQ2pFLCtEQUFpRDtBQUVqRCxnREFBaUQ7QUFDakQsNkVBQTJFO0FBRTNFLDBDQUFrRTtBQUVsRSwyRUFBNkQ7QUFDN0QsMERBQTREO0FBUzVEO0lBbUNFLDhCQUFvQixNQUFpQixFQUNqQixjQUE4QixFQUM5QixpQkFBb0M7UUFGcEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXpCeEQsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUMzQixnQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUMvQixrQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUcvQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFtQnZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUUsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUUsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDRyxJQUFJLENBQUMsTUFBTSxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FB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LE1BQU0sSUFBRSxLQUFLLENBQUMsTUFBTTtZQUN0QixDQUFDLENBQUMsV0FBVyxJQUFFLEtBQUssQ0FBQyxXQUFXLEVBRmhDLENBRWdDLENBQUMsQ0FBQztRQUN4RSxJQUFJLFNBQVMsRUFBQztZQUNWLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNyQyxLQUFLLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDdkMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7YUFBSTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUMzQztRQUNMLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQTFYc0I7UUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7a0NBQVcsaUJBQVU7MERBQUM7SUFDbEI7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWMsaUJBQVU7NkRBQUM7SUFIdkMsb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7WUFDM0MsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1NBQy9CLENBQUM7eUNBb0MyQixxQkFBVTtZQUNELDRDQUFjO1lBQ1gsc0NBQWlCO09BckM3QyxvQkFBb0IsQ0E2WGhDO0lBQUQsMkJBQUM7Q0FBQSxBQTdYRCxJQTZYQztBQTdYWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuaW1wb3J0ICogYXMgTW9kYWxQaWNrZXIgZnJvbSAnbmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcblxuaW1wb3J0IHsgQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XG5cbmltcG9ydCB7IFJlZkNvZGUsRGFpbHlJbnB1dCxzcGxpbk9iamVjdCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwnO1xuXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1kYWlseS1vdXRwdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGFpbHktb3V0cHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGFpbHktb3V0cHV0LmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZC50b1N0cmluZygpLFxufSlcbmV4cG9ydCBjbGFzcyBEYWlseU91dHB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gXG4gIEBWaWV3Q2hpbGQoJ3NwaW5Xb3JrJykgc3Bpbldvcms6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ215Q29udGFpbmVyJykgbXlDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgc2hvd0Vycm9yOmJvb2xlYW47XG4gIHNob3dzcGluOmJvb2xlYW47XG4gIHNob3dzcGluMjpib29sZWFuO1xuICBlcnJtc2c6c3RyaW5nO1xuICBcbiAgaWNvblFSOnN0cmluZztcbiAgaWNvblNwaW46c3RyaW5nO1xuICBsaXN0aXRlbXM6c3BsaW5PYmplY3RbXT1bXTtcbiAgd2NsaXN0aXRlbXM6c3BsaW5PYmplY3RbXT1bXTtcbiAgcHJvY2xpc3RpdGVtczpzcGxpbk9iamVjdFtdPVtdO1xuICBtYWNjbGlzdGl0ZW1zOnNwbGluT2JqZWN0W109W107XG4gIHdvbGlzdDphbnk7XG4gIHJlZmNvZGVzOmFueTtcbiAgbWFjY29kZXM6UmVmQ29kZVtdPVtdO1xuICBvcHJjb2RlczpzcGxpbk9iamVjdFtdPVtdO1xuICBfbG9va29wdGlvbjpzdHJpbmc7XG4gIFxuICBmZF9kYXRlOkRhdGU7XG4gIGZkX3RpbWU6RGF0ZTtcbiAgZmRfd286c3RyaW5nO1xuICBmZF93Y2NvZGU6c3RyaW5nO1xuICBmZF9wcm9jZWU6c3RyaW5nO1xuICBmZF9tYWNwbGFuOnN0cmluZztcbiAgZmRfbWFjYWN0OnN0cmluZztcbiAgZmRfcHJvZDpzdHJpbmc7XG4gIGZkX29wZXJhdG9yOnN0cmluZztcbiAgZmRfZ29vZDpudW1iZXI7XG4gIGZkX3JlamVjdDpudW1iZXI7XG4gIGZkX3NjcmFwOm51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaXNlcjpBUElTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICAgdGhpcy5zaG93RXJyb3IgPSBmYWxzZTtcbiAgICAgdGhpcy5zaG93c3BpbiA9ZmFsc2U7XG4gICAgIHRoaXMuc2hvd3NwaW4yID1mYWxzZTtcbiAgICAgdGhpcy5mZF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgdGhpcy5mZF90aW1lID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgICB0aGlzLmljb25RUj0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwMjkpO1xuICAgICB0aGlzLmljb25TcGluID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxNTApO1xuICAgICBcbiAgICAgdGhpcy5nZXRXb3JrT3JkZXIoKTtcbiAgICAgdGhpcy5nZXRXb3JrT3BlcmF0b3JzKCk7XG4gICAgICAgICAgXG4gICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG4gICAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGFyZ3M6IGFueSkgPT4ge1xuICAgICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICB9XG5cbiAgZ2V0V29ya09yZGVyKCl7XG4gICAgdGhpcy5hcGlzZXIuZ2V0RGFpbHlXb3JrT3JkZXJzKCkuc3Vic2NyaWJlKFxuICAgICAgKHJlc3A6YW55KT0+e1xuICAgICAgICB0aGlzLnNob3dFcnJvcj1mYWxzZTtcbiAgICAgICAgdGhpcy53b2xpc3Q9IHJlc3AudmFsdWU7XG4gICAgICAgIHRoaXMud29saXN0Lm1hcCh4PT57XG4gICAgICAgICAgaWYgKHRoaXMubGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14LnNjaGVDb2RlKTwgMCl7XG4gICAgICAgICAgICAgdGhpcy5saXN0aXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6eC5zY2hlQ29kZVxuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2hvd3NwaW4gPXRydWU7XG4gICAgICB9LFxuICAgICAgKGVycik9PntcbiAgICAgICAgdGhpcy5zaG93c3BpbiA9ZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd0Vycm9yPXRydWU7XG4gICAgICAgIHRoaXMuZXJybXNnID1cIkVycm9yIGZldGNoaW5nIFdvcmsgT3JkZXJzIGZyb20gc2VydmVyLlwiIDsgICAgICAgICAgXG4gICAgICB9KTtcbiAgfVxuXG4gIGdldFdvcmtPcGVyYXRvcnMoKXtcbiAgICB0aGlzLmFwaXNlci5nZXRQcm9kUmVmQ29kZXMoKS5zdWJzY3JpYmUoKHJlc3A6YW55KT0+e1xuICAgICAgdGhpcy5yZWZjb2RlcyA9IHJlc3AudmFsdWU7XG4gICAgICBpZiAodGhpcy5yZWZjb2Rlcyl7XG4gICAgICAgICAgIHRoaXMucmVmY29kZXMubWFwKHg9PntcbiAgICAgICAgICAgICAgICBpZiAoeC5jb2RlVHlwZT09XCJtYWNcIil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFjY29kZXMucHVzaCh4KTsgXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKHguY29kZVR5cGU9PVwib3ByXCIpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wcmNvZGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOnguY29kZVxuICAgICAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zaG93c3BpbjIgPXRydWU7XG4gICAgICB9XG4gICAgfSxcbiAgICAoZXJyKT0+e1xuICAgICAgdGhpcy5zaG93c3BpbjIgPWZhbHNlO1xuICAgICAgdGhpcy5zaG93RXJyb3I9dHJ1ZTtcbiAgICAgIHRoaXMuZXJybXNnID1cIkVycm9yIGZldGNoaW5nIGRhdGEgZnJvbSBzZXJ2ZXIuXCIgOyAgICAgICAgICBcbiAgICB9KTsgICAgXG4gIH1cblxuICBjYW5jZWxGaWx0ZXJhYmxlTGlzdChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnY2FuY2VsZWQnKTtcbiAgfVxuXG4gIGl0ZW1UYXBwZWQoYXJncykge1xuICAgICAgY29uc29sZS5sb2coYXJncy5zZWxlY3RlZEl0ZW0udGl0bGUpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5fbG9va29wdGlvbilcbiAgICAgIHN3aXRjaCh0aGlzLl9sb29rb3B0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJ3b1wiOlxuICAgICAgICAgIHRoaXMuZmRfd28gPSBhcmdzLnNlbGVjdGVkSXRlbS50aXRsZTsgICAgIFxuICAgICAgICAgIHRoaXMud29saXN0LmZpbHRlcih3PT53LnNjaGVDb2RlPT10aGlzLmZkX3dvKVxuICAgICAgICAgICAgICAubWFwKHg9PntcbiAgICAgICAgICAgICAgICAgdGhpcy5mZF9wcm9kID0geC5wcm9kQ29kZTtcbiAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjZW50ZXJcIjpcbiAgICAgICAgICB0aGlzLmZkX3djY29kZSA9IGFyZ3Muc2VsZWN0ZWRJdGVtLnRpdGxlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicHJvY2Vzc1wiOlxuICAgICAgICAgIHRoaXMuZmRfcHJvY2VlID0gYXJncy5zZWxlY3RlZEl0ZW0udGl0bGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwbGFuTWFjXCI6XG4gICAgICAgICAgdGhpcy5mZF9tYWNwbGFuID0gYXJncy5zZWxlY3RlZEl0ZW0udGl0bGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhY3RNYWNcIjpcbiAgICAgICAgICB0aGlzLmZkX21hY2FjdCA9IGFyZ3Muc2VsZWN0ZWRJdGVtLnRpdGxlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3BlcmF0b3JcIjpcbiAgICAgICAgICB0aGlzLmZkX29wZXJhdG9yID0gYXJncy5zZWxlY3RlZEl0ZW0udGl0bGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH1cblxuICBzaG93UGlja2VyKG9wdGlvbjpzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhvcHRpb24pO1xuICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5kaW1tZXJDb2xvcj1cInRyYW5zcGFyZW50XCI7XG4gICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50Lmxpc3RXaWR0aD1cIjgwJVwiO1xuICAgIHRoaXMuX2xvb2tvcHRpb24gPSBvcHRpb247XG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgY2FzZSBcIndvXCI6XG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIldvcmsgT3JkZXIuLlwiXG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5zb3VyY2U9dGhpcy5saXN0aXRlbXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICAgdGhpcy5nZXRXb3JrQ2VudGVycygpXG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIldvcmsgQ2VudGVyLi5cIlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc291cmNlPXRoaXMud2NsaXN0aXRlbXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInByb2Nlc3NcIjpcbiAgICAgICAgdGhpcy5nZXRXb3JrUHJvY2VzcygpO1xuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuaGludFRleHQ9XCJXb3JrIFByb2Nlc3MuLlwiXG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5zb3VyY2U9dGhpcy53Y2xpc3RpdGVtcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicGxhbk1hY1wiOlxuICAgICAgICB0aGlzLmdldFdvcmtNYWNoaW5lKCk7XG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIlBsYW4gTWFjaGluZS4uXCJcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNvdXJjZT10aGlzLndjbGlzdGl0ZW1zO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJhY3RNYWNcIjpcbiAgICAgICAgdGhpcy5nZXRXb3JrQWxsTWFjaGluZSgpO1xuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuaGludFRleHQ9XCJBY3R1YWwgTWFjaGluZS4uXCJcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNvdXJjZT10aGlzLndjbGlzdGl0ZW1zO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJvcGVyYXRvclwiOlxuICAgICAgICB0aGlzLmdldE9wZXJhdG9ycygpO1xuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuaGludFRleHQ9XCJPcGVyYXRvci4uXCJcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNvdXJjZT10aGlzLndjbGlzdGl0ZW1zO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNob3codGhpcy5teUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIGdldFdvcmtDZW50ZXJzKCl7XG4gICAgdGhpcy53Y2xpc3RpdGVtcz1bXTtcbiAgICB0aGlzLndvbGlzdC5maWx0ZXIodz0+dy5zY2hlQ29kZT09dGhpcy5mZF93bylcbiAgICAgIC5tYXAoeD0+e1xuICAgICAgICAgIGlmICh0aGlzLndjbGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14LndjQ29kZSk8IDApe1xuICAgICAgICAgICAgdGhpcy53Y2xpc3RpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTp4LndjQ29kZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0V29ya1Byb2Nlc3MoKXtcbiAgICB0aGlzLndjbGlzdGl0ZW1zPVtdO1xuICAgIHRoaXMud29saXN0LmZpbHRlcih3PT53LnNjaGVDb2RlPT10aGlzLmZkX3dvICYmIHcud2NDb2RlID09IHRoaXMuZmRfd2Njb2RlIClcbiAgICAgIC5tYXAoeD0+e1xuICAgICAgICAgIGlmICh0aGlzLndjbGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14Lm5leHRQcm9jZXNzKTwgMCl7XG4gICAgICAgICAgICB0aGlzLndjbGlzdGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOngubmV4dFByb2Nlc3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldE9wZXJhdG9ycygpe1xuICAgIHRoaXMud2NsaXN0aXRlbXM9IFtdO1xuICAgIHRoaXMud2NsaXN0aXRlbXM9Wy4uLnRoaXMub3ByY29kZXNdOyAgICBcbiAgfVxuXG4gIGdldFdvcmtNYWNoaW5lKCl7XG4gICAgdGhpcy53Y2xpc3RpdGVtcz1bXTtcbiAgICB0aGlzLndvbGlzdC5maWx0ZXIodz0+dy5zY2hlQ29kZT09dGhpcy5mZF93byAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB3LndjQ29kZSA9PSB0aGlzLmZkX3djY29kZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB3Lm5leHRQcm9jZXNzID09IHRoaXMuZmRfcHJvY2VlIClcbiAgICAgIC5tYXAoeD0+e1xuICAgICAgICAgIGlmICh0aGlzLndjbGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14Lm1hY2hpbmVDb2RlKTwgMCl7XG4gICAgICAgICAgICB0aGlzLndjbGlzdGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOngubWFjaGluZUNvZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFdvcmtBbGxNYWNoaW5lKCl7XG4gICAgdGhpcy53Y2xpc3RpdGVtcz1bXTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm1hY2NvZGVzKTtcbiAgICB0aGlzLm1hY2NvZGVzLmZpbHRlcih3PT53Lm5hbWU9PXRoaXMuZmRfcHJvY2VlKVxuICAgICAgLm1hcCh4PT57XG4gICAgICAgICAgaWYgKHRoaXMud2NsaXN0aXRlbXMuZmluZEluZGV4KHk9PnkudGl0bGU9PXguY29kZSk8IDApe1xuICAgICAgICAgICAgdGhpcy53Y2xpc3RpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTp4LmNvZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBcbiAgcGlja0RhdGUoKSB7XG4gICAgY29uc3QgcGlja2VyID0gbmV3IE1vZGFsUGlja2VyLk1vZGFsRGF0ZXRpbWVwaWNrZXIoKTtcbiAgICBwaWNrZXIucGlja0RhdGUoe1xuICAgICAgdGhlbWU6ICdkYXJrJyxcbiAgICAgIGlzMjRIb3VyVmlldzogZmFsc2VcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5mZF9kYXRlID0gdGhpcy5nZXREYXRlUmVzdWx0KHJlc3VsdCk7ICAgICAgXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBwaWNrVGltZSgpIHtcbiAgICBjb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIuTW9kYWxEYXRldGltZXBpY2tlcigpO1xuICAgIHBpY2tlci5waWNrVGltZSh7XG4gICAgICB0aGVtZTogJ2RhcmsnLFxuICAgICAgaXMyNEhvdXJWaWV3OiB0cnVlXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMuZmRfdGltZSA9IHRoaXMuZ2V0VGltZVJlc3VsdChyZXN1bHQpOyAgICAgIFxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGF0ZVJlc3VsdChyZXN1bHQ6YW55KXtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIHJldHVybiBuZXcgRGF0ZShyZXN1bHRbJ3llYXInXSxyZXN1bHRbJ21vbnRoJ10tMSxyZXN1bHRbJ2RheSddKTsgICAgXG4gIH1cblxuICBnZXRUaW1lUmVzdWx0KHJlc3VsdDphbnkpe1xuICAgIGxldCBkOkRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksZC5nZXRNb250aCgpLTEsZC5nZXREYXRlKCksIHJlc3VsdFsnaG91ciddLHJlc3VsdFsnbWludXRlJ10sMCwwKTsgICAgXG4gIH1cblxuICBPblNjYW4oKXtcbiAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xuICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcbiAgICAgIGNhbmNlbExhYmVsOiBcIkVYSVQuIEFsc28sIHRyeSB0aGUgdm9sdW1lIGJ1dHRvbnMhXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICdDbG9zZSdcbiAgICAgIGNhbmNlbExhYmVsQmFja2dyb3VuZENvbG9yOiBcIiMzMzMzMzNcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJyMwMDAwMDAnIChibGFjaylcbiAgICAgIG1lc3NhZ2U6IFwiVXNlIHRoZSB2b2x1bWUgYnV0dG9ucyBmb3IgZXh0cmEgbGlnaHRcIiwgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IGlzICdQbGFjZSBhIGJhcmNvZGUgaW5zaWRlIHRoZSB2aWV3ZmluZGVyIHJlY3RhbmdsZSB0byBzY2FuIGl0LidcbiAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLCAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSwgICAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSwgICAgICAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIGJlZXBPblNjYW46IHRydWUsICAgICAgICAgICAgIC8vIFBsYXkgb3IgU3VwcHJlc3MgYmVlcCBvbiBzY2FuIChkZWZhdWx0IHRydWUpXG4gICAgICB0b3JjaE9uOiBmYWxzZSwgICAgICAgICAgICAgICAvLyBsYXVuY2ggd2l0aCB0aGUgZmxhc2hsaWdodCBvbiAoZGVmYXVsdCBmYWxzZSlcbiAgICAgIGNsb3NlQ2FsbGJhY2s6ICgpID0+IHsgY29uc29sZS5sb2coXCJTY2FubmVyIGNsb3NlZFwiKX0sIC8vIGludm9rZWQgd2hlbiB0aGUgc2Nhbm5lciB3YXMgY2xvc2VkIChzdWNjZXNzIG9yIGFib3J0KVxuICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IDE1MDAgKG1zKSwgc2V0IHRvIDAgdG8gZGlzYWJsZSBlY2hvaW5nIHRoZSBzY2FubmVkIHRleHRcbiAgICAvLyBvcmllbnRhdGlvbjogb3JpZW50YXRpb24sICAgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgdW5kZWZpbmVkIChzZW5zb3ItZHJpdmVuIG9yaWVudGF0aW9uKSwgb3RoZXIgb3B0aW9uczogcG9ydHJhaXR8bGFuZHNjYXBlXG4gICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlIC8vIE9uIGlPUyB5b3UgY2FuIHNlbmQgdGhlIHVzZXIgdG8gdGhlIHNldHRpbmdzIGFwcCBpZiBhY2Nlc3Mgd2FzIHByZXZpb3VzbHkgZGVuaWVkXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gTm90ZSB0aGF0IHRoaXMgUHJvbWlzZSBpcyBuZXZlciBpbnZva2VkIHdoZW4gYSAnY29udGludW91c1NjYW5DYWxsYmFjaycgZnVuY3Rpb24gaXMgcHJvdmlkZWRcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsgXG4gICAgICAgIHRoaXMuY2hlY2tWYWxpZFNjYW5SZXN1bHQocmVzdWx0LnRleHQpOyAgICAgICAgXG4gICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNjYW4uIFwiICsgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zdG9wKCk7XG4gICAgfSk7IFxuIH1cblxuIGNoZWNrVmFsaWRTY2FuUmVzdWx0KHNjYW5UZXh0OnN0cmluZyl7XG4gIGxldCBkYXRhPSBzY2FuVGV4dC5zcGxpdCgnKycpO1xuICBpZiAoZGF0YS5sZW5ndGg+NSl7ICAgICAgICBcbiAgICBsZXQgd29ya29yZGVyID0gdGhpcy53b2xpc3QuZmlsdGVyXG4gICAgICAgICAgICAgICAgICAgICAoeD0+eC5zY2hlQ29kZT09ZGF0YVswXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIHgucmVsTm8gPT1kYXRhWzFdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgeC53Y0NvZGU9PSBkYXRhWzJdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgeC53Y2lDb2RlID09IGRhdGFbM10gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICB4Lm5leHRQcm9jZXNzPT1kYXRhWzRdKTtcbiAgICAgIGlmICh3b3Jrb3JkZXIpeyAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICB0aGlzLmZkX3dvPWRhdGFbMF07XG4gICAgICAgICAgdGhpcy5mZF93Y2NvZGU9ZGF0YVsyXTtcbiAgICAgICAgICB0aGlzLmZkX3Byb2NlZT1kYXRhWzRdO1xuICAgICAgICAgIHRoaXMuZmRfbWFjcGxhbiA9ZGF0YVs1XTtcbiAgICAgICAgICB0aGlzLmZkX21hY2FjdCA9ZGF0YVs1XTtcbiAgICAgICAgICB0aGlzLmZkX3Byb2QgPWRhdGFbNV07XG4gICAgICAgICAgdGhpcy5mZF9vcGVyYXRvcj1cIlwiOyAgICAgICBcbiAgICAgIH1lbHNle1xuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIldvcmsgT3JkZXIgaW5mbyBub3QgZm91bmQuLi5cIik7XG4gICAgICB9XG5cbiAgfVxuIH1cbiAgXG4gIE9uU2F2ZVRhcChlKXtcbiAgICBsZXQgZGFpbHk6RGFpbHlJbnB1dCA9IHRoaXMucG9wdWxhdGVEYWlseUlucHV0KCk7XG4gICAgdGhpcy5hcGlzZXIucG9zdERhaWx5SW5wdXQoZGFpbHkpLnN1YnNjcmliZSgocmVzcDphbnkpPT57XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgICAgICBjb25zdCBkYXRhPSByZXNwLnZhbHVlO1xuICAgICAgICB0aGlzLnNob3dFcnJvcj10cnVlO1xuICAgICAgICBpZiAoZGF0YS5vaz09XCJ5ZXNcIil7ICAgICAgICAgIFxuICAgICAgICAgIHRoaXMuZXJybXNnID0gXCJTdWNjZXNzZnVsbHkgdXBsb2FkZWQuLi5cIjtcbiAgICAgICAgICB0aGlzLnJlc2V0SW5wdXQoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5lcnJtc2cgPSBkYXRhLmVycm9yOyAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnIpPT57XG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9yPXRydWU7XG5cdFx0XHRcdHRoaXMuZXJybXNnID0gZXJyLnN0YXR1c1RleHQ7XG5cdFx0XHR9KTtcblxuICB9XG5cbiAgcmVzZXRJbnB1dCgpe1xuICAgIHRoaXMuZmRfZ29vZD0wO1xuICAgIHRoaXMuZmRfbWFjYWN0PVwiXCI7XG4gICAgdGhpcy5mZF9vcGVyYXRvcj1cIlwiO1xuICAgIHRoaXMuZmRfcHJvY2VlPVwiXCI7XG4gICAgdGhpcy5mZF9wcm9kPVwiXCI7XG4gICAgdGhpcy5mZF9yZWplY3Q9MDtcbiAgICB0aGlzLmZkX3NjcmFwPTA7XG4gICAgdGhpcy5mZF93Y2NvZGU9XCJcIjtcbiAgICB0aGlzLmZkX3dvPVwiXCI7XG4gIH1cbiAgXG4gIE9uQ2FuY2VsVGFwKGUpe1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbWFpbiddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xuICB9XG5cbiAgcG9wdWxhdGVEYWlseUlucHV0KCk6RGFpbHlJbnB1dHtcbiAgICBsZXQgZGFpbHk6RGFpbHlJbnB1dCA9IG5ldyBEYWlseUlucHV0KCk7XG4gICAgICAgIGRhaWx5LmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkYWlseS50aW1lU2xvdCA9IHRoaXMuZmRfdGltZS5nZXRIb3VycygpK1wiOlwiK3RoaXMuZmRfdGltZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIGRhaWx5LnNjaGVDb2RlID0gdGhpcy5mZF93bztcbiAgICAgICAgZGFpbHkucmVsTm89MTtcbiAgICAgICAgZGFpbHkud0NDb2RlID0gdGhpcy5mZF93Y2NvZGU7XG4gICAgICAgIGRhaWx5LnByb2Nlc3NDb2RlPSB0aGlzLmZkX3Byb2NlZTtcbiAgICAgICAgZGFpbHkubWFjaGluZUNvZGUgPSB0aGlzLmZkX21hY3BsYW47XG4gICAgICAgIGRhaWx5Lm1hY2hpbmVDb2RlQWN0ID0gdGhpcy5mZF9tYWNhY3Q7XG4gICAgICAgIGRhaWx5Lm9wZXJhdG9yQWN0ID0gdGhpcy5mZF9vcGVyYXRvcjtcbiAgICAgICAgZGFpbHkucXR5QWN0ID0gdGhpcy5mZF9nb29kfHwgMDtcbiAgICAgICAgZGFpbHkucXR5U2NyYXAgPSB0aGlzLmZkX3NjcmFwIHx8IDA7XG4gICAgICAgIGRhaWx5LnF0eVJlamVjdCA9IHRoaXMuZmRfcmVqZWN0IHx8IDA7XG4gICAgICAgXG5cbiAgICAgICAgbGV0IHdvcmtvcmRlciA9IHRoaXMud29saXN0LmZpbHRlcih4PT54LnNjaGVDb2RlPT1kYWlseS5zY2hlQ29kZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgud2NDb2RlPT1kYWlseS53Q0NvZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Lm5leHRQcm9jZXNzPT1kYWlseS5wcm9jZXNzQ29kZSk7XG4gICAgICAgIGlmICh3b3Jrb3JkZXIpe1xuICAgICAgICAgICAgZGFpbHkud0NJQ29kZSA9IHdvcmtvcmRlclswXS53Y2lDb2RlO1xuICAgICAgICAgICAgZGFpbHkucHJvZENvZGUgPSB3b3Jrb3JkZXJbMF0ucHJvZENvZGU7XG4gICAgICAgICAgICBkYWlseS5vcGVyYXRvciA9IHdvcmtvcmRlclswXS5vcGVyYXRvcjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhaWx5KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ludmFsaWQgd29yayBvcmRlciBpbmZvLi4uJyk7XG4gICAgICAgIH1cbiAgICByZXR1cm4gZGFpbHk7XG4gIH1cbn1cbiJdfQ==