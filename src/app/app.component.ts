import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthInfoService} from './auth/auth-info/auth-info.service';
import {ServiceUtil} from './shared/utils/service-util';

@Component({
  selector: 'fz-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDarkTheme = false;

  currentTime = new Date().toLocaleString();

  constructor(private router: Router, private authInfoService: AuthInfoService) {
    window.setInterval(
      () => {
        this.currentTime = new Date().toLocaleString();
      }
      , 1000);

    ServiceUtil.setAuthInfoService(authInfoService);
  }

  doLogin() {
    this.router.navigateByUrl('login1')
      .catch(err => console.log('跳转到登录页面失败', err));
  }

  doLogout() {
    console.log('doLogout');
  }

}
