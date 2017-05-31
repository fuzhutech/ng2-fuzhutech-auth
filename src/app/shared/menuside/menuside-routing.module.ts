import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {MenuSide} from './menuside';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: MenuSide}
		])
	],
	exports: [
		RouterModule
	]
})
export class MenuSideRoutingModule {}
