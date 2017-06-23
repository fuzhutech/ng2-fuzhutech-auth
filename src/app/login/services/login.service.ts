import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Http, Headers, Response} from '@angular/http';
import {HOST_API_PATH} from '../../shared/index';
import {Md5} from 'ts-md5/dist/md5';
import {LoginUser} from './login-user.model';
import {AuthInfoService} from '../../auth/auth-info/auth-info.module';

@Injectable()
export class LoginService {

  private host_api = HOST_API_PATH;
  private user: LoginUser;

  constructor(public http: Http, private authInfoService: AuthInfoService) {
  }

  /*public get token(): string {
    if (this.currentUser != null) {
      return this.currentUser.password;
    } else {
      return null;
    }
  }*/

  public login(data: LoginUser) {
    const user: LoginUser = Object.assign({}, data);
    console.log(user);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    user.password = Md5.hashStr(user.password).toString();
    console.log(user.password);

    return this.http.put(this.host_api + '/login', JSON.stringify(user), {headers: headers})
      .map((response: Response) => {
      console.log('login ed');
        const obj = response.json();
        if (obj.status == 1) {
          data = obj.data;
          localStorage.setItem('currentUser', JSON.stringify(user));

          //刷新权限
          this.authInfoService.refreshAuthInfo(user.id);
        }

        return response;
      }).map(response => response.json());
  }

  public logout(): void {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', this.token);

    this.http.put(this.host_api + '/logout', JSON.stringify(this.authInfoService.currentAuthUser), {headers: headers})
      .map(response => response.json())
      .subscribe(
        data => {
          console.log('退出当前用户');
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('refreshAction Complete');
        });


    localStorage.removeItem('currentUser');

    //清空权限
    this.authInfoService.clearAuthInfo();
  }
}
