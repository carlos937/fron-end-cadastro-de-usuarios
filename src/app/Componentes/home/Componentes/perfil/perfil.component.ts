import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { CriptografiaRSA } from 'src/app/security/criptografiaRSA';
import { UsuarioService } from 'src/app/services/usuario-service.service';
import { Suporte } from 'src/app/suporte';

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
  async editar() {
    let form = Object.assign({}, this.form.value);
    await this.suporte.abrirLoading();
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

  // async AlterarSenha() {
  //   const alert = await this.alertController.create({
  //     header: 'Alterar Senha',
  //     backdropDismiss: false,
  //     inputs: [
  //       {
  //         name: 'senha',
  //         type: 'password',
  //         placeholder: 'Senha'
  //       },
  //       {
  //         name: 'confirmarSenha',
  //         type: 'password',
  //         placeholder: 'Confirmar Senha'
  //       },

  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //         }
  //       }, {
  //         text: 'Ok',
  //         handler: (res) => {
  //           if (res.senha == res.confirmarSenha) {
  //             let form = {
  //               id: this.informacoesLogin.id,
  //               senha: this.cripto.criptografar(res.senha),
  //               token: this.informacoesLogin.jsonWebToken.token
  //             };
  //             this.usuarioService.alterarSenha(form).subscribe(res => {
  //               this.suporte.fecharLoading();
  //               if (res.status == 0) {
  //                 this.suporte.abrirToast(res.mensagem, 'success');
  //                 delete res.status;
  //                 delete res.mensagem;
  //                 this.storage.set('Login', res);
  //               }
  //               else {
  //                 this.suporte.abrirToast(res.mensagem, 'danger');
  //               }
  //             }, () => {
  //               this.suporte.fecharLoading();
  //               this.suporte.abrirToast("Serviço está fora do ar no momento", 'danger');
  //             })

  //           } else {
  //             this.suporte.abrirToast('Suas senhas não correspondem.', 'danger');
  //             return false;
  //           }
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
}
