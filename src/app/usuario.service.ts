import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[];
  BASE_URL:string;

  constructor(private http: HttpClient) {
    this.usuarios = [];
    this.BASE_URL = 'https://cryptic-taiga-77614.herokuapp.com/api';
  }

  index(){
    return this.http.get(this.BASE_URL.concat('/usuarios'));
  }

  store(data: Usuario){
    return this.http.post(this.BASE_URL.concat('/usuarios'),data);
  }

  update(data: Usuario){
    return this.http.put(this.BASE_URL.concat('/usuarios/').concat(data.id.toString()),data);
  }

  delete(id:string){
    return this.http.delete(this.BASE_URL.concat('/usuarios/').concat(id.toString()));
  }
}
