import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Component({
  selector: 'app-readcsv',
  templateUrl: './readcsv.component.html',
  styleUrls: ['./readcsv.component.scss']
})
export class ReadcsvComponent implements OnInit {

  result: Array<Object> = [];
  constructor() { }

  ngOnInit() {
  }

  openFile() {
    console.log('inopen file');
    remote.dialog.showOpenDialog({
      properties: ['openFile']
    }, function (file) {
      if (file !== undefined) {
        // handle files
        console.log(file);
        fs.createReadStream(file[0])
          .pipe(csv())
          .on('data', (data) => console.log(data))
          .on('end', () => {
            console.log(this.result);
          });

      }
    });
    console.log("After");

  }


}
