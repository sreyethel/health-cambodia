import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'docRef'
})
export class DocRefPipe implements PipeTransform {

  transform(ref: any, field: string): any {
    return ref.get().then(doc => {
      if(doc.data()[field] != null){
        return doc.data()[field]
      }else{
        if(field=='facebook' || field=='googleplus' || field=='linkin' || field=='youtube'){
          return '#';
        }else{
          return '';
        }
      }
    });
  }

}
