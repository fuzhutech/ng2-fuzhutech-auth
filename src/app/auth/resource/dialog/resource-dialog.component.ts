import {Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {Resource} from '../model/resource-model';
import {ResourceService} from '../service/resource.service';

@Component({
    selector: 'fz-permission-dialog',
    templateUrl: './resource-dialog.component.html',
    styleUrls: ['./resource-dialog.component.css']
})
export class ResourceDialogComponent extends ComponentDialog<ResourceDialogComponent, Resource, ResourceService> {

    color = 'primary';


    constructor(dialogRef: MdDialogRef<ResourceDialogComponent>) {
        super(dialogRef);
    }

    handleGenerateId() {
        console.log(this.record);
        if (!this.record.systemId || (this.record.resourceType == null)) {
            return;
        }

        if (this.record.resourceType == 1 && !this.record.parentId) {
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
