import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog, MdDialogRef} from '@angular/material';

import {ActionType, SubPageComponentWithComponentDialog} from '../../shared';

import {ResourceDialogComponent} from './dialog/resource-dialog.component';
import {Resource} from './model/resource-model';
import {ResourceService} from './service/resource.service';
import {ResourceGrantDialogComponent} from './grant-dialog/resource-grant-dialog.component';
import {DialogResult} from '../../shared/common/sub-page-component';

@Component({
    selector: 'fz-auth-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.css']
})
export class ResourceComponent
    extends SubPageComponentWithComponentDialog<Resource, ResourceService, ResourceDialogComponent> {

    constructor(service: ResourceService, dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
        super(service, '用户', dialog, ResourceDialogComponent);
        this.useTreeTable = true;
    }

    /* @override */
    newInstance(): Resource {
        return new Resource();
    };

    /* @override */
    protected initAddParams(): boolean {
        if (super.initAddParams()) {
            const data = this.getCloneRecord();
            this.record.systemId = data.systemId;
            if (data.resourceType == 0) {
                this.record.parentId = data.id;
            } else {
                //所选的为权限记录
                this.record.parentId = data.parentId || data.id;
                this.record.resourceType = 1;
            }

            return true;
        } else {
            return false;
        }
    }

    grant() {

        if (!this.canDoGrant()) {
            return;
        }

        //弹出对话框
        let dialogRef: MdDialogRef<ResourceGrantDialogComponent>
            = this.oPenBaseDialog(ResourceGrantDialogComponent, this.getCloneRecord(), '分配权限');

        //关闭对话框后进行,刷新
        dialogRef.afterClosed().subscribe((result: DialogResult) => {
            dialogRef = null;
            if (result.success) {
                this.doRefresh(result.recordId);
            }
        });
    }

    canDoGrant(): boolean {
        return true;
    }

}
