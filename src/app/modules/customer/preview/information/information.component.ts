import { HttpService } from './../../../../ng-relax/services/http.service';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from '../../update/update.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less']
})
export class InformationComponent implements OnInit {

  @Input() memberInfo: any;

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
  }

  @DrawerCreate({ title: '编辑学员', content: UpdateComponent }) update: ({ id: number }) => void;

  updateLook(data) {
    this.http.post('/student/updateParentAccountStatus', { paramJson: JSON.stringify({
      accountId: data.accountId,
      isForbidden: data.isForbidden
    }) }, true).then(res => data.isForbidden = data.isForbidden ? 0 : 1);
  }

}
