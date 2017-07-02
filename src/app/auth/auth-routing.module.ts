import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {MainLinkData} from '../shared/menuside/menuside.component';

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
                        loadChildren: './role/role.module#FzRoleModule'
                    },
                    {path: 'organization', loadChildren: './organization/organization.module#FzOrganizationModule'},
                    {path: 'user', loadChildren: './user/user.module#FzUserModule'},
                    {path: 'log', loadChildren: './log/log.module#FzLogModule'},
                    {path: 'permission', loadChildren: './permission/permission.module#FzPermissionModule'},
                    {path: 'resource', loadChildren: './resource/resource.module#FzResourceModule'},
                    {path: 'chain-path', loadChildren: './chain-path/chain-path.module#FzChainPathModule'}
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
