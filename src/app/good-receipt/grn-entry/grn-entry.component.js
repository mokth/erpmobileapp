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
var api_service_1 = require("../../core/services/api.service");
var navigation_service_1 = require("../../core/services/navigation.service");
var ModalPicker = require("nativescript-modal-datetimepicker");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var GrnEntryComponent = /** @class */ (function () {
    function GrnEntryComponent(apiser, barcodeScanner, navigationService) {
        this.apiser = apiser;
        this.barcodeScanner = barcodeScanner;
        this.navigationService = navigationService;
    }
    GrnEntryComponent.prototype.ngOnInit = function () {
        this.iconQR = String.fromCharCode(0xf029);
        this.iconSpin = String.fromCharCode(0xf150);
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
    };
    GrnEntryComponent.prototype.OnScan = function () {
    };
    GrnEntryComponent.prototype.OnSaveTap = function (e) {
    };
    GrnEntryComponent.prototype.OnCancelTap = function (e) {
    };
    GrnEntryComponent = __decorate([
        core_1.Component({
            selector: 'ns-grn-entry',
            templateUrl: './grn-entry.component.html',
            styleUrls: ['./grn-entry.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [api_service_1.APIService,
            nativescript_barcodescanner_1.BarcodeScanner,
            navigation_service_1.NavigationService])
    ], GrnEntryComponent);
    return GrnEntryComponent;
}());
exports.GrnEntryComponent = GrnEntryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JuLWVudHJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdybi1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMkVBQTZEO0FBRTdELCtEQUE2RDtBQUM3RCw2RUFBMkU7QUFDM0UsK0RBQWlFO0FBQ2pFLCtEQUFpRDtBQVFqRDtJQWtCRSwyQkFBb0IsTUFBaUIsRUFDakIsY0FBOEIsRUFDOUIsaUJBQW9DO1FBRnBDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFFeEQsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDRyxJQUFJLENBQUMsTUFBTSxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQUEsaUJBV0M7UUFWQyxJQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1gsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUs7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDLElBQUksZ0NBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFhLEdBQWIsVUFBYyxNQUFVO1FBQ3RCLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBQyxDQUFDLEVBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxNQUFhO0lBQ3hCLENBQUM7SUFFRCxrQ0FBTSxHQUFOO0lBRUEsQ0FBQztJQUVELHFDQUFTLEdBQVQsVUFBVSxDQUFDO0lBRVgsQ0FBQztJQUVELHVDQUFXLEdBQVgsVUFBWSxDQUFDO0lBRWIsQ0FBQztJQTNEVSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7WUFDeEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBbUIyQix3QkFBVTtZQUNELDRDQUFjO1lBQ1gsc0NBQWlCO09BcEI3QyxpQkFBaUIsQ0E0RDdCO0lBQUQsd0JBQUM7Q0FBQSxBQTVERCxJQTREQztBQTVEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuXG5pbXBvcnQgeyBBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIE1vZGFsUGlja2VyIGZyb20gJ25hdGl2ZXNjcmlwdC1tb2RhbC1kYXRldGltZXBpY2tlcic7XG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zbmFja2Jhcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWdybi1lbnRyeScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncm4tZW50cnkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncm4tZW50cnkuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBHcm5FbnRyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIFxuICBpY29uUVI6c3RyaW5nO1xuICBpY29uU3BpbjpzdHJpbmc7XG4gIFxuICBmZF9kYXRlOkRhdGU7XG4gIGZkX2Rvbm86c3RyaW5nO1xuICBmZF9wb25vOnN0cmluZztcbiAgZmRfdmNvZGU6c3RyaW5nO1xuICBmZF92bmFtZTpzdHJpbmc7XG4gIGZkX2ljb2RlOnN0cmluZztcbiAgZmRfaWRlc2M6c3RyaW5nO1xuICBmZF9wdXJ1b206c3RyaW5nO1xuICBmZF9wb3F0eTpudW1iZXI7XG4gIGZkX2JhbGFuY2U6bnVtYmVyO1xuICBmZF9yZWNxdHk6bnVtYmVyO1xuICBcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaXNlcjpBUElTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgIHRoaXMuaWNvblFSPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjAyOSk7XG4gICAgIHRoaXMuaWNvblNwaW4gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjE1MCk7XG4gIH1cbiAgXG4gIHBpY2tEYXRlKCkge1xuICAgIGNvbnN0IHBpY2tlciA9IG5ldyBNb2RhbFBpY2tlci5Nb2RhbERhdGV0aW1lcGlja2VyKCk7XG4gICAgcGlja2VyLnBpY2tEYXRlKHtcbiAgICAgIHRoZW1lOiAnZGFyaycsXG4gICAgICBpczI0SG91clZpZXc6IGZhbHNlXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMuZmRfZGF0ZSA9IHRoaXMuZ2V0RGF0ZVJlc3VsdChyZXN1bHQpOyAgICAgIFxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGF0ZVJlc3VsdChyZXN1bHQ6YW55KXtcbiAgICByZXR1cm4gbmV3IERhdGUocmVzdWx0Wyd5ZWFyJ10scmVzdWx0Wydtb250aCddLTEscmVzdWx0WydkYXknXSk7ICAgIFxuICB9XG4gIFxuICBzaG93UGlja2VyKG9wdGlvbjpzdHJpbmcpIHtcbiAgfVxuXG4gIE9uU2Nhbigpe1xuXG4gIH1cblxuICBPblNhdmVUYXAoZSl7XG5cbiAgfVxuXG4gIE9uQ2FuY2VsVGFwKGUpe1xuXG4gIH1cbn1cbiJdfQ==