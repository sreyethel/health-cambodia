import { action } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { DataService } from '../services/data.service';

@Injectable()

export class Teacher {
  
    @observable data : Array<any>;
    @observable dataSingle : Array<any>;
    @observable small : Array<any>;
    @observable loading: boolean = true;
    @observable empty: boolean = false;

    constructor(private db: DataService,
    ) { }
    @action // getData by sub_cate  
    getTeacher() {
        this.loading = true;
        this.db.teacherRef().valueChanges().subscribe(docs => {
            this.data = docs;
            this.empty = docs.length === 0;
            this.loading = false;
        })
    }
}