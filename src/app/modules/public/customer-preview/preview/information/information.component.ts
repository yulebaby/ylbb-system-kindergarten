import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from '../../update/update.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less']
})
export class InformationComponent implements OnInit {

  @Input() memberInfo: any;
  jsonData: any ={
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
  arrtStudent: any = {};
  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private drawerRef: NzDrawerRef
  ) { 
    

  }

  ngOnInit() {
    let jsons:any = {};
    this.http.post('/attribute/getAllAttribute').then(res => {
      let data = res.data || this.jsonData;
      this.jsonData = JSON.parse(JSON.stringify(data));
      this.http.post('/attribute/getAttributeByStudent', { studentId	: this.memberInfo.studentInfo.studentId  }).then(res => {      
        const list = res.data;
        let problems = [];
        console.log(this.jsonData);
        list.map(item=>{
            jsons[item.attributeName] = item.id;
          if(item.attributeName == 'problems'){
            problems.push(item.id);
          }
        })
        jsons.problems = problems.join(',');
        this.arrtStudent = jsons;


      })
        
    })
    
  }

  @DrawerCreate({ title: '学员信息', content: UpdateComponent }) update: ({ id: number }) => void;

  updateLook(data) {
    this.http.post('/student/updateParentAccountStatus', { paramJson: JSON.stringify({
      accountId: data.accountId,
      studentId: this.memberInfo.studentInfo.studentId,
      isForbidden: data.isForbidden ? 0 : 1
    }) }, true).then(res => data.isForbidden = data.isForbidden ? 0 : 1);
  }

}
