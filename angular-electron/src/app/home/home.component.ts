import { Component, OnInit } from '@angular/core';
import * as loki from 'lokijs';
import { ipcRenderer } from 'electron';
import * as nanoid from 'nanoid';
import { remote } from 'electron';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  db: loki;
  imageNo = 1;
  MessageToIpc: any;
  imageURL = `./assets/img/img${this.imageNo.toString()}.jpg`;
  constructor(private data: DatabaseService) {

  }

  ngOnInit() {
    this.getCollection();
  }

  public async getCollection() {
    await this.data.initializeAsync();
    console.log('database loaded');

  }

  openFile() {
    console.log('inopen file');
    remote.dialog.showOpenDialog({
      properties: ['openFile']
  }, function (file) {
      if (file !== undefined) {
          // handle files
          console.log(file);
      }
  });
  console.log("After");

  }

  prev() {
    this.imageNo = (this.imageNo - 1) % 3 + 1;
    this.imageURL = `./assets/img/img${this.imageNo.toString()}.jpg`;
  }

  next() {
    this.imageNo = (this.imageNo + 1) % 3 + 1;
    this.imageURL = `./assets/img/img${this.imageNo.toString()}.jpg`;
  }

}
