import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../core/services/api.service';
import { UtilService } from '../../../core/services/util-services';
import { NavigationService } from '../../../core/services/navigation.service';


@Component({
	selector: 'prod-defination',
	templateUrl: './prod-defination.component.html',
	styleUrls: ['./prod-defination.component.css']
})

export class ProdDefinationComponent implements OnInit {
	showError:boolean;
	errmsg:string;
	listbom:any;
	listmac:any;
	listproc:any;
	listwc:any;

	prodcode:string;
	iconHome:string;
	constructor(private serv: APIService,
				private utilser: UtilService,
				private navigationService: NavigationService) {
	  this.showError = false;
	  this.iconHome = String.fromCharCode(0xf015)+" Back";
	  const data = this.utilser.getLocalStore("proddef");
	  if (data){
		const proddef = JSON.parse(data);
		this.prodcode = proddef.icode;
	    this.getProdDefination();
	  }
	  this.getProdDefination();
    }

	ngOnInit() { }

	getProdDefination() {
		this.serv.getProdDefination(this.prodcode)
			.subscribe((resp:any) => {
				console.log(resp);
				this.showError=false;				
				this.listbom= resp.listbom;
				this.listmac = resp.listmac;
				this.listproc = resp.listporc;
				this.listwc = resp.listwc;
			},
			(err)=>{
				this.showError=true;
				this.errmsg =err.statusText;				
			});

	}

	onBack(e){
		this.navigationService.back();
	}
}