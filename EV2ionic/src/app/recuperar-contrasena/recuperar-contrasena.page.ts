import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController) {
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      nuevaContrasena: ['', Validators.required],
    });
  }

  async cambiarContrasena() {
    const { usuario, nuevaContrasena } = this.formulario.value;

    // Obtener el usuario de las preferencias de Capacitor
    const clave = `usuario_${usuario}`;
    const usuarioString = await Preferences.get({ key: clave });

    if (usuarioString && usuarioString.value) {
      const usuarioGuardado = JSON.parse(usuarioString.value);

      // Cambiar la contraseña del usuario
      usuarioGuardado.password = nuevaContrasena;

      // Actualizar el usuario en las preferencias de Capacitor
      await Preferences.set({ key: clave, value: JSON.stringify(usuarioGuardado) });

      const alert = await this.alertController.create({
        header: 'Contraseña cambiada',
        message: 'La contraseña se ha cambiado correctamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Usuario no encontrado',
        message: 'No se encontró un usuario con el nombre proporcionado',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}
