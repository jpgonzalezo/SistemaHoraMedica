import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroupLogin: FormGroup;
  loading:boolean;
  constructor(
    private router: Router,
    private formBuilderLogin: FormBuilder,
    private _loginService: LoginService,
    private _storageService: StorageService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.buildFormLogin();
  }
  
  buildFormLogin(){
    this.formGroupLogin = this.formBuilderLogin.group({
      usuario:['', Validators.required]
    });
  }

  login(){
    this.loading = true;
    this._loginService.login(this.formGroupLogin.value).subscribe((data)=>{
      if(data==null){
        swal.fire({
          title : 'Usuario incorrecto',
          text: 'Ingrese un usuario valido',
          type: 'error'
        })
      }
      else{
        this._storageService.setCurrentSession(data);
        this.loading = false
        this.router.navigate(['/profile']);
      }
    })
  }

}
