import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { DownloadDialogComponent } from '../../shared/download-dialog/download-dialog.component';
import { DyfiService } from '../dyfi.service';
import { EventService } from '../../core/event.service';
import {RomanPipe} from '../../shared/roman.pipe';
import {NumberPipe} from '../../shared/number.pipe';



@Component({
  selector: 'dyfi-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
  providers: [RomanPipe, NumberPipe]
})
export class ResponsesComponent implements OnInit, OnDestroy {
  private subs = new Subscription;
  public responses = new MatTableDataSource(null);
  public loaded = false;
  public headers = [
    'name',
    'cdi',
    'nresp',
    'dist',
    'lat',
    'lon'
  ];
  public columnsToDisplay = [
    'location',
    'mmi',
    'nresp',
    'dist',
    'lat',
    'lon'
  ];
  public columnTitles = {
    'location': 'Location',
    'mmi': 'MMI',
    'nresp': 'Responses',
    'dist': 'Distance',
    'lat': 'Latitude',
    'lon': 'Longitude'
  };


  public paginatorSizes = [10, 20, 50, 100, 1000];

  constructor (
    public dyfiService: DyfiService,
    public eventService: EventService,
    public dialog: MatDialog,
    public romanPipe: RomanPipe,
    public numberPipe: NumberPipe
  ) { }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.subs.add(this.dyfiService.cdiZip$.subscribe((data) => {
      this.onDyfiSeries(data);
    }));
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }

/**
   * New product, get new station list
   *
   * @param product shakemap product
   */
  onProduct (product) {
    if (product === null) {

      this.responses = null;
      this.loaded = false;
      return;
    }

    this.dyfiService.getCdi(product);
  }

  onDyfiSeries (dyfiData) {
    this.responses = new MatTableDataSource(dyfiData);
    this.responses.sort = this.sort;
    this.responses.paginator = this.paginator;
    this.loaded = true;
  }

  onDownload() {
    const responsesArray = this.responses.filteredData;

    const headers = this.columnsToDisplay.map((c) => {
      return this.columnTitles[c];
    }).join('\t');

    const lines = responsesArray.map((response) => {
      response['location'] = response['name'] + ' ' + response['state'] + ' ' +
                             response['country'] + ' ' + response['zip'];
      response['mmi'] = this.romanPipe.transform(response['cdi']);
      response['dist'] = this.numberPipe.transform(response['dist'], 0, 'km');
      return this.columnsToDisplay.map((c) => {
        return response[c];
      }).join('\t');
    });

    this.dialog.open(DownloadDialogComponent, {
      data: {
        title: 'Donwload DYFI Responses',
        message: 'Copy then paste into a spreadsheet application',
        content: headers + '\n' + lines.join('\n')
      }
    });
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }


}
