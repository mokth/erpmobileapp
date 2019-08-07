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
var color_1 = require("tns-core-modules/color/color");
var rxjs_1 = require("rxjs");
var services_1 = require("../../core/services");
var navigation_service_1 = require("../../core/services/navigation.service");
var application = require("tns-core-modules/application");
// import { PullToRefresh } from "nativescript-pulltorefresh";
// import { registerElement } from "nativescript-angular/element-registry";
// registerElement("pullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
var ItemListComponent = /** @class */ (function () {
    function ItemListComponent(serv, utilser, navigationService) {
        this.serv = serv;
        this.utilser = utilser;
        this.navigationService = navigationService;
        this.isRefresh = false;
        this.isBusy = true;
        this.searchTerm$ = new rxjs_1.Subject();
        this.isRefresh = false;
        this.showError = false;
        this.getItemMaster();
    }
    ItemListComponent.prototype.ngOnInit = function () {
        this.iconval = String.fromCharCode(0xe986);
        this.iconHome = String.fromCharCode(0xf015);
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = false;
            });
        }
    };
    // ngAfterViewInit() {
    // }
    ItemListComponent.prototype.getItemMaster = function () {
        var _this = this;
        this.isBusy = false;
        this.serv.searchitem(this.searchTerm$)
            .subscribe(function (resp) {
            _this.isRefresh = false;
            _this.showError = false;
            _this.items = resp.value;
            _this.tempitems = resp;
            _this.isBusy = false;
            console.log(_this.items.length);
        }, function (err) {
            _this.showError = true;
            _this.errmsg = err.statusText;
            _this.isBusy = false;
            _this.isRefresh = false;
            //console.log('error');
            console.log(err);
        });
    };
    ItemListComponent.prototype.onItemLoading = function (args) {
        this.isRefresh = false;
        if (args.index % 2 === 0) {
            args.view.backgroundColor = new color_1.Color("#b3ecff");
        }
    };
    ItemListComponent.prototype.onTextChange = function (e) {
        var textField = e.object;
        if (!textField)
            return;
        console.log(textField.text);
        //	(new SnackBar()).simple("Search..."+textField.text);
        this.isBusy = true;
        this.searchstr = textField.text;
        this.searchTerm$.next(textField.text);
    };
    // refreshList(args: any) {
    // 	console.log('refreh $searchstr');
    // 	let pullRefresh = args.object;
    // 	pullRefresh.refreshing = false;	
    // 	this.isBusy = true;		
    // 	console.log('refreh $searchstr');
    // 	this.searchTerm$.next(this.searchstr);
    // }
    ItemListComponent.prototype.onItemTap = function (item) {
        console.log(item);
        this.selectedCode = item.iCode;
        this.selectedItem = item;
        this.utilser.setLocalStore("itemdetail", JSON.stringify(item));
        //this.navigationService.backToPreviousPage();
        this.navigationService.navigate(["/master/itemdetail"], {
            clearHistory: false,
            animated: true,
            transition: {
                name: 'flip',
                duration: 1000,
                curve: 'linear'
            }
        });
    };
    // onLongPress(item){
    //   console.log('long press...')
    //   this.selectedCode= item.iCode;
    //   this.selectedItem = item;
    //   this.utilser.fireEvent(DataTable.masteritem,item);
    //   this.navigationService.backToPreviousPage();
    // }
    // onSearchTap(e) {
    // 	const key = this.searchstr;
    // 	console.log(key);
    // 	this.items = this.tempitems.filter(item => item.iCode.includes(key) ||
    // 		item.iDesc.includes(key) ||
    // 		item.iType.includes(key) ||
    // 		item.iClass.includes(key) ||
    // 		item.iSubClass.includes(key) ||
    // 		item.sellingUOM.includes(key)
    // 	);
    // }
    ItemListComponent.prototype.onBack = function (e) {
        this.navigationService.navigate(['/main']);
    };
    ItemListComponent = __decorate([
        core_1.Component({
            selector: 'item-list',
            templateUrl: './item-list.component.html',
            styleUrls: ['./item-list.component.css']
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            services_1.UtilService,
            navigation_service_1.NavigationService])
    ], ItemListComponent);
    return ItemListComponent;
}());
exports.ItemListComponent = ItemListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIml0ZW0tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBaUU7QUFFakUsc0RBQXFEO0FBQ3JELDZCQUErQjtBQUUvQixnREFBOEQ7QUFDOUQsNkVBQTJFO0FBRTNFLDBEQUE0RDtBQUM1RCw4REFBOEQ7QUFDOUQsMkVBQTJFO0FBQzNFLCtGQUErRjtBQVEvRjtJQWdCQywyQkFBb0IsSUFBZ0IsRUFDM0IsT0FBb0IsRUFDcEIsaUJBQW9DO1FBRnpCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUNwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTjdDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsV0FBTSxHQUFZLElBQUksQ0FBQztRQUN2QixnQkFBVyxHQUFHLElBQUksY0FBTyxFQUFVLENBQUM7UUFLbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLFVBQUMsSUFBUztnQkFDekYsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7U0FDSDtJQUNG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Qyw4QkFBOEI7SUFDOUIsdURBQXVEO0lBQ3ZELGlEQUFpRDtJQUNqRCxJQUFJO0lBRUosbUJBQW1CO0lBQ25CLCtCQUErQjtJQUMvQixxQkFBcUI7SUFDckIsMEVBQTBFO0lBQzFFLGdDQUFnQztJQUNoQyxnQ0FBZ0M7SUFDaEMsaUNBQWlDO0lBQ2pDLG9DQUFvQztJQUNwQyxrQ0FBa0M7SUFDbEMsTUFBTTtJQUNOLElBQUk7SUFFSixrQ0FBTSxHQUFOLFVBQU8sQ0FBQztRQUNQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUE5SFcsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7eUNBa0J5QixxQkFBVTtZQUNsQixzQkFBVztZQUNELHNDQUFpQjtPQWxCakMsaUJBQWlCLENBZ0k3QjtJQUFELHdCQUFDO0NBQUEsQUFoSUQsSUFnSUM7QUFoSVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFQSVNlcnZpY2UsIFV0aWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XG4vLyBpbXBvcnQgeyBQdWxsVG9SZWZyZXNoIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCI7XG4vLyBpbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuLy8gcmVnaXN0ZXJFbGVtZW50KFwicHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2l0ZW0tbGlzdCcsXG5cdHRlbXBsYXRlVXJsOiAnLi9pdGVtLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9pdGVtLWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgSXRlbUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRpY29udmFsOiBzdHJpbmc7XG5cdGljb25Ib21lOiBzdHJpbmc7XG5cblx0c2hvd0Vycm9yOiBib29sZWFuO1xuXHRlcnJtc2c6IHN0cmluZztcblx0c2VhcmNoOiBzdHJpbmc7XG5cdHNlYXJjaHN0cjogc3RyaW5nO1xuXHRpdGVtczogYW55O1xuXHR0ZW1waXRlbXM6IGFueTtcblx0c2VsZWN0ZWRDb2RlOiBzdHJpbmc7XG5cdHNlbGVjdGVkSXRlbTogYW55O1xuXHRpc1JlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZTtcblx0aXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblx0c2VhcmNoVGVybSQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2OiBBUElTZXJ2aWNlLFxuXHRcdHByaXZhdGUgdXRpbHNlcjogVXRpbFNlcnZpY2UsXG5cdFx0cHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcblx0XHR0aGlzLmlzUmVmcmVzaCA9IGZhbHNlO1xuXHRcdHRoaXMuc2hvd0Vycm9yID0gZmFsc2U7XG5cdFx0dGhpcy5nZXRJdGVtTWFzdGVyKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmljb252YWwgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZTk4Nik7XG5cdFx0dGhpcy5pY29uSG9tZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDE1KTtcblx0XHRpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuXHRcdFx0YXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoYXJnczogYW55KSA9PiB7XG5cdFx0XHRcdGFyZ3MuY2FuY2VsID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0Ly8gbmdBZnRlclZpZXdJbml0KCkge1xuXG5cdC8vIH1cblx0Z2V0SXRlbU1hc3RlcigpIHtcblx0XHR0aGlzLmlzQnVzeSA9IGZhbHNlO1xuXHRcdHRoaXMuc2Vydi5zZWFyY2hpdGVtKHRoaXMuc2VhcmNoVGVybSQpXG5cdFx0XHQuc3Vic2NyaWJlKChyZXNwOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5pc1JlZnJlc2ggPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5zaG93RXJyb3IgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5pdGVtcyA9IHJlc3AudmFsdWU7XG5cdFx0XHRcdHRoaXMudGVtcGl0ZW1zID0gcmVzcDtcblx0XHRcdFx0dGhpcy5pc0J1c3kgPSBmYWxzZTtcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5pdGVtcy5sZW5ndGgpO1xuXHRcdFx0fSxcblx0XHRcdFx0KGVycikgPT4ge1xuXHRcdFx0XHRcdHRoaXMuc2hvd0Vycm9yID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmVycm1zZyA9IGVyci5zdGF0dXNUZXh0O1xuXHRcdFx0XHRcdHRoaXMuaXNCdXN5ID0gZmFsc2U7XG5cdFx0XHRcdFx0dGhpcy5pc1JlZnJlc2ggPSBmYWxzZTtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCdlcnJvcicpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cdFx0XHRcdH0pO1xuXG5cdH1cblxuXHRvbkl0ZW1Mb2FkaW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG5cdFx0dGhpcy5pc1JlZnJlc2ggPSBmYWxzZTtcblx0XHRpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcblx0XHRcdGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjYjNlY2ZmXCIpO1xuXHRcdH1cblx0fVxuXG5cdG9uVGV4dENoYW5nZShlKSB7XG5cdFx0bGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+ZS5vYmplY3Q7XG5cdFx0aWYgKCF0ZXh0RmllbGQpXG5cdFx0XHRyZXR1cm47XG5cdFx0Y29uc29sZS5sb2codGV4dEZpZWxkLnRleHQpO1xuXHRcdC8vXHQobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlNlYXJjaC4uLlwiK3RleHRGaWVsZC50ZXh0KTtcblx0XHR0aGlzLmlzQnVzeSA9IHRydWU7XG5cdFx0dGhpcy5zZWFyY2hzdHIgPSB0ZXh0RmllbGQudGV4dDtcblx0XHR0aGlzLnNlYXJjaFRlcm0kLm5leHQodGV4dEZpZWxkLnRleHQpO1xuXHR9XG5cblx0Ly8gcmVmcmVzaExpc3QoYXJnczogYW55KSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ3JlZnJlaCAkc2VhcmNoc3RyJyk7XG5cdC8vIFx0bGV0IHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XG5cdC8vIFx0cHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1x0XG5cdC8vIFx0dGhpcy5pc0J1c3kgPSB0cnVlO1x0XHRcblx0Ly8gXHRjb25zb2xlLmxvZygncmVmcmVoICRzZWFyY2hzdHInKTtcblx0Ly8gXHR0aGlzLnNlYXJjaFRlcm0kLm5leHQodGhpcy5zZWFyY2hzdHIpO1xuXHQvLyB9XG5cblx0b25JdGVtVGFwKGl0ZW0pIHtcblx0XHRjb25zb2xlLmxvZyhpdGVtKTtcblx0XHR0aGlzLnNlbGVjdGVkQ29kZSA9IGl0ZW0uaUNvZGU7XG5cdFx0dGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuXHRcdHRoaXMudXRpbHNlci5zZXRMb2NhbFN0b3JlKFwiaXRlbWRldGFpbFwiLCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XG5cdFx0Ly90aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuXHRcdHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoW1wiL21hc3Rlci9pdGVtZGV0YWlsXCJdLFxuXHRcdFx0e1xuXHRcdFx0XHRjbGVhckhpc3Rvcnk6IGZhbHNlLFxuXHRcdFx0XHRhbmltYXRlZDogdHJ1ZSxcblx0XHRcdFx0dHJhbnNpdGlvbjpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6ICdmbGlwJyxcblx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0XHRjdXJ2ZTogJ2xpbmVhcidcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH1cblxuXHQvLyBvbkxvbmdQcmVzcyhpdGVtKXtcblx0Ly8gICBjb25zb2xlLmxvZygnbG9uZyBwcmVzcy4uLicpXG5cdC8vICAgdGhpcy5zZWxlY3RlZENvZGU9IGl0ZW0uaUNvZGU7XG5cdC8vICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuXHQvLyAgIHRoaXMudXRpbHNlci5maXJlRXZlbnQoRGF0YVRhYmxlLm1hc3Rlcml0ZW0saXRlbSk7XG5cdC8vICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcblx0Ly8gfVxuXG5cdC8vIG9uU2VhcmNoVGFwKGUpIHtcblx0Ly8gXHRjb25zdCBrZXkgPSB0aGlzLnNlYXJjaHN0cjtcblx0Ly8gXHRjb25zb2xlLmxvZyhrZXkpO1xuXHQvLyBcdHRoaXMuaXRlbXMgPSB0aGlzLnRlbXBpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlDb2RlLmluY2x1ZGVzKGtleSkgfHxcblx0Ly8gXHRcdGl0ZW0uaURlc2MuaW5jbHVkZXMoa2V5KSB8fFxuXHQvLyBcdFx0aXRlbS5pVHlwZS5pbmNsdWRlcyhrZXkpIHx8XG5cdC8vIFx0XHRpdGVtLmlDbGFzcy5pbmNsdWRlcyhrZXkpIHx8XG5cdC8vIFx0XHRpdGVtLmlTdWJDbGFzcy5pbmNsdWRlcyhrZXkpIHx8XG5cdC8vIFx0XHRpdGVtLnNlbGxpbmdVT00uaW5jbHVkZXMoa2V5KVxuXHQvLyBcdCk7XG5cdC8vIH1cblxuXHRvbkJhY2soZSkge1xuXHRcdHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbWFpbiddKTtcblx0fVxuXG59Il19