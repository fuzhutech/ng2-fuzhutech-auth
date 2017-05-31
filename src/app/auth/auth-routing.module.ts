import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {MainLinkData} from '../shared/menuside/menuside';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: '', redirectTo: 'home' },
      {
        path: '',
        component: AuthComponent,
        children: [
          {path: '', redirectTo: 'role'},
          {
            path: 'role',
            loadChildren: './role/role.module#RoleModule'
          },
          {path: 'organization', loadChildren: './organization/organization.module#OrganizationModule'},
          {path: 'user', loadChildren: './user/user.module#UserModule'},
          {path: 'log', loadChildren: './log/log.module#LogModule'}
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}

export const ConfigMenuData: MainLinkData[] = [
  {
    id: 'menu_menu',
    img: 'showcase/resources/images/mono/menu.svg',
    text: '权限管理',
    subMenuLinkCol: [
      {
        path: 'user',
        title: '用户'
      },
      {
        path: 'organization',
        title: '组织'
      },
      {
        path: 'role',
        title: '角色'
      },
      {
        path: 'log',
        title: '日志'
      }
    ]
  }
];
