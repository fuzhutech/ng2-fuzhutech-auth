import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ContextMenu} from 'primeng/primeng';
import {TabRouterOutletService, MainTabPageComponent, TabData} from '../shared';
import {AuthInfoService, MenuInfo} from '../shared/auth-info';
import {ConfigMenuData} from './auth-routing.module';

@Component({
  moduleId: module.id,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends MainTabPageComponent implements OnInit, OnDestroy {

  items = [
    {label: '关闭标签页', icon: 'fa-search', command: (event) => this.Close(event)},
    {label: '关闭全部', icon: 'fa-close', command: (event) => this.CloseAll(event)}
  ];

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
