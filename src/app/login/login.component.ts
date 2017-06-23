import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './services/login.service';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import {LoginUser} from './services/login-user.model';
import {AuthInfo} from '../auth/auth-info/auth-info';
import {Subscription} from 'rxjs/Subscription';
import {AuthInfoService} from '../auth/auth-info/auth-info.service';

@Component({
  selector: 'fz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public user: LoginUser = new LoginUser();
  public error: Error;

  currentAuthInfo: AuthInfo;

  subscription: Subscription;

  constructor(public router: Router,
              public location: Location,
              private userLoginService: LoginService,
              private authInfoService: AuthInfoService) {
  }

  ngOnInit() {

    //todo:测试AuthService能否正常使用
    //this.currentAuthInfo = JSON.parse(localStorage.getItem('currentAuthInfo'));
    this.subscription = this.authInfoService.authInfoSubject
    //.merge(this.userRegisterService.currentUser)
      .subscribe(
        data => {
          this.currentAuthInfo = data;
          console.log('LoginComponent currentAuthInfo subscribe');
        },
        error => console.error(error)
      );
  }

  ngOnDestroy() {
    console.log('LoginComponent on ngOnDestroy');

    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }

  }

  public doLogin(): void {
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
    this.location.back();
  }
}
