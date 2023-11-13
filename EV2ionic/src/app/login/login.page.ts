// login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private authService: AuthenticationService
  ) {
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  async ingresar() {
    var f = this.formularioLogin.value;
    const usuario = f.usuario;
    const password = f.password;

    try {
      if (await this.authService.authenticate(usuario, password)) {
        console.log('Ingresado correctamente');
        this.navCtrl.navigateRoot('inicio');
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos ingresados no son correctos',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al intentar autenticar:', error);
    }
  }
}
