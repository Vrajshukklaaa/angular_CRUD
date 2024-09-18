export class EmployeeModel{
    empId: number;
    name: string;
    city: string;
    state: string;
    emailID: string;
    contactInfo: string;
    address: string; 

    constructor(){
        this.empId = 0;
        this.name = '';
        this.city = '';
        this.state = '';
        this.emailID = '';
        this.contactInfo = '';
        this.address = '';

    }
}