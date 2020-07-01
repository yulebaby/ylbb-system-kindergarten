import { NzDrawerService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';
import { AppointComponent } from '../../appoint/appoint.component';
import { UpdateListComponent } from '../../update-list/update-list.component'
// import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import { withSuffix } from '@ant-design/icons-angular';

enum customerStatus {
  '持续跟进' = 1,
  '预约活动/体验' = 2,
  '移到无意向' = 3
}


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.less'],
})
export class TrackComponent implements OnInit, OnChanges {

  @Input() studentInfo: any = {};
  @Input() indexId: number;
  formGroup: FormGroup;
  updateFormGroup: FormGroup;
  formGroupTop: FormGroup;
  stepText: string;
  showTop: boolean = true;
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
    reason: {}
  };
  followRecordList: any[] = [];
  Attribute: any = {
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
    reason: {},
  };
  hiddenNannytime: boolean = false;
  experienceTimeList: any[] = [{
    name: '上午半天',
    id: 1
  }, {
    name: '下午半天',
    id: 2
  }, {
    name: '全天',
    id: 3
  }, {
    name: '不到半天',
    id: 4
  }]
  stepList: any[] = []
  @GetList('/membermanage/returnVisit/getVisitStatus') memberStatusList: any | [];
  followTypeList: any[] = [];
  teacherList: any[] = [];
  @GetList('/membermanage/returnVisit/getActivities') activityList: any | [];
  @GetList('/student/getClassList') classList: any | [];
  reserveTeacherList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe,
    private drawer: NzDrawerService
  ) {

    this.http.post('/membermanage/returnVisit/getFollowStage').then(res => this.stepList = res.data);

    this.http.post('/teacher/getGrowthConsultant', { code: 1004 }).then(res => this.teacherList = res.data);
    this.http.post('/membermanage/returnVisit/getFollowTypes').then(res => {
      this.followTypeList = res.data;
      res.data.length && this.formGroup.patchValue({ followType: res.data[0].id });
    })
    typeof this.memberStatusList === 'function' && this.memberStatusList();
    typeof this.activityList === 'function' && this.activityList();
    typeof this.classList === 'function' && this.classList();

  }

  ngOnInit() {
    setTimeout(item => {
      if (this.indexId) { this.memberStatusList = [{ id: 5, name: '家长嘱托' }] } else {
        for (let i = 0; i < this.memberStatusList.length; i++) {
          let item = this.memberStatusList[i];
          if (item.id == 5) {
            this.memberStatusList.splice(i, 1);
          }
        }
      }
      let step = this.studentInfo.step;
      this.stepText = step == 1 ? '建立联系' : (step == 2 ? '建立信任' : step == 3 ? '到园参观' : step == 4 ? '到园体验' : step == 5 ? '逼单转化' : step == 6 ? '已办学籍' : '');
      this.getStep();
    }, 300);
    let controls = {
      id: [],
      visitStatusId: [this.indexId ? 5 : 1, [Validators.required]],
      followType: [, [Validators.required]],
      nextFollowTime: [, [Validators.required]],
      enjoinId: [this.indexId ? this.indexId : null],
      followStageId: [5, [Validators.required]],
      studentId: []
    }
    this.formGroup = this.fb.group(controls);
    this.updateFormGroup = this.fb.group(controls);

    this.formGroup.controls['visitStatusId'].valueChanges.subscribe(id => this.statusChange(id, 'formGroup'));
    this.updateFormGroup.controls['visitStatusId'].valueChanges.subscribe(id => this.statusChange(id, 'updateFormGroup'));
 
    this.formGroup.controls['followType'].valueChanges.subscribe(id => {
      if (id == 1) {
        this.formGroup.addControl('content', this.fb.control(null, [Validators.required]));
        this.formGroup.removeControl('wxImage');
      } else {
        this.formGroup.addControl('wxImage', this.fb.control(null, [Validators.required]));
        this.formGroup.removeControl('content');
      }
    });
    this.formGroup.controls['followStageId'].valueChanges.subscribe(id => {
      if (id == 6) {
        this.formGroup.addControl('activity', this.fb.control(null, [Validators.required]));
      } else {
        this.formGroup.removeControl('activity');
      }
      if (id == 7) { this.formGroup.addControl('gift', this.fb.control(null, [Validators.required])); } {
        this.formGroup.removeControl('gift');
      }

      if (id == 8) { this.formGroup.addControl('orderDate', this.fb.control(null, [Validators.required])); } else {
        this.formGroup.removeControl('orderDate');
      }

      if (id == 9) {
        this.formGroup.addControl('arriveDate', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('receptionTeacher', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('visitName', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('point', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('worry', this.fb.control(null, [Validators.required]));
      } else {
        this.formGroup.removeControl('arriveDate');
        this.formGroup.removeControl('receptionTeacher');
        this.formGroup.removeControl('visitName');
        this.formGroup.removeControl('point');
        this.formGroup.removeControl('worry');
      }
      if (id == 10) {
        this.formGroup.addControl('reserveClassId', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('experienceDate', this.fb.control(null, [Validators.required]));
      } else {
        this.formGroup.removeControl('reserveClassId');
        this.formGroup.removeControl('experienceDate');
      }
      if (id == 11) {
        this.formGroup.addControl('nextStoreDate', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('responsibleTeacher', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('experienceTime', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('focus', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('worry2', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('babyPerformance', this.fb.control(null, [Validators.required]));
      } else {
        this.formGroup.removeControl('nextStoreDate');
        this.formGroup.removeControl('responsibleTeacher');
        this.formGroup.removeControl('experienceTime');
        this.formGroup.removeControl('focus');
        this.formGroup.removeControl('worry2');
        this.formGroup.removeControl('babyPerformance');
      }
      if (id == 12) {
        this.formGroup.addControl('sellingPrice', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('payWorry', this.fb.control(null, [Validators.required]));
      } else {
        this.formGroup.removeControl('sellingPrice');
        this.formGroup.removeControl('payWorry');
      }


    });

    let controls1 = {
      father_job: [],
      mother_job: [],
      multiplebirth: [],
      born: [],
      carer: [],
      babysitter: [],
      allworking: [],
      nannytime: [],
      problems: [],
      near: [, [Validators.required]]
    }
    this.formGroupTop = this.fb.group(controls1);

    setTimeout(() => {
      const { mother_job, father_job } = this.studentInfo;
      this.formGroupTop.patchValue({ mother_job, father_job });
    }, 100);

  }
  ngOnChanges() {
    this.studentInfo.studentId && this.getFollowRecords()
    this.studentInfo.studentId && this.getStudentInfoList()
  }
  checkboxChange(e) {
    let list = [];
    e.map(item => {
      if (item.checked) {
        list.push(item.key);
      }
    })
    this.formGroupTop.patchValue({ problems: list })
  }
  editList(type, name) {
    this.drawer.create({
      nzTitle: name,
      nzWidth: 700,
      nzClosable: false,
      nzContent: UpdateListComponent,
      nzContentParams: { type: type, name: name }
    }).afterClose.subscribe(res => {
      if (res) {
      }
    })
  }


  statusChange(visitStatusId, group) {
    if (visitStatusId == 1) {
      this[group].addControl('nextFollowTime', this.fb.control(null, [Validators.required]));
      this[group].removeControl('reason');

    } else if (visitStatusId == 3) {
      this[group].addControl('reason', this.fb.control(null, [Validators.required]));
      this[group].removeControl('nextFollowTime');

    }
  }

  getFollowRecordsLoading: boolean;
  getFollowRecords() {
    this.getFollowRecordsLoading = true;
    this.http.post('/membermanage/returnVisit/getFollowRecords', { paramJson: JSON.stringify({ studentId: this.studentInfo.studentId }) }).then(res => {
      res.data.map(item => {
        item.formContent = item.formContent ? JSON.parse(item.formContent) : {};
        item.formContent.wxImage = item.formContent.wxImage ? item.formContent.wxImage.split(',') : [];
      })
      this.followRecordList = res.data;
      this.getFollowRecordsLoading = false;

    });
  }
  getStudentInfoList() {
    this.http.post('/attribute/getAttributeByStudent', { studentId: this.studentInfo.studentId }).then(res => {
      const list = res.data;
      let problems = [];
      list.map(item => {
        if (item.attributeName == 'multiplebirth') {
          this.formGroupTop.patchValue({ multiplebirth: item.id })
        }
        if (item.born == 'multiplebirth') {
          this.formGroupTop.patchValue({ born: item.id })
        }
        if (item.attributeName == 'carer') {
          this.formGroupTop.patchValue({ carer: item.id })
        }
        if (item.attributeName == 'babysitter') {
          this.formGroupTop.patchValue({ babysitter: item.id })
        }
        if (item.attributeName == 'allworking') {
          this.formGroupTop.patchValue({ allworking: item.id })
        }
        if (item.attributeName == 'born') {
          this.formGroupTop.patchValue({ born: item.id })
        }
        if (item.attributeName == 'nannytime') {
          this.formGroupTop.patchValue({ nannytime: item.id })
        }
        if (item.attributeName == 'near') {
          this.formGroupTop.patchValue({ near: item.id })
        }
        if (item.attributeName == 'problems') {
          problems.push(item.id);
        }
      })
      this.formGroupTop.patchValue({ problems: problems })
      this.getAllAttribute(problems);
      setTimeout(s => {
        const lists = Reflect.ownKeys(this.formGroupTop.value);
        let isshowtop = true;
        lists.map(item => {
          let s = this.formGroupTop.value[item]
          if (item != 'father_job' && item != 'mother_job') {
            if ((!s && item != 'problems') || (!this.formGroupTop.value['problems'].length)) {
              isshowtop = false;
            }
          }
        })
        if (isshowtop) {
          this.showTop = false;
        }
      }, 100);

    });
  }
  getAllAttribute(list) {
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

      data.problems.list.map(item => {
        item.label = item.name;
        item.value = item.key;
        list.map(s => {
          if (item.key == s) {
            item.checked = true;
          }
        })
      })
      this.Attribute = data;
      this.formGroupTop.controls['babysitter'].valueChanges.subscribe(id => {
        let item = this.Attribute.babysitter.list.filter(item=> item.key == id );
        if( item[0].name == '否' ){
          this.hiddenNannytime = false;
          this.formGroupTop.patchValue({ nannytime: this.Attribute.nannytime.list[0].key })
        }else{
          this.hiddenNannytime = true;
          this.formGroupTop.patchValue({ nannytime: null })
        }
      });
    });
  }
  @ControlValid() valid: (key, type?) => boolean;

  validUpdateControl(key, type = 'required') {
    return this.updateFormGroup.controls[key].dirty && this.updateFormGroup.controls[key].hasError(type);
  }

  _disabledDate(current: Date): boolean {
    return current && current.getTime() < Date.now();
  }
  saveTopLoading: boolean;
  saveTop(group) {
    if (this[group].invalid) {
      Object.values(this[group].controls).map((control: FormControl) => {
        control.markAsDirty(); control.updateValueAndValidity()
      });
    } else {
      const from = JSON.parse(JSON.stringify(this.formGroupTop.value));
      this.saveTopLoading = true;
      let attribute: any = [from.near, from.multiplebirth, from.born, from.carer, from.babysitter, from.allworking, from.nannytime, ...from.problems];
      attribute = attribute.filter(d => d);
      this.http.post('/attribute/saveStudentAttribute', {
        studentId: this.studentInfo.studentId,
        paramJson: JSON.stringify(attribute)
      }, false).then(res => {
        let param = JSON.parse(JSON.stringify(this.studentInfo));
        param.motherJob = this.formGroupTop.value.mother_job;
        param.fatherJob = this.formGroupTop.value.father_job;

        this.http.post('/student/updateParentJob', {
          paramJson: JSON.stringify({
            id: this.studentInfo.studentId,
            motherJob: this.formGroupTop.value.mother_job,
            fatherJob: this.formGroupTop.value.father_job
          })
        }, true).then(res => {
          this.saveTopLoading = false;
          this.getStep();
          const list = Reflect.ownKeys(this[group].value);
          let isshowtop = true;
          list.map(item => {
            let s = this[group].value[item];
            if (item != 'father_job' && item != 'mother_job') {
            if ((!s && item != 'problems') || (!this[group].value['problems'].length)) {
              isshowtop = false;
              console.log(item);
            }
          }
          })
          if (isshowtop) {
            this.showTop = false;
          }
        })

      })

    }
  }
  getStep() {
    this.http.post('/membermanage/returnVisit/recalculateStep', {
      studentId: this.studentInfo.studentId,
    }, false).then(res => {
      let step = res.data;
      this.stepText = step == 1 ? '建立联系' : (step == 2 ? '建立信任' : step == 3 ? '到园参观' : step == 4 ? '到园体验' : step == 5 ? '逼单转化' : step == 6 ? '已办学籍' : '');
    })
  }
  saveLoading: boolean;
  save(group) {
    if (this[group].invalid) {
      Object.values(this[group].controls).map((control: FormControl) => { control.markAsDirty(); control.updateValueAndValidity() });
    } else {
      this.saveLoading = true;
      this[group].value.nextFollowTime = this.format.transform(this[group].value.nextFollowTime, 'yyyy-MM-dd');
      this[group].value.orderDate = this[group].value.orderDate ? this.format.transform(this[group].value.orderDate, 'yyyy-MM-dd') : null;
      this[group].value.arriveDate = this[group].value.arriveDate ? this.format.transform(this[group].value.arriveDate, 'yyyy-MM-dd') : null;
      this[group].value.experienceDate = this[group].value.experienceDate ? this.format.transform(this[group].value.experienceDate, 'yyyy-MM-dd') : null;
      this[group].value.nextStoreDate = this[group].value.nextStoreDate ? this.format.transform(this[group].value.nextStoreDate, 'yyyy-MM-dd') : null;
      this.activityList.map(a => a.id === this[group].value.activityId && (this[group].value.activityName = a.activityName));
      this[group].value.studentId = this.studentInfo.studentId;
      let jsons = this[group].value;
      let paramJson = JSON.parse(JSON.stringify(this[group].value))
      paramJson.formContent = jsons;
      this.http.post('/membermanage/returnVisit/saveClubFollowRecord', {
        paramJson: JSON.stringify(paramJson)
      }, true).then(res => {
        this.saveLoading = false;
        this.getFollowRecords();
        this.getStep();
        this.clearGroup(group);
        this.showUpdateRecord = false;
      }).catch(err => this.saveLoading = false);
    }
  }
  clearGroup(group) {
    this[group].reset();
  }

  showUpdateRecord: boolean;
  updateFollowRecordData;
  updateFollowRecord(data) {
    this.updateFollowRecordData = data;
    this.updateFormGroup.patchValue(data);
    this.showUpdateRecord = true;
  }


  selectAppoint(group) {
    this.drawer.create({
      nzTitle: null,
      nzWidth: 1148,
      nzClosable: false,
      nzContent: AppointComponent,
      nzContentParams: { studentInfo: this.studentInfo, classId: this[group].controls['reserveClassId'].value }
    }).afterClose.subscribe(res => {
      if (res) {
        this[group].patchValue({ reserveDate: res.reserveDate, pitNum: res.pitNum, reserveTeacherId: res.teacherId });
      }
    })
  }

}