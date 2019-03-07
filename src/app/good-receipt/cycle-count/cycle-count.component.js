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
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var services_1 = require("../../core/services");
var auth_service_1 = require("../../core/services/auth-service");
var navigation_service_1 = require("../../core/services/navigation.service");
var model_1 = require("../../core/model");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var application = require("tns-core-modules/application");
var CycleCountComponent = /** @class */ (function () {
    function CycleCountComponent(apiser, auth, barcodeScanner, navigationService) {
        this.apiser = apiser;
        this.auth = auth;
        this.barcodeScanner = barcodeScanner;
        this.navigationService = navigationService;
        this.userid = auth.getUserID();
    }
    CycleCountComponent.prototype.ngOnInit = function () {
        this.item = new model_1.CycleCountItem();
        this.iconQR = String.fromCharCode(0xf029);
        //disable device back button on Android
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = true;
            });
        }
    };
    CycleCountComponent.prototype.OnScan = function () {
        this.resstDisplay();
        this.OnScanQR();
    };
    CycleCountComponent.prototype.OnScanQR = function () {
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
    CycleCountComponent.prototype.checkValidScanResult = function (scanText) {
        var _this = this;
        var data = scanText.split('+');
        if (data[0].length > 4) {
            this.item.cy_id = data[1];
            this.item.icode = data[1];
            this.item.whcode = data[2];
            this.item.loccode = data[3];
            this.item.lotno = data[4];
            this.apiser.postIsCycleCountValid(this.item)
                .subscribe(function (resp) {
                if (resp.save == "yes") {
                    _this.item.idesc = resp.data.ides;
                    _this.displayItem();
                }
                else {
                    console.log(resp);
                    (new nativescript_snackbar_1.SnackBar()).simple(resp.error || '');
                }
            });
            this.displayItem();
        }
    };
    CycleCountComponent.prototype.displayItem = function () {
        this.fd_cycid = this.item.cy_id;
        this.fd_icode = this.item.icode;
        this.fd_idesc = this.item.idesc;
        this.fd_whcode = this.item.whcode;
        this.fd_lotno = this.item.lotno;
        this.fd_loccode = this.item.loccode;
    };
    CycleCountComponent.prototype.resstDisplay = function () {
        this.fd_cycid = "";
        this.fd_icode = "";
        this.fd_idesc = "";
        this.fd_whcode = "";
        this.fd_lotno = "";
        this.fd_loccode = "";
        this.fd_qty = 0;
    };
    CycleCountComponent.prototype.OnSaveTap = function (e) {
        var _this = this;
        if (this.fd_qty < 0) {
            (new nativescript_snackbar_1.SnackBar()).simple("Invalid Qty...");
            return;
        }
        this.item.pqty = this.fd_qty;
        this.item.userid = this.userid;
        this.apiser.putCycleCountItem(this.item).subscribe(function (resp) {
            console.log(resp);
            if (resp.save == "yes") {
                (new nativescript_snackbar_1.SnackBar()).simple("Successfully uploaded...");
                _this.resstDisplay();
            }
            else {
                (new nativescript_snackbar_1.SnackBar()).simple("Error " + resp.error);
            }
        });
    };
    CycleCountComponent.prototype.OnCancelTap = function (e) {
        this.navigationService.navigate(['/main'], { clearHistory: true });
    };
    CycleCountComponent = __decorate([
        core_1.Component({
            selector: 'ns-cycle-count',
            templateUrl: './cycle-count.component.html',
            styleUrls: ['./cycle-count.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            auth_service_1.AuthService,
            nativescript_barcodescanner_1.BarcodeScanner,
            navigation_service_1.NavigationService])
    ], CycleCountComponent);
    return CycleCountComponent;
}());
exports.CycleCountComponent = CycleCountComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ljbGUtY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3ljbGUtY291bnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDJFQUE2RDtBQUU3RCxnREFBaUQ7QUFDakQsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUMzRSwwQ0FBa0Q7QUFDbEQsK0RBQWlEO0FBQ2pELDBEQUE0RDtBQVE1RDtJQWVFLDZCQUFvQixNQUFpQixFQUNqQixJQUFnQixFQUNoQixjQUE4QixFQUM5QixpQkFBb0M7UUFIcEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHNCQUFjLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsdUNBQXVDO1FBQ3ZDLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUN2QixXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUFTO2dCQUN2RixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FB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QUFDLENBQUM7Z0JBQ3BELEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtpQkFBSTtnQkFDSCxDQUFDLElBQUksZ0NBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksQ0FBQztRQUNYLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUE5SFUsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7WUFDMUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBZ0IyQixxQkFBVTtZQUNaLDBCQUFXO1lBQ0EsNENBQWM7WUFDWCxzQ0FBaUI7T0FsQjdDLG1CQUFtQixDQStIL0I7SUFBRCwwQkFBQztDQUFBLEFBL0hELElBK0hDO0FBL0hZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5cbmltcG9ydCB7IEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDeWNsZUNvdW50SXRlbSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwnO1xuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tICduYXRpdmVzY3JpcHQtc25hY2tiYXInO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWN5Y2xlLWNvdW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2N5Y2xlLWNvdW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3ljbGUtY291bnQuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBDeWNsZUNvdW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgXG4gIGljb25RUjpzdHJpbmc7XG4gIGljb25TcGluOnN0cmluZztcbiAgdXNlcmlkOnN0cmluZztcblxuICBmZF9jeWNpZDpzdHJpbmc7XG4gIGZkX2ljb2RlOnN0cmluZztcbiAgZmRfaWRlc2M6c3RyaW5nO1xuICBmZF93aGNvZGU6c3RyaW5nO1xuICBmZF9sb2Njb2RlOnN0cmluZztcbiAgZmRfbG90bm86c3RyaW5nO1xuICBmZF9xdHk6bnVtYmVyO1xuICBpdGVtOkN5Y2xlQ291bnRJdGVtO1xuICBcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlzZXI6QVBJU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLnVzZXJpZCA9IGF1dGguZ2V0VXNlcklEKCk7XG4gIH1cbiAgXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaXRlbSA9IG5ldyBDeWNsZUNvdW50SXRlbSgpO1xuICAgIHRoaXMuaWNvblFSPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjAyOSk7XG4gICAgLy9kaXNhYmxlIGRldmljZSBiYWNrIGJ1dHRvbiBvbiBBbmRyb2lkXG4gICAgaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcbiAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGFyZ3M6IGFueSkgPT4ge1xuICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIFxuICBPblNjYW4oKXtcbiAgIHRoaXMucmVzc3REaXNwbGF5KCk7XG4gICB0aGlzLk9uU2NhblFSKCk7XG4gIH1cblxuICBPblNjYW5RUigpe1xuICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XG4gICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxuICAgICAgY2FuY2VsTGFiZWw6IFwiRVhJVC4gQWxzbywgdHJ5IHRoZSB2b2x1bWUgYnV0dG9ucyFcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJ0Nsb3NlJ1xuICAgICAgY2FuY2VsTGFiZWxCYWNrZ3JvdW5kQ29sb3I6IFwiIzMzMzMzM1wiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnIzAwMDAwMCcgKGJsYWNrKVxuICAgICAgbWVzc2FnZTogXCJVc2UgdGhlIHZvbHVtZSBidXR0b25zIGZvciBleHRyYSBsaWdodFwiLCAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgaXMgJ1BsYWNlIGEgYmFyY29kZSBpbnNpZGUgdGhlIHZpZXdmaW5kZXIgcmVjdGFuZ2xlIHRvIHNjYW4gaXQuJ1xuICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLCAgICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLCAgICAgICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgYmVlcE9uU2NhbjogdHJ1ZSwgICAgICAgICAgICAgLy8gUGxheSBvciBTdXBwcmVzcyBiZWVwIG9uIHNjYW4gKGRlZmF1bHQgdHJ1ZSlcbiAgICAgIHRvcmNoT246IGZhbHNlLCAgICAgICAgICAgICAgIC8vIGxhdW5jaCB3aXRoIHRoZSBmbGFzaGxpZ2h0IG9uIChkZWZhdWx0IGZhbHNlKVxuICAgICAgY2xvc2VDYWxsYmFjazogKCkgPT4geyBjb25zb2xlLmxvZyhcIlNjYW5uZXIgY2xvc2VkXCIpfSwgLy8gaW52b2tlZCB3aGVuIHRoZSBzY2FubmVyIHdhcyBjbG9zZWQgKHN1Y2Nlc3Mgb3IgYWJvcnQpXG4gICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCwgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgMTUwMCAobXMpLCBzZXQgdG8gMCB0byBkaXNhYmxlIGVjaG9pbmcgdGhlIHNjYW5uZWQgdGV4dFxuICAgIC8vIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbiwgICAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCB1bmRlZmluZWQgKHNlbnNvci1kcml2ZW4gb3JpZW50YXRpb24pLCBvdGhlciBvcHRpb25zOiBwb3J0cmFpdHxsYW5kc2NhcGVcbiAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWUgLy8gT24gaU9TIHlvdSBjYW4gc2VuZCB0aGUgdXNlciB0byB0aGUgc2V0dGluZ3MgYXBwIGlmIGFjY2VzcyB3YXMgcHJldmlvdXNseSBkZW5pZWRcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBQcm9taXNlIGlzIG5ldmVyIGludm9rZWQgd2hlbiBhICdjb250aW51b3VzU2NhbkNhbGxiYWNrJyBmdW5jdGlvbiBpcyBwcm92aWRlZFxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpOyBcbiAgICAgICAgdGhpcy5jaGVja1ZhbGlkU2NhblJlc3VsdChyZXN1bHQudGV4dCk7ICAgICAgICBcbiAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2Nhbi4gXCIgKyBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnN0b3AoKTtcbiAgICB9KTsgXG4gIH1cblxuICBjaGVja1ZhbGlkU2NhblJlc3VsdChzY2FuVGV4dDpzdHJpbmcpe1xuICAgIGxldCBkYXRhPSBzY2FuVGV4dC5zcGxpdCgnKycpO1xuICAgIFxuICAgIGlmIChkYXRhWzBdLmxlbmd0aD40KXsgICAgIFxuICAgICAgICAgdGhpcy5pdGVtLmN5X2lkID0gZGF0YVsxXTtcbiAgICAgICAgIHRoaXMuaXRlbS5pY29kZSA9IGRhdGFbMV07XG4gICAgICAgICB0aGlzLml0ZW0ud2hjb2RlID0gZGF0YVsyXTtcbiAgICAgICAgIHRoaXMuaXRlbS5sb2Njb2RlID0gZGF0YVszXTtcbiAgICAgICAgIHRoaXMuaXRlbS5sb3RubyA9IGRhdGFbNF07XG4gICAgICAgICB0aGlzLmFwaXNlci5wb3N0SXNDeWNsZUNvdW50VmFsaWQodGhpcy5pdGVtKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXNwPT57XG4gICAgICAgICAgICAgICAgaWYgKHJlc3Auc2F2ZT09XCJ5ZXNcIil7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtLmlkZXNjID0gcmVzcC5kYXRhLmlkZXM7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbSgpO1xuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgICAgICAgICAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUocmVzcC5lcnJvcnx8ICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB0aGlzLmRpc3BsYXlJdGVtKCk7XG4gICAgIH1cbiAgIH1cblxuICBkaXNwbGF5SXRlbSgpe1xuICAgIHRoaXMuZmRfY3ljaWQ9IHRoaXMuaXRlbS5jeV9pZDtcbiAgICB0aGlzLmZkX2ljb2RlPSB0aGlzLml0ZW0uaWNvZGU7XG4gICAgdGhpcy5mZF9pZGVzYyA9IHRoaXMuaXRlbS5pZGVzYztcbiAgICB0aGlzLmZkX3doY29kZSA9IHRoaXMuaXRlbS53aGNvZGU7XG4gICAgdGhpcy5mZF9sb3RubyA9IHRoaXMuaXRlbS5sb3RubztcbiAgICB0aGlzLmZkX2xvY2NvZGUgPSB0aGlzLml0ZW0ubG9jY29kZTsgICAgXG4gIH1cblxuICByZXNzdERpc3BsYXkoKXtcbiAgICB0aGlzLmZkX2N5Y2lkPSBcIlwiO1xuICAgIHRoaXMuZmRfaWNvZGU9IFwiXCI7XG4gICAgdGhpcy5mZF9pZGVzYyA9IFwiXCI7XG4gICAgdGhpcy5mZF93aGNvZGUgPSBcIlwiO1xuICAgIHRoaXMuZmRfbG90bm8gPSBcIlwiO1xuICAgIHRoaXMuZmRfbG9jY29kZSA9IFwiXCI7XG4gICAgdGhpcy5mZF9xdHkgPTA7XG4gIH1cblxuICBPblNhdmVUYXAoZSl7XG4gICAgaWYgKHRoaXMuZmRfcXR5PDAgKXtcbiAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW52YWxpZCBRdHkuLi5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXRlbS5wcXR5ID0gdGhpcy5mZF9xdHk7XG4gICAgdGhpcy5pdGVtLnVzZXJpZCA9IHRoaXMudXNlcmlkO1xuICAgIFxuICAgIHRoaXMuYXBpc2VyLnB1dEN5Y2xlQ291bnRJdGVtKHRoaXMuaXRlbSkuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgICAgaWYgKHJlc3Auc2F2ZT09XCJ5ZXNcIil7XG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiU3VjY2Vzc2Z1bGx5IHVwbG9hZGVkLi4uXCIpO1xuICAgICAgICB0aGlzLnJlc3N0RGlzcGxheSgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiRXJyb3IgXCIrcmVzcC5lcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBPbkNhbmNlbFRhcChlKXtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL21haW4nXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcbiAgfVxufVxuIl19