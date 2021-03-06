import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Input() eventInfo;

  formGroup: FormGroup;

  templateContent: any[] = [];
  contentValue: any[] = [];

  constructor(
    private http: HttpService,
    private drawerRef: NzDrawerRef<boolean>,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe
  ) {
    this.formGroup = this.fb.group({})
  }

  ngOnInit() {
    this.templateContent = JSON.parse(this.eventInfo.templateContent);
    this.contentValue = JSON.parse(this.eventInfo.content);
   
    if(this.templateContent[0] && this.templateContent[0].type == 'datetime'){
      var dates = this.contentValue[0];
      if(!(isNaN(dates)&&!isNaN(Date.parse(dates)))){
        this.contentValue.unshift(new Date());
      }    
    }
    if(this.templateContent[1] && this.templateContent[1].type == 'files'){
      if(this.contentValue[1] == null){
        this.contentValue[1] = '';
      }else{
      if(this.contentValue[1].indexOf('http') == -1){
        let len = (this.contentValue.splice(this.contentValue.length - 1 ,1)).join();
        this.contentValue.splice(1,0,len);
      }
    }
    }
  
    this.templateContent.map((control, i) => {
      if (control.type == 'radioArray' || control.type == 'checkboxArray') {
        control.valueArrays.map((optionList, idx) => {
          this.formGroup.addControl(`control${i.toString() + idx}`, this.fb.control(this.contentValue[i] && this.contentValue[i][idx] ? this.contentValue[i][idx] : null, control.required ? [Validators.required] : []))
        })
      } else {
        this.formGroup.addControl(`control${i}`, this.fb.control(this.contentValue[i] || null, control.required ? [Validators.required] : []))
      }
    })
  }

  @DrawerClose() close: () => void;

  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;

      var startTime, endTime, showTime, content = [], appContent: any = { content: [], imgUrlList: [], videoUrl: '' };
      this.templateContent.map((control, i) => {
        if (control.type == 'datetime') {
          let time = this.format.transform(this.formGroup.value['control' + i], 'yyyy-MM-dd HH:mm');
          startTime = time;
          endTime = time;
          showTime = startTime;
          content.push(time);
        } else if (control.type == 'startendtime') {
          startTime = this.format.transform(this.formGroup.value['control' + i][0], 'yyyy-MM-dd HH:mm');
          endTime = this.format.transform(this.formGroup.value['control' + i][1], 'yyyy-MM-dd HH:mm');
          content.push([this.format.transform(this.formGroup.value['control' + i][0], 'yyyy-MM-dd HH:mm'), this.format.transform(this.formGroup.value['control' + i][1], 'yyyy-MM-dd HH:mm')]);
          showTime = startTime + '-' + endTime;
        } else if (control.type == 'radioArray' || control.type == 'checkboxArray') {
          let arrVal = [];
          control.valueArrays.map((optionList, idx) => {
            arrVal.push(this.formGroup.value['control' + i + idx]);
          })
          content.push(arrVal);
        } else {
          content.push(this.formGroup.value['control' + i] || null);
        }

        /* ------------- 拼接 appContent ------------- */
        if ((control.type == 'input' || control.type == 'textarea' || control.type == 'radio' || control.type == 'select') && this.formGroup.value['control' + i]) {
          appContent.content.push(`${control.label}：${this.formGroup.value['control' + i]}`);
        } else if (control.type == 'radioArray') {
          let arrVal = [];
          control.valueArrays.map((l, idx) => {
            if (this.formGroup.value['control' + i + idx]) {
              arrVal.push(this.formGroup.value['control' + i + idx]);
            }
          });
          appContent.content.push(`${control.label}：${arrVal.join('、')}`);
        } else if (control.type == 'checkbox') {
          appContent.content.push(`${control.label}：${this.formGroup.value['control' + i].join('、')}`);
        } else if (control.type == 'checkboxArray') {
          let arrVal = [];
          control.valueArrays.map((l, idx) => {
            if (this.formGroup.value['control' + i + idx] && this.formGroup.value['control' + i + idx].length) {
              arrVal.push(this.formGroup.value['control' + i + idx]);
            }
          });
          let newArr = []
          arrVal.map(item => item.map(res => newArr.push(res)));
          appContent.content.push(`${control.label}：${arrVal.join('、')}`);
        } else if (control.type == 'files' && this.formGroup.value['control' + i]) {
          if (this.formGroup.value['control' + i].indexOf('hcz-czg-image') > -1) {
            appContent.imgUrlList = this.formGroup.value['control' + i].split(',');
          } else {
            appContent.videoUrl = this.formGroup.value['control' + i];
          }
        } else if (control.type == 'startendtime' && this.formGroup.value['control' + i]) {
          appContent.content.push(`${control.label}：${showTime}`);
        }
      });
      appContent.content = appContent.content.join('|~!|')

      this.http.post('/event_record/updateEventRecord', {
        paramJson: JSON.stringify({
          id: this.eventInfo.id,
          eventId: this.eventInfo.eventId,
          teacherId: this.eventInfo.teacherId,
          studentId: this.eventInfo.studentId,
          classId: this.eventInfo.classId,
          startTime,
          endTime,
          showTime,
          appContent: JSON.stringify(appContent),
          content: JSON.stringify(content)
        })
      }).then(res => {
        this.drawerRef.close(true);
        this.saveLoading = false;
      }).catch(err => this.saveLoading = false);
    }
  }


  checkboxChange(control, e) {
    let value = {};
    value[control] = e;
    this.formGroup.patchValue(value);
  }
}
