import { NgModule, InjectionToken } from '@angular/core';

import { AppConfig } from '../core/model/app-config.model';
import { environment } from '../environments/environment';



//const appConfig = <AppConfig>require(environment.appConfigFile);

 const appConfig:AppConfig = {
     appType: "Ns",
     apiEndpoint: "http://wincom2cloud.com/ERP6Service/",
     erpEndpoint: "http://wincom2cloud.com/erpv4/",
     loggingEnabled: true
 }

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@NgModule({
    providers: [
        { provide: APP_CONFIG, useValue: appConfig }
    ]
})
export class AppConfigModule {
    
 }