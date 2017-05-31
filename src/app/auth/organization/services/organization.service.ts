import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from '../../../shared';

@Injectable()
export class OrganizationService extends BaseService {

  constructor(protected http: Http) {
    super(http, 'organizations');
  }

}
