import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_18_CRUD';

  employeeForm: FormGroup = new FormGroup({});

  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  constructor(){
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData!=null){
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }
  createForm(){
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId,[Validators.required]),
      name: new FormControl(this.employeeObj.name),
      city : new FormControl(this.employeeObj.city),
      state : new FormControl(this.employeeObj.state),
      emailID: new FormControl(this.employeeObj.emailID,[Validators.required]),
      contactInfo : new FormControl(this.employeeObj.contactInfo,[Validators.required,Validators.minLength(10),Validators.maxLength(15)]),
      address : new FormControl(this.employeeObj.address),

    })
  }

  onReset(){
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }

  onSave(){
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData!=null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.onReset();
  }

  onEdit(item: EmployeeModel){
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate(){
    const record = this.employeeList.find(m=>m.empId == this.employeeForm.controls['empId'].value);
    if(record != undefined){
      record.name = this.employeeForm.controls['name'].value;
      record.contactInfo = this.employeeForm.controls['contactInfo'].value;
      record.emailID = this.employeeForm.controls['emailID'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.address = this.employeeForm.controls['address'].value;
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.onReset();
  }

  onDelete(id: number){
        const isDelete = confirm("Are You Sure?");
        if(isDelete){
          const index = this.employeeList.findIndex(m=>m.empId == id); 
          this.employeeList.splice(index,1);
          localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
        }
  }

}
