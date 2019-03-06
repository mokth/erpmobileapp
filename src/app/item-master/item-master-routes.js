"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_guard_service_1 = require("../auth/authguard/auth-guard-service");
var item_master_component_1 = require("./item/item-master.component");
exports.itemroutes = [
    { path: "", component: item_master_component_1.ItemMasterComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "master", component: item_master_component_1.ItemMasterComponent, canActivate: [auth_guard_service_1.AuthguardService] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1tYXN0ZXItcm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1tYXN0ZXItcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkVBQXdFO0FBQ3hFLHNFQUFtRTtBQUV0RCxRQUFBLFVBQVUsR0FBVztJQUM5QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLDJDQUFtQixFQUFFLFdBQVcsRUFBRSxDQUFDLHFDQUFnQixDQUFDLEVBQUU7SUFDN0UsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSwyQ0FBbUIsRUFBRSxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQyxFQUFFO0NBRXRGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEF1dGhndWFyZFNlcnZpY2UgfSBmcm9tIFwiLi4vYXV0aC9hdXRoZ3VhcmQvYXV0aC1ndWFyZC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEl0ZW1NYXN0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9pdGVtL2l0ZW0tbWFzdGVyLmNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGl0ZW1yb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBJdGVtTWFzdGVyQ29tcG9uZW50ICxjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdIH0sXHJcbiAgICB7IHBhdGg6IFwibWFzdGVyXCIsIGNvbXBvbmVudDogSXRlbU1hc3RlckNvbXBvbmVudCAsY2FuQWN0aXZhdGU6IFtBdXRoZ3VhcmRTZXJ2aWNlXSB9LFxyXG4gIFxyXG5dOyJdfQ==