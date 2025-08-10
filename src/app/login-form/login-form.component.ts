import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private axiosService: AxiosService) { }

  submitLogin(): void {
    this.axiosService.request(
      "POST",
      "/login",
      {
        username: this.profileForm.controls['username'].value,
        password: this.profileForm.controls['password'].value
      }
    ).then(
      (response: { data: any; }) => {
        console.log('Login successful:', response.data);
      }
    );
  }
}
