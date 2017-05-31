import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuSide} from './menuside';
//import {MenuSideRoutingModule} from './menuside-routing.module';
import {ButtonModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
//import {CodeHighlighterModule} from '../../components/codehighlighter/codehighlighter';


//import {RouterLink} from '@angular/router';
import {Component} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//import {RouterLinkModule} from '../routerlink/router.link';

@NgModule({
	imports: [
		CommonModule,
		//MenuSideRoutingModule,
		RouterModule,
        ButtonModule,
        SplitButtonModule,
        TabViewModule,
        //CodeHighlighterModule,
		BreadcrumbModule/*,RouterLinkModule*/
	],
	declarations: [
		MenuSide
	],
	exports:[
		MenuSide
	]

})
export class MenuSideModule {}

export * from './menuside';
