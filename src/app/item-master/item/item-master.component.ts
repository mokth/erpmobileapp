import { Component, OnInit } from '@angular/core';
import { APIService } from '../../core/services/api.service';
import { NavigationService } from '../../core/services/navigation.service';

import { AuthService } from '../../core/services/auth-service';
import { UtilService } from '../../core/services';


@Component({
	selector: 'item-master',
	templateUrl: './item-master.component.html',
	styleUrls: ['./item-master.component.css'],
	moduleId: module.id.toString(),
})

export class ItemMasterComponent implements OnInit {
	public item: any;
	imageUrl:string;

	iconStore: string;
	iconHome:string;

	constructor(private apiser:APIService,
		        private utilser:UtilService,	        
		        private navigationService: NavigationService) {
		
	this.iconHome = String.fromCharCode(0xf022)+" Back";
	this.iconStore = String.fromCharCode(0xf494)+" Stock";
	const data = this.utilser.getLocalStore("itemdetail");
	if (data){
		this.item = JSON.parse(data);
		const url= this.apiser.getERPURL();
		if (this.item.imageUrl==""){
		   this.imageUrl = url+"images/noimg.png";
		}else{
		   let imgurl:string =this.item.imageUrl;
				imgurl =imgurl.replace('~','/').replace('\\','/');
		   this.imageUrl = url+imgurl;	
		}		
	}
}

	ngOnInit() { }

	OnTap(e){
		this.navigationService.backToPreviousPage();
	}

	OnStockTap(e){
		this.navigationService.navigate(["/itembalance",this.item.iCode],
		{
			clearHistory:false,
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