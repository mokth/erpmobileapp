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
        this.fd_date = new Date();
        this.fd_time = new Date();
    }
    DailyOutputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.iconQR = String.fromCharCode(0xf029);
        this.iconSpin = String.fromCharCode(0xf150);
        this.apiser.getDailyWorkOrders().subscribe(function (resp) {
            _this.wolist = resp;
            _this.wolist.map(function (x) {
                if (_this.listitems.findIndex(function (y) { return y.title == x.scheCode; }) < 0) {
                    _this.listitems.push({
                        title: x.scheCode
                    });
                }
            });
        });
        this.apiser.getProdRefCodes().subscribe(function (resp) {
            _this.refcodes = resp;
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
            }
        });
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = true;
            });
        }
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
            if (resp.ok == "yes") {
                (new nativescript_snackbar_1.SnackBar()).simple("Successfully uploaded...");
                _this.resetInput();
            }
            else {
                (new nativescript_snackbar_1.SnackBar()).simple("Error " + resp.error);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFpbHktb3V0cHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhaWx5LW91dHB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUU7QUFHekUsK0RBQWlFO0FBQ2pFLCtEQUFpRDtBQUVqRCxnREFBaUQ7QUFDakQsNkVBQTJFO0FBRTNFLDBDQUFrRTtBQUVsRSwyRUFBNkQ7QUFDN0QsMERBQTREO0FBUzVEO0lBOEJFLDhCQUFvQixNQUFpQixFQUNqQixjQUE4QixFQUM5QixpQkFBb0M7UUFGcEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXpCeEQsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUMzQixnQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUMvQixrQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUcvQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFtQnZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFrQ0M7UUFqQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsU0FBUyxDQUN2QyxVQUFDLElBQUk7WUFDSCxLQUFJLENBQUMsTUFBTSxHQUFFLElBQUksQ0FBQztZQUNsQixLQUFJ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QSxBQXhWRCxJQXdWQztBQXhWWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuaW1wb3J0ICogYXMgTW9kYWxQaWNrZXIgZnJvbSAnbmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcblxuaW1wb3J0IHsgQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XG5cbmltcG9ydCB7IFJlZkNvZGUsRGFpbHlJbnB1dCxzcGxpbk9iamVjdCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwnO1xuXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1kYWlseS1vdXRwdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGFpbHktb3V0cHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGFpbHktb3V0cHV0LmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZC50b1N0cmluZygpLFxufSlcbmV4cG9ydCBjbGFzcyBEYWlseU91dHB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gXG4gIEBWaWV3Q2hpbGQoJ3NwaW5Xb3JrJykgc3Bpbldvcms6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ215Q29udGFpbmVyJykgbXlDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgaWNvblFSOnN0cmluZztcbiAgaWNvblNwaW46c3RyaW5nO1xuICBsaXN0aXRlbXM6c3BsaW5PYmplY3RbXT1bXTtcbiAgd2NsaXN0aXRlbXM6c3BsaW5PYmplY3RbXT1bXTtcbiAgcHJvY2xpc3RpdGVtczpzcGxpbk9iamVjdFtdPVtdO1xuICBtYWNjbGlzdGl0ZW1zOnNwbGluT2JqZWN0W109W107XG4gIHdvbGlzdDphbnk7XG4gIHJlZmNvZGVzOmFueTtcbiAgbWFjY29kZXM6UmVmQ29kZVtdPVtdO1xuICBvcHJjb2RlczpzcGxpbk9iamVjdFtdPVtdO1xuICBfbG9va29wdGlvbjpzdHJpbmc7XG4gIFxuICBmZF9kYXRlOkRhdGU7XG4gIGZkX3RpbWU6RGF0ZTtcbiAgZmRfd286c3RyaW5nO1xuICBmZF93Y2NvZGU6c3RyaW5nO1xuICBmZF9wcm9jZWU6c3RyaW5nO1xuICBmZF9tYWNwbGFuOnN0cmluZztcbiAgZmRfbWFjYWN0OnN0cmluZztcbiAgZmRfcHJvZDpzdHJpbmc7XG4gIGZkX29wZXJhdG9yOnN0cmluZztcbiAgZmRfZ29vZDpudW1iZXI7XG4gIGZkX3JlamVjdDpudW1iZXI7XG4gIGZkX3NjcmFwOm51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaXNlcjpBUElTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICAgdGhpcy5mZF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgdGhpcy5mZF90aW1lID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgICB0aGlzLmljb25RUj0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwMjkpO1xuICAgICB0aGlzLmljb25TcGluID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYxNTApO1xuICAgICB0aGlzLmFwaXNlci5nZXREYWlseVdvcmtPcmRlcnMoKS5zdWJzY3JpYmUoXG4gICAgICAgIChyZXNwKT0+e1xuICAgICAgICAgIHRoaXMud29saXN0PSByZXNwO1xuICAgICAgICAgIHRoaXMud29saXN0Lm1hcCh4PT57XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0aXRlbXMuZmluZEluZGV4KHk9PnkudGl0bGU9PXguc2NoZUNvZGUpPCAwKXtcbiAgICAgICAgICAgICAgIHRoaXMubGlzdGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6eC5zY2hlQ29kZVxuICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYXBpc2VyLmdldFByb2RSZWZDb2RlcygpLnN1YnNjcmliZShyZXNwPT57XG4gICAgICAgICB0aGlzLnJlZmNvZGVzID0gcmVzcDtcbiAgICAgICAgIGlmICh0aGlzLnJlZmNvZGVzKXtcbiAgICAgICAgICAgIHRoaXMucmVmY29kZXMubWFwKHg9PntcbiAgICAgICAgICAgICAgICBpZiAoeC5jb2RlVHlwZT09XCJtYWNcIil7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5tYWNjb2Rlcy5wdXNoKHgpOyBcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoeC5jb2RlVHlwZT09XCJvcHJcIil7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5vcHJjb2Rlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTp4LmNvZGVcbiAgICAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChhcmdzOiBhbnkpID0+IHtcbiAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgfVxuXG4gIGNhbmNlbEZpbHRlcmFibGVMaXN0KGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjYW5jZWxlZCcpO1xuICB9XG5cbiAgaXRlbVRhcHBlZChhcmdzKSB7XG4gICAgICBjb25zb2xlLmxvZyhhcmdzLnNlbGVjdGVkSXRlbS50aXRsZSk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLl9sb29rb3B0aW9uKVxuICAgICAgc3dpdGNoKHRoaXMuX2xvb2tvcHRpb24pIHtcbiAgICAgICAgY2FzZSBcIndvXCI6XG4gICAgICAgICAgdGhpcy5mZF93byA9IGFyZ3Muc2VsZWN0ZWRJdGVtLnRpdGxlOyAgICAgXG4gICAgICAgICAgdGhpcy53b2xpc3QuZmlsdGVyKHc9Pncuc2NoZUNvZGU9PXRoaXMuZmRfd28pXG4gICAgICAgICAgICAgIC5tYXAoeD0+e1xuICAgICAgICAgICAgICAgICB0aGlzLmZkX3Byb2QgPSB4LnByb2RDb2RlO1xuICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgICBcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICAgIHRoaXMuZmRfd2Njb2RlID0gYXJncy5zZWxlY3RlZEl0ZW0udGl0bGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwcm9jZXNzXCI6XG4gICAgICAgICAgdGhpcy5mZF9wcm9jZWUgPSBhcmdzLnNlbGVjdGVkSXRlbS50aXRsZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBsYW5NYWNcIjpcbiAgICAgICAgICB0aGlzLmZkX21hY3BsYW4gPSBhcmdzLnNlbGVjdGVkSXRlbS50aXRsZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFjdE1hY1wiOlxuICAgICAgICAgIHRoaXMuZmRfbWFjYWN0ID0gYXJncy5zZWxlY3RlZEl0ZW0udGl0bGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvcGVyYXRvclwiOlxuICAgICAgICAgIHRoaXMuZmRfb3BlcmF0b3IgPSBhcmdzLnNlbGVjdGVkSXRlbS50aXRsZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfVxuXG4gIHNob3dQaWNrZXIob3B0aW9uOnN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKG9wdGlvbik7XG4gICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmRpbW1lckNvbG9yPVwidHJhbnNwYXJlbnRcIjtcbiAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQubGlzdFdpZHRoPVwiODAlXCI7XG4gICAgdGhpcy5fbG9va29wdGlvbiA9IG9wdGlvbjtcbiAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICBjYXNlIFwid29cIjpcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmhpbnRUZXh0PVwiV29yayBPcmRlci4uXCJcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNvdXJjZT10aGlzLmxpc3RpdGVtcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgICB0aGlzLmdldFdvcmtDZW50ZXJzKClcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmhpbnRUZXh0PVwiV29yayBDZW50ZXIuLlwiXG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5zb3VyY2U9dGhpcy53Y2xpc3RpdGVtcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvY2Vzc1wiOlxuICAgICAgICB0aGlzLmdldFdvcmtQcm9jZXNzKCk7XG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIldvcmsgUHJvY2Vzcy4uXCJcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNvdXJjZT10aGlzLndjbGlzdGl0ZW1zO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwbGFuTWFjXCI6XG4gICAgICAgIHRoaXMuZ2V0V29ya01hY2hpbmUoKTtcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmhpbnRUZXh0PVwiUGxhbiBNYWNoaW5lLi5cIlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc291cmNlPXRoaXMud2NsaXN0aXRlbXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImFjdE1hY1wiOlxuICAgICAgICB0aGlzLmdldFdvcmtBbGxNYWNoaW5lKCk7XG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIkFjdHVhbCBNYWNoaW5lLi5cIlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc291cmNlPXRoaXMud2NsaXN0aXRlbXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIm9wZXJhdG9yXCI6XG4gICAgICAgIHRoaXMuZ2V0T3BlcmF0b3JzKCk7XG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIk9wZXJhdG9yLi5cIlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc291cmNlPXRoaXMud2NsaXN0aXRlbXM7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc2hvdyh0aGlzLm15Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0V29ya0NlbnRlcnMoKXtcbiAgICB0aGlzLndjbGlzdGl0ZW1zPVtdO1xuICAgIHRoaXMud29saXN0LmZpbHRlcih3PT53LnNjaGVDb2RlPT10aGlzLmZkX3dvKVxuICAgICAgLm1hcCh4PT57XG4gICAgICAgICAgaWYgKHRoaXMud2NsaXN0aXRlbXMuZmluZEluZGV4KHk9PnkudGl0bGU9PXgud2NDb2RlKTwgMCl7XG4gICAgICAgICAgICB0aGlzLndjbGlzdGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOngud2NDb2RlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRXb3JrUHJvY2Vzcygpe1xuICAgIHRoaXMud2NsaXN0aXRlbXM9W107XG4gICAgdGhpcy53b2xpc3QuZmlsdGVyKHc9Pncuc2NoZUNvZGU9PXRoaXMuZmRfd28gJiYgdy53Y0NvZGUgPT0gdGhpcy5mZF93Y2NvZGUgKVxuICAgICAgLm1hcCh4PT57XG4gICAgICAgICAgaWYgKHRoaXMud2NsaXN0aXRlbXMuZmluZEluZGV4KHk9PnkudGl0bGU9PXgubmV4dFByb2Nlc3MpPCAwKXtcbiAgICAgICAgICAgIHRoaXMud2NsaXN0aXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6eC5uZXh0UHJvY2Vzc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0T3BlcmF0b3JzKCl7XG4gICAgdGhpcy53Y2xpc3RpdGVtcz0gW107XG4gICAgdGhpcy53Y2xpc3RpdGVtcz1bLi4udGhpcy5vcHJjb2Rlc107ICAgIFxuICB9XG5cbiAgZ2V0V29ya01hY2hpbmUoKXtcbiAgICB0aGlzLndjbGlzdGl0ZW1zPVtdO1xuICAgIHRoaXMud29saXN0LmZpbHRlcih3PT53LnNjaGVDb2RlPT10aGlzLmZkX3dvICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHcud2NDb2RlID09IHRoaXMuZmRfd2Njb2RlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHcubmV4dFByb2Nlc3MgPT0gdGhpcy5mZF9wcm9jZWUgKVxuICAgICAgLm1hcCh4PT57XG4gICAgICAgICAgaWYgKHRoaXMud2NsaXN0aXRlbXMuZmluZEluZGV4KHk9PnkudGl0bGU9PXgubWFjaGluZUNvZGUpPCAwKXtcbiAgICAgICAgICAgIHRoaXMud2NsaXN0aXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6eC5tYWNoaW5lQ29kZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0V29ya0FsbE1hY2hpbmUoKXtcbiAgICB0aGlzLndjbGlzdGl0ZW1zPVtdO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubWFjY29kZXMpO1xuICAgIHRoaXMubWFjY29kZXMuZmlsdGVyKHc9PncubmFtZT09dGhpcy5mZF9wcm9jZWUpXG4gICAgICAubWFwKHg9PntcbiAgICAgICAgICBpZiAodGhpcy53Y2xpc3RpdGVtcy5maW5kSW5kZXgoeT0+eS50aXRsZT09eC5jb2RlKTwgMCl7XG4gICAgICAgICAgICB0aGlzLndjbGlzdGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOnguY29kZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICB9XG4gIFxuICBwaWNrRGF0ZSgpIHtcbiAgICBjb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIuTW9kYWxEYXRldGltZXBpY2tlcigpO1xuICAgIHBpY2tlci5waWNrRGF0ZSh7XG4gICAgICB0aGVtZTogJ2RhcmsnLFxuICAgICAgaXMyNEhvdXJWaWV3OiBmYWxzZVxuICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLmZkX2RhdGUgPSB0aGlzLmdldERhdGVSZXN1bHQocmVzdWx0KTsgICAgICBcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIGVycm9yKTtcbiAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBpY2tUaW1lKCkge1xuICAgIGNvbnN0IHBpY2tlciA9IG5ldyBNb2RhbFBpY2tlci5Nb2RhbERhdGV0aW1lcGlja2VyKCk7XG4gICAgcGlja2VyLnBpY2tUaW1lKHtcbiAgICAgIHRoZW1lOiAnZGFyaycsXG4gICAgICBpczI0SG91clZpZXc6IHRydWVcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5mZF90aW1lID0gdGhpcy5nZXRUaW1lUmVzdWx0KHJlc3VsdCk7ICAgICAgXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBnZXREYXRlUmVzdWx0KHJlc3VsdDphbnkpe1xuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHJlc3VsdFsneWVhciddLHJlc3VsdFsnbW9udGgnXS0xLHJlc3VsdFsnZGF5J10pOyAgICBcbiAgfVxuXG4gIGdldFRpbWVSZXN1bHQocmVzdWx0OmFueSl7XG4gICAgbGV0IGQ6RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSxkLmdldE1vbnRoKCktMSxkLmdldERhdGUoKSwgcmVzdWx0Wydob3VyJ10scmVzdWx0WydtaW51dGUnXSwwLDApOyAgICBcbiAgfVxuXG4gIE9uU2Nhbigpe1xuICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XG4gICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxuICAgICAgY2FuY2VsTGFiZWw6IFwiRVhJVC4gQWxzbywgdHJ5IHRoZSB2b2x1bWUgYnV0dG9ucyFcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJ0Nsb3NlJ1xuICAgICAgY2FuY2VsTGFiZWxCYWNrZ3JvdW5kQ29sb3I6IFwiIzMzMzMzM1wiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnIzAwMDAwMCcgKGJsYWNrKVxuICAgICAgbWVzc2FnZTogXCJVc2UgdGhlIHZvbHVtZSBidXR0b25zIGZvciBleHRyYSBsaWdodFwiLCAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgaXMgJ1BsYWNlIGEgYmFyY29kZSBpbnNpZGUgdGhlIHZpZXdmaW5kZXIgcmVjdGFuZ2xlIHRvIHNjYW4gaXQuJ1xuICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLCAgICAgICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgYmVlcE9uU2NhbjogdHJ1ZSwgICAgICAgICAgICAgLy8gUGxheSBvciBTdXBwcmVzcyBiZWVwIG9uIHNjYW4gKGRlZmF1bHQgdHJ1ZSlcbiAgICAgIHRvcmNoT246IGZhbHNlLCAgICAgICAgICAgICAgIC8vIGxhdW5jaCB3aXRoIHRoZSBmbGFzaGxpZ2h0IG9uIChkZWZhdWx0IGZhbHNlKVxuICAgICAgY2xvc2VDYWxsYmFjazogKCkgPT4geyBjb25zb2xlLmxvZyhcIlNjYW5uZXIgY2xvc2VkXCIpfSwgLy8gaW52b2tlZCB3aGVuIHRoZSBzY2FubmVyIHdhcyBjbG9zZWQgKHN1Y2Nlc3Mgb3IgYWJvcnQpXG4gICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCwgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgMTUwMCAobXMpLCBzZXQgdG8gMCB0byBkaXNhYmxlIGVjaG9pbmcgdGhlIHNjYW5uZWQgdGV4dFxuICAgIC8vIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbiwgICAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCB1bmRlZmluZWQgKHNlbnNvci1kcml2ZW4gb3JpZW50YXRpb24pLCBvdGhlciBvcHRpb25zOiBwb3J0cmFpdHxsYW5kc2NhcGVcbiAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWUgLy8gT24gaU9TIHlvdSBjYW4gc2VuZCB0aGUgdXNlciB0byB0aGUgc2V0dGluZ3MgYXBwIGlmIGFjY2VzcyB3YXMgcHJldmlvdXNseSBkZW5pZWRcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBQcm9taXNlIGlzIG5ldmVyIGludm9rZWQgd2hlbiBhICdjb250aW51b3VzU2NhbkNhbGxiYWNrJyBmdW5jdGlvbiBpcyBwcm92aWRlZFxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpOyBcbiAgICAgICAgdGhpcy5jaGVja1ZhbGlkU2NhblJlc3VsdChyZXN1bHQudGV4dCk7ICAgICAgICBcbiAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2Nhbi4gXCIgKyBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnN0b3AoKTtcbiAgICB9KTsgXG4gfVxuXG4gY2hlY2tWYWxpZFNjYW5SZXN1bHQoc2NhblRleHQ6c3RyaW5nKXtcbiAgbGV0IGRhdGE9IHNjYW5UZXh0LnNwbGl0KCcrJyk7XG4gIGlmIChkYXRhLmxlbmd0aD41KXsgICAgICAgIFxuICAgIGxldCB3b3Jrb3JkZXIgPSB0aGlzLndvbGlzdC5maWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICh4PT54LnNjaGVDb2RlPT1kYXRhWzBdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgeC5yZWxObyA9PWRhdGFbMV0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICB4LndjQ29kZT09IGRhdGFbMl0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICB4LndjaUNvZGUgPT0gZGF0YVszXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIHgubmV4dFByb2Nlc3M9PWRhdGFbNF0pO1xuICAgICAgaWYgKHdvcmtvcmRlcil7ICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgIHRoaXMuZmRfd289ZGF0YVswXTtcbiAgICAgICAgICB0aGlzLmZkX3djY29kZT1kYXRhWzJdO1xuICAgICAgICAgIHRoaXMuZmRfcHJvY2VlPWRhdGFbNF07XG4gICAgICAgICAgdGhpcy5mZF9tYWNwbGFuID1kYXRhWzVdO1xuICAgICAgICAgIHRoaXMuZmRfbWFjYWN0ID1kYXRhWzVdO1xuICAgICAgICAgIHRoaXMuZmRfcHJvZCA9ZGF0YVs1XTtcbiAgICAgICAgICB0aGlzLmZkX29wZXJhdG9yPVwiXCI7ICAgICAgIFxuICAgICAgfWVsc2V7XG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiV29yayBPcmRlciBpbmZvIG5vdCBmb3VuZC4uLlwiKTtcbiAgICAgIH1cblxuICB9XG4gfVxuICBcbiAgT25TYXZlVGFwKGUpe1xuICAgIGxldCBkYWlseTpEYWlseUlucHV0ID0gdGhpcy5wb3B1bGF0ZURhaWx5SW5wdXQoKTtcbiAgICB0aGlzLmFwaXNlci5wb3N0RGFpbHlJbnB1dChkYWlseSkuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgICAgaWYgKHJlc3Aub2s9PVwieWVzXCIpe1xuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlN1Y2Nlc3NmdWxseSB1cGxvYWRlZC4uLlwiKTtcbiAgICAgICAgdGhpcy5yZXNldElucHV0KCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJFcnJvciBcIityZXNwLmVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0SW5wdXQoKXtcbiAgICB0aGlzLmZkX2dvb2Q9MDtcbiAgICB0aGlzLmZkX21hY2FjdD1cIlwiO1xuICAgIHRoaXMuZmRfb3BlcmF0b3I9XCJcIjtcbiAgICB0aGlzLmZkX3Byb2NlZT1cIlwiO1xuICAgIHRoaXMuZmRfcHJvZD1cIlwiO1xuICAgIHRoaXMuZmRfcmVqZWN0PTA7XG4gICAgdGhpcy5mZF9zY3JhcD0wO1xuICAgIHRoaXMuZmRfd2Njb2RlPVwiXCI7XG4gICAgdGhpcy5mZF93bz1cIlwiO1xuICB9XG4gIFxuICBPbkNhbmNlbFRhcChlKXtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL21haW4nXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcbiAgfVxuXG4gIHBvcHVsYXRlRGFpbHlJbnB1dCgpOkRhaWx5SW5wdXR7XG4gICAgbGV0IGRhaWx5OkRhaWx5SW5wdXQgPSBuZXcgRGFpbHlJbnB1dCgpO1xuICAgICAgICBkYWlseS5kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGFpbHkudGltZVNsb3QgPSB0aGlzLmZkX3RpbWUuZ2V0SG91cnMoKStcIjpcIit0aGlzLmZkX3RpbWUuZ2V0TWludXRlcygpO1xuICAgICAgICBkYWlseS5zY2hlQ29kZSA9IHRoaXMuZmRfd287XG4gICAgICAgIGRhaWx5LnJlbE5vPTE7XG4gICAgICAgIGRhaWx5LndDQ29kZSA9IHRoaXMuZmRfd2Njb2RlO1xuICAgICAgICBkYWlseS5wcm9jZXNzQ29kZT0gdGhpcy5mZF9wcm9jZWU7XG4gICAgICAgIGRhaWx5Lm1hY2hpbmVDb2RlID0gdGhpcy5mZF9tYWNwbGFuO1xuICAgICAgICBkYWlseS5tYWNoaW5lQ29kZUFjdCA9IHRoaXMuZmRfbWFjYWN0O1xuICAgICAgICBkYWlseS5vcGVyYXRvckFjdCA9IHRoaXMuZmRfb3BlcmF0b3I7XG4gICAgICAgIGRhaWx5LnF0eUFjdCA9IHRoaXMuZmRfZ29vZHx8IDA7XG4gICAgICAgIGRhaWx5LnF0eVNjcmFwID0gdGhpcy5mZF9zY3JhcCB8fCAwO1xuICAgICAgICBkYWlseS5xdHlSZWplY3QgPSB0aGlzLmZkX3JlamVjdCB8fCAwO1xuICAgICAgIFxuXG4gICAgICAgIGxldCB3b3Jrb3JkZXIgPSB0aGlzLndvbGlzdC5maWx0ZXIoeD0+eC5zY2hlQ29kZT09ZGFpbHkuc2NoZUNvZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4LndjQ29kZT09ZGFpbHkud0NDb2RlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5uZXh0UHJvY2Vzcz09ZGFpbHkucHJvY2Vzc0NvZGUpO1xuICAgICAgICBpZiAod29ya29yZGVyKXtcbiAgICAgICAgICAgIGRhaWx5LndDSUNvZGUgPSB3b3Jrb3JkZXJbMF0ud2NpQ29kZTtcbiAgICAgICAgICAgIGRhaWx5LnByb2RDb2RlID0gd29ya29yZGVyWzBdLnByb2RDb2RlO1xuICAgICAgICAgICAgZGFpbHkub3BlcmF0b3IgPSB3b3Jrb3JkZXJbMF0ub3BlcmF0b3I7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYWlseSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHdvcmsgb3JkZXIgaW5mby4uLicpO1xuICAgICAgICB9XG4gICAgcmV0dXJuIGRhaWx5O1xuICB9XG59XG4iXX0=