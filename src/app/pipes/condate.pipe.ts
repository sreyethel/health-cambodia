import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'condate'
})
export class CondatePipe implements PipeTransform {
  khmerNumbers = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  khmerMonths = [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឩសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ"
  ];

  transform(value: any, ...args: any[]): any {
    const current = new Date(value);

    const monthIndex = current.getMonth();

    // convert date to string
    const dateStr = current.getDate().toString();

    //convert year to string
    const yearStr = current.getFullYear().toString();

    //split date string to array for conversion
    const dateStrArray = dateStr.split("");

    // split year string to array for conversion
    const yearStringArray = yearStr.split("");

    // result is here
    // return something in console log

    const khmerDate =
      "ថ្ងៃទី" +
      this.convertEnglishToKhmerNumber(dateStrArray) +
      " ខែ" +
      this.khmerMonths[monthIndex] +
      " ឆ្នាំ" +
      this.convertEnglishToKhmerNumber(yearStringArray);
    return khmerDate;
  }

  convertEnglishToKhmerNumber(englishNumberStrArray = []) {
    const resultArray = [];
    if (englishNumberStrArray.length === 1) {
      resultArray.push(this.khmerNumbers[0]);
      const index = this.numbers.indexOf(englishNumberStrArray[0]);
      if (index > -1) {
        resultArray.push(this.khmerNumbers[index]);
      }
    } else {
      englishNumberStrArray.forEach(element => {
        const index = this.numbers.indexOf(element);
        if (index > -1) {
          resultArray.push(this.khmerNumbers[index]);
        }
      });
    }
    if (resultArray.length === 0) {
      return "";
    } else {
      let numStr = "";
      resultArray.forEach(element => {
        numStr += element;
      });
      return numStr;
    }
  }

}
