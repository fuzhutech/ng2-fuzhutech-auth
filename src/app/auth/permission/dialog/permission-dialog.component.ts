import {Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {Permission} from '../model/permission-model';
import {PermissionService} from '../service/permission.service';

@Component({
    selector: 'fz-permission-dialog',
    templateUrl: './permission-dialog.component.html',
    styleUrls: ['./permission-dialog.component.css']
})
export class PermissionDialogComponent extends ComponentDialog<PermissionDialogComponent, Permission, PermissionService> {

    color = 'primary';

    constructor(dialogRef: MdDialogRef<PermissionDialogComponent>) {
        super(dialogRef);
    }

    generateId() {
        console.log(this.record);
        if (!this.record.systemId) {
            return;
        }

        this.service.generateId(this.record)
            .subscribe(
                responseResult => {
                    console.log(responseResult);
                    this.record.id = responseResult.data.id;
                },
                error => console.log(error)
            );
    }

}
