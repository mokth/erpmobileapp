import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { NavigationService } from '../core/services/navigation.service';
import { AuthService } from '../core/services/auth-service';
//import { AndroidApplication, AndroidActivityBackPressedEventData } from 'tns-core-modules/application/application';
//import * as application from "tns-core-modules/application";

@Component({
  selector: 'ns-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  moduleId: module.id,
})
export class MainPageComponent implements OnInit,AfterViewInit {

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;
  iconAdd:String;
  iconlogo:String;

  constructor( private auth:AuthService,
               private navigationService: NavigationService)
   { }

  ngOnInit() {
    this.iconAdd = String.fromCharCode(0xe9bd);
    this.iconlogo= String.fromCharCode(0xee92e);    
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this.drawer.drawerLocation = SideDrawerLocation.Right;   
  }

  showSlideout() {
      this.drawer.mainContent.className = 'drawer-content-in';
      this.drawer.showDrawer();
  }

  onDrawerClosing() {
      this.drawer.mainContent.className = 'drawer-content-out';
  }

  onCloseMenu($event){
    this.drawer.closeDrawer();
  }

  onTabMenu(arg){
    if (arg=="saleslist"){
      this.navigationService.navigate(['/saleslist']);
    } else if (arg=="sales"){
       this.navigationService.navigate(['/sales']);
    } else if (arg=="cust"){
        this.navigationService.navigate(['/lookcust']);
    } else if (arg=="item"){
      this.navigationService.navigate(['/lookitem']);
    }
      this.drawer.closeDrawer();
    }    

    onLogOut(){
      this.auth.signOut();      
      this.navigationService.navigate(['/login'],{clearHistory:true});
     
    }
}
