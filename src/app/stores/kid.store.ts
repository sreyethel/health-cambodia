import { action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { DataService } from '../services/data.service';

@Injectable()

export class Kid {
  
    // @observable data: any;
    @observable data : Array<any>;
    @observable dataSingle :  Array<any>;

    @observable small : Array<any>;
    @observable loading: boolean = true;
    @observable empty: boolean = false;
    @observable datas: any[] = []
    @observable bigContent: any;


    constructor(private db: DataService,
    ) { }

    @action // getData by sub_cate  
    getKidSingle() {
        this.loading = true;
        this.db.kidRef().valueChanges().subscribe(docs => {
            this.dataSingle = docs.slice(0,1);
            this.empty = docs.length === 0;
            this.loading = false;
        })
    }

    @action // getData by sub_cate  
    getkid() {
        this.loading = true;
        this.db.kidRef().valueChanges().subscribe(docs => {
            const datas = docs
            this.data = docs.splice(1,5);
            this.empty = docs.length === 0;
            this.loading = false;
        })
    }

}