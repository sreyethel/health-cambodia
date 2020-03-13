import { action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { DataService } from '../services/data.service';
// import { MetaService } from '@ngx-meta/core';
@Injectable()

export class News {
  @observable data: Array<any>;
  @observable dataSingle: Array<any>;
  @observable loading: boolean = true;
  @observable empty: boolean = false;
  detail: any;
  @observable related: any[];
  @observable slug: any
  @observable name: any

  constructor(private db: DataService,
    // private meta: MetaService
  ) { }

  @action // getData by sub_cate
  getNews() {
    this.loading = true;
    this.db.newsRef().valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    })
  }

  @action
  async getDetail(slug) {
    this.loading = true;
    const doc = await this.db.Detail(slug).get().toPromise();
    const deTail = doc.docs.map(m => ({ ...m.data() }))[0];
    this.detail = deTail;
    this.name = this.detail.name;
    // this.meta.setTitle(`${this.detail.name}`);
    // this.meta.setTag('og:image', `${this.detail.fileurl}`);
    // this.meta.setTag('og:url', `https://healthy-cambodia.com/detail/${this.detail.slug}`);
    this.db.countPostView(deTail.key);
    if (deTail != null) {
      const docs = await this.db.relateNews(deTail.category.key).get().toPromise();
      const data = docs.docs.map(m => ({ ...m.data() }));
      let relate = [];
      data.forEach((item) => {
        if (item.key != deTail.key) {
          relate.push(item);
        }
      });
      this.related = relate.splice(0, 3);
    }
    this.loading = false;
  }

}
