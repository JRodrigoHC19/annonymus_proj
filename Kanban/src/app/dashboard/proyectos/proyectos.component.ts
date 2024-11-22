import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';

interface Project {
  title: string;
  description: string;
}

interface Task {
  entregables: string;
  tipo: string;
  itemId: string;
  tareas: string;
  predecesor: string;
  responsable: string;
  prioridad: string;
  inicio: Date | null; // Permitir que sea Date o null
  fin: Date | null;
  vencimiento: Date | null;
}


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  @Input() userRole: number = 2; // Recibe el rol del usuario desde el DashboardComponent
  projects: Project[] = []; // Aquí se guardan los proyectos
  showAssignTaskForm: boolean = false; // Controla la visibilidad del formulario
  tasks: Task[] = []; // Guarda las tareas cargadas desde el Excel
  selectedProject: Project | null = null; // Guarda el proyecto seleccionado

  constructor() {}

  ngOnInit(): void {
    // Simulación de datos de proyectos
    this.projects = [
      { title: 'Gestor', description: 'Prueba' },
      { title: 'Logística Textil', description: 'Es un sistema textil' },
      { title: 'Proyecto 3', description: 'no deseo' },
      { title: 'Proyecto 4', description: 'si deseo' },
    ];
  }

  // Método para mostrar/ocultar el formulario
  toggleAssignTaskForm(): void {
    this.showAssignTaskForm = !this.showAssignTaskForm;
  }

  // Método para cargar el archivo Excel
  loadExcel(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0]; // Obtener el nombre de la primera hoja
      const worksheet = workbook.Sheets[firstSheetName]; // Obtener la primera hoja

      // Convertir la hoja a formato JSON
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Procesar los datos para convertirlos en objetos Task
      this.tasks = [];
jsonData.forEach((row, index) => {
  if (index > 0) { // Saltar la fila de encabezado
    const task: Task = {
      entregables: row[0] || '',
      tipo: row[1] || '',
      itemId: row[2] || '',
      tareas: row[3] || '',
      predecesor: row[4] || '',
      responsable: row[5] || '',
      prioridad: row[6] || '',
      inicio: row[7] ? new Date(row[7]) : null,
      fin: row[8] ? new Date(row[8]) : null,
      vencimiento: row[9] ? new Date(row[9]) : null,
    };
    this.tasks.push(task);
  }
});


      console.log(this.tasks); // Ver las tareas cargadas en consola
    };

    reader.readAsArrayBuffer(file); // Leer el archivo como ArrayBuffer
  }
}
