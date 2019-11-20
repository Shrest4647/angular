import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Student } from '../../classes/student';
import { SnackbarService } from '../../services/snackbar.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  db: any;
  stu: Student = new Student();

  constructor(private database: DatabaseService, private snackBar: SnackbarService) {
  }

  ngOnInit() {
  }

  add() {
    this.database.addStudent(this.stu);

  }

  onSubmit({ value, valid }) {
    if (valid) {
      this.add();
      this.stu = new Student();
      this.snackBar.openSnackBar('Student saved successfully', 'Add New Student?');
    } else {
      this.snackBar.openSnackBar('form not valid', 'not valid', 2000);

    }

  }

}
