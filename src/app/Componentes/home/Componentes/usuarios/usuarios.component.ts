import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'ngx-localstorage';
import { CriptografiaRSA } from 'src/app/security/criptografiaRSA';
import { UsuarioService } from 'src/app/services/usuario-service.service';
import { Suporte } from 'src/app/suporte';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  form : FormGroup ;
  usuarios = [];
  login:any;
  constructor(
    public usuarioService: UsuarioService,
    public cripto: CriptografiaRSA,
    private modalService: BsModalService,
    public suporte: Suporte,
    public storage: LocalStorageService) { }

  ngOnInit(): void {
   this.login =  this.storage.get('Login');
   this.buscarUsuarios()
  }

  buscarUsuarios(){
    this.usuarioService.buscarUsuarios(this.login.jsonWebToken.token).subscribe(res => {
      this.usuarios = res;
      console.log(this.usuarios)
    })
  }

  AlterarSenha(id){

    Swal.mixin({
      input: 'password',
      confirmButtonText: 'Proximo &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Nova senha',
        // showLoaderOnConfirm: true,
        preConfirm: (value) => {
    
                if(value){
                  return new  Promise((resolve:any) => { return resolve() })
                }
                else{
                  
                  Swal.showValidationMessage(
                    'A senha não pode ser vazia !'
                  )
                }
         
        }
      },
      {
        title: 'Confirmar nova senha',
        // showLoaderOnConfirm: true,
        preConfirm: (value) => {
          
            if (value) {
              return new  Promise((resolve:any) => { return resolve() })
            } else {
                Swal.showValidationMessage(
                  'A senha não pode ser vazia !'
                )
            }
         
        }
      }

    ]).then((result: any) => {

      if (result.value) {

        if (result.value[0] == result.value[1]) {
          let form = {
            id: id,
            senha: this.cripto.criptografar(result.value[0]),
            token: this.login.jsonWebToken.token
          };
          this.suporte.abrirLoading();
          this.usuarioService.alterarSenha(form).subscribe(res => {
            this.suporte.fecharLoading();
            if (res.status == 0) {
              this.suporte.abrirToastSuccess(res.mensagem);
              delete res.status;
              delete res.mensagem;

              this.login.nome = res.nome;
              this.login.email = res.email;
              this.storage.set('Login', this.login);
            }
            else {
              this.suporte.abrirToastDanger(res.mensagem);
            }
          }, () => {
            this.suporte.fecharLoading();
            this.suporte.abrirToastDanger("Serviço está fora do ar no momento");
          })

        } else {
          this.suporte.abrirToastDanger('Suas senhas não correspondem.');
          this.AlterarSenha(id);
        }
      }
    })

  }

  AbrirModalEditar(usuario,modal){
   this.form = new  FormGroup({
        id: new FormControl(usuario.id),
        nome: new FormControl(usuario.nome, Validators.required),
        email: new FormControl(usuario.email, Validators.required),
        token: new FormControl(this.login.jsonWebToken.token)
    }); 
    this.modalService.show(modal, {class: 'modal-lg'});
  }
  
  Editar(){
    let form = Object.assign({}, this.form.value);
    this.suporte.abrirLoading();
    this.usuarioService.editarUsuario(form).subscribe(res => {
      this.suporte.fecharLoading();
      if (res.status == 0) {
        this.modalService.hide();
        this.suporte.abrirToastSuccess(res.mensagem);
        delete res.status;
        delete res.mensagem;
        this.login.nome = res.nome;
        this.login.email = res.email;
        let usuario = this.usuarios.find(u => u.id == form.id);
        usuario.nome = res.nome;
        usuario.email = res.email;
        this.storage.set('Login', this.login);
      }
      else {
        this.suporte.abrirToastDanger(res.mensagem);
      }
    }, () => {
      this.suporte.fecharLoading();
      this.suporte.abrirToastDanger("Serviço está fora do ar no momento");
    })

  }

  AbrirAlertaRemoverUsuario(id,index){
    Swal.fire({
      title: 'Deseja mesmo excluir este usuario ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Excluir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Remover(id,index)
      }
    })
  }

  Remover(id,index){
    this.suporte.abrirLoading();
    this.usuarioService.removerUsuario(id,this.login.jsonWebToken.token).subscribe(res => {
      this.suporte.fecharLoading();
      if (res.status == 0) {
        this.suporte.abrirToastSuccess(res.mensagem);
        this.usuarios.splice(index,1);
      }
      else {
        this.suporte.abrirToastDanger(res.mensagem);
      }
    }, () => {
      this.suporte.fecharLoading();
      this.suporte.abrirToastDanger("Serviço está fora do ar no momento");
    })
  }

}
