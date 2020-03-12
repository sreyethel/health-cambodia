import { action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { DataService } from '../services/data.service';

@Injectable()

export class Home {
    @observable data: Array<any>;
    @observable marquee: Array<any>;
    @observable bigContent: any;
    @observable smallContent: Array<any>;
    @observable loading: boolean = true;
    @observable empty: boolean = false;
    @observable dataContentofmequee: Array<any>;
    //search
    @observable datas: any[] = []

    constructor(private db: DataService,
    ) { }

    @action
    getContent() {
        this.loading = true;
        this.db.contentRef().valueChanges().subscribe(docs => {
            const datas = docs;
            this.datas = datas
            this.marquee = docs;
            const mainCard = datas.splice(0, 5);
            this.bigContent = mainCard[0];
            this.smallContent = mainCard.splice(1, mainCard.length);
            this.dataContentofmequee = this.marquee.splice(0, 3);
            this.empty = docs.length === 0;
            this.loading = false;
        })
    }

}