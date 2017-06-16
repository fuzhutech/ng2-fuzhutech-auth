import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {TabRouterOutletService, MainTabPageComponent} from '../shared';

import {ConfigMenuData} from './auth-routing.module';
import {TabData} from '../shared/tab-router-outlet/tab-router-outlet.service';
import {ContextMenu, MenuItem} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends MainTabPageComponent implements OnInit {

  items: MenuItem[];

  constructor(private service: TabRouterOutletService, activatedRoute: ActivatedRoute) {
    super(service, activatedRoute, ConfigMenuData);
  }

  onNodeRightClick(event: MouseEvent, tab: TabData, contextMenu: ContextMenu) {
    console.log(contextMenu);
    contextMenu.show(event);
  }

  ngOnInit() {
    this.items = [
      {label: '关闭标签页', icon: 'fa-search', command: (event) => this.Close(event)},
      {label: '关闭全部', icon: 'fa-close', command: (event) => this.CloseAll(event)}
    ];
  }

  Close(event) {
    console.log(event);
  }

  CloseAll(event) {
    console.log(event);
  }


}
