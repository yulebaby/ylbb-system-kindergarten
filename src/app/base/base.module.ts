import { CustomerPreviewModule } from './../modules/public/customer-preview/customer-preview.module';
import { AppReuseStrategy } from './../core/app-reuse-strategy';
import { NgRelaxModule } from './../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { ContentComponent } from './content/content.component';
import { HeadComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MemberComponent } from './header/member/member.component';

@NgModule({
  declarations: [BaseComponent, ContentComponent, HeadComponent, MenuComponent, FooterComponent, MemberComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    NgRelaxModule,
    NgZorroAntdModule,
    CustomerPreviewModule
  ],
  entryComponents: [MemberComponent],
  providers: [AppReuseStrategy,DatePipe]
})
export class BaseModule { }
