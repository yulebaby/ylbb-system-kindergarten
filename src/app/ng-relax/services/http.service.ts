import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { serialize, YlbbResponse } from 'src/app/core/http.intercept';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) { }

  /*
  *  post/get 请求方法:
  *    接收参数
  *            1. 请求地址: string    (必填)
  *            2. 请求参数: object    (必填: 可为空)
  *            3. 是否自动根据状态码提示： boolean (默认为： false)
  */
  post(url: string, query: object = {}, auto?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<YlbbResponse>(url, serialize(query), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      }).subscribe(res => {
        (auto && res.result) && this.message.create(res.result == 1000 ? 'success' : 'warning', res.message || '操作成功' );
        (auto && res.result != 1000) ? reject(res) : resolve(res);
      });
    })
  }

  get(url: string, query: object = {}, auto?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<YlbbResponse>(url, { params: new HttpParams({ fromString: serialize(query) }) }).subscribe(res => {
        (auto && res.result) && this.message.create(res.result == 1000 ? 'success' : 'warning', res.message || '操作成功');
        (auto && res.result != 1000) ? reject(res) : resolve(res);
      });
    })
  }

}