
import { Injectable } from '@angular/core';
import * as forge from 'node-forge'
import { variaveisGlobais } from '../variaveisGlobais';

@Injectable()
export class CriptografiaRSA{


    constructor(){
        
    }


    public criptografar(texto:string) : string{

        var rsa = forge.pki.publicKeyFromPem(variaveisGlobais.chavePublicaRSA);
        return window.btoa(rsa.encrypt(texto));
    }
  
    public gerarChaves(callback){
        var pki = forge.pki;
        pki.rsa.generateKeyPair({bits: 2048, workers: 2}, (err, keypair) => {
            let publicKey =  pki.publicKeyToPem(keypair.publicKey);
            let privateKey =  pki.privateKeyToPem(keypair.privateKey);
            if(callback){
                callback(publicKey,privateKey);
            }
        });
    }
}
