import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController) { 
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'rut': new FormControl("", Validators.required),
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

  async guardar() {
    var f = this.formularioRegistro.value;

    // Utilizar el nombre de usuario como parte de la clave
    const clave = `usuario_${f.usuario}`;

    // Almacenar usuario en las preferencias de Capacitor
    await Preferences.set({ key: clave, value: JSON.stringify(f) });

    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'El usuario se ha registrado correctamente',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
