import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../core/services/api.service';
import { NavigationService } from '../../core/services/navigation.service';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'item-balance',
	templateUrl: './item-balance.component.html',
	styleUrls: ['./item-balance.component.css']
})

export class ItemBalanceComponent implements OnInit {
	iconHome:string;
	
	icode:string;
	itembalances:any;
	totalqty:number=0;
	constructor(private route:ActivatedRoute,
		        private navigationService: NavigationService,
			    private serv: APIService) {
		this.iconHome = String.fromCharCode(0xf015)+" Back";			
		route.params.subscribe(params=>{
          if (params['id']){
			this.icode=params['id'];
			this.serv.getItemBalance(this.icode)
			.subscribe(resp=>{
				if (resp){
				  this.itembalances= resp;
				  this.itembalances.forEach(item => {
					  this.totalqty =this.totalqty + parseFloat(item.qty);
					  console.log(this.totalqty);
				  });
				}
				
			});
		  }
		});		
	 }

	ngOnInit() { }

	onBack(e){
		this.navigationService.back();
	}
}