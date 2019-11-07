import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { CurriculumComponent } from './curriculum.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EducationModule } from '../education.module';
import { RouterModule } from '@angular/router';
import { CustomerPreviewModule } from '../../public/customer-preview/customer-preview.module';

@NgModule({
  declarations: [CurriculumComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    EducationModule,
    RouterModule.forChild([{
      path: '',
      component: CurriculumComponent
    }]),
    CustomerPreviewModule,
  ],
  providers: [ DatePipe ],
})
export class CurriculumModule { }
