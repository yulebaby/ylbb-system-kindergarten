import { NgModule } from '@angular/core';
import { CommonModule , DatePipe} from '@angular/common';

import { ListComponent } from './list.component';
import { UpdateComponent } from './update/update.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

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
  declarations: [ListComponent, UpdateComponent],
  entryComponents: [UpdateComponent],
  providers: [ DatePipe ]
})
export class ListModule { }
