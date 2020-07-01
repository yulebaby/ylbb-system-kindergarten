import { HttpService } from 'src/app/ng-relax/services/http.service';
import { MenuConfig } from '../../../../core/menu-config';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers/reducers-config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('NzTree') nzTree: NzTreeComponent;

  @Input() roleId: number;

  nodes: NzTreeNode[] = [];

  checkedNodes: string[] = ['/home'];

  menuIds: number[] = [];

  roleInfoId: number;

  loading = true;

  host = window.location.host.split('.')[0];

  //http: HttpService;

  menuConfig: any[] = MenuConfig;
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
        this.nodes.push(new NzTreeNode(res));
      });
      this.http.post('/settings/role/listMenuListByRoleId', { roleId: this.roleId }, false).then(res => {
        this.loading = false;
        if (res.result == 1000) {
          if (res.data.beforeUrl) {
            this.checkedNodes = res.data.beforeUrl.split(',');
          }
          this.roleInfoId = res.data.roleId;
        }
      })
    });



  }
  constructor(
    private http: HttpService,
    private store: Store<AppState>

  ) {

  }
  checkBoxChange() {
    //进行node回显
    this.checkedNodes = [];
    this.nzTree.getCheckedNodeList().map(res => {
      if (res.children && res.children.length) {
        res.children.map(cdRes => {
          if (cdRes.children && cdRes.children.length) {
            cdRes.children.map(twoRes => {
              this.checkedNodes.push(twoRes.key);
            })
          } else {
            this.checkedNodes.push(cdRes.key);
          }
        })
      } else {
        this.checkedNodes.push(res.key);
      }
    });
    //获取到根据beforePathUrl得到menuId
    // if(this.checkedNodes && this.checkedNodes.length){
    //   //进行双重for循环 获取菜单回显的menuId
    //   this.menuIds = [];
    //   let nodeLength = this.checkedNodes.length;
    //   let menuLength = this.checkMenus.length;
    //   for (let index = 0; index < nodeLength; index++) {
    //     const element1 = this.checkedNodes[index];
    //     for (let index = 0; index < menuLength; index++) {
    //       const element2 = this.checkMenus[index];
    //       if(element1 === element2.beforePath){
    //         this.menuIds.push(element2.id);
    //         break;
    //       }
    //     }
    //   }
    // }
    //得到最全的menuId
    // this.http.post('/settings/role/listMenuList', {}, false).then(res => {
    //   this.loading = false;
    //   if (res.result == 1000) {
    //     if(null != res.data){
    //       res.data.forEach(path => {
    //         let checkMenuTem :any = {};
    //         checkMenuTem.id = path.id;
    //         checkMenuTem.beforePath = path.beforePathUrl;
    //         this.checkMenus.push(checkMenuTem);
    //       });
    //     }
    //   }
    // })
  }
}