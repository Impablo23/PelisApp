import { Overlay } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Permises } from 'src/app/interfaces/api-response.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { DeleteUsersComponent } from './delete-users/delete-users.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  permises!: Permises;

  nombre_publico!: string;

  listadoUsers : Usuario[] = [];


  idFilter = new FormControl();
  usuarioFilter = new FormControl();
  nombreFilter = new FormControl();
  rolFilter = new FormControl();

  displayTable = false;

  displayedColumns: string[] = [];
  private filterValues = { id_usuario: '', usuario: '', nombre_publico: '', rol: ''};


  constructor(
              public dialog: MatDialog,
              private servicioUsuarios: UsuarioService,
              private overlay: Overlay,
              private router: Router,
              private authService: AuthService
              ) { }

  ngOnInit() {
    this.getUsuarios();
    this.nombre_publico = localStorage.getItem('nombre_publico')!;
  }

  async getUsuarios() {
    const RESPONSE = await this.servicioUsuarios.getAllUsuarios().toPromise();
    const RESPONSENOUNDEFINED = RESPONSE!;
    this.permises = RESPONSENOUNDEFINED.permises!;
    if (RESPONSENOUNDEFINED.ok) {
      this.displayedColumns = ['id_usuario', 'usuario', 'nombre_publico', 'rol','actions'];
      this.servicioUsuarios.usuarios = RESPONSENOUNDEFINED.data as Usuario[];
      this.dataSource.data = this.servicioUsuarios.usuarios;
      this.listadoUsers = this.servicioUsuarios.usuarios
      console.log(this.listadoUsers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    }
  }

  async addUsuario() {
    const dialogRef = this.dialog.open(AddUsersComponent, { width: '500px', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.servicioUsuarios.usuarios.push(RESP.data);
        this.dataSource.data = this.servicioUsuarios.usuarios;
      }
    }
  }

  async editUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditUsersComponent, {
      data: usuario,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.servicioUsuarios.updateUsuario(RESP.data);
        this.dataSource.data = this.servicioUsuarios.usuarios;
      }
    }
  }

  async deleteUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(DeleteUsersComponent, {width: '500px' ,data: usuario, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.servicioUsuarios.removeUsuario(RESP.data);
        this.dataSource.data = this.servicioUsuarios.usuarios;
      }
    }
  }

  goToSearchPage() {
    this.router.navigate(['/peliculas']);

  }



  public sidebarItems = [
    {label: 'Listado', icon: 'format_list_bulleted', url: '/peliculas/list'},
    {label: 'Buscar', icon: 'search', url: '/peliculas/search'},
    {label: 'Gestion de Usuarios', icon: 'groups', url: '/users'}
  ]

  salir() {
    this.authService.doLogout()
      .subscribe( () => {});
      this.router.navigate(['auth']);
  }

}
