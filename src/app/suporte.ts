import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';
@Injectable()
export  class Suporte {

    public static eventos:any[] = [];

    constructor(
        private ngxService: NgxUiLoaderService,
        private toastr: ToastrService
        ) { }


    public abrirToastSuccess(titulo , mensagem = ""){
        this.toastr.success(titulo, mensagem);
    }

    public abrirToastDanger(titulo , mensagem = ""){
        this.toastr.error(titulo, mensagem);
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