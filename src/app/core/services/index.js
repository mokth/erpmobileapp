"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var navigation_service_1 = require("./navigation.service");
var api_service_1 = require("./api.service");
var util_services_1 = require("./util-services");
var auth_service_1 = require("./auth-service");
var store_service_1 = require("./store-service");
var sql_service_1 = require("./sql-service");
__export(require("./api.service"));
__export(require("./util-services"));
__export(require("./store-service"));
exports.SERVICES = [
    api_service_1.APIService,
    util_services_1.UtilService,
    auth_service_1.AuthService,
    store_service_1.StoreService,
    sql_service_1.SQLService,
    navigation_service_1.NavigationService
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUF5RDtBQUN6RCw2Q0FBMkM7QUFDM0MsaURBQThDO0FBQzlDLCtDQUE2QztBQUM3QyxpREFBK0M7QUFDL0MsNkNBQTJDO0FBRTNDLG1DQUE4QjtBQUM5QixxQ0FBZ0M7QUFDaEMscUNBQStCO0FBRWxCLFFBQUEsUUFBUSxHQUFHO0lBQ3BCLHdCQUFVO0lBQ1YsMkJBQVc7SUFDWCwwQkFBVztJQUNYLDRCQUFZO0lBQ1osd0JBQVU7SUFDVixzQ0FBaUI7Q0FDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBUElTZXJ2aWNlIH0gZnJvbSAnLi9hcGkuc2VydmljZSc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlIH0gZnJvbSAnLi91dGlsLXNlcnZpY2VzJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JlU2VydmljZSB9IGZyb20gJy4vc3RvcmUtc2VydmljZSc7XHJcbmltcG9ydCB7IFNRTFNlcnZpY2UgfSBmcm9tICcuL3NxbC1zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vYXBpLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWwtc2VydmljZXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3N0b3JlLXNlcnZpY2UnXHJcblxyXG5leHBvcnQgY29uc3QgU0VSVklDRVMgPSBbXHJcbiAgICBBUElTZXJ2aWNlLFxyXG4gICAgVXRpbFNlcnZpY2UsXHJcbiAgICBBdXRoU2VydmljZSxcclxuICAgIFN0b3JlU2VydmljZSxcclxuICAgIFNRTFNlcnZpY2UsXHJcbiAgICBOYXZpZ2F0aW9uU2VydmljZVxyXG5dOyJdfQ==