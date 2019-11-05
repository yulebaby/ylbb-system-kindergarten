import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { DistributionComponent } from './distribution/distribution.component';
import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [AccountComponent, DistributionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [DistributionComponent],
  providers: [ DatePipe ]
})
export class AccountModule { }
