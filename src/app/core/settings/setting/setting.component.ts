import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { SnackBar } from "@nstudio/nativescript-snackbar";


import { AuthService } from '../../services/auth-service';
import { SQLService } from '../../services/sql-service';

@Component({
	selector: 'setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css']
})

export class SettingComponent implements OnInit {
	public input: any;
	public constructor(private router: RouterExtensions,
					   private auth:AuthService,
					   private sqlser:SQLService
					   ) {
		this.input = {
			"api": "",
			"erp": ""
		}		
	}
  
	public ngOnInit() {
		this.sqlser.getSettingPromise()
		.then(rows => { 
			if (rows) {
			  console.log(rows);
			  this.input.api= rows[1];
		      this.input.erp= rows[2];				
			}
		})		
	}
  
	Save() {
		this.sqlser.update(this.input.api,this.input.erp)
		.then(()=>{
			(new SnackBar()).simple("Successfully updated.");
		}),
		(error)=>{
			(new SnackBar()).simple("Error updating setting.");
		}
	}
  
	Cancel() {
		this.router.back();
	}
  
}