import { Component, OnInit } from '@angular/core';

import { APIService } from '../../../core/services/api.service';
import { UtilService } from '../../../core/services/util-services';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
	selector: 'proddef-detail',
	templateUrl: './proddef-detail.component.html',
	styleUrls: ['./proddef-detail.component.css']
})

export class ProddefDetailComponent implements OnInit {

	public items: any;
	
	iconHome:string;
    prodcode:string;
	constructor(private apiser:APIService,
		        private utilser:UtilService,	        
		        private navigationService: NavigationService) {
	this.iconHome = String.fromCharCode(0xf015);
	const data = this.utilser.getLocalStore("proddef");
	if (data){
		const proddef = JSON.parse(data);
		this.prodcode = proddef.icode;
		const url= this.apiser.getProdDefDetail(proddef.icode)
		.subscribe(resp=>{
			this.items= resp;
		})
				
	}
}

	ngOnInit() { }

	onBack(e){
		this.navigationService.backToPreviousPage();
	}
}