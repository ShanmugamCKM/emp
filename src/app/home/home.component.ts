import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SigninService } from '../signin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmEventType, ConfirmationService, MessageService,} from 'primeng/api';
import { Any } from 'typeorm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
users: any;
get: any;
sidebarVisible:boolean=false;
public show:boolean=false;
update:boolean=false;
getId:any;
userlist!:FormGroup;
// sortField: string | undefined;
// sortOrder: number | undefined = 1;

constructor(private http:HttpClient,private ser:SigninService,private formBuilder: FormBuilder,private messageService: MessageService,private confirmationservice:ConfirmationService) {}
  
ngOnInit(): void {
    this.getusers();
    this.createLoginForm();
    // this.loadData();
  }

  // loadData() {
  //   // You need to adjust your service method to handle sorting
  //   this.ser.getuser(this.sortField || '', this.sortOrder).subscribe((data) => {
  //     this.get = data;
  //   });
  // }

  // onSort(event: any) {
  //   this.sortField = event.field;
  //   this.sortOrder = event.order;
  //   this.loadData();
  // }

getusers()
{
  return this.ser.getuser().subscribe((data)=>
  {
    this.users=data;
    this.get=this.users.data;
    console.log(data);
  })
}

addUser() {
  this.ser.adduser(this.userlist.value).subscribe((data:any)=>{
    console.log('++++++',this.userlist.value);
    this.getusers();
  })
}
showTopCenter(severity: string, summary: string, life : number,stick? : boolean ) {
  this.messageService.add({ severity: severity, summary: summary , sticky : stick, life : life});
}

edit(id:any)
{
  this.sidebarVisible = true
  this.getId = id

  this.update=true
   this.ser.edit(id).subscribe((res:any)=>
  {
    console.log('>>>',res)
  //   this.users=data;
  let data=res.data;
  this.userlist.patchValue(data)
  });
}

updateUser(data:any){
  let id = this.getId;
  // this.sidebarVisible=true;
  console.log("up------------------------------",data);
  console.log("upid--------------------------",id);
  this.confirm2();
  return this.ser.updateuser(data,id).subscribe((data)=>{  
  })
}

deleteUser(id: any) {
  this.ser.deleteuser(id).subscribe((data) => {
      // Refresh the user list after deletion
      this.getusers();
  });
}

createLoginForm() {
  this.userlist=this.formBuilder.group({
    // email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    username:['',[Validators.required,Validators.minLength(2)]],
    password:['',[Validators.required,Validators.minLength(7)]]
  })
}

get form(){
  return this.userlist.controls
}

add(){
  this.sidebarVisible = true
  this.userlist.reset()
}

submit1(){
  if(!this.userlist.valid ){
    console.log('!!!',this.userlist.value)
    this.userlist.markAllAsTouched();
    // this.showTopCenter()
    this.showTopCenter('error', 'Please fill mandatory fields!',500000);
  }
  else{
    this.confirm1()
    // this.sidebarVisible=false;
  }
}

confirm1() {
  this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.addUser()
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: (error:any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You not accepted' });
      }
  });
}
confirm2() {
  this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.updateUser({});
          this.getusers();  
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: (error:any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You not accepted' });
      }
  });
}


}


