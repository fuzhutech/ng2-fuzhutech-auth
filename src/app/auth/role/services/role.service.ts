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

  getAuthorizedRoleList() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new URLSearchParams();
    //searchParams.set('offset', '1');
    //searchParams.set('rows', '20');
    //searchParams.set('sort', 'id');
    //searchParams.set('order', 'asc');

    return this.http.get(this.url, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  getUnauthorizedRoleList() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new URLSearchParams();
    //searchParams.set('offset', '1');
    //searchParams.set('rows', '20');
    //searchParams.set('sort', 'id');
    //searchParams.set('order', 'asc');

    return this.http.get(this.url, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  editAuthorizedRoleList(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

  getFiles() {
    return this.http.get('assets/data/files.json')
      .map(res => res.json());
  }

}
