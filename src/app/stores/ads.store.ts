import { APPS, MappingService } from './../services/mapping.service';
import { action, observable } from 'mobx-angular';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';

@Injectable()

export class Adstore {
    @observable rightSideAd: any;
    @observable headerAds: any;
    @observable topHeaderAd: any;

    @observable footer: any

    constructor(private db: DataService) { }

    @action
    async fetchRightSideAd() {
        const doc = await this.db.getRightSideAd().get().toPromise();
        const rightAd = doc.docs.map(m => ({ ...m.data() }))[0];
        const toDay = new Date();
        if (rightAd != undefined) {
            if ((rightAd.expireDate).toDate() > toDay && (rightAd.startDate).toDate() <= toDay) {
                this.rightSideAd = rightAd;
            }
        }
    }


    @action
    async fetchHeaderAd() {
        const doc = await this.db.getHeaderAd().get().toPromise();
        const headerAd = doc.docs.map(m => ({ ...m.data() }))[0];
        const toDay = new Date();
        if (headerAd != undefined) {
            if ((headerAd.expireDate).toDate() > toDay && (headerAd.startDate).toDate() <= toDay) {
                this.headerAds = headerAd;
            }
        }
    }

    @action
    async fetchTopHeaderAd() {
        const doc = await this.db.getTopHeaderAd().get().toPromise();
        const topHeaderAd = doc.docs.map(m => ({ ...m.data() }))[0];
        const toDay = new Date();
        if (topHeaderAd != undefined) {
            if ((topHeaderAd.expireDate).toDate() > toDay && (topHeaderAd.startDate).toDate() <= toDay) {
                this.topHeaderAd = topHeaderAd;
            }
        }
    }

    @action
    async fetchFooterAd() {
        const doc = await this.db.getFooterAd().get().toPromise();
        const footer = doc.docs.map(m => ({ ...m.data() }))[0];
        const toDay = new Date();
        if (footer != undefined) {
            if ((footer.expireDate).toDate() > toDay && (footer.startDate).toDate() <= toDay) {
                this.footer = footer;
            }
        }
    }

}