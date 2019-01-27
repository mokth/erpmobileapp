import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from "nativescript-snackbar";
import { UserInfo } from '../../core/model/userinfo';
import { AuthService } from "../../core/services/auth-service";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id.toString(),
})
export class LoginComponent implements OnInit {

  public input: any;
  user:UserInfo;

  public constructor(private router: RouterExtensions,
                     private auth:AuthService,
                     ) {
      this.input = {
          "email": "",
          "password": ""
      }
  }

  public ngOnInit() {
      if(this.auth.isAuthenticated()) {
          this.router.navigate(["/main"], { clearHistory: true });
      }
  }

  login() {
      if(this.input.email && this.input.password) {
         this.signInServer();
      } else {
          (new SnackBar()).simple("All Fields Required!");
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
            this.auth.saveToken(resp.data);
            this.router.navigate(["/main"], { clearHistory: true });
          }else {
            this.auth.removeToken();              
        }
         
       });
  }

}
