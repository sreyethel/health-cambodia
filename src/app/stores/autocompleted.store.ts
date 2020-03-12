
import { observable, action, } from 'mobx';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable()
export class AutoCompleteStore {
    @observable data: Array<any> = [];
    @observable process: boolean = false;
    @observable loading: boolean = true;
    @observable empty: boolean = false;
    constructor(private ds: DataService) { }

    @action
    fetchAutoCompleted(ref: AngularFirestoreCollection, callback) {
        ref.valueChanges().subscribe(docs => {
            callback(docs);
        })
    }
    @action
    async fetchSearch(collectionName: string, field: string, search: any, callback) {
        if (search) {
            return this.ds.autosearchListingRef(collectionName, field, search).valueChanges().subscribe(docs => {
                callback(docs)
            });
        } else {
            callback(false, null)
        }
    }

    @action
    fetchAutoDataCallBack(collection, callback) {
        this.ds.autoColelctionRef(collection).valueChanges().subscribe(data => {
            callback(data);
        })
    }

}


