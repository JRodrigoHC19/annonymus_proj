import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  
  usuarios = [
    { nombre: 'Juan Pérez', correo: 'juan.perez@example.com', contrasena: '123456', carrera: 'Ingeniería de Sistemas', ciclo: '3', seccion: 'A' },
    { nombre: 'Ana Gómez', correo: 'ana.gomez@example.com', contrasena: 'abcdef', carrera: 'Arquitectura', ciclo: '5', seccion: 'B' },
    { nombre: 'Luis Torres', correo: 'luis.torres@example.com', contrasena: '654321', carrera: 'Contabilidad', ciclo: '2', seccion: 'C' }
  ];

  searchTerm: string = ''; // Término de búsqueda
  filteredUsuarios = this.usuarios; // Lista filtrada de usuarios

  showCreateUserModal = false;
  newUser = { nombre: '', correo: '', contrasena: '', carrera: '', ciclo: '', seccion: '' };

  showPreviewModal = false; // Para controlar la vista previa
  previewData: any[] = []; // Almacena los datos para la vista previa

  openCreateUserModal(): void {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal(): void {
    this.showCreateUserModal = false;
  }

  registerUser(): void {
    this.usuarios.push({ ...this.newUser });
    this.newUser = { nombre: '', correo: '', contrasena: '', carrera: '', ciclo: '', seccion: '' };
    this.closeCreateUserModal();
    this.buscarUsuarios(); // Actualiza la lista filtrada
  }

  buscarUsuarios(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(term)
    );
  }

  exportarUsuarios(): void {
    const datos = this.usuarios.map(usuario => ({
      Nombre: usuario.nombre,
      Correo: usuario.correo,
      Contraseña: usuario.contrasena,
      Carrera: usuario.carrera,
      Ciclo: usuario.ciclo,
      Sección: usuario.seccion
    }));

    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    XLSX.writeFile(workbook, "usuarios.xlsx");
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      console.error("No se seleccionó ningún archivo.");
      return;
    }
    
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const users: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      this.previewData = [];
      for (let i = 1; i < users.length; i++) {
        const row = users[i];
        
        if (row.length >= 6) {
          const user = {
            nombre: row[0] || '',
            correo: row[1] || '',
            contrasena: row[2] || '',
            carrera: row[3] || '',
            ciclo: row[4] || '',
            seccion: row[5] || ''
          };
          this.previewData.push(user);
          this.showCreateUserModal = false;
        } else {
          console.warn(`Fila ${i + 1} tiene menos de 6 columnas y fue omitida.`);
        }
      }

      if (this.previewData.length > 0) {
        this.showPreviewModal = true;
      } else {
        console.warn("No se encontraron datos válidos para importar.");
      }
    };
  
    reader.readAsArrayBuffer(file);
  }

  confirmarImportacion(): void {
    this.usuarios.push(...this.previewData);
    this.previewData = [];
    this.showPreviewModal = false;
    this.buscarUsuarios(); // Actualiza la lista filtrada después de importar
  }

  cancelarImportacion(): void {
    this.previewData = [];
    this.showPreviewModal = false;
  }

}
