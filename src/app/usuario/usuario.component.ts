import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios:Usuario[];
  usuario:Usuario;

  loading: boolean;

  operacionCRUD = {is_new: false,is_visible: false};

  constructor(private service: UsuarioService) {
    this.loading = true;
    this.usuarios = [];
    this.usuario = new Usuario();
   }

  ngOnInit() {
    this.service.index().subscribe((res:any) => {
      this.usuarios = res.usuarios;
      if(res.usuarios.length > 0){
        this.loading = false;
      }
    });
  }

  new(){
    this.usuario = new Usuario();
    this.operacionCRUD.is_visible = true;
    this.operacionCRUD.is_new = true;
  }

  save(){
    if(this.operacionCRUD.is_new){
      this.service.store(this.usuario).subscribe((res:any)=> {
        console.log(res);

        if(res.usuario){
          swal("Registrado!", "Usuario registrado con exito!", "success");
        }else if(res.error.email){
          swal("Error!", "El email ya esta registrado!", "error");
        }

        this.usuario = new Usuario();
        this.operacionCRUD.is_visible = false;
        this.ngOnInit();
      });
      return;
    }

    this.service.update(this.usuario).subscribe((res) => {
      this.usuario = new Usuario();
      this.operacionCRUD.is_visible = false;
      this.ngOnInit();
    });
  }

  edit(data:any){
    this.operacionCRUD.is_visible = true;
    this.operacionCRUD.is_new = false;
    this.usuario = data;
  }

  delete(id:any){

    swal({
      title: "Esta seguro ?",
      text: "Esta seguro de eliminar este usuario ?",
      icon: "warning",
    })
    .then((willDelete) => {
      if (willDelete) {
        this.service.delete(id).subscribe((res)=> {
          this.operacionCRUD.is_new = false;
          this.ngOnInit();
        });
      }
    });

  }

}
