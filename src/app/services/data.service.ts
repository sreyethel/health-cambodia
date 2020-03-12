import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { APPS } from './mapping.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private db: AngularFirestore
  ) { }

  getNewestByCate(categKey) {
    return this.db.collection("content", ref => ref
      .where("category.key", "==", categKey)
      .where("status.key", "==", 1)
      .orderBy('page_key', "desc")
      .limit(5)
    )
  }

  countPostView(key) {
    const increment = firebase.firestore.FieldValue.increment(1);
    this.db.collection('content').doc(key).update({ top_view: increment });
  }

  Cate(categKey?: any, pageKey?: any) {
    return this.db.collection("content", ref => ref
      .where("category.key", "==", categKey)
      .where("status.key", "==", 1)
      .orderBy('page_key', "desc")
      .where("page_key", "<", pageKey)
      .limit(5)
    )
  }

  getHeaderAd() {
    const toDay = new Date();
    return this.db.collection("web_advertisement", ref => ref
      .where("advertiseType.key", "==", 6)
      // .where("startDate","<=",toDay)
      .where("status.key", "==", 1)
      .limit(1)
    )
  }

  getRightSideAd() {
    const toDay = new Date();
    return this.db.collection("web_advertisement", ref => ref
      .where("advertiseType.key", "==", 3)
      // .where("startDate","<=",toDay)
      .where("status.key", "==", 1)
      .limit(1)
    )
  }

  getTopHeaderAd() {
    const toDay = new Date();
    return this.db.collection("web_advertisement", ref => ref
      .where("advertiseType.key", "==", 1)
      // .where("startDate","<=",toDay)
      .where("status.key", "==", 1)
      .limit(1)
    )
  }

  getTopView(key?: any) {
    if (key) {
      return this.db.collection("content", ref => ref
        .where("category.key", "==", key)
        .where("status.key", "==", 1)
        .orderBy("top_view", "desc")
        .limit(5)
      )
    } else {
      return this.db.collection("content", ref => ref
        .where("status.key", "==", 1)
        .orderBy("top_view", "desc")
        .limit(5)
      )
    }
  }

  contentRef() {
    return this.db.collection("content", ref => ref
      .where("status.key", "==", 1)
      .orderBy("page_key", 'desc')
      .limit(20))
  }
  
  //lazy load
  lazyCateRef(lastVisible: any, categoryKey?: any) {
    if (categoryKey)//by select menu
    {
      if (lastVisible) {
        const { page_key } = lastVisible;
        return this.db.collection("content", ref => ref
          .where("category.key", "==", categoryKey)
          .where("status.key", "==", 1)
          .orderBy('page_key', "desc")
          .startAfter(page_key)
          .limit(APPS.SIZE))
      }
      else {
        return this.db.collection("content", ref => ref
          .where("category.key", "==", categoryKey)
          .where("status.key", "==", 1)
          .orderBy('page_key', "desc").limit(APPS.SIZE))
      }
    }
    else//home
    {
      if (lastVisible) {
        const { page_key } = lastVisible;
        return this.db.collection("content", ref => ref
          .where("status.key", "==", 1)
          .orderBy('page_key', "desc")
          .startAfter(page_key)
          .limit(APPS.SIZE))
      }
      else {
        return this.db.collection("content", ref => ref
          .where("status.key", "==", 1)
          .orderBy('page_key', "desc")
          .limit(APPS.SIZE))
      }

    }
  }

  topviewRef() {
    return this.db.collection("content", ref => ref
      .where("status.key", "==", 1)
      .limit(5)
      .orderBy('top_view', 'desc'))
  }


  contentOfkidRef() {
    return this.db.collection("content", ref => ref
      .where("category.key", "==", "QJAAr0vIm9og9Cr4F2Zf")
      .where("status.key", "==", 1)
      .orderBy('page_key', "desc"))
  }

  subcatesick() {
    return this.db.collection("sub_category", ref => ref
      .where("category.create_by.key", "==", "BWqjBTJMw0TFp405WgT62hS4r3w2")
      .orderBy("page_key", "desc"))
  }

  newsRef() {
    return this.db.collection("content", ref => ref
      .where('category.key', '==', 'q7SMDEyZETYCvZDt8NNU')
      .where("status.key", "==", 1)
      .limit(6)
      .orderBy('page_key', 'desc')
    )
  }

  kidRef() {
    return this.db.collection("content", ref => ref
      .where('category.key', '==', 'vXEVr8vr6jQusyTPpcxw')
      .where("status.key", "==", 1)
      .orderBy('page_key', 'desc')
      .limit(5)
    )
  }
  kidRef1() {
    return this.db.collection("content", ref => ref
      .where('category.key', '==', 'vXEVr8vr6jQusyTPpcxw')

      .where("status.key", "==", 1)
      .orderBy('page_key', 'desc')
      .limit(1)
    )
  }

  teacherRef() {
    return this.db.collection("content", ref => ref
      .where('category.key', '==', 'lgVvpzGmCiys3k9eylFq')

      .where("status.key", "==", 1)
      .orderBy('page_key', 'desc')
      .limit(6)
    )
  }

  contentsubhomeRef(key) {
    return this.db.collection("content", ref => ref
      .where("sub_category.key", "==", key)

      .where("status.key", "==", 1)
      .orderBy("page_key", "desc")
      .limit(5))
  }


  autoColelctionRef(collection) {
    return this.db.collection(collection, ref => ref
      .where('status.key', '==', 1)
      .limit(10));
  }

  autosearchListingRef(collectionName: string, field: string, text: any) {
    if (typeof text === 'string') {
      const search = text.toUpperCase();
      const end = search.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

      return this.db.collection(collectionName, ref =>
        ref
          // .where("status.key", "==", 1)
          .where(field, ">=", search)
          .where(field, '<', end)

          .where("status.key", "==", 1)
          .orderBy(field)
          .limit(10)
      );
    }
    return this.db.collection(collectionName, ref =>
      ref
        .where("status.key", "==", 1)
        .orderBy(field)
        .limit(10)
    );
  }
  Detail(slug) {
    return this.db.collection("content", ref => ref
      .where("slug", "==", slug)

      .where("status.key", "==", 1)
    )
  }

  relateNews(cateKey) {
    return this.db.collection("content", ref => ref
      .where("category.key", "==", cateKey)
      .where("status.key", "==", 1)
      .orderBy("page_key", "desc")
      .limit(4)
    )
  }

  getFooterAd(){
    return this.db.collection("web_advertisement",ref=>ref
    .where("advertiseType.key","==",2)
    .where("status.key","==",1)
    )
  }

}
