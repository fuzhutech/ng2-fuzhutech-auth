import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {BaseService} from '../../../shared';

@Injectable()
export class PermissionService extends BaseService {

  constructor(http: Http) {
    super(http, 'permissions');
  }

}
