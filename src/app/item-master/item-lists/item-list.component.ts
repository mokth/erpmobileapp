import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ListViewEventData } from 'nativescript-ui-listview';
import { Color } from 'tns-core-modules/color/color';
import { SnackBar } from 'nativescript-snackbar';

import { APIService, UtilService } from '../../core/services';
import { NavigationService } from '../../core/services/navigation.service';
import { DataTable } from '../../core/enums';
import { Subject } from 'rxjs';
import { TextField } from 'ui/text-field';
import * as application from 'tns-core-modules/application';


@Component({
	selector: 'item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
	iconval: string;
	iconHome:string;

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
	// ngAfterViewInit() {

	// }
	getItemMaster() {
		this.isRefresh = true;
		this.isBusy = false;
		this.serv.searchitem(this.searchTerm$)
			.subscribe(resp => {
				this.items = resp;
				this.tempitems = resp;
				this.isBusy = false;
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
		console.log(item);
		this.selectedCode = item.iCode;
		this.selectedItem = item;
		this.utilser.setLocalStore("itemdetail", JSON.stringify(item));
		//this.navigationService.backToPreviousPage();
		this.navigationService.navigate(["/master/itemdetail"],
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

	// onLongPress(item){
	//   console.log('long press...')
	//   this.selectedCode= item.iCode;
	//   this.selectedItem = item;
	//   this.utilser.fireEvent(DataTable.masteritem,item);
	//   this.navigationService.backToPreviousPage();
	// }

	onSearchTap(e) {
		const key = this.searchstr;
		console.log(key);
		this.items = this.tempitems.filter(item => item.iCode.includes(key) ||
			item.iDesc.includes(key) ||
			item.iType.includes(key) ||
			item.iClass.includes(key) ||
			item.iSubClass.includes(key) ||
			item.sellingUOM.includes(key)
		);
	}

   onBack(e){
	   this.navigationService.navigate(['/main']);
   }

}