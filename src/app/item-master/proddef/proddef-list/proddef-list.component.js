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
var rxjs_1 = require("rxjs");
var color_1 = require("tns-core-modules/color/color");
var application = require("tns-core-modules/application");
var api_service_1 = require("../../../core/services/api.service");
var util_services_1 = require("../../../core/services/util-services");
var navigation_service_1 = require("../../../core/services/navigation.service");
var ProddefListComponent = /** @class */ (function () {
    function ProddefListComponent(serv, utilser, navigationService) {
        this.serv = serv;
        this.utilser = utilser;
        this.navigationService = navigationService;
        this.isRefresh = false;
        this.isBusy = true;
        this.searchTerm$ = new rxjs_1.Subject();
        this.showError = false;
        this.getItemMaster();
    }
    ProddefListComponent.prototype.ngOnInit = function () {
        this.iconval = String.fromCharCode(0xe986);
        this.iconHome = String.fromCharCode(0xf015);
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = false;
            });
        }
    };
    ProddefListComponent.prototype.getItemMaster = function () {
        var _this = this;
        this.isRefresh = true;
        this.isBusy = false;
        // this.serv.searchPrdDef(this.searchTerm$)
        // 	.subscribe((resp:any) => {
        // 		console.log(resp);
        // 		this.items = resp.value;
        // 		this.tempitems = resp;
        // 		this.isBusy = false;
        // 	});
        this.serv.searchPrdDef(this.searchTerm$)
            .subscribe(function (resp) {
            //console.log(resp);
            _this.showError = false;
            _this.items = resp.value;
            _this.tempitems = resp;
            _this.isBusy = false;
        }, function (err) {
            _this.showError = true;
            _this.errmsg = err.statusText;
            _this.isBusy = false;
            //console.log('error');
            //console.log(err);
        });
    };
    ProddefListComponent.prototype.onItemLoading = function (args) {
        this.isRefresh = false;
        if (args.index % 2 === 0) {
            args.view.backgroundColor = new color_1.Color("#b3ecff");
        }
    };
    ProddefListComponent.prototype.onTextChange = function (e) {
        var textField = e.object;
        if (!textField)
            return;
        //console.log(textField.text);
        //	(new SnackBar()).simple("Search..."+textField.text);
        this.isBusy = true;
        this.searchTerm$.next(textField.text);
    };
    ProddefListComponent.prototype.onItemTap = function (item) {
        this.utilser.setLocalStore("proddef", JSON.stringify(item));
        //this.navigationService.navigate(["/master/proddefdetail"]);
        this.navigationService.navigate(["/master/proddef2"], {
            animated: true,
            transition: {
                name: 'flip',
                duration: 1000,
                curve: 'linear'
            }
        });
        // console.log(`search prodcode def ${item.icode}`);
        // this.serv.getProdDefDetail(item.icode)
        // .subscribe((resp:any)=>{
        // 	 console.log(resp.length);
        // 	 console.log(resp);
        // });
        // this.selectedCode = item.iCode;
        // this.selectedItem = item;
        // this.utilser.setLocalStore("proddef", JSON.stringify(item));
        // this.navigationService.navigate(["/master/itemdetail"]);
    };
    ProddefListComponent.prototype.onSearchTap = function (e) {
        var key = this.searchstr;
        console.log(key);
        this.items = this.tempitems.filter(function (item) { return item.icode.includes(key) ||
            item.idesc.includes(key); });
    };
    ProddefListComponent.prototype.onBack = function (e) {
        this.navigationService.navigate(['/main']);
    };
    ProddefListComponent = __decorate([
        core_1.Component({
            selector: 'proddef-list',
            templateUrl: './proddef-list.component.html',
            styleUrls: ['./proddef-list.component.css']
        }),
        __metadata("design:paramtypes", [api_service_1.APIService,
            util_services_1.UtilService,
            navigation_service_1.NavigationService])
    ], ProddefListComponent);
    return ProddefListComponent;
}());
exports.ProddefListComponent = ProddefListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZGRlZi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2RkZWYtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsNkJBQStCO0FBRy9CLHNEQUFxRDtBQUNyRCwwREFBNEQ7QUFFNUQsa0VBQWdFO0FBQ2hFLHNFQUFtRTtBQUNuRSxnRkFBOEU7QUFROUU7SUFnQkMsOEJBQW9CLElBQWdCLEVBQ3RCLE9BQW9CLEVBQ3BCLGlCQUFvQztRQUY5QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFDcEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQU5sRCxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsZ0JBQVcsR0FBRyxJQUFJLGNBQU8sRUFBVSxDQUFDO1FBS25DLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElBQVM7Z0JBQ3ZGLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQ0Q7SUFDSixDQUFDO0lBRUQsNENBQWEsR0FBYjtRQUFBLGlCQTJCQztRQTFCQSxJQUFJLENBQUMsU0FBUyxH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aUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFsSFMsb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzNDLENBQUM7eUNBa0J5Qix3QkFBVTtZQUNiLDJCQUFXO1lBQ0Qsc0NBQWlCO09BbEJ0QyxvQkFBb0IsQ0FvSGhDO0lBQUQsMkJBQUM7Q0FBQSxBQXBIRCxJQW9IQztBQXBIWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldyc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3IvY29sb3InO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XG5cbmltcG9ydCB7IEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy91dGlsLXNlcnZpY2VzJztcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdwcm9kZGVmLWxpc3QnLFxuXHR0ZW1wbGF0ZVVybDogJy4vcHJvZGRlZi1saXN0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcHJvZGRlZi1saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFByb2RkZWZMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRpY29udmFsOiBzdHJpbmc7XG5cdGljb25Ib21lOnN0cmluZztcblx0c2hvd0Vycm9yOmJvb2xlYW47XG5cdGVycm1zZzpzdHJpbmc7XG5cdHNlYXJjaDogc3RyaW5nO1xuXHRzZWFyY2hzdHI6IHN0cmluZztcblx0aXRlbXM6IGFueTtcblx0dGVtcGl0ZW1zOiBhbnk7XG5cdHNlbGVjdGVkQ29kZTogc3RyaW5nO1xuXHRzZWxlY3RlZEl0ZW06IGFueTtcblx0aXNSZWZyZXNoOiBib29sZWFuID0gZmFsc2U7XG5cdGlzQnVzeTogYm9vbGVhbiA9IHRydWU7XG5cdHNlYXJjaFRlcm0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydjogQVBJU2VydmljZSxcblx0XHRcdFx0XHRcdFx0cHJpdmF0ZSB1dGlsc2VyOiBVdGlsU2VydmljZSxcblx0XHRcdFx0XHRcdFx0cHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcblx0XHR0aGlzLnNob3dFcnJvciA9IGZhbHNlO1xuXHRcdHRoaXMuZ2V0SXRlbU1hc3RlcigpO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5pY29udmFsID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGU5ODYpO1xuXHRcdHRoaXMuaWNvbkhvbWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjAxNSk7XG5cdFx0aWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcblx0XHRcdGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGFyZ3M6IGFueSkgPT4ge1xuXHRcdFx0ICAgYXJncy5jYW5jZWwgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdCAgfVxuXHR9XG5cblx0Z2V0SXRlbU1hc3RlcigpIHtcblx0XHR0aGlzLmlzUmVmcmVzaCA9IHRydWU7XG5cdFx0dGhpcy5pc0J1c3kgPSBmYWxzZTtcblx0XHQvLyB0aGlzLnNlcnYuc2VhcmNoUHJkRGVmKHRoaXMuc2VhcmNoVGVybSQpXG5cdFx0Ly8gXHQuc3Vic2NyaWJlKChyZXNwOmFueSkgPT4ge1xuXHRcdC8vIFx0XHRjb25zb2xlLmxvZyhyZXNwKTtcblx0XHQvLyBcdFx0dGhpcy5pdGVtcyA9IHJlc3AudmFsdWU7XG5cdFx0Ly8gXHRcdHRoaXMudGVtcGl0ZW1zID0gcmVzcDtcblx0XHQvLyBcdFx0dGhpcy5pc0J1c3kgPSBmYWxzZTtcblx0XHQvLyBcdH0pO1xuXHRcdFxuXHRcdHRoaXMuc2Vydi5zZWFyY2hQcmREZWYodGhpcy5zZWFyY2hUZXJtJClcblx0XHRcdC5zdWJzY3JpYmUoKHJlc3A6YW55KSA9PiB7XG5cdFx0XHRcdC8vY29uc29sZS5sb2cocmVzcCk7XG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9yPWZhbHNlO1xuXHRcdFx0XHR0aGlzLml0ZW1zID0gcmVzcC52YWx1ZTtcblx0XHRcdFx0dGhpcy50ZW1waXRlbXMgPSByZXNwO1xuXHRcdFx0XHR0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdChlcnIpPT57XG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9yPXRydWU7XG5cdFx0XHRcdHRoaXMuZXJybXNnID1lcnIuc3RhdHVzVGV4dDtcblx0XHRcdFx0dGhpcy5pc0J1c3kgPSBmYWxzZTtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnZXJyb3InKTtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0fSk7XG5cblx0fVxuXG5cdG9uSXRlbUxvYWRpbmcoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcblx0XHR0aGlzLmlzUmVmcmVzaCA9IGZhbHNlO1xuXHRcdGlmIChhcmdzLmluZGV4ICUgMiA9PT0gMCkge1xuXHRcdFx0YXJncy52aWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiNiM2VjZmZcIik7XG5cdFx0fVxuXHR9XG5cblx0b25UZXh0Q2hhbmdlKGUpIHtcblx0XHRsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5lLm9iamVjdDtcblx0XHRpZiAoIXRleHRGaWVsZClcblx0XHQgIHJldHVybjtcblx0XHQvL2NvbnNvbGUubG9nKHRleHRGaWVsZC50ZXh0KTtcbiAgXHQgIC8vXHQobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlNlYXJjaC4uLlwiK3RleHRGaWVsZC50ZXh0KTtcblx0XHR0aGlzLmlzQnVzeSA9IHRydWU7XG5cdFx0dGhpcy5zZWFyY2hUZXJtJC5uZXh0KHRleHRGaWVsZC50ZXh0KTtcblx0fVxuXHRvbkl0ZW1UYXAoaXRlbSkge1xuXHRcdHRoaXMudXRpbHNlci5zZXRMb2NhbFN0b3JlKFwicHJvZGRlZlwiLCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XG5cdFx0Ly90aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFtcIi9tYXN0ZXIvcHJvZGRlZmRldGFpbFwiXSk7XG5cdFx0dGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbXCIvbWFzdGVyL3Byb2RkZWYyXCJdLFxuXHRcdHtcblx0XHRcdGFuaW1hdGVkOiB0cnVlLCBcblx0XHRcdCB0cmFuc2l0aW9uOiBcblx0XHRcdCB7XG5cdFx0XHRcdCBuYW1lOiAnZmxpcCcsIFxuXHRcdFx0XHQgZHVyYXRpb246IDEwMDAsIFxuXHRcdFx0XHQgY3VydmU6ICdsaW5lYXInXG5cdFx0XHQgfSAgXG5cdFx0ICB9KTtcdFx0XG5cdFx0XG5cdFx0Ly8gY29uc29sZS5sb2coYHNlYXJjaCBwcm9kY29kZSBkZWYgJHtpdGVtLmljb2RlfWApO1xuXHRcdC8vIHRoaXMuc2Vydi5nZXRQcm9kRGVmRGV0YWlsKGl0ZW0uaWNvZGUpXG5cdFx0Ly8gLnN1YnNjcmliZSgocmVzcDphbnkpPT57XG5cdFx0Ly8gXHQgY29uc29sZS5sb2cocmVzcC5sZW5ndGgpO1xuXHRcdC8vIFx0IGNvbnNvbGUubG9nKHJlc3ApO1xuXHRcdC8vIH0pO1xuXHRcdC8vIHRoaXMuc2VsZWN0ZWRDb2RlID0gaXRlbS5pQ29kZTtcblx0XHQvLyB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XG5cdFx0Ly8gdGhpcy51dGlsc2VyLnNldExvY2FsU3RvcmUoXCJwcm9kZGVmXCIsIEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcblx0XHQvLyB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFtcIi9tYXN0ZXIvaXRlbWRldGFpbFwiXSk7XG5cdH1cblxuXHRvblNlYXJjaFRhcChlKSB7XG5cdFx0Y29uc3Qga2V5ID0gdGhpcy5zZWFyY2hzdHI7XG5cdFx0Y29uc29sZS5sb2coa2V5KTtcblx0XHR0aGlzLml0ZW1zID0gdGhpcy50ZW1waXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pY29kZS5pbmNsdWRlcyhrZXkpIHx8XG5cdFx0XHRpdGVtLmlkZXNjLmluY2x1ZGVzKGtleSlcdFx0XHRcblx0XHQpO1xuXHR9XG5cbiAgIG9uQmFjayhlKXtcblx0ICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9tYWluJ10pO1xuICAgfVxuXG59Il19