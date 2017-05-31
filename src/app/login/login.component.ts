import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './services/login.service';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import {LoginUser} from './services/login-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: LoginUser = new LoginUser();
  public error: Error;

  constructor(public router: Router,
              public location: Location,
              private userLoginService: LoginService) {
  }

  ngOnInit() {
    console.log('refresh Complete1');
  }

  public doLogin(): void {

    /*this.userLoginService.login(this.user).subscribe(
      data => {
        if (data.status == 1) {
          this.location.back();
        } else {
          this.error = data.message;
        }
      },
      err => {
        console.log(err);
      });*/

    console.log('login....');



    try {
      this.userLoginService.login(this.user).subscribe(
        data => {
          if (data.status == 1) {
            this.location.back();
          } else {
            this.error = data.message;
          }
        },
        err => {
          console.log(err);
        });
    } catch (Error) {
      console.log(Error.message);
      console.log(Error);
      //throw Error;
    }
    finally {
      //console.log('try');
    }



  }

  public doLogout(): void {
    this.userLoginService.logout();
    this.router.navigateByUrl('');
  }

  public forgetPwd(): void {
    this.router.navigateByUrl('forgetpwd');
  }

  public doBack(): void {
    console.log("ceshi");
    this.location.back();
  }
}
