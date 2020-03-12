import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strHtml'
})
export class StrHtmlPipe implements PipeTransform {

  transform(value: string): any {
    let removeTag = value.replace(/<.*?>/g, ''); // replace tags
    return removeTag.replace(/&nbsp;/gi, '');
  }

}
