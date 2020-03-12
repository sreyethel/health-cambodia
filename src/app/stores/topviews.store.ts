import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { action, observable } from 'mobx-angular';


@Injectable()

export class TopView {
  
    @observable data: Array<any>;
    @observable loading: boolean = true;
    @observable empty: boolean = false;




    constructor(private db: DataService,
    ) { }

    @action
    async getTopView(cateKey?:any){
        this.loading = true;
        const doc = await this.db.getTopView(cateKey).get().toPromise();
        this.data = doc.docs.map(m=>({...m.data()}));
        
        this.empty = this.data.length === 0;
        this.loading = false;
    }

    

}