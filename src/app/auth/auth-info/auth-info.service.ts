import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Http, Headers, Response} from '@angular/http';
import {HOST_API_PATH} from '../../shared/index';
import {Md5} from 'ts-md5/dist/md5';
import {AuthInfo, AuthUser} from './auth-info';

@Injectable()
export class AuthInfoService {

  private host_api = HOST_API_PATH;
  private _authInfo: AuthInfo;
  private _authInfoSubject: Subject<AuthInfo> = new Subject<AuthInfo>();
  private _authUser: AuthUser;
  private _authUserSubject: Subject<AuthUser> = new Subject<AuthUser>();

  constructor(public http: Http) {
    console.log('AuthInfoService constructor');
  }

  /**
   * 设置当前AuthInfo，同时更新Subject
   * @param authInfo
   */
  private set currentAuthInfo(authInfo: AuthInfo) {
    this._authInfo = authInfo;

    if (authInfo) {
      this._authInfoSubject.next(this._authInfo);
    } else {
      this._authInfoSubject.next(Object.assign({}));
      //this.authInfoSubject.next();
    }

    this.currentAuthUser = authInfo.user || null;
  }

  /**
   * 获取当前AuthInfo
   * @returns {AuthInfo}
   */
  private get currentAuthInfo(): AuthInfo {
    return this._authInfo;
  }

  /**
   * 获取Authinfo,Observable对象发生变化而变化
   * @returns {Observable<AuthInfo>}
   */
  public get authInfoSubject(): Observable<AuthInfo> {
    return this._authInfoSubject.asObservable();
  }

  /**
   * 设置当前AuthUser，同时更新Subject.
   * @param authUser
   */
  public set currentAuthUser(authUser: AuthUser) {
    this._authUser = authUser;
    if (authUser) {
      this._authUserSubject.next(this._authUser);
    } else {
      this._authUserSubject.next();
    }
  }

  public get currentAuthUser(): AuthUser {
    return this._authUser;
  }

  public get authUserSubject(): Observable<AuthInfo> {
    return this._authUserSubject.asObservable();
  }

  public refreshAuthInfo(userId: number) {
    //this.subject.next(Object.assign({}, {id: 1}));

    return this.http
      .get(this.host_api + '/login')
      .map((response: Response) => {
        const authInfo = response.json();

        if (authInfo && authInfo.token) {
          this.currentAuthInfo = authInfo;
        }
        return response;
      })
      .subscribe(
        data => {
          console.log('login success>' + data);
        },
        error => {
          console.error(error);
        }
      );
  }

  public clearAuthInfo(): void {
    //localStorage.removeItem('currentAuthInfo');
    this.currentAuthInfo = null;
  }

}
