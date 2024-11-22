import { Component, OnInit } from '@angular/core';
export class Project { // Modelo para representar un proyecto
  constructor(
    public title: string,
    public description: string,
    public notifications: number
  ) {}
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit  {
  userRole: number = 0; // Guarda el rol del usuario -> numero entero
  projects: Project[] = []; // Arreglo para almacenar proyectos
  selectedProject: Project | null = null; // Proyecto seleccionado

  constructor() {}

  ngOnInit(): void {
    // simlamos que el rol sera de un docente normal 
    this.userRole = 2; 
   // inicializamos una lista de proyecto
    this.projects = [
      new Project('Gestión de Servicio de Software', 'Accede a todos los reportes de tus docentes.', 7),
      new Project('Proyecto de Desarrollo Web', 'G];estiona todos los proyectos.', 3),
      new Project('Proyecto de Desarrollo Web', 'G];estiona todos los proyectos.', 3),
      new Project('Proyecto de Desarrollo Web', 'G];estiona todos los proyectos.', 3),
      new Project('Proyecto de Desarrollo Web', 'G];estiona todos los proyectos.', 3),
      new Project('Proyecto de Desarrollo Web', 'G];estiona todos los proyectos.', 3),
      new Project('Proyecto de Desarrollo Web', 'G];estiona todos los proyectos.', 3),
      new Project('Proyecto de Desarrollo Web', 'G];estiona todos los proyectos.', 3),
      
    ];
    
  }
  
  selectProject(project: Project) {
    this.selectedProject = project; // Asigna el proyecto seleccionado
  }

  


  getRoleDescription(role: number): string {
    switch (role) {
      case 1: return 'Docente Jefe';
      case 2: return 'Docente';
      case 3: return 'Alumno Líder';
      case 4: return 'Alumno';
      default: return 'Usuario';
    }
  }
}


