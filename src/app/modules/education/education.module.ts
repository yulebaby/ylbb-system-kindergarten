import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ImportComponent } from './public/import/import.component';
import { UpdateComponent } from './public/update/update.component';

@NgModule({
  declarations: [UpdateComponent, ImportComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
  ],
  entryComponents: [UpdateComponent, ImportComponent],
  providers: [ DatePipe ]
}) 
export class EducationModule { }
