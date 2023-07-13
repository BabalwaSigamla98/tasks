import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Data {
  id: number;
  name: string;
  task: string;
  description: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});
  submitted: boolean = false
  data: Data[] = [];
  name: string = '';
  task: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  isEditing: boolean = false;
  editedData: Data = {
    id: 0,
    name: '',
    task: '',
    description: '',
    startDate: '',
    endDate: ''
  };

  constructor(private http: HttpClient, private fB: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    this.taskForm = this.fB.group({
      name: ['', Validators.required],
      task: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })

  }

  getData() {
    this.http.get<any>('../assets/data.json').subscribe((response) => {
      this.data = response.tasks;
    });
  }

  saveData() {
    const dataToSave = { tasks: this.data };
    this.http
      .put('.../data.json', dataToSave)
      .subscribe(() => console.log('Data saved successfully.'));
  }

  addData() {
    this.submitted = true;
    
    if (
      this.name.trim() === '' ||
      this.task.trim() === '' ||
      this.startDate.trim() === '' ||
      this.endDate.trim() === ''
    ) {
      alert('Please fill out all the fields');
      return;
    }

    const newData: Data = {
      id: Date.now(),
      name: this.name,
      task: this.task,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.data.push(newData);
    this.saveData();
    console.log(newData)
    this.name = '';
    this.task = '';
    this.description = '';
    this.startDate = '';
    this.endDate = '';
    alert('Successfuly added!!')
  }


  editData(item: Data) {
    this.isEditing = true;
    this.editedData = { ...item };
   
  }

  updateData() {
    const index = this.data.findIndex((item) => item.id === this.editedData.id);
    if (index !== -1) {
      this.data[index] = { ...this.editedData };
      this.saveData();
      this.isEditing = false;
      this.editedData = {
        id: 0,
        name: '',
        task: '',
        description: '',
        startDate: '',
        endDate: ''
      };
      alert('Task editted.....');
    }
  }

  deleteData(item: Data) {
    const index = this.data.findIndex((data) => data.id === item.id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.saveData();
   
    }
  }
}

