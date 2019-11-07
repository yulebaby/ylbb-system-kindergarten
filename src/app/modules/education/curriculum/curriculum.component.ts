import { UpdateComponent } from './../public/update/update.component';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { NzDrawerService , NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.less']
})
export class CurriculumComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  @ViewChild('EaTable') table;
  listCourseType:any[] = [];
  queryNode: QueryNode[] = [
    {
      label: '课程名称',
      key: 'name',
      type: 'input',
      placeholder: '请输入课程名称'
    },
    {
      label: '课程类别',
      key: 'typeId',
      type: 'select',
      optionsUrl: '/course/listCourseType',
    },
 
    {
      label: '课程状态',
      key: 'status',
      type: 'select',
      options : [{ name: '启用', id: 0 }, { name: '停用', id: -1 }]
    },
  ];

  tableNode = ['课程名称', '类别', '时长', '目标', '效果', '教具', '状态', '操作'];

  constructor(
    private drawer: NzDrawerService,
    private http: HttpService,
    private message: NzMessageService,
    ) { 
      this.http.post('/course/listCourseType', { 
      }).then(res => {
        this.listCourseType = res.data.list;
      });
    }

  ngOnInit() {
    
  }
  updataStatus(data){
    this.http.post('/course/updateCourse', {
      paramJson: JSON.stringify({
        id: data.id,
        status: data.status == 0 ? -1 : 0
      })
    }, true).then(res => {
      if(res.result == 1000){
        this.table && this.table._request();
    }  
    }).catch();
  }
//  @DrawerCreate({ title: '新建课程', content: UpdateComponent }) addCustomer: () => void;
  addCustomer(info = {}){
    const drawer = this.drawer.create({
      nzWidth: 720,
      nzTitle: '课程管理',
      nzContent: UpdateComponent,
      nzContentParams: { info }
    });
    drawer.afterClose.subscribe(res => {
      if(!res){ return false };
      this.listPage && this.listPage.eaTable._request();
      this.table && this.table._request();
    });
}
download(data){
  if(data.lesson){ window.open(data.lesson) };
  if(data.vedio){  window.open(data.vedio, '_blank')  };
}

}
