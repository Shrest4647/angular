import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { Bill } from '../../classes/bill';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  bill: Bill;

  constructor(
    private route: ActivatedRoute,
    private database: DatabaseService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bill = this.database.getBillById(id);
  }

  deleteBill() {
    this.database.removeBill(this.bill);
    this.router.navigate(['/home']);
  }

}
