import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController) { 
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;

    // Construir la clave utilizando el nombre de usuario
    const clave = `usuario_${f.usuario}`;

    // Obtener el usuario de las preferencias de Capacitor
    const usuarioString = await Preferences.get({ key: clave });

    if (usuarioString && usuarioString.value) {
      const usuario = JSON.parse(usuarioString.value);

      if (usuario.password === f.password) {
        console.log('Ingresado correctamente');
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos ingresados no son correctos',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Usuario no encontrado',
        message: 'No se encontró un usuario con el nombre proporcionado',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
