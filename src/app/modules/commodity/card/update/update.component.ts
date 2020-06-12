import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {
  
  @Input() cardTypeInfo;

  formGroup: FormGroup;

  monthList = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { 
    for (let i = 0; i < 48; i++) { this.monthList.push(i + 1); }
  }
  ngOnInit() {
    this.formGroup = this.fb.group({
      cardTypeId: [],
      type: [],
      cardTypeName: [, [Validators.required]],
      price: [, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      lowestDiscount: [, [Validators.required, this._lowestDiscountValidator]],
      cardDesc: [, [Validators.required]],
      isOnline: [1]                                                             //默认上架
    });

    this.formGroup.controls['type'].valueChanges.subscribe(type => {
      if (type == 1) {
        this.formGroup.addControl('day', this.fb.control(this.cardTypeInfo ? this.cardTypeInfo.day : null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]))
        this.formGroup.removeControl('month')
      } else {
        this.formGroup.addControl('month', this.fb.control(this.cardTypeInfo ? this.cardTypeInfo.month : null, [Validators.required]))
        this.formGroup.removeControl('day')
      }
    });
    let cardTypeInfo = this.cardTypeInfo ? JSON.parse(JSON.stringify(this.cardTypeInfo)) : null;
    cardTypeInfo.lowestDiscount = cardTypeInfo.lowestDiscount ? cardTypeInfo.lowestDiscount * 10 : null; 
    this.formGroup.patchValue(cardTypeInfo || { type: 1});
  }

  @ControlValid() valid: (key, type?) => boolean;

  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
      Object.values(this.formGroup.controls).map((control: FormControl) => { control.markAsDirty(); control.updateValueAndValidity() });
    } else {
      this.saveLoading = true;
      let params = JSON.parse(JSON.stringify(this.formGroup.value));
      params.lowestDiscount = params.lowestDiscount / 10;
      params.cardDesc = encodeURIComponent(params.cardDesc);
      params.cardTypeName = encodeURIComponent(params.cardTypeName);
      this.http.post('/commodity/card/saveCard', {
        paramJson: JSON.stringify(params)
      }, true).then(res => {
        this.saveLoading = false;
        this.drawerRef.close(true);
      })
    }
  }

  @DrawerClose() close: () => void;

  private _lowestDiscountValidator = (control: AbstractControl): { [key: string]: any } | null => {
    try {
      return Number(control.value) >= 0 && Number(control.value) <= 10 && (/^([1-9]|10)\.?\d*/).test(control.value) ? null : { error: true }; 
    } catch (error) {
      return null;
    }
  }

}
