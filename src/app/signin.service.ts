import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  url:string='http://localhost:5000/Signup';

  constructor(private http:HttpClient) { }

  getuser()
  {
    return this.http.get(this.url+'/getUsers');
  }
  adduser(obj:any)
  {
    console.log('??obj',obj)
    return this.http.post(this.url+'/createUser',obj);
  }
  edit(id:any)
  {
    console.log()
    return this.http.get(this.url+'/getUsers/'+id);
  }
  updateuser(data:any,id:any){

    return this.http.put(this.url+'/updateUser/'+id,data);
  }
  deleteuser(id:any)
  {
    console.log()
    return this.http.delete(this.url+'/delete/'+id);
  }
}
