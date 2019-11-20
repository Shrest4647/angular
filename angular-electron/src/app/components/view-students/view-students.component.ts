import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Student } from '../../classes/student';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss']
})
export class ViewStudentsComponent implements OnInit {
  allStudents: Student[];
  filterByText: string;
  filterByGrade: string;

  constructor(private database: DatabaseService) {
    this.database.getStudents().subscribe(arg => this.allStudents = arg);
  }

  ngOnInit() {
  }




}
