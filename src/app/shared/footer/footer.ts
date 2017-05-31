import {Component,OnInit,Input,Output,EventEmitter} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
    selector: 'fz-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.css']
})
export class Footer implements OnInit {

    mobileMenuActive: boolean = false;

    toggleMenu(e) {
        this.mobileMenuActive = !this.mobileMenuActive;
        e.preventDefault()
    }

    /**/

    private items: MenuItem[];

    ngOnInit() {
        this.items = [];
        this.items.push({label:'Categories'});
        this.items.push({label:'Sports'});
        this.items.push({label:'Football'});
        this.items.push({label:'Countries'});
        this.items.push({label:'Spain'});
        this.items.push({label:'F.C. Barcelona'});
        this.items.push({label:'Squad'});
        this.items.push({label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'});
    }

}
