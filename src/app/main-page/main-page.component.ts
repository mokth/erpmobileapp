import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
//import {screen} from "platform"

import { NavigationService } from '../core/services/navigation.service';
import { AuthService } from '../core/services/auth-service';
//import { AndroidApplication, AndroidActivityBackPressedEventData } from 'tns-core-modules/application/application';
//import * as application from "tns-core-modules/application";

@Component({
  selector: 'ns-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  moduleId: module.id.toString(),
})
export class MainPageComponent implements OnInit,AfterViewInit {

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;
  iconAdd:String;
  iconlogo:String;

  constructor( private auth:AuthService,
               private navigationService: NavigationService){
   
    //  console.log(screen.mainScreen.heightDIPs);
    //  console.log(screen.mainScreen.widthDIPs);
    //  console.log(screen.mainScreen.heightDIPs);
    //  console.log(screen.mainScreen.heightPixels);
   }

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
        this.navigationService.navigate(['/saleslist'],
        { animated: true, 
          transition: 
          {
              name: 'flip', 
              duration: 1000, 
              curve: 'linear'
          }
        });        
      } else if (arg=="sales"){
        this.navigationService.navigate(['/sales']);
      } else if (arg=="cust"){
          this.navigationService.navigate(['/saleslist/lookcust']);
      } else if (arg=="item"){
        this.navigationService.navigate(['/master']);
      }
      else if (arg=="daily"){
        this.navigationService.navigate(['/daily'],
        {
           clearHistory:true,
           animated: true, 
            transition: 
            {
                name: 'flip', 
                duration: 1000, 
                curve: 'linear'
            }  
         });
      }
      else if (arg=="grn"){
        this.navigationService.navigate(['/grn'],
        {
           clearHistory:true,
           animated: true, 
           transition: 
           {
               name: 'flip', 
               duration: 1000, 
               curve: 'linear'
           }  
          });
      }
      else if (arg=="cycle"){
        this.navigationService.navigate(['/grn/cycle'],{
          clearHistory:true,
          animated: true, 
          transition: 
          {
              name: 'flip', 
              duration: 1000, 
              curve: 'linear'
          }  
        });
      }
      else if (arg=="cyclenolot"){
        this.navigationService.navigate(['/grn/cyclenolot'],
        {
          clearHistory:true,
          animated: true, 
          transition: 
          {
              name: 'flip', 
              duration: 1000, 
              curve: 'linear'
          }  
        });
      }
      else if (arg=="setting"){
        this.navigationService.navigate(['/setting'],
        {
           animated: true, 
           transition: 
           {
               name: 'flip', 
               duration: 1000, 
               curve: 'linear'
           }  
          });
      }
      else if (arg=="Logout"){
        this.onLogOut();
      }
      this.drawer.closeDrawer();
    }    

    onLogOut(){
      this.auth.signOut();      
      this.navigationService.navigate(['/login'],{
        clearHistory:true,
        animated: true, 
        transition: 
        {
            name: 'flip', 
            duration: 1000, 
            curve: 'linear'
        }  
      });
     
    }
}
