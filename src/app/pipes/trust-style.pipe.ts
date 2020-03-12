import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustStyle'
})
export class TrustStylePipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){

  }

  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${value}')`);
    
  }

}
