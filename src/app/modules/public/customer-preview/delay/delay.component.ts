import { format, differenceInDays, differenceInCalendarDays } from 'date-fns';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.less']
})
export class DelayComponent implements OnInit {

  @Input() id: number;

  loading = true;

  formGroup: FormGroup;

  memberInfo: any = { studentInfo: {}, parentAccountList: [] };

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      studentId: [this.id],
      time: [, [Validators.required]],
      startTime: [],
      endTime: [],
      reason: [, [Validators.required]],
      studentName: []
    });
    this.formGroup.controls.time.valueChanges.subscribe((v: any[]) => v.length && this.formGroup.patchValue({ startTime: format(v[0], 'YYYY-MM-DD'), endTime: format(v[1], 'YYYY-MM-DD') }))
    this.http.post('/student/getNewStudent', { id: this.id }).then(res => {
      this.memberInfo = res.data;
      this.memberInfo.hideBtn = true;
      this.formGroup.patchValue({ studentName: res.data.studentInfo.studentName });
      this.loading = false;
    });
  }

  saveLoading: boolean;
  @DrawerSave('/student/delay') save: () => void;

  @DrawerClose() close: () => void;

  @ControlValid() valid: (key, type?) => boolean;

  private _timeValidator(): ValidatorFn {
    return (control: AbstractControl): null | { error: boolean } => {
      try {
        return !control.value.length || differenceInDays(control.value[1], control.value[0]) >= 9 ? null : { error: true };
      } catch (error) {
        return null; 
      }
    }
  }

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date(this.memberInfo.studentInfo.expireDate)) > 0 || differenceInCalendarDays(current, new Date(this.memberInfo.studentInfo.effectDate)) < 0;
  };

}
