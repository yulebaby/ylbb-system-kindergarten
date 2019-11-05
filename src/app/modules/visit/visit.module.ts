import { ImportComponent } from './public/import/import.component';
import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { UpdateComponent } from './public/update/update.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [UpdateComponent, ImportComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [UpdateComponent, ImportComponent],
  providers: [ DatePipe ]
})
export class VisitModule { }
