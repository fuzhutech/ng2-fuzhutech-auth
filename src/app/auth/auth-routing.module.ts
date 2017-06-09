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
          {path: 'log', loadChildren: './log/log.module#LogModule'},
          {path: 'permission', loadChildren: './permission/permission.module#PermissionModule'},
          {path: 'resource', loadChildren: './resource/resource.module#ResourceModule'},
          {path: 'chain-path', loadChildren: './chain-path/chain-path.module#ChainPathModule'}
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
    id: 'menu_basic_config',
    img: 'showcase/resources/images/mono/menu.svg',
    text: '基础配置',
    subMenuLinkCol: [
      {
        path: 'permission',
        title: '权限配置'
      },
      {
        path: 'resource',
        title: '资源配置'
      },
      {
        path: 'chain-path',
        title: '路径配置'
      }
    ]
  },
  {
    id: 'menu_system management',
    img: 'showcase/resources/images/mono/menu.svg',
    text: '系统管理',
    subMenuLinkCol: [
      {
        path: 'user',
        title: '用户管理'
      },
      {
        path: 'organization',
        title: '组织机构'
      },
      {
        path: 'role',
        title: '角色管理'
      }
    ]
  },
  {
    id: 'menu_query',
    img: 'showcase/resources/images/mono/menu.svg',
    text: '综合查询',
    subMenuLinkCol: [
      {
        path: 'log',
        title: '日志查询'
      }
    ]
  }
];
