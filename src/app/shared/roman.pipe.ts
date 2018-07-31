import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sharedRoman'
})
export class RomanPipe implements PipeTransform {


  static MMI_ROMAN = ['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII',
        'IX', 'X', 'XI', 'XII'];


  /**
   * Returns a roman numeral from a number
   * @param mmi
   *     The magnitude
   * @returns {any}
   */
  transform (mmi: number): any {
    let value;

    mmi = Math.round(mmi);
    value = RomanPipe.MMI_ROMAN[mmi];

    if (value) {
      return value;
    }

    return null;
  }

}
