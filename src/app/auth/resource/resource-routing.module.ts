import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ResourceComponent} from './resource.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: ResourceComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ResourceRoutingModule {
}
