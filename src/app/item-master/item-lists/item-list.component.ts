import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ListViewEventData } from 'nativescript-ui-listview';
import { Color } from 'tns-core-modules/color/color';
import { Subject } from 'rxjs';

import { APIService, UtilService } from '../../core/services';
import { NavigationService } from '../../core/services/navigation.service';
import { TextField } from 'tns-core-modules/ui/text-field';
import * as application from 'tns-core-modules/application';
// import { PullToRefresh } from "nativescript-pulltorefresh";
// import { registerElement } from "nativescript-angular/element-registry";
// registerElement("pullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

@Component({
	selector: 'item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {
	iconval: string;
	iconHome: string;

	showError: boolean;
	errmsg: string;
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
		this.isRefresh = false;
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
	// ngAfterViewInit() {

	// }
	getItemMaster() {
		this.isBusy = false;
		this.serv.searchitem(this.searchTerm$)
			.subscribe((resp: any) => {
				this.isRefresh = false;
				this.showError = false;
				this.items = resp.value;
				this.tempitems = resp;
				this.isBusy = false;
				console.log(this.items.length);
			},
				(err) => {
					this.showError = true;
					this.errmsg = err.statusText;
					this.isBusy = false;
					this.isRefresh = false;
					//console.log('error');
					console.log(err);
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
		console.log(textField.text);
		//	(new SnackBar()).simple("Search..."+textField.text);
		this.isBusy = true;
		this.searchstr = textField.text;
		this.searchTerm$.next(textField.text);
	}

	// refreshList(args: any) {
	// 	console.log('refreh $searchstr');
	// 	let pullRefresh = args.object;
	// 	pullRefresh.refreshing = false;	
	// 	this.isBusy = true;		
	// 	console.log('refreh $searchstr');
	// 	this.searchTerm$.next(this.searchstr);
	// }

	onItemTap(item) {
		console.log(item);
		this.selectedCode = item.iCode;
		this.selectedItem = item;
		this.utilser.setLocalStore("itemdetail", JSON.stringify(item));
		//this.navigationService.backToPreviousPage();
		this.navigationService.navigate(["/master/itemdetail"],
			{
				clearHistory: false,
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

	// onSearchTap(e) {
	// 	const key = this.searchstr;
	// 	console.log(key);
	// 	this.items = this.tempitems.filter(item => item.iCode.includes(key) ||
	// 		item.iDesc.includes(key) ||
	// 		item.iType.includes(key) ||
	// 		item.iClass.includes(key) ||
	// 		item.iSubClass.includes(key) ||
	// 		item.sellingUOM.includes(key)
	// 	);
	// }

	onBack(e) {
		this.navigationService.navigate(['/main']);
	}

}