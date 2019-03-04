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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ljbGUtY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3ljbGUtY291bnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDJFQUE2RDtBQUU3RCxnREFBaUQ7QUFDakQsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUMzRSwwQ0FBa0Q7QUFDbEQsK0RBQWlEO0FBUWpEO0lBZUUsNkJBQW9CLE1BQWlCLEVBQ2pCLElBQWdCLEVBQ2hCLGNBQThCLEVBQzlCLGlCQUFvQztRQUhwQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksc0JBQWMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsb0NBQU0sR0FBTjtRQUNDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFBQSxpQkF1QkM7UUF0QkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixXQUFXLEVBQUUscUNBQXFDO1lBQ2xELDBCQUEwQixFQUFFLFNBQVM7WUFDckMsT0FBTyxFQUFFLHdDQUF3QztZQUNqRCxvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsZUFBZSxFQUFF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Q1gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQXhIVSxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FnQjJCLHFCQUFVO1lBQ1osMEJBQVc7WUFDQSw0Q0FBYztZQUNYLHNDQUFpQjtPQWxCN0MsbUJBQW1CLENBeUgvQjtJQUFELDBCQUFDO0NBQUEsQUF6SEQsSUF5SEM7QUF6SFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcblxuaW1wb3J0IHsgQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2F1dGgtc2VydmljZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEN5Y2xlQ291bnRJdGVtIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbCc7XG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zbmFja2Jhcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWN5Y2xlLWNvdW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2N5Y2xlLWNvdW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3ljbGUtY291bnQuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBDeWNsZUNvdW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgXG4gIGljb25RUjpzdHJpbmc7XG4gIGljb25TcGluOnN0cmluZztcbiAgdXNlcmlkOnN0cmluZztcblxuICBmZF9jeWNpZDpzdHJpbmc7XG4gIGZkX2ljb2RlOnN0cmluZztcbiAgZmRfaWRlc2M6c3RyaW5nO1xuICBmZF93aGNvZGU6c3RyaW5nO1xuICBmZF9sb2Njb2RlOnN0cmluZztcbiAgZmRfbG90bm86c3RyaW5nO1xuICBmZF9xdHk6bnVtYmVyO1xuICBpdGVtOkN5Y2xlQ291bnRJdGVtO1xuICBcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlzZXI6QVBJU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLnVzZXJpZCA9IGF1dGguZ2V0VXNlcklEKCk7XG4gIH1cbiAgXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaXRlbSA9IG5ldyBDeWNsZUNvdW50SXRlbSgpO1xuICAgIHRoaXMuaWNvblFSPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjAyOSk7XG4gIH1cbiAgXG4gIE9uU2Nhbigpe1xuICAgdGhpcy5yZXNzdERpc3BsYXkoKTtcbiAgIHRoaXMuT25TY2FuUVIoKTtcbiAgfVxuXG4gIE9uU2NhblFSKCl7XG4gICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcbiAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXG4gICAgICBjYW5jZWxMYWJlbDogXCJFWElULiBBbHNvLCB0cnkgdGhlIHZvbHVtZSBidXR0b25zIVwiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnQ2xvc2UnXG4gICAgICBjYW5jZWxMYWJlbEJhY2tncm91bmRDb2xvcjogXCIjMzMzMzMzXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICcjMDAwMDAwJyAoYmxhY2spXG4gICAgICBtZXNzYWdlOiBcIlVzZSB0aGUgdm9sdW1lIGJ1dHRvbnMgZm9yIGV4dHJhIGxpZ2h0XCIsIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCBpcyAnUGxhY2UgYSBiYXJjb2RlIGluc2lkZSB0aGUgdmlld2ZpbmRlciByZWN0YW5nbGUgdG8gc2NhbiBpdC4nXG4gICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSwgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsICAgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsICAgICAgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICBiZWVwT25TY2FuOiB0cnVlLCAgICAgICAgICAgICAvLyBQbGF5IG9yIFN1cHByZXNzIGJlZXAgb24gc2NhbiAoZGVmYXVsdCB0cnVlKVxuICAgICAgdG9yY2hPbjogZmFsc2UsICAgICAgICAgICAgICAgLy8gbGF1bmNoIHdpdGggdGhlIGZsYXNobGlnaHQgb24gKGRlZmF1bHQgZmFsc2UpXG4gICAgICBjbG9zZUNhbGxiYWNrOiAoKSA9PiB7IGNvbnNvbGUubG9nKFwiU2Nhbm5lciBjbG9zZWRcIil9LCAvLyBpbnZva2VkIHdoZW4gdGhlIHNjYW5uZXIgd2FzIGNsb3NlZCAoc3VjY2VzcyBvciBhYm9ydClcbiAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLCAgIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCAxNTAwIChtcyksIHNldCB0byAwIHRvIGRpc2FibGUgZWNob2luZyB0aGUgc2Nhbm5lZCB0ZXh0XG4gICAgLy8gb3JpZW50YXRpb246IG9yaWVudGF0aW9uLCAgICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IHVuZGVmaW5lZCAoc2Vuc29yLWRyaXZlbiBvcmllbnRhdGlvbiksIG90aGVyIG9wdGlvbnM6IHBvcnRyYWl0fGxhbmRzY2FwZVxuICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZSAvLyBPbiBpT1MgeW91IGNhbiBzZW5kIHRoZSB1c2VyIHRvIHRoZSBzZXR0aW5ncyBhcHAgaWYgYWNjZXNzIHdhcyBwcmV2aW91c2x5IGRlbmllZFxuICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIC8vIE5vdGUgdGhhdCB0aGlzIFByb21pc2UgaXMgbmV2ZXIgaW52b2tlZCB3aGVuIGEgJ2NvbnRpbnVvdXNTY2FuQ2FsbGJhY2snIGZ1bmN0aW9uIGlzIHByb3ZpZGVkXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7IFxuICAgICAgICB0aGlzLmNoZWNrVmFsaWRTY2FuUmVzdWx0KHJlc3VsdC50ZXh0KTsgICAgICAgIFxuICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBzY2FuLiBcIiArIGVycm9yTWVzc2FnZSk7XG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc3RvcCgpO1xuICAgIH0pOyBcbiAgfVxuXG4gIGNoZWNrVmFsaWRTY2FuUmVzdWx0KHNjYW5UZXh0OnN0cmluZyl7XG4gICAgbGV0IGRhdGE9IHNjYW5UZXh0LnNwbGl0KCcrJyk7XG4gICAgXG4gICAgaWYgKGRhdGFbMF0ubGVuZ3RoPjQpeyAgICAgXG4gICAgICAgICB0aGlzLml0ZW0uY3lfaWQgPSBkYXRhWzFdO1xuICAgICAgICAgdGhpcy5pdGVtLmljb2RlID0gZGF0YVsxXTtcbiAgICAgICAgIHRoaXMuaXRlbS53aGNvZGUgPSBkYXRhWzJdO1xuICAgICAgICAgdGhpcy5pdGVtLmxvY2NvZGUgPSBkYXRhWzNdO1xuICAgICAgICAgdGhpcy5pdGVtLmxvdG5vID0gZGF0YVs0XTtcbiAgICAgICAgIHRoaXMuYXBpc2VyLnBvc3RJc0N5Y2xlQ291bnRWYWxpZCh0aGlzLml0ZW0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5zYXZlPT1cInllc1wiKXtcbiAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW0uaWRlc2MgPSByZXNwLmRhdGEuaWRlcztcbiAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtKCk7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgICAgICAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShyZXNwLmVycm9yfHwgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIHRoaXMuZGlzcGxheUl0ZW0oKTtcbiAgICAgfVxuICAgfVxuXG4gIGRpc3BsYXlJdGVtKCl7XG4gICAgdGhpcy5mZF9jeWNpZD0gdGhpcy5pdGVtLmN5X2lkO1xuICAgIHRoaXMuZmRfaWNvZGU9IHRoaXMuaXRlbS5pY29kZTtcbiAgICB0aGlzLmZkX2lkZXNjID0gdGhpcy5pdGVtLmlkZXNjO1xuICAgIHRoaXMuZmRfd2hjb2RlID0gdGhpcy5pdGVtLndoY29kZTtcbiAgICB0aGlzLmZkX2xvdG5vID0gdGhpcy5pdGVtLmxvdG5vO1xuICAgIHRoaXMuZmRfbG9jY29kZSA9IHRoaXMuaXRlbS5sb2Njb2RlOyAgICBcbiAgfVxuXG4gIHJlc3N0RGlzcGxheSgpe1xuICAgIHRoaXMuZmRfY3ljaWQ9IFwiXCI7XG4gICAgdGhpcy5mZF9pY29kZT0gXCJcIjtcbiAgICB0aGlzLmZkX2lkZXNjID0gXCJcIjtcbiAgICB0aGlzLmZkX3doY29kZSA9IFwiXCI7XG4gICAgdGhpcy5mZF9sb3RubyA9IFwiXCI7XG4gICAgdGhpcy5mZF9sb2Njb2RlID0gXCJcIjtcbiAgICB0aGlzLmZkX3F0eSA9MDtcbiAgfVxuXG4gIE9uU2F2ZVRhcChlKXtcbiAgICBpZiAodGhpcy5mZF9xdHk8MCApe1xuICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJJbnZhbGlkIFF0eS4uLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pdGVtLnBxdHkgPSB0aGlzLmZkX3F0eTtcbiAgICB0aGlzLml0ZW0udXNlcmlkID0gdGhpcy51c2VyaWQ7XG4gICAgXG4gICAgdGhpcy5hcGlzZXIucHV0Q3ljbGVDb3VudEl0ZW0odGhpcy5pdGVtKS5zdWJzY3JpYmUocmVzcD0+e1xuICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgICBpZiAocmVzcC5zYXZlPT1cInllc1wiKXtcbiAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJTdWNjZXNzZnVsbHkgdXBsb2FkZWQuLi5cIik7XG4gICAgICAgIHRoaXMucmVzc3REaXNwbGF5KCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJFcnJvciBcIityZXNwLmVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIE9uQ2FuY2VsVGFwKGUpe1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbWFpbiddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xuICB9XG59XG4iXX0=