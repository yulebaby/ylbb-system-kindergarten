import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.less']
})
export class AddclassComponent implements OnInit {
  @Input() id: number;
  
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder = new FormBuilder(),
  ) { 

  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      studentName: [, [Validators.required]],
      mobilePhone: [, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]],
      followerId: [, [Validators.required]],
      memberFromId: [, [Validators.required]]
    });
  }
  
  @DrawerClose() close: () => void;

  @ControlValid() valid: (key, type?) => boolean;

  saveLoading: boolean;
  @DrawerSave('/membermanage/clue/saveClue') save: () => void;
}
