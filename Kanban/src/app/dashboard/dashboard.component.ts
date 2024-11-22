import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userRole: number = 0; // Rol del usuario
  isMenuOpen: boolean = true; // Estado del menú lateral
  isMobile: boolean = false; // Detecta si es móvil
  your_role: string = '';


  constructor(private router: Router, private http: HttpClient) {}


  ngOnInit() {
    let url = 'http://localhost:3000/api/users/login';
    if (localStorage.getItem('token') == null){
      this.router.navigate(['/login']);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<any>(url,{headers: headers}).subscribe({
      next: data => {
        // console.log(data);
        this.userRole = parseInt(data.user.role);
        this.your_role = this.getRoleDescription(this.userRole);
      },error: err => {
        console.log(err);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });

    this.checkScreenSize(); 
  }

  // Alternar el menú lateral
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Manejar el clic en las opciones del menú
  handleOptionClick(): void {
    // Cerrar el menú solo en pantallas móviles
    if (this.isMobile) {
      this.isMenuOpen = false;
    }
  }

  // Detectar cambios en el tamaño de la ventana
  @HostListener('window:resize', [])
  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    this.isMenuOpen = !this.isMobile; // Abierto en escritorio, cerrado en móviles
  }

  // Obtener la descripción del rol
  getRoleDescription(role: number): string {
    switch (role) {
      case 1:
        return 'Docente Jefe';
      case 2:
        return 'Docente';
      case 3:
        return 'Alumno Líder';
      case 4:
        return 'Alumno';
      default:
        return 'Usuario';
    }
  }
}
