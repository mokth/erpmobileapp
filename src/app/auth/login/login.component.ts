import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
//import { SnackBar } from "nativescript-snackbar";
import { UserInfo } from '../../core/model/userinfo';
import { AuthService } from "../../core/services/auth-service";
import { SQLService } from '../../core/services/sql-service';
import { Page } from 'tns-core-modules/ui/page';


@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id.toString(),
})
export class LoginComponent implements OnInit {

  public input: any;
  user:UserInfo;

  showError:boolean;
  errmsg:string;
  
  public constructor(private router: RouterExtensions,
                     private auth:AuthService,
                     private page:Page,
                     private sqlser:SQLService
                     ) {
      this.showError =false
      this.input = {
          "email": "",
          "password": ""
      }
      sqlser.createDB();
  }

  public ngOnInit() {
      if(this.auth.isAuthenticated()) {
          this.router.navigate(["/main"], { clearHistory: true });
      }
      this.page.actionBarHidden=true;
  }

  login() {
      if(this.input.email && this.input.password) {
          this.showError =false;
          this.signInServer();
       } else {
         this.showError =true;
         this.errmsg = "All Fields Required!";           
       }
     
  }

  signInServer(){
      this.user = {
           name:this.input.email,
           password:this.input.password,
           fullname:'',
           access:'',
           role:''
      };

      this.auth.signIn(this.user).subscribe(
          (resp)=>{
              console.log(resp);
              if (resp.ok=='yes'){
                this.showError =false;
                this.auth.saveToken(resp.data);
                this.router.navigate(["/main"], { clearHistory: true });
              }else {
                //(new SnackBar()).simple("Invalid User ID / password.");
                this.showError =true;
                this.errmsg = "Invalid User ID / password.";
                this.auth.removeToken();              
            }
            
          },
          (err)=>{
            console.log(err);
            this.showError =true;
            this.errmsg =err.status+'  '+err.statusText;
          });
  }

}
