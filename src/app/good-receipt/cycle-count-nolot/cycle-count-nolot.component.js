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
var application = require("tns-core-modules/application");
var CycleCountNoLotComponent = /** @class */ (function () {
    function CycleCountNoLotComponent(apiser, auth, barcodeScanner, navigationService) {
        this.apiser = apiser;
        this.auth = auth;
        this.barcodeScanner = barcodeScanner;
        this.navigationService = navigationService;
        this.userid = auth.getUserID();
    }
    CycleCountNoLotComponent.prototype.ngOnInit = function () {
        this.item = new model_1.CycleCountItem();
        this.iconQR = String.fromCharCode(0xf029);
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = true;
            });
        }
    };
    CycleCountNoLotComponent.prototype.OnScan = function () {
        //this.resstDisplay();
        this.OnScanQR();
    };
    CycleCountNoLotComponent.prototype.OnScanQR = function () {
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
    CycleCountNoLotComponent.prototype.checkValidScanResult = function (scanText) {
        var _this = this;
        var data = scanText.split('+');
        console.log(data.length);
        if (data.length == 0) {
            return;
        }
        if (data.length == 1) { //icode only
            this.item.icode = data[0];
            this.fd_errmsg = "verifying item code. Wait...";
            this.apiser.postIsCycleCountValidEx(this.item)
                .subscribe(function (resp) {
                if (resp.save == "yes") {
                    _this.fd_errmsg = "";
                    _this.item.idesc = resp.data.ides;
                    _this.fd_icode = _this.item.icode;
                    _this.fd_idesc = _this.item.idesc;
                }
                else {
                    console.log(resp);
                    _this.fd_icode = "";
                    _this.fd_idesc = "";
                    _this.fd_errmsg = "Item not found in system.";
                    // (new SnackBar()).simple("Item not found in DB");
                }
            });
            return;
        }
        //console.log(data[0]);
        //'1+'+[CY_ID]+'+'+[WHCode]
        if (data[0] == "1") {
            this.item.cy_id = data[1];
            //this.item.icode = data[1];
            this.item.whcode = data[2];
            //this.item.loccode = data[3];
            //this.item.lotno = data[4];
            this.displayItem();
        }
    };
    CycleCountNoLotComponent.prototype.displayItem = function () {
        this.fd_cycid = this.item.cy_id;
        //this.fd_icode= this.item.icode;
        //this.fd_idesc = this.item.idesc;
        this.fd_whcode = this.item.whcode;
        //this.fd_lotno = this.item.lotno;
        //this.fd_loccode = this.item.loccode;    
    };
    CycleCountNoLotComponent.prototype.resstDisplay = function () {
        //this.fd_cycid= "";
        this.fd_icode = "";
        this.fd_idesc = "";
        //this.fd_whcode = "";
        //this.fd_lotno = "";
        //this.fd_loccode = "";
        this.fd_qty = 0;
    };
    CycleCountNoLotComponent.prototype.OnSaveTap = function (e) {
        var _this = this;
        this.fd_errmsg = "";
        if (this.fd_qty < 0) {
            //(new SnackBar()).simple("Invalid Qty...");
            this.fd_errmsg = "Invalid Qty...";
            return;
        }
        this.item.pqty = this.fd_qty;
        this.item.userid = this.userid;
        this.apiser.putCycleCountItemEx(this.item).subscribe(function (resp) {
            //console.log(resp);
            if (resp.save == "yes") {
                //(new SnackBar()).simple("Successfully uploaded...");
                _this.fd_errmsg = "Successfully uploaded.";
                _this.resstDisplay();
            }
            else {
                //(new SnackBar()).simple("Error "+resp.error);
                _this.fd_errmsg = "Error " + resp.error;
            }
        });
    };
    CycleCountNoLotComponent.prototype.OnCancelTap = function (e) {
        this.navigationService.navigate(['/main'], { clearHistory: true });
    };
    CycleCountNoLotComponent = __decorate([
        core_1.Component({
            selector: 'ns-cycle-count-nolot',
            templateUrl: './cycle-count-nolot.component.html',
            styleUrls: ['./cycle-count-nolot.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            auth_service_1.AuthService,
            nativescript_barcodescanner_1.BarcodeScanner,
            navigation_service_1.NavigationService])
    ], CycleCountNoLotComponent);
    return CycleCountNoLotComponent;
}());
exports.CycleCountNoLotComponent = CycleCountNoLotComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ljbGUtY291bnQtbm9sb3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3ljbGUtY291bnQtbm9sb3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDJFQUE2RDtBQUU3RCxnREFBaUQ7QUFDakQsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUMzRSwwQ0FBa0Q7QUFFbEQsMERBQTREO0FBUTVEO0lBZ0JFLGtDQUFvQixNQUFpQixFQUNqQixJQUFnQixFQUNoQixjQUE4QixFQUM5QixpQkFBb0M7UUFIcEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHNCQUFjLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElBQVM7Z0JBQ3ZGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQseUNBQU0sR0FBTjtRQUNDLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFBQSxpQkF1QkM7UUF0QkMsSUFBSSxDQUFDLGNBQWMs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QUM7Z0JBQ3pDLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtpQkFBSTtnQkFDSCwrQ0FBK0M7Z0JBQy9DLEtBQUksQ0FBQyxTQUFTLEdBQUUsUUFBUSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4Q0FBVyxHQUFYLFVBQVksQ0FBQztRQUNYLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFuSlUsd0JBQXdCO1FBTnBDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7WUFDaEQsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBaUIyQixxQkFBVTtZQUNaLDBCQUFXO1lBQ0EsNENBQWM7WUFDWCxzQ0FBaUI7T0FuQjdDLHdCQUF3QixDQW9KcEM7SUFBRCwrQkFBQztDQUFBLEFBcEpELElBb0pDO0FBcEpZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5cbmltcG9ydCB7IEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDeWNsZUNvdW50SXRlbSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwnO1xuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tICduYXRpdmVzY3JpcHQtc25hY2tiYXInO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWN5Y2xlLWNvdW50LW5vbG90JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2N5Y2xlLWNvdW50LW5vbG90LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3ljbGUtY291bnQtbm9sb3QuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBDeWNsZUNvdW50Tm9Mb3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBcbiAgaWNvblFSOnN0cmluZztcbiAgaWNvblNwaW46c3RyaW5nO1xuICB1c2VyaWQ6c3RyaW5nO1xuXG4gIGZkX2N5Y2lkOnN0cmluZztcbiAgZmRfaWNvZGU6c3RyaW5nO1xuICBmZF9pZGVzYzpzdHJpbmc7XG4gIGZkX3doY29kZTpzdHJpbmc7XG4gIGZkX2xvY2NvZGU6c3RyaW5nO1xuICBmZF9sb3RubzpzdHJpbmc7XG4gIGZkX3F0eTpudW1iZXI7XG4gIGZkX2Vycm1zZzpzdHJpbmc7XG4gIGl0ZW06Q3ljbGVDb3VudEl0ZW07XG4gIFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaXNlcjpBUElTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGF1dGg6QXV0aFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgYmFyY29kZVNjYW5uZXI6IEJhcmNvZGVTY2FubmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSkge1xuICAgIHRoaXMudXNlcmlkID0gYXV0aC5nZXRVc2VySUQoKTtcbiAgfVxuICBcbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pdGVtID0gbmV3IEN5Y2xlQ291bnRJdGVtKCk7XG4gICAgdGhpcy5pY29uUVI9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDI5KTtcbiAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoYXJnczogYW55KSA9PiB7XG4gICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgXG4gIE9uU2Nhbigpe1xuICAgLy90aGlzLnJlc3N0RGlzcGxheSgpO1xuICAgdGhpcy5PblNjYW5RUigpO1xuICB9XG5cbiAgT25TY2FuUVIoKXtcbiAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xuICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcbiAgICAgIGNhbmNlbExhYmVsOiBcIkVYSVQuIEFsc28sIHRyeSB0aGUgdm9sdW1lIGJ1dHRvbnMhXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICdDbG9zZSdcbiAgICAgIGNhbmNlbExhYmVsQmFja2dyb3VuZENvbG9yOiBcIiMzMzMzMzNcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJyMwMDAwMDAnIChibGFjaylcbiAgICAgIG1lc3NhZ2U6IFwiVXNlIHRoZSB2b2x1bWUgYnV0dG9ucyBmb3IgZXh0cmEgbGlnaHRcIiwgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IGlzICdQbGFjZSBhIGJhcmNvZGUgaW5zaWRlIHRoZSB2aWV3ZmluZGVyIHJlY3RhbmdsZSB0byBzY2FuIGl0LidcbiAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLCAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSwgICAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSwgICAgICAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIGJlZXBPblNjYW46IHRydWUsICAgICAgICAgICAgIC8vIFBsYXkgb3IgU3VwcHJlc3MgYmVlcCBvbiBzY2FuIChkZWZhdWx0IHRydWUpXG4gICAgICB0b3JjaE9uOiBmYWxzZSwgICAgICAgICAgICAgICAvLyBsYXVuY2ggd2l0aCB0aGUgZmxhc2hsaWdodCBvbiAoZGVmYXVsdCBmYWxzZSlcbiAgICAgIGNsb3NlQ2FsbGJhY2s6ICgpID0+IHsgY29uc29sZS5sb2coXCJTY2FubmVyIGNsb3NlZFwiKX0sIC8vIGludm9rZWQgd2hlbiB0aGUgc2Nhbm5lciB3YXMgY2xvc2VkIChzdWNjZXNzIG9yIGFib3J0KVxuICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IDE1MDAgKG1zKSwgc2V0IHRvIDAgdG8gZGlzYWJsZSBlY2hvaW5nIHRoZSBzY2FubmVkIHRleHRcbiAgICAvLyBvcmllbnRhdGlvbjogb3JpZW50YXRpb24sICAgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgdW5kZWZpbmVkIChzZW5zb3ItZHJpdmVuIG9yaWVudGF0aW9uKSwgb3RoZXIgb3B0aW9uczogcG9ydHJhaXR8bGFuZHNjYXBlXG4gICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlIC8vIE9uIGlPUyB5b3UgY2FuIHNlbmQgdGhlIHVzZXIgdG8gdGhlIHNldHRpbmdzIGFwcCBpZiBhY2Nlc3Mgd2FzIHByZXZpb3VzbHkgZGVuaWVkXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgLy8gTm90ZSB0aGF0IHRoaXMgUHJvbWlzZSBpcyBuZXZlciBpbnZva2VkIHdoZW4gYSAnY29udGludW91c1NjYW5DYWxsYmFjaycgZnVuY3Rpb24gaXMgcHJvdmlkZWRcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsgXG4gICAgICAgIHRoaXMuY2hlY2tWYWxpZFNjYW5SZXN1bHQocmVzdWx0LnRleHQpOyAgICAgICAgXG4gICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNjYW4uIFwiICsgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zdG9wKCk7XG4gICAgfSk7IFxuICB9XG5cbiAgY2hlY2tWYWxpZFNjYW5SZXN1bHQoc2NhblRleHQ6c3RyaW5nKXtcbiAgICBsZXQgZGF0YT0gc2NhblRleHQuc3BsaXQoJysnKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhLmxlbmd0aCk7XG4gICAgaWYgKGRhdGEubGVuZ3RoPT0wKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRhdGEubGVuZ3RoPT0xKXsgLy9pY29kZSBvbmx5XG4gICAgICB0aGlzLml0ZW0uaWNvZGUgPSBkYXRhWzBdO1xuICAgICAgdGhpcy5mZF9lcnJtc2cgPVwidmVyaWZ5aW5nIGl0ZW0gY29kZS4gV2FpdC4uLlwiO1xuICAgICAgdGhpcy5hcGlzZXIucG9zdElzQ3ljbGVDb3VudFZhbGlkRXgodGhpcy5pdGVtKVxuICAgICAgLnN1YnNjcmliZShyZXNwPT57XG4gICAgICAgICAgaWYgKHJlc3Auc2F2ZT09XCJ5ZXNcIil7XG4gICAgICAgICAgICB0aGlzLmZkX2Vycm1zZyA9IFwiXCI7XG4gICAgICAgICAgICAgdGhpcy5pdGVtLmlkZXNjID0gcmVzcC5kYXRhLmlkZXM7XG4gICAgICAgICAgICAgdGhpcy5mZF9pY29kZT0gdGhpcy5pdGVtLmljb2RlOyAgXG4gICAgICAgICAgICAgdGhpcy5mZF9pZGVzYz0gdGhpcy5pdGVtLmlkZXNjO1xuICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICAgICAgICAgICB0aGlzLmZkX2ljb2RlPSBcIlwiOyAgXG4gICAgICAgICAgICAgdGhpcy5mZF9pZGVzYz0gXCJcIjtcbiAgICAgICAgICAgICB0aGlzLmZkX2Vycm1zZyA9XCJJdGVtIG5vdCBmb3VuZCBpbiBzeXN0ZW0uXCI7XG4gICAgICAgICAgICAvLyAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkl0ZW0gbm90IGZvdW5kIGluIERCXCIpO1xuICAgICAgICAgIH1cbiAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyhkYXRhWzBdKTtcbiAgICAvLycxKycrW0NZX0lEXSsnKycrW1dIQ29kZV1cbiAgICBcbiAgICBpZiAoZGF0YVswXT09XCIxXCIpeyAgICAgXG4gICAgICAgICB0aGlzLml0ZW0uY3lfaWQgPSBkYXRhWzFdO1xuICAgICAgICAgLy90aGlzLml0ZW0uaWNvZGUgPSBkYXRhWzFdO1xuICAgICAgICAgdGhpcy5pdGVtLndoY29kZSA9IGRhdGFbMl07XG4gICAgICAgICAvL3RoaXMuaXRlbS5sb2Njb2RlID0gZGF0YVszXTtcbiAgICAgICAgIC8vdGhpcy5pdGVtLmxvdG5vID0gZGF0YVs0XTtcbiAgICAgICAgIFxuICAgICAgICB0aGlzLmRpc3BsYXlJdGVtKCk7XG4gICAgfVxuICAgfVxuXG4gIGRpc3BsYXlJdGVtKCl7XG4gICAgdGhpcy5mZF9jeWNpZD0gdGhpcy5pdGVtLmN5X2lkO1xuICAgIC8vdGhpcy5mZF9pY29kZT0gdGhpcy5pdGVtLmljb2RlO1xuICAgIC8vdGhpcy5mZF9pZGVzYyA9IHRoaXMuaXRlbS5pZGVzYztcbiAgICB0aGlzLmZkX3doY29kZSA9IHRoaXMuaXRlbS53aGNvZGU7XG4gICAgLy90aGlzLmZkX2xvdG5vID0gdGhpcy5pdGVtLmxvdG5vO1xuICAgIC8vdGhpcy5mZF9sb2Njb2RlID0gdGhpcy5pdGVtLmxvY2NvZGU7ICAgIFxuICB9XG5cbiAgcmVzc3REaXNwbGF5KCl7XG4gICAgLy90aGlzLmZkX2N5Y2lkPSBcIlwiO1xuICAgIHRoaXMuZmRfaWNvZGU9IFwiXCI7XG4gICAgdGhpcy5mZF9pZGVzYyA9IFwiXCI7XG4gICAgLy90aGlzLmZkX3doY29kZSA9IFwiXCI7XG4gICAgLy90aGlzLmZkX2xvdG5vID0gXCJcIjtcbiAgICAvL3RoaXMuZmRfbG9jY29kZSA9IFwiXCI7XG4gICAgdGhpcy5mZF9xdHkgPTA7XG4gIH1cblxuICBPblNhdmVUYXAoZSl7XG4gICAgdGhpcy5mZF9lcnJtc2cgPSBcIlwiO1xuICAgIGlmICh0aGlzLmZkX3F0eTwwICl7XG4gICAgICAvLyhuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW52YWxpZCBRdHkuLi5cIik7XG4gICAgICB0aGlzLmZkX2Vycm1zZyA9XCJJbnZhbGlkIFF0eS4uLlwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLml0ZW0ucHF0eSA9IHRoaXMuZmRfcXR5O1xuICAgIHRoaXMuaXRlbS51c2VyaWQgPSB0aGlzLnVzZXJpZDtcbiAgICBcbiAgICB0aGlzLmFwaXNlci5wdXRDeWNsZUNvdW50SXRlbUV4KHRoaXMuaXRlbSkuc3Vic2NyaWJlKHJlc3A9PntcbiAgICAgIC8vY29uc29sZS5sb2cocmVzcCk7XG4gICAgICBpZiAocmVzcC5zYXZlPT1cInllc1wiKXtcbiAgICAgICAgLy8obmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlN1Y2Nlc3NmdWxseSB1cGxvYWRlZC4uLlwiKTtcbiAgICAgICAgdGhpcy5mZF9lcnJtc2cgPVwiU3VjY2Vzc2Z1bGx5IHVwbG9hZGVkLlwiO1xuICAgICAgICB0aGlzLnJlc3N0RGlzcGxheSgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIC8vKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJFcnJvciBcIityZXNwLmVycm9yKTtcbiAgICAgICAgdGhpcy5mZF9lcnJtc2cgPVwiRXJyb3IgXCIrcmVzcC5lcnJvcjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIE9uQ2FuY2VsVGFwKGUpe1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbWFpbiddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xuICB9XG59XG4iXX0=