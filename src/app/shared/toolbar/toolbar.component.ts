import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'fz-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  @Input() style: any;

  @Input() styleClass: string;

  test: string;

  @Input() disabledView = false;    //查看按钮是否可用
  @Input() disabledAdd = false;     //新增按钮是否可用
  @Input() disabledDelete = false;  //删除按钮是否可用
  @Input() disabledEdit = false;    //编辑按钮是否可用
  @Input() disabledRefresh = false; //刷新按钮是否可用
  @Input() disabledClose = false;   //关闭按钮是否可用

  //添加20161207

  //查看
  @Output() onViewClick: EventEmitter<any> = new EventEmitter();

  viewClick(event: Event) {
    if (this.disabledView)
      return;
    this.onViewClick.next({originalEvent: event});
  }

  //新增
  @Output() onAddClick: EventEmitter<any> = new EventEmitter();

  addClick(event: Event) {
    this.onAddClick.next({originalEvent: event});
  }

  //删除
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();

  deleteClick(event: Event) {
    this.onDeleteClick.next({originalEvent: event});
  }

  //编辑
  @Output() onEditClick: EventEmitter<any> = new EventEmitter();

  editClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  //刷新
  @Output() onRefreshClick: EventEmitter<any> = new EventEmitter();

  refreshClick(event: Event) {
    this.onRefreshClick.next({originalEvent: event});
  }

  //查找
  @Output() onLookupClick: EventEmitter<any> = new EventEmitter();

  lookupClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  //导入
  @Output() onImportClick: EventEmitter<any> = new EventEmitter();

  importClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  //导出
  @Output() onExportClick: EventEmitter<any> = new EventEmitter();

  exportClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  //打印
  @Output() onPrintClick: EventEmitter<any> = new EventEmitter();

  printClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  //关闭
  @Output() onCloseClick: EventEmitter<any> = new EventEmitter();

  closeClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  //end 添加20161207

  //--------------------------------------------------------------------------------------------

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
      {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming']}
    ];

  }

  clicks: number = 0;

  onclick() {
    this.clicks++;
  }

  @Input()
  title: string = '默认标题';

  @Input('title') set changeTitle(val: any) {
    this.title = val;
  }

  //----------------------------------------------------------------------------------------------


}
