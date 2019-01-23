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
var element_registry_1 = require("nativescript-angular/element-registry");
var services_1 = require("~/app/core/services");
var ModalPicker = require("nativescript-modal-datetimepicker");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var daily_input_1 = require("../../core/model/daily-input");
var navigation_service_1 = require("~/app/core/services/navigation.service");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
element_registry_1.registerElement("FilterableListpicker", function () { return require("nativescript-filterable-listpicker").FilterableListpicker; });
var DailyOutputComponent = /** @class */ (function () {
    function DailyOutputComponent(apiser, barcodeScanner, navigationService) {
        this.apiser = apiser;
        this.barcodeScanner = barcodeScanner;
        this.navigationService = navigationService;
        this.listitems = [];
        this.wclistitems = [];
        this.proclistitems = [];
        this.macclistitems = [];
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
    };
    DailyOutputComponent.prototype.cancelFilterableList = function () {
        console.log('canceled');
    };
    DailyOutputComponent.prototype.itemTapped = function (args) {
        console.log(args.selectedItem.title);
        console.log(this._lookoption);
        switch (this._lookoption) {
            case "wo":
                this.fd_wo = args.selectedItem.title;
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
                this.getWorkMachine();
                this.spinWork.nativeElement.hintText = "Actual Machine..";
                this.spinWork.nativeElement.source = this.wclistitems;
                break;
            case "operator":
                this.spinWork.nativeElement.hintText = "Operator..";
                this.spinWork.nativeElement.source = this.listitems;
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
            _this.fd_wo = "INC17060005";
            _this.fd_wccode = "OIL";
            _this.fd_procee = "OIL";
            _this.fd_macplan = "MACHINE1";
            _this.fd_macact = "MACHINE1";
            _this.fd_operator = "MOK";
        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
            _this.barcodeScanner.stop();
        });
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
        var daily = new daily_input_1.DailyInput();
        daily.date = new Date();
        daily.timeSlot = this.fd_time.getHours() + ":" + this.fd_time.getMinutes();
        daily.scheCode = this.fd_wo;
        daily.relNo = 1;
        daily.wCCode = this.fd_wccode;
        daily.processCode = this.fd_procee;
        daily.machineCode = this.fd_macplan;
        daily.qtyAct = this.fd_good || 0;
        daily.qtyScrap = this.fd_scrap || 0;
        daily.qtyReject = this.fd_reject || 0;
        var workorder = this.wolist.filter(function (x) { return x.scheCode == daily.scheCode &&
            x.wcCode == daily.wCCode &&
            x.nextProcess == daily.processCode; });
        if (workorder) {
            daily.wCICode = workorder[0].wciCode;
            daily.prodCode = workorder[0].prodCode;
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
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            nativescript_barcodescanner_1.BarcodeScanner,
            navigation_service_1.NavigationService])
    ], DailyOutputComponent);
    return DailyOutputComponent;
}());
exports.DailyOutputComponent = DailyOutputComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFpbHktb3V0cHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhaWx5LW91dHB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUU7QUFDekUsMEVBQXNFO0FBQ3RFLGdEQUFpRDtBQUlqRCwrREFBaUU7QUFDakUsK0RBQWlEO0FBQ2pELDREQUEwRDtBQUMxRCw2RUFBMkU7QUFDM0UsMkVBQTZEO0FBQzdELGtDQUFlLENBQUMsc0JBQXNCLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLG9CQUFvQixFQUFsRSxDQUFrRSxDQUFDLENBQUM7QUFRbEg7SUEyQkUsOEJBQW9CLE1BQWlCLEVBQ2pCLGNBQThCLEVBQzlCLGlCQUFvQztRQUZwQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdEJ4RCxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQWUsRUFBRSxDQUFDO1FBQzdCLGtCQUFhLEdBQWUsRUFBRSxDQUFDO1FBQy9CLGtCQUFhLEdBQWUsRUFBRSxDQUFDO1FBb0I1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQUEsaUJBZ0JDO1FBZkUsSUFBSSxDQUFDLE1BQU0sR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsU0FBUyxDQUN2QyxVQUFDLElBQUk7WUFD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SUFDbEI7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWMsaUJBQVU7NkRBQUM7SUFIdkMsb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7WUFDM0MsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBNEIyQixxQkFBVTtZQUNELDRDQUFjO1lBQ1gsc0NBQWlCO09BN0I3QyxvQkFBb0IsQ0FzUmhDO0lBQUQsMkJBQUM7Q0FBQSxBQXRSRCxJQXNSQztBQXRSWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3JlZ2lzdGVyRWxlbWVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbmltcG9ydCB7IEFQSVNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IERhaWx5V29ya09yZGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGxhdGZvcm1zL2FuZHJvaWQvYXBwL3NyYy9tYWluL2Fzc2V0cy9hcHAvYXBwL2NvcmUvbW9kZWwvZGFpbGx5LXdvcmstb3JkZXInO1xuaW1wb3J0IHsgc3BsaW5PYmplY3QgfSBmcm9tICd+L2FwcC9jb3JlL21vZGVsL2RhaWxseS13b3JrLW9yZGVyJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJy4uLy4uLy4uLy4uL3BsYXRmb3Jtcy9hbmRyb2lkL2FwcC9idWlsZC9pbnRlcm1lZGlhdGVzL21lcmdlZF9hc3NldHMvZGVidWcvbWVyZ2VEZWJ1Z0Fzc2V0cy9vdXQvYXBwL3Ruc19tb2R1bGVzL3J4anMvc3JjL2ludGVybmFsL29wZXJhdG9ycy9maWx0ZXInO1xuaW1wb3J0ICogYXMgTW9kYWxQaWNrZXIgZnJvbSAnbmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcbmltcG9ydCB7IERhaWx5SW5wdXQgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2RhaWx5LWlucHV0JztcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xucmVnaXN0ZXJFbGVtZW50KFwiRmlsdGVyYWJsZUxpc3RwaWNrZXJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1maWx0ZXJhYmxlLWxpc3RwaWNrZXJcIikuRmlsdGVyYWJsZUxpc3RwaWNrZXIpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1kYWlseS1vdXRwdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGFpbHktb3V0cHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGFpbHktb3V0cHV0LmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbn0pXG5leHBvcnQgY2xhc3MgRGFpbHlPdXRwdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuIFxuICBAVmlld0NoaWxkKCdzcGluV29yaycpIHNwaW5Xb3JrOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdteUNvbnRhaW5lcicpIG15Q29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gIGljb25RUjpzdHJpbmc7XG4gIGljb25TcGluOnN0cmluZztcbiAgbGlzdGl0ZW1zOnNwbGluT2JqZWN0W109W107XG4gIHdjbGlzdGl0ZW1zOnNwbGluT2JqZWN0W109W107XG4gIHByb2NsaXN0aXRlbXM6c3BsaW5PYmplY3RbXT1bXTtcbiAgbWFjY2xpc3RpdGVtczpzcGxpbk9iamVjdFtdPVtdO1xuICB3b2xpc3Q6YW55O1xuICBfbG9va29wdGlvbjpzdHJpbmc7XG4gIFxuICBmZF9kYXRlOkRhdGU7XG4gIGZkX3RpbWU6RGF0ZTtcbiAgZmRfd286c3RyaW5nO1xuICBmZF93Y2NvZGU6c3RyaW5nO1xuICBmZF9wcm9jZWU6c3RyaW5nO1xuICBmZF9tYWNwbGFuOnN0cmluZztcbiAgZmRfbWFjYWN0OnN0cmluZztcbiAgZmRfcHJvZDpzdHJpbmc7XG4gIGZkX29wZXJhdG9yOnN0cmluZztcbiAgZmRfZ29vZDpudW1iZXI7XG4gIGZkX3JlamVjdDpudW1iZXI7XG4gIGZkX3NjcmFwOm51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaXNlcjpBUElTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsKSB7XG4gICAgIHRoaXMuZmRfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgIHRoaXMuZmRfdGltZSA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAgdGhpcy5pY29uUVI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDI5KTtcbiAgICAgdGhpcy5pY29uU3BpbiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMTUwKTtcbiAgICAgdGhpcy5hcGlzZXIuZ2V0RGFpbHlXb3JrT3JkZXJzKCkuc3Vic2NyaWJlKFxuICAgICAgICAocmVzcCk9PntcbiAgICAgICAgICB0aGlzLndvbGlzdD0gcmVzcDtcbiAgICAgICAgICB0aGlzLndvbGlzdC5tYXAoeD0+e1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14LnNjaGVDb2RlKTwgMCl7XG4gICAgICAgICAgICAgICB0aGlzLmxpc3RpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOnguc2NoZUNvZGVcbiAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuXG4gICAgICB9KTtcbiAgfVxuXG4gIGNhbmNlbEZpbHRlcmFibGVMaXN0KCkge1xuICAgICAgY29uc29sZS5sb2coJ2NhbmNlbGVkJyk7XG4gIH1cblxuICBpdGVtVGFwcGVkKGFyZ3MpIHtcbiAgICAgIGNvbnNvbGUubG9nKGFyZ3Muc2VsZWN0ZWRJdGVtLnRpdGxlKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2xvb2tvcHRpb24pXG4gICAgICBzd2l0Y2godGhpcy5fbG9va29wdGlvbikge1xuICAgICAgICBjYXNlIFwid29cIjpcbiAgICAgICAgICB0aGlzLmZkX3dvID0gYXJncy5zZWxlY3RlZEl0ZW0udGl0bGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjZW50ZXJcIjpcbiAgICAgICAgICB0aGlzLmZkX3djY29kZSA9IGFyZ3Muc2VsZWN0ZWRJdGVtLnRpdGxlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicHJvY2Vzc1wiOlxuICAgICAgICAgIHRoaXMuZmRfcHJvY2VlID0gYXJncy5zZWxlY3RlZEl0ZW0udGl0bGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwbGFuTWFjXCI6XG4gICAgICAgICAgdGhpcy5mZF9tYWNwbGFuID0gYXJncy5zZWxlY3RlZEl0ZW0udGl0bGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhY3RNYWNcIjpcbiAgICAgICAgICB0aGlzLmZkX21hY2FjdCA9IGFyZ3Muc2VsZWN0ZWRJdGVtLnRpdGxlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib3BlcmF0b3JcIjpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfVxuXG4gIHNob3dQaWNrZXIob3B0aW9uOnN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKG9wdGlvbik7XG4gICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmRpbW1lckNvbG9yPVwidHJhbnNwYXJlbnRcIjtcbiAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQubGlzdFdpZHRoPVwiODAlXCI7XG4gICAgdGhpcy5fbG9va29wdGlvbiA9IG9wdGlvbjtcbiAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICBjYXNlIFwid29cIjpcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmhpbnRUZXh0PVwiV29yayBPcmRlci4uXCJcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNvdXJjZT10aGlzLmxpc3RpdGVtcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgICB0aGlzLmdldFdvcmtDZW50ZXJzKClcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmhpbnRUZXh0PVwiV29yayBDZW50ZXIuLlwiXG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5zb3VyY2U9dGhpcy53Y2xpc3RpdGVtcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvY2Vzc1wiOlxuICAgICAgICB0aGlzLmdldFdvcmtQcm9jZXNzKCk7XG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIldvcmsgUHJvY2Vzcy4uXCJcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNvdXJjZT10aGlzLndjbGlzdGl0ZW1zO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwbGFuTWFjXCI6XG4gICAgICAgIHRoaXMuZ2V0V29ya01hY2hpbmUoKTtcbiAgICAgICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LmhpbnRUZXh0PVwiUGxhbiBNYWNoaW5lLi5cIlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc291cmNlPXRoaXMud2NsaXN0aXRlbXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImFjdE1hY1wiOlxuICAgICAgICB0aGlzLmdldFdvcmtNYWNoaW5lKCk7XG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIkFjdHVhbCBNYWNoaW5lLi5cIlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc291cmNlPXRoaXMud2NsaXN0aXRlbXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIm9wZXJhdG9yXCI6XG4gICAgICAgIHRoaXMuc3BpbldvcmsubmF0aXZlRWxlbWVudC5oaW50VGV4dD1cIk9wZXJhdG9yLi5cIlxuICAgICAgICB0aGlzLnNwaW5Xb3JrLm5hdGl2ZUVsZW1lbnQuc291cmNlPXRoaXMubGlzdGl0ZW1zO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5zcGluV29yay5uYXRpdmVFbGVtZW50LnNob3codGhpcy5teUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIGdldFdvcmtDZW50ZXJzKCl7XG4gICAgdGhpcy53Y2xpc3RpdGVtcz1bXTtcbiAgICB0aGlzLndvbGlzdC5maWx0ZXIodz0+dy5zY2hlQ29kZT09dGhpcy5mZF93bylcbiAgICAgIC5tYXAoeD0+e1xuICAgICAgICAgIGlmICh0aGlzLndjbGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14LndjQ29kZSk8IDApe1xuICAgICAgICAgICAgdGhpcy53Y2xpc3RpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTp4LndjQ29kZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0V29ya1Byb2Nlc3MoKXtcbiAgICB0aGlzLndjbGlzdGl0ZW1zPVtdO1xuICAgIHRoaXMud29saXN0LmZpbHRlcih3PT53LnNjaGVDb2RlPT10aGlzLmZkX3dvICYmIHcud2NDb2RlID09IHRoaXMuZmRfd2Njb2RlIClcbiAgICAgIC5tYXAoeD0+e1xuICAgICAgICAgIGlmICh0aGlzLndjbGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14Lm5leHRQcm9jZXNzKTwgMCl7XG4gICAgICAgICAgICB0aGlzLndjbGlzdGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOngubmV4dFByb2Nlc3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFdvcmtNYWNoaW5lKCl7XG4gICAgdGhpcy53Y2xpc3RpdGVtcz1bXTtcbiAgICB0aGlzLndvbGlzdC5maWx0ZXIodz0+dy5zY2hlQ29kZT09dGhpcy5mZF93byAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB3LndjQ29kZSA9PSB0aGlzLmZkX3djY29kZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB3Lm5leHRQcm9jZXNzID09IHRoaXMuZmRfcHJvY2VlIClcbiAgICAgIC5tYXAoeD0+e1xuICAgICAgICAgIGlmICh0aGlzLndjbGlzdGl0ZW1zLmZpbmRJbmRleCh5PT55LnRpdGxlPT14Lm1hY2hpbmVDb2RlKTwgMCl7XG4gICAgICAgICAgICB0aGlzLndjbGlzdGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOngubWFjaGluZUNvZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBcbiAgcGlja0RhdGUoKSB7XG4gICAgY29uc3QgcGlja2VyID0gbmV3IE1vZGFsUGlja2VyLk1vZGFsRGF0ZXRpbWVwaWNrZXIoKTtcbiAgICBwaWNrZXIucGlja0RhdGUoe1xuICAgICAgdGhlbWU6ICdkYXJrJyxcbiAgICAgIGlzMjRIb3VyVmlldzogZmFsc2VcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5mZF9kYXRlID0gdGhpcy5nZXREYXRlUmVzdWx0KHJlc3VsdCk7ICAgICAgXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBwaWNrVGltZSgpIHtcbiAgICBjb25zdCBwaWNrZXIgPSBuZXcgTW9kYWxQaWNrZXIuTW9kYWxEYXRldGltZXBpY2tlcigpO1xuICAgIHBpY2tlci5waWNrVGltZSh7XG4gICAgICB0aGVtZTogJ2RhcmsnLFxuICAgICAgaXMyNEhvdXJWaWV3OiB0cnVlXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMuZmRfdGltZSA9IHRoaXMuZ2V0VGltZVJlc3VsdChyZXN1bHQpOyAgICAgIFxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGF0ZVJlc3VsdChyZXN1bHQ6YW55KXtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIHJldHVybiBuZXcgRGF0ZShyZXN1bHRbJ3llYXInXSxyZXN1bHRbJ21vbnRoJ10tMSxyZXN1bHRbJ2RheSddKTsgICAgXG4gIH1cblxuICBnZXRUaW1lUmVzdWx0KHJlc3VsdDphbnkpe1xuICAgIGxldCBkOkRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksZC5nZXRNb250aCgpLTEsZC5nZXREYXRlKCksIHJlc3VsdFsnaG91ciddLHJlc3VsdFsnbWludXRlJ10sMCwwKTsgICAgXG4gIH1cblxuICBPblNjYW4oKXtcbiAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xuICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcbiAgICAgIGNhbmNlbExhYmVsOiBcIkVYSVQuIEFsc28sIHRyeSB0aGUgdm9sdW1lIGJ1dHRvbnMhXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICdDbG9zZSdcbiAgICAgIGNhbmNlbExhYmVsQmFja2dyb3VuZENvbG9yOiBcIiMzMzMzMzNcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJyMwMDAwMDAnIChibGFjaylcbiAgICAgIG1lc3NhZ2U6IFwiVXNlIHRoZSB2b2x1bWUgYnV0dG9ucyBmb3IgZXh0cmEgbGlnaHRcIiwgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IGlzICdQbGFjZSBhIGJhcmNvZGUgaW5zaWRlIHRoZSB2aWV3ZmluZGVyIHJlY3RhbmdsZSB0byBzY2FuIGl0LidcbiAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLCAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSwgICAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSwgICAgICAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIGJlZXBPblNjYW46IHRydWUsICAgICAgICAgICAgIC8vIFBsYXkgb3IgU3VwcHJlc3MgYmVlcCBvbiBzY2FuIChkZWZhdWx0IHRydWUpXG4gICAgICB0b3JjaE9uOiBmYWxzZSwgICAgICAgICAgICAgICAvLyBsYXVuY2ggd2l0aCB0aGUgZmxhc2hsaWdodCBvbiAoZGVmYXVsdCBmYWxzZSlcbiAgICAgIGNsb3NlQ2FsbGJhY2s6ICgpID0+IHsgY29uc29sZS5sb2coXCJTY2FubmVyIGNsb3NlZFwiKX0sIC8vIGludm9rZWQgd2hlbiB0aGUgc2Nhbm5lciB3YXMgY2xvc2VkIChzdWNjZXNzIG9yIGFib3J0KVxuICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IDE1MDAgKG1zKSwgc2V0IHRvIDAgdG8gZGlzYWJsZSBlY2hvaW5nIHRoZSBzY2FubmVkIHRleHRcbiAgICAvLyBvcmllbnRhdGlvbjogb3JpZW50YXRpb24sICAgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgdW5kZWZpbmVkIChzZW5zb3ItZHJpdmVuIG9yaWVudGF0aW9uKSwgb3RoZXIgb3B0aW9uczogcG9ydHJhaXR8bGFuZHNjYXBlXG4gICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlIC8vIE9uIGlPUyB5b3UgY2FuIHNlbmQgdGhlIHVzZXIgdG8gdGhlIHNldHRpbmdzIGFwcCBpZiBhY2Nlc3Mgd2FzIHByZXZpb3VzbHkgZGVuaWVkXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gTm90ZSB0aGF0IHRoaXMgUHJvbWlzZSBpcyBuZXZlciBpbnZva2VkIHdoZW4gYSAnY29udGludW91c1NjYW5DYWxsYmFjaycgZnVuY3Rpb24gaXMgcHJvdmlkZWRcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsgXG4gICAgICAgIHRoaXMuZmRfd289XCJJTkMxNzA2MDAwNVwiO1xuICAgICAgICB0aGlzLmZkX3djY29kZT1cIk9JTFwiO1xuICAgICAgICB0aGlzLmZkX3Byb2NlZT1cIk9JTFwiO1xuICAgICAgICB0aGlzLmZkX21hY3BsYW4gPVwiTUFDSElORTFcIjtcbiAgICAgICAgdGhpcy5mZF9tYWNhY3QgPVwiTUFDSElORTFcIjtcbiAgICAgICAgdGhpcy5mZF9vcGVyYXRvcj1cIk1PS1wiOyAgICAgICBcbiAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2Nhbi4gXCIgKyBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnN0b3AoKTtcbiAgICB9KTtcbiBcbiB9XG4gIFxuICBPblNhdmVUYXAoZSl7XG4gICAgbGV0IGRhaWx5OkRhaWx5SW5wdXQgPSB0aGlzLnBvcHVsYXRlRGFpbHlJbnB1dCgpO1xuICAgIHRoaXMuYXBpc2VyLnBvc3REYWlseUlucHV0KGRhaWx5KS5zdWJzY3JpYmUocmVzcD0+e1xuICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgICBpZiAocmVzcC5vaz09XCJ5ZXNcIil7XG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiU3VjY2Vzc2Z1bGx5IHVwbG9hZGVkLi4uXCIpO1xuICAgICAgICB0aGlzLnJlc2V0SW5wdXQoKTtcbiAgICAgIH1lbHNle1xuICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkVycm9yIFwiK3Jlc3AuZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRJbnB1dCgpe1xuICAgIHRoaXMuZmRfZ29vZD0wO1xuICAgIHRoaXMuZmRfbWFjYWN0PVwiXCI7XG4gICAgdGhpcy5mZF9vcGVyYXRvcj1cIlwiO1xuICAgIHRoaXMuZmRfcHJvY2VlPVwiXCI7XG4gICAgdGhpcy5mZF9wcm9kPVwiXCI7XG4gICAgdGhpcy5mZF9yZWplY3Q9MDtcbiAgICB0aGlzLmZkX3NjcmFwPTA7XG4gICAgdGhpcy5mZF93Y2NvZGU9XCJcIjtcbiAgICB0aGlzLmZkX3dvPVwiXCI7XG4gIH1cbiAgXG4gIE9uQ2FuY2VsVGFwKGUpe1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbWFpbiddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xuICB9XG5cbiAgcG9wdWxhdGVEYWlseUlucHV0KCk6RGFpbHlJbnB1dHtcbiAgICBsZXQgZGFpbHk6RGFpbHlJbnB1dCA9IG5ldyBEYWlseUlucHV0KCk7XG4gICAgICAgIGRhaWx5LmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkYWlseS50aW1lU2xvdCA9IHRoaXMuZmRfdGltZS5nZXRIb3VycygpK1wiOlwiK3RoaXMuZmRfdGltZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIGRhaWx5LnNjaGVDb2RlID0gdGhpcy5mZF93bztcbiAgICAgICAgZGFpbHkucmVsTm89MTtcbiAgICAgICAgZGFpbHkud0NDb2RlID0gdGhpcy5mZF93Y2NvZGU7XG4gICAgICAgIGRhaWx5LnByb2Nlc3NDb2RlPSB0aGlzLmZkX3Byb2NlZTtcbiAgICAgICAgZGFpbHkubWFjaGluZUNvZGUgPSB0aGlzLmZkX21hY3BsYW47XG4gICAgICAgIGRhaWx5LnF0eUFjdCA9IHRoaXMuZmRfZ29vZHx8IDA7XG4gICAgICAgIGRhaWx5LnF0eVNjcmFwID0gdGhpcy5mZF9zY3JhcCB8fCAwO1xuICAgICAgICBkYWlseS5xdHlSZWplY3QgPSB0aGlzLmZkX3JlamVjdCB8fCAwO1xuICAgICAgIFxuXG4gICAgICAgIGxldCB3b3Jrb3JkZXIgPSB0aGlzLndvbGlzdC5maWx0ZXIoeD0+eC5zY2hlQ29kZT09ZGFpbHkuc2NoZUNvZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4LndjQ29kZT09ZGFpbHkud0NDb2RlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5uZXh0UHJvY2Vzcz09ZGFpbHkucHJvY2Vzc0NvZGUpO1xuICAgICAgICBpZiAod29ya29yZGVyKXtcbiAgICAgICAgICAgIGRhaWx5LndDSUNvZGUgPSB3b3Jrb3JkZXJbMF0ud2NpQ29kZTtcbiAgICAgICAgICAgIGRhaWx5LnByb2RDb2RlID0gd29ya29yZGVyWzBdLnByb2RDb2RlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGFpbHkpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZygnSW52YWxpZCB3b3JrIG9yZGVyIGluZm8uLi4nKTtcbiAgICAgICAgfVxuICAgIHJldHVybiBkYWlseTtcbiAgfVxufVxuIl19