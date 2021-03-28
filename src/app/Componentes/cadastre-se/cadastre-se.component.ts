import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { CriptografiaRSA } from 'src/app/security/criptografiaRSA';
import { UsuarioService } from 'src/app/services/usuario-service.service';
import { Suporte } from 'src/app/suporte';

@Component({
  selector: 'app-cadastre-se',
  templateUrl: './cadastre-se.component.html',
  styleUrls: ['./cadastre-se.component.scss']
})
export class CadastreSeComponent implements OnInit {


  public form = new FormGroup({
    nome: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    senha: new FormControl('',Validators.required),
    confirmacaoSenha: new FormControl('',Validators.required)
  });


  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
    public cripto: CriptografiaRSA,
    public suporte: Suporte,
    public storage: LocalStorageService) {

  }

  ngOnInit() { }

  async cadastrar() {
    let form = Object.assign({}, this.form.value);
    if (form.senha == form.confirmacaoSenha) {
      delete form.confirmacaoSenha;
      form.senha = this.cripto.criptografar(form.senha);
      await this.suporte.abrirLoading();
      this.usuarioService.adicionarUsuario(form).subscribe(res => {
        this.suporte.fecharLoading();
        if (res.status == 0) {
          this.suporte.abrirToastSuccess(res.mensagem);
          delete res.status;
          delete res.mensagem;
          this.storage.set('Login', res);
          this.router.navigate(['/home']);
        }
        else {
          this.suporte.abrirToastDanger(res.mensagem);
        }
      }, () => {
        this.suporte.fecharLoading();
        this.suporte.abrirToastDanger("Serviço está fora do ar no momento");
      })
    }
    else {
      this.suporte.abrirToastDanger('Suas senhas não correspondem.');
    }
  }
}
