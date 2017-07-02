import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LogComponent} from './log.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: LogComponent, data: {'title': '角色管理'}}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LogRoutingModule {
}
