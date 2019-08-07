import { Component, OnInit } from '@angular/core';

import { APIService } from '../../core/services';
import { NavigationService } from '../../core/services/navigation.service';
import { registerElement } from 'nativescript-angular/element-registry';
registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);

@Component({
  selector: 'ns-daily-list',
  templateUrl: './daily-list.component.html',
  styleUrls: ['./daily-list.component.css'],
  moduleId: module.id,
})
export class DailyListComponent implements OnInit {

  iconlogo:string;
  items:any;
  constructor(private apiser:APIService,    
              private navigationService: NavigationService) { }

  ngOnInit() {
    //ea40
    this.iconlogo= String.fromCharCode(0xf060); 
    this.apiser.getDailyInput().subscribe((resp)=>{
        //console.log(resp);
        this.items = resp.data;
    });
  }

  onNavBtnTap(){
    this.navigationService.navigate(['/main'],{clearHistory:true});
  }

  onNewDaily(){
    console.log('tap on +');
    this.navigationService.navigate(['/daily/dailyscan']);
  }

}
