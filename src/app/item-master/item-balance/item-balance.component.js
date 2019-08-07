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
var router_1 = require("@angular/router");
var api_service_1 = require("../../core/services/api.service");
var navigation_service_1 = require("../../core/services/navigation.service");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var ItemBalanceComponent = /** @class */ (function () {
    function ItemBalanceComponent(route, navigationService, serv) {
        var _this = this;
        this.route = route;
        this.navigationService = navigationService;
        this.serv = serv;
        this.totalqty = 0;
        this.iconHome = String.fromCharCode(0xf015) + " Back";
        route.params.subscribe(function (params) {
            if (params['id']) {
                _this.icode = params['id'];
                _this.serv.getItemBalance(_this.icode)
                    .subscribe(function (resp) {
                    if (resp) {
                        _this.itembalances = resp;
                        _this.itembalances.forEach(function (item) {
                            _this.totalqty = _this.totalqty + parseFloat(item.qty);
                            console.log(_this.totalqty);
                        });
                    }
                });
            }
        });
    }
    ItemBalanceComponent.prototype.ngOnInit = function () { };
    ItemBalanceComponent.prototype.onBack = function (e) {
        this.navigationService.back();
    };
    ItemBalanceComponent = __decorate([
        core_1.Component({
            selector: 'item-balance',
            templateUrl: './item-balance.component.html',
            styleUrls: ['./item-balance.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            navigation_service_1.NavigationService,
            api_service_1.APIService])
    ], ItemBalanceComponent);
    return ItemBalanceComponent;
}());
exports.ItemBalanceComponent = ItemBalanceComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1iYWxhbmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIml0ZW0tYmFsYW5jZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQWlEO0FBQ2pELCtEQUE2RDtBQUM3RCw2RUFBMkU7QUFDM0UsMERBQTBEO0FBQzFELDRDQUE0QztBQUM1Qyw4Q0FBOEM7QUFDOUMsbURBQW1EO0FBUW5EO0lBTUMsOEJBQW9CLEtBQW9CLEVBQ3ZCLGlCQUFvQyxFQUN2QyxJQUFnQjtRQUY5QixpQkFvQkU7UUFwQmtCLFVBQUssR0FBTCxLQUFLLENBQWU7UUFDdkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUN2QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBSDlCLGFBQVEsR0FBUSxDQUFDLENBQUM7UUFJakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFDLE9BQU8sQ0FBQztRQUNwRCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDckIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxLQUFLLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO3FCQUNuQyxTQUFTLENBQUMsVUFBQSxJQUFJO29CQUNkLElBQUksSUFBSSxFQUFDO3dCQUNQLEtBQUksQ0FBQyxZQUFZLEdBQUUsSUFBSSxDQUFDO3dCQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7NEJBQzdCLEtBQUksQ0FBQyxRQUFRLEdBQUUsS0FBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQyxDQUFDLENBQUM7cUJBQ0o7Z0JBRUYsQ0FBQyxDQUFDLENBQUM7YUFDRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVGLHVDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQscUNBQU0sR0FBTixVQUFPLENBQUM7UUFDUCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQWhDVyxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDM0MsQ0FBQzt5Q0FReUIsdUJBQWM7WUFDSixzQ0FBaUI7WUFDakMsd0JBQVU7T0FSbEIsb0JBQW9CLENBaUNoQztJQUFELDJCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7QUFqQ1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdpdGVtLWJhbGFuY2UnLFxuXHR0ZW1wbGF0ZVVybDogJy4vaXRlbS1iYWxhbmNlLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vaXRlbS1iYWxhbmNlLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEl0ZW1CYWxhbmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0aWNvbkhvbWU6c3RyaW5nO1xuXHRcblx0aWNvZGU6c3RyaW5nO1xuXHRpdGVtYmFsYW5jZXM6YW55O1xuXHR0b3RhbHF0eTpudW1iZXI9MDtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTpBY3RpdmF0ZWRSb3V0ZSxcblx0XHQgICAgICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxuXHRcdFx0ICAgIHByaXZhdGUgc2VydjogQVBJU2VydmljZSkge1xuXHRcdHRoaXMuaWNvbkhvbWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjAxNSkrXCIgQmFja1wiO1x0XHRcdFxuXHRcdHJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zPT57XG4gICAgICAgICAgaWYgKHBhcmFtc1snaWQnXSl7XG5cdFx0XHR0aGlzLmljb2RlPXBhcmFtc1snaWQnXTtcblx0XHRcdHRoaXMuc2Vydi5nZXRJdGVtQmFsYW5jZSh0aGlzLmljb2RlKVxuXHRcdFx0LnN1YnNjcmliZShyZXNwPT57XG5cdFx0XHRcdGlmIChyZXNwKXtcblx0XHRcdFx0ICB0aGlzLml0ZW1iYWxhbmNlcz0gcmVzcDtcblx0XHRcdFx0ICB0aGlzLml0ZW1iYWxhbmNlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0XHRcdCAgdGhpcy50b3RhbHF0eSA9dGhpcy50b3RhbHF0eSArIHBhcnNlRmxvYXQoaXRlbS5xdHkpO1xuXHRcdFx0XHRcdCAgY29uc29sZS5sb2codGhpcy50b3RhbHF0eSk7XG5cdFx0XHRcdCAgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9KTtcblx0XHQgIH1cblx0XHR9KTtcdFx0XG5cdCB9XG5cblx0bmdPbkluaXQoKSB7IH1cblxuXHRvbkJhY2soZSl7XG5cdFx0dGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrKCk7XG5cdH1cbn0iXX0=