import { variaveisGlobais } from '../variaveisGlobais';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(
    public http : HttpClient) { }

  


  adicionarUsuario(obj):any{
    let headers = { 
      headers: new HttpHeaders()
     .set('Content-Type', 'application/json; charset=utf-8')
    };
    return this.http.post(variaveisGlobais.baseUrl+"Usuario/Adicionar",obj,headers );
  }


  buscarUsuarios(token):any{
    let headers = { 
      headers: new HttpHeaders()
     .set('Content-Type', 'application/json; charset=utf-8')
     .set('Authorization' , 'Bearer '+ token)
    };

    return this.http.get(variaveisGlobais.baseUrl+"Usuario/BuscarTodos",headers );
  }

  removerUsuario(id ,token):any{
    let headers = { 
      headers: new HttpHeaders()
     .set('Content-Type', 'application/json; charset=utf-8')
     .set('Authorization' , 'Bearer '+ token)
    };

    return this.http.get(variaveisGlobais.baseUrl+"Usuario/Remover?id="+id,headers );
  }

  editarUsuario(obj):any{
    let headers = { 
      headers: new HttpHeaders()
     .set('Content-Type', 'application/json; charset=utf-8')
     .set('Authorization' , 'Bearer '+ obj.token)
    };
    delete obj.token;
    return this.http.post(variaveisGlobais.baseUrl+"Usuario/Atualizar",obj,headers );
  }

  alterarSenha(obj):any{
    let headers = { 
      headers: new HttpHeaders()
     .set('Content-Type', 'application/json; charset=utf-8')
     .set('Authorization' , 'Bearer '+ obj.token)
    };
    delete obj.token;
    return this.http.post(variaveisGlobais.baseUrl+"Usuario/AlterarSenha",obj,headers );
  }

  login(obj):any{
     let headers = { 
       headers: new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
    };
     return this.http.post(variaveisGlobais.baseUrl+"Usuario/Login",obj,headers );
  }
  
}
