import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';

import { ListComponent } from './list.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      }
    ]),
    NgZorroAntdModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, UpdateComponent, AddComponent],
  entryComponents: [UpdateComponent, AddComponent],
  providers:[ DatePipe ]
})
export class ListModule { }
