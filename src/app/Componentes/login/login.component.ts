import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { CriptografiaRSA } from '../../security/criptografiaRSA';
import { UsuarioService } from '../../services/usuario-service.service';
import { Suporte } from '../../suporte';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
  });
  
  constructor(
    public usuarioService : UsuarioService , 
    public cripto : CriptografiaRSA,
    public suporte :Suporte,
    public storage : LocalStorageService,
    private router: Router) {
     
  }

  ngOnInit() {
   
  }

  async login(){
    let form =Object.assign({},this.form.value);
    form.senha = this.cripto.criptografar(form.senha);
    await this.suporte.abrirLoading();
    this.usuarioService.login(form).subscribe(res => {
      this.suporte.fecharLoading();
      if(res.status == 0){
        this.form.reset();
        this.suporte.abrirToastSuccess(res.mensagem);
        delete res.status;
        delete res.mensagem;
        this.storage.set('Login',res);
        this.router.navigate(['/home']);
      }
      else{
        this.suporte.abrirToastDanger(res.mensagem);
      }
    },() => {
      this.suporte.fecharLoading();
      this.suporte.abrirToastDanger("Serviço está fora do ar no momento");
    })
  }

}
