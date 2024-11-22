import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  url: string = 'http://localhost:3000/api/users/login';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      this.http.get<any>(this.url,{headers: headers}).subscribe({
        next: data => {
          this.router.navigate(['/dashboard']);
        },error: err => {
          console.log(err);
          localStorage.removeItem('token');
        }
      });
    }
  }

  onSubmit() {
    if (this.username.endsWith('@tecsup.edu.pe')) {
      console.log('Login:', this.username, this.password);
      

      let data = {
        email: this.username,
        password: this.password
      };

      this.http.post<any>(this.url, data).subscribe({
        next: data => {
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', data.id_token);
        },
        error: error => {
          this.router.navigate(["/login"]);
          console.log(error);
        }
      });

    } else {
      console.error('Correo inválido. Debe ser @tecsup.edu.pe');
    }
  }
}