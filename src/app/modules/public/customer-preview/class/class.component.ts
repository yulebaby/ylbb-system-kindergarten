import { NzDrawerService, NzDrawerRef, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators , FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';
import { AppointComponent } from '../appoint/appoint.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.less']
})
export class ClassComponent implements OnInit {

  @Input() id: number;

  @Input() cardInfo: any = {};

  formGroup: FormGroup;

  memberInfo: any = { studentInfo: {}, parentAccountList: [] };

  classList: any[] = [];
  teacherList: any[] = [];

  loading: boolean = true;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawer: NzDrawerService,
    private drawerRef: NzDrawerRef,
    private modal: NzModalService
  ) {
  }

  ngOnInit() {
    this.http.post('/student/getNewStudent', { id: this.id }).then(res => {
      this.memberInfo = res.data;
      this.memberInfo.hideBtn = true;
      this.loading = false;
      this._disabledClass();
      this.cardInfo.classId = this.memberInfo.studentInfo.classId;
      this.formGroup.patchValue({
        className: this.memberInfo.studentInfo.className,
        studentName: this.memberInfo.studentInfo.studentName,
      });

      if (this.memberInfo.studentInfo.cardType == 2) {
        this.formGroup.addControl('teacherId', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('teacherName', this.fb.control(null, [Validators.required]));
        this.formGroup.addControl('startTime', this.fb.control(null));
        this.formGroup.addControl('endTime', this.fb.control(null));
        this.formGroup.addControl('pitNum', this.fb.control(null));
        this.formGroup.addControl('newTeacherName', this.fb.control(null));
      }
    });
    this.formGroup = this.fb.group({
      studentId: [this.id],
      className: [],
      studentName: [],
      newTeacherName: [],

      classId: [, [Validators.required]],
      newClassName: [],
      reason: [, [Validators.required]],

      startTime: [],
      endTime: [],
      pitNum: [],
    });
    this.formGroup.controls.classId.valueChanges.subscribe(classId => {
      this.formGroup.patchValue({ teacherName: null });
      this.classList.map(classes => classes.classId === classId && (this.teacherList = classes.teachers, this.formGroup.patchValue({ newClassName: classes.className })));
    })
    
    this.http.post('/reserve/getClassWithTeacher').then(res => {
      this.classList = res.data.list;
      if (this.cardInfo.isteacher) {
        this.formGroup.patchValue({ classId: this.cardInfo.classId });
        this._disabledClass();
      }
    });

  }

  selectAppoint() {
    if(this.memberInfo.studentInfo ){
      this.memberInfo.studentInfo.isEditClass = true;
    }
    this.drawer.create({
      nzTitle: null,
      nzWidth: 1148,
      nzClosable: false,
      nzContent: AppointComponent,
      nzContentParams: { studentInfo: this.memberInfo.studentInfo, cardInfo: this.cardInfo, classId: this.formGroup.controls['classId'].value }
    }).afterClose.subscribe(res => {
      if (res) {
        let teacherName;
        this.teacherList.map(teacher => teacher.id === Number(res.teacherId) && (teacherName = teacher.name));
        this.formGroup.patchValue({ startTime: res.startDate, endTime: res.endDate, pitNum: res.pitNum, teacherId: Number(res.teacherId), teacherName });
      }
    });
  }

  private _disabledClass() {
    if (this.memberInfo.studentInfo.studentId && this.classList.length) {
      this.classList.map(classes => {
        if (classes.classId === this.memberInfo.studentInfo.classId && this.cardInfo.isteacher) {
          classes.disabled = true;
          return classes;
        }
      });
    }
  }

  @DrawerClose() close: () => void;

  @ControlValid() valid: (key, type?) => boolean;

  saveLoading: boolean;
  @DrawerSave('/student/adjustClass') save: () => void;
  // @DrawerSave('/student/adjustTeacher') saveTeacher: () => void;
  saveTeacher(){
    if (this.formGroup.invalid) {
      Object.values(this.formGroup.controls).map((control: FormControl) => { control.markAsDirty(); control.updateValueAndValidity() });
    } else {
      this.saveLoading = true;
      let params = JSON.parse(JSON.stringify(this.formGroup.value));
      params.newTeacherName = params.teacherName;
      params.teacherName = this.memberInfo.studentInfo.teacherName;
      this.http.post('/student/adjustTeacher', {
        paramJson: JSON.stringify(params)
      }, true).then(res => {
        this.saveLoading = false;
        this.drawerRef.close(true);
      }).catch(err => this.saveLoading = false);
    }
  }
  saveConfirm() {
    if (!this.cardInfo.isteacher) {
      if (this.memberInfo.studentInfo.cardType == 1) {
        this.http.post('/student/rituoStudentAdjustClassRemind', { paramJson: JSON.stringify({ studentId: this.id }) }).then(res => {
          if (res.data.list && res.data.list.length) {
            this.modal.confirm({
              nzTitle: '<i>确定要转班吗?</i>',
              nzContent: `<b>您再 ${res.data.list.map(r => r = r.reserveDate).join('、')} 有预约记录确认要转班嘛</b>`,
              nzOnOk: () => this.save()
            });
          } else {
            this.save();
          }
        })
      } else {
        this.save();
      }
    } else {
      this.saveTeacher();
    }
  }

}
