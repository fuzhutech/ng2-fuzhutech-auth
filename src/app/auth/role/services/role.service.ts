import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {BaseService} from '../../../shared';
import {TreeNode} from "primeng/primeng";

@Injectable()
export class RoleService extends BaseService {

  constructor(protected http: Http) {
    super(http, 'roles');
  }

  getUserWithRole(roleId: number) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new URLSearchParams();

    return this.http.get(this.url + '/' + roleId + '/users', {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  editUserWithRole(roleId: number, data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(data);

    return this.http.put(this.url + '/' + roleId + '/users', JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

  getResourceWithRole(roleId: number) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new URLSearchParams();

    return this.http.get(this.url + '/' + roleId + '/resources', {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  editResourceWithRole(roleId: number, data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(data);

    return this.http.put(this.url + '/' + roleId + '/resources', JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

}
