import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TextField } from 'ui/text-field';
import { ListViewEventData } from 'nativescript-ui-listview';
import { Color } from 'tns-core-modules/color/color';
import * as application from 'tns-core-modules/application';

import { APIService } from '../../../core/services/api.service';
import { UtilService } from '../../../core/services/util-services';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
	selector: 'proddef-list',
	templateUrl: './proddef-list.component.html',
	styleUrls: ['./proddef-list.component.css']
})

export class ProddefListComponent implements OnInit {

	iconval: string;
	iconHome:string;
	showError:boolean;
	errmsg:string;
	search: string;
	searchstr: string;
	items: any;
	tempitems: any;
	selectedCode: string;
	selectedItem: any;
	isRefresh: boolean = false;
	isBusy: boolean = true;
	searchTerm$ = new Subject<string>();

	constructor(private serv: APIService,
							private utilser: UtilService,
							private navigationService: NavigationService) {
		this.showError = false;
		this.getItemMaster();
	}

	ngOnInit() {
		this.iconval = String.fromCharCode(0xe986);
		this.iconHome = String.fromCharCode(0xf015);
		if (application.android) {
			application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
			   args.cancel = false;
			});
		  }
	}

	getItemMaster() {
		this.isRefresh = true;
		this.isBusy = false;
		// this.serv.searchPrdDef(this.searchTerm$)
		// 	.subscribe((resp:any) => {
		// 		console.log(resp);
		// 		this.items = resp.value;
		// 		this.tempitems = resp;
		// 		this.isBusy = false;
		// 	});
		
		this.serv.searchPrdDef(this.searchTerm$)
			.subscribe((resp:any) => {
				//console.log(resp);
				this.showError=false;
				this.items = resp.value;
				this.tempitems = resp;
				this.isBusy = false;
			},
			(err)=>{
				this.showError=true;
				this.errmsg =err.statusText;
				this.isBusy = false;
				//console.log('error');
				//console.log(err);
			});

	}

	onItemLoading(args: ListViewEventData) {
		this.isRefresh = false;
		if (args.index % 2 === 0) {
			args.view.backgroundColor = new Color("#b3ecff");
		}
	}

	onTextChange(e) {
		let textField = <TextField>e.object;
		if (!textField)
		  return;
		//console.log(textField.text);
  	  //	(new SnackBar()).simple("Search..."+textField.text);
		this.isBusy = true;
		this.searchTerm$.next(textField.text);
	}
	onItemTap(item) {
		this.utilser.setLocalStore("proddef", JSON.stringify(item));
		this.navigationService.navigate(["/master/proddefdetail"]);
		
		// console.log(`search prodcode def ${item.icode}`);
		// this.serv.getProdDefDetail(item.icode)
		// .subscribe((resp:any)=>{
		// 	 console.log(resp.length);
		// 	 console.log(resp);
		// });
		// this.selectedCode = item.iCode;
		// this.selectedItem = item;
		// this.utilser.setLocalStore("proddef", JSON.stringify(item));
		// this.navigationService.navigate(["/master/itemdetail"]);
	}

	onSearchTap(e) {
		const key = this.searchstr;
		console.log(key);
		this.items = this.tempitems.filter(item => item.icode.includes(key) ||
			item.idesc.includes(key)			
		);
	}

   onBack(e){
	   this.navigationService.navigate(['/main']);
   }

}