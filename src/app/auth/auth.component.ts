import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {TabRouterOutletService, MainTabPageComponent} from '../shared';

import {ConfigMenuData} from './auth-routing.module';

@Component({
  moduleId: module.id,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends MainTabPageComponent {

  constructor(private service: TabRouterOutletService, activatedRoute: ActivatedRoute) {
    super(service, activatedRoute, ConfigMenuData);
  }


}
