import { APPS, MappingService } from './../services/mapping.service';
import { action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { DatePipe } from '@angular/common';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()

export class Sick {

    // @observable data: any;
    data: any[] = [];
    @observable dataSub: Array<any>;
    @observable dataSingle: Array<any>;



    @observable small: Array<any>;
    @observable loading: boolean = true;
    @observable empty: boolean = false;
    @observable datas: any[] = []
    @observable bigContent: any;


    constructor(private db: DataService,
        public snackbar: MatSnackBar,
        public router: Router,
        private map: MappingService,
        private ds: AngularFirestore
    ) { }
    @action
    getsubCate() {
        this.db.subcatesick().valueChanges().subscribe(docs => {
            const sub = docs;
            sub.forEach((element: any) => {
                let subs = {};
                this.db.contentsubhomeRef(element.key).valueChanges().subscribe(doc => {
                    let fab = doc;
                    subs["data"] = fab;
                    subs["cate"] = element;
                })
                this.data.push(subs)
            });
            this.empty = docs.length === 0;
            this.loading = false;
        })
        // this.data = ["sub"subs];
        // this.data["fab"] = fab;
    }

}