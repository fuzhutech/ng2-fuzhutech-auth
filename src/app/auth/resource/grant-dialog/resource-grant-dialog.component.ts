import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';

import {NodeService} from '../service/nodeservice';

import {Message, MenuItem, TreeNode, Tree, TreeDragDropService} from 'primeng/primeng';
import {DialogResult} from '../../../shared/common/sub-page-component';

@Component({
  selector: 'fz-user-dialog',
  templateUrl: './resource-grant-dialog.component.html',
  styleUrls: ['./resource-grant-dialog.component.css'],
  providers: [TreeDragDropService]
})
export class ResourceGrantDialogComponent extends ComponentDialog<ResourceGrantDialogComponent> implements OnInit {

  color = 'primary';


  filesTree7: TreeNode[];

  selectedFile2: TreeNode;


  constructor(dialogRef: MdDialogRef<ResourceGrantDialogComponent>, private nodeService: NodeService) {
    super(dialogRef);
  }

  ngOnInit() {

    this.nodeService.getFiles().then(files => this.filesTree7 = files);

  }

  doGrant() {
    return this.service.edit(this.selectedFile2);
  }


  //按钮-确认
  confirm() {

    this.progress = true;

    this.doGrant().subscribe(
      data => {
        const dialogResult: DialogResult = {'success': true, 'refresh': data.obj};
        this.dialogRef.close(dialogResult);
        this.progress = false;
      },
      err => {
        console.log(err);
        this.progress = false;
      },
      () => console.log('confirm Complete')
    );

    //this.record = null;
  }

  //按钮-取消
  cancel() {
    const dialogResult: DialogResult = {'success': false, 'cancel': false};
    this.dialogRef.close(dialogResult);
  }

}
