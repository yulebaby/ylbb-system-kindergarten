import { Component, OnInit, Input } from '@angular/core';
import { UserInfoState } from 'src/app/core/reducers/userInfo-reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers/reducers-config';
import { MenuConfig } from 'src/app/core/menu-config';
import { RouterState } from 'src/app/core/reducers/router-reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  @Input() userInfo: UserInfoState;

  routerState: RouterState;

  menuConfig: any[] = MenuConfig;

  roleAllowPath: string;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.store.select('userInfoState').subscribe(userInfo => {
      const storeId = userInfo.kindergartenId;
      let menuConfig = JSON.parse(JSON.stringify(this.menuConfig));
      menuConfig.map(res => {
        if(storeId != 1){
          if(res.key == '/home/education'){
            const children = res.children.filter(item=> item.key != '/home/education/plan' && item.key != '/home/education/curriculum' )
            res.children = children;
          }else if(res.key == '/home/setting'){
            const children = res.children.filter(item=> item.key!= '/home/setting/list')
            res.children = children;   
          } 
        }
      });
      this.menuConfig= menuConfig;
    });

    this.store.select('routerState').subscribe(res => this.routerState = res);

    this.store.select('userInfoState').subscribe(res => {
      this.roleAllowPath = res.menuUrls;
    });
    
  }

  routerLink(children: any[]) {
    
    if (this.roleAllowPath.indexOf('**') > -1) {
      this.router.navigateByUrl(children[0].key);
    } else {
      for (let i = 0; i < children.length; i++) {
        if (this.roleAllowPath.indexOf(children[i].key) > -1) {
          this.router.navigateByUrl(children[i].key);
          break;
        }
      }
    }
  }

}
