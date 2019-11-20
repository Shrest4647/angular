import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { Student } from '../../classes/student';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  id: string;
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private database: DatabaseService,
    private location: Location,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.student = this.database.getStudentById(id);
  }

  removeStudent() {
    console.log('navigation1');
    this.database.removeStudent(this.student);
    this.snackBar.openSnackBar('removed one student');
    this.router.navigate(['/view/student']);
    console.log('navigation3');
  }

}
