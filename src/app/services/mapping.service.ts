import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor() { }
  static pageKey() {
    return Number(moment().format('YYYYMMDDHHmmssSSS'))
  }

   pushToArray(data: firebase.firestore.QuerySnapshot) {
    if (data.empty) return [];
    return data.docs.map((m) => (
      { id: m.id, ...m.data() }
    ))
  }

  pushToObject(data: firebase.firestore.DocumentSnapshot) {
    if (!data.exists) return null;
    return { id: data.id, ...data.data() }

  }

  static contentTitle(val: string) {
    const stringArray = val.split(/<[^>]*>,?/gm)
    const stringa = stringArray.filter(m => { if (m.length > 0) return m })[0]
    return stringa
  }
  
  static contentDes(val: string) {
    const stringArray = val.split(/<[^>]*>?,;/gm)
    const stringa = stringArray.filter(m => { if (m.length > 0) return m })
    return stringa
  }

}

export const APPS={
  SIZE:10,
}

export const APPSRELAX={
  SIZE:3,
}

export function toCalendar(date:Date){
  return moment(date).calendar();
}