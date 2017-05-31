import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {Footer} from './footer';
import {FooterRoutingModule} from './footer-routing.module';
import {ButtonModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
//import {CodeHighlighterModule} from '../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		//FooterRoutingModule,
        ButtonModule,
        SplitButtonModule,
        TabViewModule,
        //CodeHighlighterModule,
		BreadcrumbModule
	],
	declarations: [
		Footer
	],
	exports:[
		Footer
	]

})
export class FooterModule {}
