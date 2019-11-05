import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { AnalysisComponent } from './analysis.component';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { AllComponent } from './all/all.component';
import { ClassComponent } from './class/class.component';
import { TeacherComponent } from './teacher/teacher.component';

@NgModule({
  declarations: [AnalysisComponent, AllComponent, ClassComponent, TeacherComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: AnalysisComponent
    }]),
    NgZorroAntdModule,
    NgRelaxModule
  ],
  providers: [DatePipe]
})
export class AnalysisModule { }
