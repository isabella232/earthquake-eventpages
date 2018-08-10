import { Component, Input } from '@angular/core';


/**
 * Mmi Component for all magnitudes across pages
 *
 * @param bubble
 *     Whether or not to display the mmi bubble
 * @param intensity
 *     The magnitude/intensity
 * @param value
 *     The magnitude value
 */
@Component({
  selector: 'shared-mmi',
  templateUrl: './mmi.component.html',
  styleUrls: ['./mmi.component.scss']
})
export class MmiComponent {

  @Input()
  public bubble = false;

  @Input()
  public intensity;

  @Input()
  public value;

}
