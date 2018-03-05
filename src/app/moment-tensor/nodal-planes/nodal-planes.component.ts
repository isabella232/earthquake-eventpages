import { Component, OnInit, Input } from '@angular/core';
import { Tensor } from '../../shared/beachball/tensor';

@Component({
  selector: 'moment-tensor-nodal-planes',
  templateUrl: './nodal-planes.component.html',
  styleUrls: ['./nodal-planes.component.css']
})
export class NodalPlanesComponent implements OnInit {

  public columnsToDisplay = [
    'plane',
    'strike',
    'dip',
    'rake'
  ];

  public round = Math.round;

  @Input() tensor: Tensor;

  constructor() { }

  ngOnInit() {
  }

  getPlanes (tensor: Tensor) {
    if (!tensor) {
      return [];
    }

    return ['NP1', 'NP2'].map((name) => {
      const plane = tensor[name];

      return {
        dip: plane.dip,
        name: name,
        rake: plane.rake,
        strike: plane.strike
      };
    });
  }
}
