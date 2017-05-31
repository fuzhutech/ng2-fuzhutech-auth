import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {Footer} from './footer';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: Footer}
		])
	],
	exports: [
		RouterModule
	]
})
export class FooterRoutingModule {}
