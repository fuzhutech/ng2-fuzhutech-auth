import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {RoleComponent} from './role.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: RoleComponent, data: {'title': '角色管理'}}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RoleRoutingModule {
}
