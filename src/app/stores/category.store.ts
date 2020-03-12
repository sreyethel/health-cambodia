import { action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MappingService, APPS } from '../services/mapping.service';

@Injectable()

export class Category {
    @observable dataContent: Array<any>;
    @observable loading: boolean = true;
    @observable empty: boolean = false;

    lastVisibleLazy: any = null;
    @observable selectedCategory: any = null;
    @observable datalazy: any[] = []
    @observable datas: any[] = []
    @observable datalazycate: any[] = []
    lastVisibleSport: any = null;
    @observable fetching: boolean = false;
    @observable done: boolean = false;
    @observable emptylazy: boolean = false;

    data: any = new DatePipe("en-Us");

    @observable dataNewestCate: any;
    @observable dataCa: any;
    @observable dataCate: any[] = [];
    pageKey: any;
    pageIndex: any = 0;
    pageNext: boolean;
    pageBack: boolean;
    @observable topView: any[];
    emptyCate: boolean;

    constructor(private db: DataService,
        public snackbar: MatSnackBar,
        public router: Router,
        private map: MappingService
    ) { }

    @action
    async fetchNewestPost(key) {
        this.loading = true;
        const doc = await this.db.getNewestByCate(key).get().toPromise();
        let data = doc.docs.map(m => ({ ...m.data() }));
        let bigCate = data.slice(0, 1);
        let smallCate = data.slice(1, data.length);
        let datas = {};
        if (data.length > 0) {
            this.pageKey = data[data.length - 1].page_key;
            datas["smallContent"] = smallCate;
            datas["bigContent"] = bigCate[0];
            this.dataNewestCate = datas;
            this.getca(key);
        }
        this.loading = false;
    }


    @action
    async getca(cateKey) {
        this.dataCa = [];
        this.dataCate = [];
        this.pageNext = true;
        this.pageBack = false;
        const doc = await this.db.Cate(cateKey, this.pageKey).get().toPromise();
        let data = doc.docs.map(m => ({ ...m.data() }));
        let bigCa = data.slice(0, 1);
        let smallCa = data.slice(1, data.length);
        let datas = {};
        this.emptyCate = false;
        if (data.length > 0) {
            this.pageKey = data[data.length - 1].page_key;
            datas["small"] = smallCa;
            datas["big"] = bigCa[0];
            this.dataCa = datas;
            this.dataCate.push(datas);
            this.emptyCate = true;
        }
    }

    @action
    async getCaMore(page, cateKey) {
        let doc = await this.db.Cate(cateKey, this.pageKey).get().toPromise();
        let data = doc.docs.map(m => ({ ...m.data() }));
        let bigCa = data.slice(0, 1);
        let smallCa = data.slice(1, data.length);
        let datas = {};

        if (data.length > 0) {
            this.pageKey = data[data.length - 1].page_key;
            datas["small"] = smallCa;
            datas["big"] = bigCa[0];
            this.dataCate.push(datas);
        }
        if (this.dataCate.length - 1 > this.pageIndex && page == "next") {
            this.pageIndex++;
            this.dataCa = this.dataCate[this.pageIndex];
            this.pageNext = true;
        } else if (this.pageIndex > 0 && page == "back") {
            this.pageIndex--;
            this.dataCa = this.dataCate[this.pageIndex];
            this.pageBack = true;
        }
        if (this.dataCate.length - 1 == this.pageIndex && data.length == 0) {
            this.pageNext = false;
        } else {
            this.pageNext = true;
        }
        if (this.pageIndex == 0) {
            this.pageBack = false;
        } else {
            this.pageBack = true;
        }
    }

    @action
    async fetchData(category?: any) {
        this.loading = true;
        this.selectedCategory = category;
        const docs = await this.db.lazyCateRef(this.lastVisibleLazy, this.selectedCategory ? this.selectedCategory : null).get().toPromise();
        const items = this.map.pushToArray(docs);
        if (docs.size > 0 && docs.size >= APPS.SIZE) {
            this.lastVisibleLazy = items[items.length - 1];
            this.emptylazy = docs.empty;
            this.done = false;
        }
        else {
            this.lastVisibleLazy = null;
            this.done = true;
        }
        this.datalazycate = items;
        this.emptylazy = items.length === 0;
        this.loading = false;
    }

    @action
    async fetchLazy() {
        if (this.fetching || this.done || this.loading) return;
        this.fetching = true;
        const docs = await this.db.lazyCateRef(this.lastVisibleLazy, this.selectedCategory ? this.selectedCategory.key : null).get().toPromise();
        const items = this.map.pushToArray(docs);
        if (docs.size > 0 && docs.size >= APPS.SIZE) {
            this.lastVisibleLazy = items[items.length - 1];
            this.done = false;
        }
        else {
            this.lastVisibleLazy = null;
            this.done = true;
        }
        // ត array 
        this.datalazy = this.datalazy.concat(items);
        this.datalazycate = this.datalazycate.concat(items)
        this.fetching = false;
    }


}