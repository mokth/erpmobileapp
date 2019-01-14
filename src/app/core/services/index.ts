import { NavigationService } from './navigation.service';
import { APIService } from './api.service';
import { UtilService } from './util-services';
import { AuthService } from './auth-service';
import { StoreService } from './store-service';

export * from './api.service';
export * from './util-services';
export * from './store-service'

export const SERVICES = [
    APIService,
    UtilService,
    AuthService,
    StoreService,
    NavigationService
];