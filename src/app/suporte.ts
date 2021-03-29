import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from "ngx-localstorage";
import * as moment from 'moment';
import { Router } from "@angular/router";
@Injectable()
export  class Suporte {

    public static eventos:any[] = [];

    constructor(
        private ngxService: NgxUiLoaderService,
        private toastr: ToastrService,
        private storage : LocalStorageService,
        private router : Router
        ) { }
    
    public ControleTokenExpirado(){
      moment.locale('pt-br');
      let dataDeExpiracao = moment(this.storage.get('Login').jsonWebToken.expiration.replace("T" , " "));
      let dataAtual = moment();
      if(dataAtual >= dataDeExpiracao){
        this.storage.clear();
        this.router.navigate([''])
        this.abrirToastWarning("Tempo de conexão Expirado , por favor faça login novamente para a sua segurança.");
        return true;
      }
     return false;
    }

    public abrirToastSuccess(titulo , mensagem = ""){
        this.toastr.success(titulo, mensagem);
    }

    public abrirToastDanger(titulo , mensagem = ""){
        this.toastr.error(titulo, mensagem);
    }
    
    public abrirToastWarning(titulo , mensagem = ""){
        this.toastr.warning(titulo, mensagem);
    }
    

    public abrirLoading(){
        this.ngxService.start();
    }

    public fecharLoading(){
        this.ngxService.stop();
    }

    public static enviarEvento(nomeDoEvento,valor){

        let objEvento = this.eventos.find(e => e.nomeDoEvento == nomeDoEvento);

        if(objEvento == undefined){
            objEvento = {
                nomeDoEvento : nomeDoEvento,
                evento : new Subject<any>()
              }
            this.eventos.push(objEvento); 
        }

        objEvento.evento.next(valor);
         
    }   
    
    public static retornarEvento(nomeDoEvento):Subject<any>{
        let objEvento = this.eventos.find(e => e.nomeDoEvento == nomeDoEvento);

        if(objEvento == undefined){
            objEvento = {
                nomeDoEvento : nomeDoEvento,
                evento : new Subject<any>()
            };

            this.eventos.push(objEvento); 
        }

        return objEvento.evento;
        
    }


   


  
}