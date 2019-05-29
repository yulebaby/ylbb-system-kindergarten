import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { NzDrawerService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { PreviewComponent } from '../../public/customer-preview/preview/preview.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers/reducers-config';

@Component({
  selector: 'app-nointention',
  templateUrl: './nointention.component.html',
  styleUrls: ['./nointention.component.less']
})
export class NointentionComponent implements OnInit {

  domainEs = environment.domainEs;

  queryNode: QueryNode[] = [
    {
      label: '学员昵称',
      key: 'nick',
      type: 'input'
    },
    {
      label: '分配给',
      key: 'teacherId',
      type: 'select',
      optionsUrl: '/membermanage/returnVisit/getFollowTeachers'
    },
    {
      label: '来源',
      key: 'sourceId',
      type: 'select',
      optionsUrl: '/membermanage/returnVisit/getMemberFrom',
      optionKey: { label: 'fromName', value: 'id' }
    },
    {
      label: '宝宝性别',
      key: 'sex',
      type: 'select',
      options: [{ name: '男', id: '男' }, { name: '女', id: '女' }]
    },
    {
      label: '宝宝生日',
      key: 'birthday',
      type: 'rangepicker',
      valueKey: ['startBirthDay', 'endBirthDay']
    },
    {
      label: '创建时间',
      key: 'createTime',
      type: 'rangepicker',
      valueKey: ['startThreadCreateTime', 'endThreadCreateTime']
    },
    {
      label: '下次跟进',
      key: 'lastFollowTime',
      type: 'rangepicker',
      valueKey: ['startNextFollowTime', 'endNextFollowTime']
    },
    {
      label: '未参与过',
      key: 'activityId',
      type: 'select',
      optionsUrl: '/membermanage/returnVisit/getActivities',
      optionKey: { label: 'activityName', value: 'id' }
    },
    {
      label: '收集者',
      key: 'collectorId',
      type: 'select',
      optionsUrl: '/membermanage/returnVisit/getFollowTeachers'
    },
  ];

  tableNode = ['宝宝昵称', '宝宝姓名', '宝宝生日', '性别', '月龄', '家长姓名', '家长电话', '入库时间', '下次跟进时间', '最后跟进时间', '来源', '客户状态', '跟进阶段', '收集者', '参与活动', '分配到'];

  checkedItems: any[] = [];

  @ViewChild('EaTable') table;

  constructor(
    private http    : HttpService,
    private drawer: NzDrawerService,
    private store: Store<AppState>
  ) { }

  paramsDefault: any = { giveUp: 1 };
  ngOnInit() {
    this.store.select('userInfoState').subscribe(userInfo => this.paramsDefault.storeId = userInfo.kindergartenId);
  }

  @DrawerCreate({ content: PreviewComponent, width: 960, closable: false }) preview: ({ id: number }) => void;

  gainClue(): void {
    this.http.post('/membermanage/returnVisit/gainMemberClue', { ids: this.checkedItems.join(',')  }, true).then(res => {
      this.checkedItems = [];
      this.table._request();
    })
  }
}
