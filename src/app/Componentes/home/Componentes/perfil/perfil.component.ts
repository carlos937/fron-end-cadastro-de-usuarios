import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { CriptografiaRSA } from 'src/app/security/criptografiaRSA';
import { UsuarioService } from 'src/app/services/usuario-service.service';
import { Suporte } from 'src/app/suporte';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public form: FormGroup;
  public login: any;
  constructor(
    public nav: Router,
    public usuarioService: UsuarioService,
    public cripto: CriptografiaRSA,
    public suporte: Suporte,
    public storage: LocalStorageService) { }

  ngOnInit() {

    this.login = this.storage.get('Login')
    this.form = new FormGroup({
      id: new FormControl(this.login.id),
      nome: new FormControl(this.login.nome, Validators.required),
      email: new FormControl(this.login.email, Validators.required),
      token: new FormControl(this.login.jsonWebToken.token)
    })

  }
  
  editar() {
    if(this.suporte.ControleTokenExpirado()){
      return;
    }  
    let form = Object.assign({}, this.form.value);
    this.suporte.abrirLoading();
    this.usuarioService.editarUsuario(form).subscribe(res => {
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

  }

  AlterarSenha() {
    if(this.suporte.ControleTokenExpirado()){
      return;
    }  
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

          if (value) {
            return new Promise((resolve: any) => { return resolve() })
          }
          else {

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
            return new Promise((resolve: any) => { return resolve() })
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
            id: this.login.id,
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
          this.AlterarSenha();
        }
      }
    })

  }
}
