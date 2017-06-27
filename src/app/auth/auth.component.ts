import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {TabRouterOutletService, MainTabPageComponent} from '../shared';

import {ConfigMenuData} from './auth-routing.module';
import {TabData} from '../shared/tab-router-outlet/tab-router-outlet.service';
import {ContextMenu, MenuItem} from 'primeng/primeng';
import {AuthInfoService} from './auth-info/auth-info.service';
import {Subscription} from 'rxjs/Subscription';
import {MenuInfo} from './auth-info/auth-info';

@Component({
  moduleId: module.id,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends MainTabPageComponent implements OnInit, OnDestroy {

  items: MenuItem[];

  private subscription: Subscription;
  private menuInfo: MenuInfo;
  private systemId = 110;

  constructor(private service: TabRouterOutletService, activatedRoute: ActivatedRoute, private authInfoService: AuthInfoService) {
    super(service, activatedRoute, ConfigMenuData);
  }

  onNodeRightClick(event: MouseEvent, tab: TabData, contextMenu: ContextMenu) {
    console.log(contextMenu);
    contextMenu.show(event);
  }

  ngOnInit() {

    console.log('AuthComponent ngOnInit');

    this.items = [
      {label: '关闭标签页', icon: 'fa-search', command: (event) => this.Close(event)},
      {label: '关闭全部', icon: 'fa-close', command: (event) => this.CloseAll(event)}
    ];

    this.authInfoService.refreshMenuInfo(this.systemId);

    this.subscription = this.authInfoService.menuInfoSubject
      .subscribe(
        data => {
          this.menuInfo = data;
        },
        error => console.error(error)
      );
  }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }

  }


  Close(event) {
    console.log(event);
  }

  CloseAll(event) {
    console.log(event);
  }


}
