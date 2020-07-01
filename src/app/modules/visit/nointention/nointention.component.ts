import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { NzDrawerService } from 'ng-zorro-antd';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { PreviewComponent } from '../../public/customer-preview/preview/preview.component';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-nointention',
  templateUrl: './nointention.component.html',
  styleUrls: ['./nointention.component.less']
})
export class NointentionComponent implements OnInit {
  jsonData: any = {
    activity: {},
    allworking: {},
    babysitter: {},
    born: {},
    carer: {},
    gift: {},
    multiplebirth: {},
    nannytime: {},
    near: {},
    problems: {},
    reason:{}
  };
  queryNode: QueryNode[] = [
    {
      label: '学员',
      key: 'keyWords',
      type: 'input',
      placeholder: '根据学号、姓名、手机号查询'
    },
    {
      label: '分配给',
      key: 'followerId',
      type: 'select',
      optionsUrl: '/teacher/getGrowthConsultant',
      params: { code: 1004 }
    },
    {
      label: '来源',
      key: 'memberFromId',
      type: 'select',
      optionsUrl: '/membermanage/returnVisit/getMemberFrom',
      optionKey: { label: 'fromName', value: 'id' }
    },
    {
      label: '是否住附近',
      key: 'near',
      type: 'select',
      options: [],
      optionKey: { label: 'name', value: 'key' }
    },
    {
      label: '客户阶段',
      key: 'followStageId',
      type: 'select',
      optionKey: { label: 'name', value: 'id' },
      optionsUrl: '/membermanage/returnVisit/getFollowStage'
    },
    {
      label: '无意向原因',
      key: 'reason',
      type: 'select',
      options: [],
      optionKey: { label: 'name', value: 'key' }
    },
    {
      label: '参与活动',
      key: 'activity',
      type: 'select',
      options: [],
      optionKey: { label: 'name', value: 'key' }
    },
    {
      label: '赠送礼品',
      key: 'gift',
      type: 'select',
      options: [],
      optionKey: { label: 'name', value: 'key' }
    },
    {
      label: '创建时间',
      key: 'createTime',
      type: 'rangepicker',
      valueKey: ['startCreateTime', 'endCreateTime']
    },
  ];
  stepList:any[] = [];
  tableNode = ['学员昵称', '学员姓名', '学员生日', '性别', '月龄', '家长电话', '入库时间', '下次跟进时间', '客户阶段', '家长痛点', '最近一次跟踪记录'];
  @GetList('/membermanage/returnVisit/getActivities') activityList: any | [];
  @GetList('/student/getClassList') classList: any | [];
  checkedItems: any[] = [];

  @ViewChild('EaTable') table;
  constructor(
    private drawer: NzDrawerService,
    private http: HttpService,
    private message: NzMessageService

  ) { 
    typeof this.activityList === 'function' && this.activityList();
    typeof this.classList === 'function' && this.classList();
  }

  ngOnInit() {
    this.http.post('/attribute/getAllAttribute').then(res => {
      let data = res.data || this.jsonData;
      this.jsonData = JSON.parse(JSON.stringify(data));
      let dataArr = Object.keys(data);
      dataArr.map(item => {
        let itemArr = Object.keys(data[item]);
        data[item].list = [];
        itemArr.map(items => {
          data[item].list.push({
            name: data[item][items],
            key: Number(items)
          });
        })
      })
      const arrs = data;
      this.queryNode[3].options = arrs.near.list;
      this.queryNode[5].options = arrs.reason.list;
      this.queryNode[6].options = arrs.activity.list;
      this.queryNode[7].options = arrs.gift.list;
    });
  }

  @DrawerCreate({ content: PreviewComponent, width: 960, closable: false }) preview: ({ id: number, source: string, step: any }) => void;

  gainClue(): void {
    if(!this.checkedItems.length){
      this.message.warning('请至少选择一条记录');
      return;
    }
    this.http.post('/membermanage/returnVisit/gainMemberClue', { ids: this.checkedItems.join(',')  }, true).then(res => {
      this.checkedItems = [];
      this.table._request();
    })
  }
}
