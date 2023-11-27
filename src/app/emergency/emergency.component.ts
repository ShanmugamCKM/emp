import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninService } from '../signin.service';
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss']
})
export class EmergencyComponent {

  public show:boolean=false;

  userlist!:FormGroup;
 
  constructor(private formBuilder: FormBuilder,private ser:SigninService) { }
 
  ngOnInit() {
    this.createLoginForm();
  }
 
  createLoginForm() {
    this.userlist=this.formBuilder.group({
      // email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      name:['',[Validators.required,Validators.minLength(2)]],
      password:['',[Validators.required,Validators.minLength(7)]]
    })
  }
 
  get form(){
    return this.userlist.controls
  }

  signin() {
    let obj:any={};
    obj['username']=this.form['name'].value;
    obj['password']=this.form['password'].value;
    this.ser.adduser(obj).subscribe((data:any)=>{

      console.log(obj);
    })
    if (this.userlist.valid) {
      console.log('signinForm:', this.userlist.value);
      this.show=true;
    } 
    else {
      this.userlist.markAllAsTouched();
    }
    
}

}
