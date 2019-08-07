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
var services_1 = require("../../core/services");
var color_1 = require("tns-core-modules/color/color");
var navigation_service_1 = require("../../core/services/navigation.service");
var application = require("tns-core-modules/application");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
// import { ListViewEventData } from "nativescript-ui-listview";
// import { registerElement } from "nativescript-angular/element-registry";
// registerElement("pullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
var SalesOrderListComponent = /** @class */ (function () {
    function SalesOrderListComponent(serv, _changeDetectionRef, navigationService) {
        this.serv = serv;
        this._changeDetectionRef = _changeDetectionRef;
        this.navigationService = navigationService;
        this.orderlist = new observable_array_1.ObservableArray();
        this.isBusy = true;
    }
    ;
    SalesOrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._changeDetectionRef.detectChanges();
        this.iconAdd = String.fromCharCode(0xf055);
        this.iconHome = String.fromCharCode(0xf015);
        this.sub$ = this.serv.getSalesOrder().subscribe(function (resp) {
            resp.forEach(function (item) { return _this.orderlist.push(item); });
            _this.isBusy = false;
            // console.log(this.orderlist.length);
        });
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = true;
            });
        }
    };
    Object.defineProperty(SalesOrderListComponent.prototype, "dataItems", {
        get: function () {
            return this.orderlist;
        },
        enumerable: true,
        configurable: true
    });
    SalesOrderListComponent.prototype.ngOnDestroy = function () {
        this.sub$.unsubscribe();
    };
    SalesOrderListComponent.prototype.refreshList = function (args) {
        var _this = this;
        this.isBusy = false;
        var listView = args.object;
        if (this.sub$ != null) {
            this.sub$.unsubscribe();
            //console.log('this.sub$.unsubscribe()');
        }
        this.sub$ = this.serv.getSalesOrder().subscribe(function (resp) {
            _this.orderlist = new observable_array_1.ObservableArray();
            resp.forEach(function (item) { return _this.orderlist.push(item); });
            _this.isBusy = false;
            listView.notifyPullToRefreshFinished();
        });
    };
    SalesOrderListComponent.prototype.onItemLoading = function (args) {
        if (args.index % 2 === 0) {
            args.view.backgroundColor = new color_1.Color("#F4F6F6");
        }
    };
    SalesOrderListComponent.prototype.onItemTap = function (item) {
        var sono = item.sono + "@" + item.custrel;
        this.navigationService.navigate(['/saleslist/sales', sono], { clearHistory: true });
    };
    SalesOrderListComponent.prototype.OnAddItem = function (e) {
        this.navigationService.navigate(['/saleslist/sales', 'new'], { clearHistory: true });
    };
    SalesOrderListComponent.prototype.onBack = function (e) {
        console.log('back to saleslist');
        this.navigationService.navigate(['/main'], { clearHistory: true });
        //this.navigationService.back();
    };
    SalesOrderListComponent = __decorate([
        core_1.Component({
            selector: 'ns-sales-order-list',
            templateUrl: './sales-order-list.component.html',
            styleUrls: ['./sales-order-list.component.css'],
            moduleId: module.id.toString(),
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            core_1.ChangeDetectorRef,
            navigation_service_1.NavigationService])
    ], SalesOrderListComponent);
    return SalesOrderListComponent;
}());
exports.SalesOrderListComponent = SalesOrderListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHNDQUFnRjtBQUNoRixnREFBOEQ7QUFJOUQsc0RBQXFEO0FBQ3JELDZFQUEyRTtBQUMzRSwwREFBNEQ7QUFDNUQsNEZBQTBGO0FBRTFGLGdFQUFnRTtBQUNoRSwyRUFBMkU7QUFDM0UsK0ZBQStGO0FBUS9GO0lBUUUsaUNBQW9CLElBQWUsRUFDZixtQkFBc0MsRUFDdEMsaUJBQW9DO1FBRnBDLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQ3RDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFQeEQsY0FBUyxHQUE2QixJQUFJLGtDQUFlLEVBQWEsQ0FBQztRQUN2RSxXQUFNLEdBQVMsSUFBSSxDQUFDO0lBT25CLENBQUM7SUFScUUsQ0FBQztJQVV4RSwwQ0FBUSxHQUFSO1FBQUEsaUJBZ0JDO1FBZkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQVE7WUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWMsSUFBRyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7WUFDMUQsS0FBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENB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bkIsc0NBQWlCO09BVjdDLHVCQUF1QixDQTRFbkM7SUFBRCw4QkFBQztDQUFBLEFBNUVELElBNEVDO0FBNUVZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXRpbFNlcnZpY2UsIEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzJztcclxuLy9pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcclxuLy9pbXBvcnQgeyBTYWxlc09kZXIgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL3NhbGVzLW9yZGVyJztcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcnO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3IvY29sb3InO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheSc7XHJcbmltcG9ydCB7IFNhbGVzT2RlciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwnO1xyXG4vLyBpbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXdcIjtcclxuLy8gaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuLy8gcmVnaXN0ZXJFbGVtZW50KFwicHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25zLXNhbGVzLW9yZGVyLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC5jc3MnXSxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLnRvU3RyaW5nKCksXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTYWxlc09yZGVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuIFxyXG5cclxuICBvcmRlcmxpc3Q6T2JzZXJ2YWJsZUFycmF5PFNhbGVzT2Rlcj4gPW5ldyBPYnNlcnZhYmxlQXJyYXk8U2FsZXNPZGVyPigpOztcclxuICBpc0J1c3k6Ym9vbGVhbj10cnVlO1xyXG4gIGljb25BZGQ6c3RyaW5nO1xyXG4gIGljb25Ib21lOnN0cmluZztcclxuICBzdWIkOlN1YnNjcmlwdGlvbjtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnY6QVBJU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKSB7ICAgIFxyXG4gICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIHRoaXMuaWNvbkFkZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDU1KTtcclxuICAgIHRoaXMuaWNvbkhvbWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjAxNSk7XHJcbiAgICBcclxuICAgIHRoaXMuc3ViJD10aGlzLnNlcnYuZ2V0U2FsZXNPcmRlcigpLnN1YnNjcmliZSgocmVzcDphbnkpPT57XHJcbiAgICAgICAgcmVzcC5mb3JFYWNoKChpdGVtOlNhbGVzT2Rlcik9PnRoaXMub3JkZXJsaXN0LnB1c2goaXRlbSkpO1xyXG4gICAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xyXG4gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5vcmRlcmxpc3QubGVuZ3RoKTtcclxuICAgIH0pOyAgIFxyXG5cclxuICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XHJcbiAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkYXRhSXRlbXMoKTogT2JzZXJ2YWJsZUFycmF5PFNhbGVzT2Rlcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3JkZXJsaXN0O1xyXG59XHJcbiAgIFxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgIHRoaXMuc3ViJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcblxyXG4gIHJlZnJlc2hMaXN0KGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XHJcbiAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgIGNvbnN0IGxpc3RWaWV3ID0gYXJncy5vYmplY3Q7XHJcbiAgICBpZiAodGhpcy5zdWIkIT1udWxsKXtcclxuICAgICAgdGhpcy5zdWIkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ3RoaXMuc3ViJC51bnN1YnNjcmliZSgpJyk7XHJcbiAgICB9ICAgIFxyXG5cdCAgdGhpcy5zdWIkPXRoaXMuc2Vydi5nZXRTYWxlc09yZGVyKCkuc3Vic2NyaWJlKChyZXNwOmFueSk9PntcclxuICAgICAgICB0aGlzLm9yZGVybGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8U2FsZXNPZGVyPigpO1xyXG4gICAgICAgIHJlc3AuZm9yRWFjaCgoaXRlbTpTYWxlc09kZXIpPT50aGlzLm9yZGVybGlzdC5wdXNoKGl0ZW0pKTtcclxuICAgICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgICAgICBsaXN0Vmlldy5ub3RpZnlQdWxsVG9SZWZyZXNoRmluaXNoZWQoKTtcclxuICAgIH0pOyAgIFxyXG5cclxuXHR9XHJcbiAgXHJcbiAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XHJcbiAgICBpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcclxuICAgICAgIGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjRjRGNkY2XCIpOyAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25JdGVtVGFwKGl0ZW0pe1xyXG4gICAgY29uc3Qgc29ubyA9IGl0ZW0uc29ubytcIkBcIitpdGVtLmN1c3RyZWw7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdC9zYWxlcycsc29ub10se2NsZWFySGlzdG9yeTp0cnVlfSk7XHJcbiAgfVxyXG5cclxuICBPbkFkZEl0ZW0oZSl7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdC9zYWxlcycsJ25ldyddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgb25CYWNrKGUpe1xyXG4gICAgY29uc29sZS5sb2coJ2JhY2sgdG8gc2FsZXNsaXN0Jyk7XHJcbiAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9tYWluJ10se2NsZWFySGlzdG9yeTp0cnVlfSk7XHJcbiAgICAgLy90aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19