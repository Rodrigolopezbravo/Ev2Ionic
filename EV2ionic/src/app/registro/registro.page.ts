import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api-region.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  regions: any[] = [];
  communes: any[] = [];

  constructor(public fb: FormBuilder, public alertController: AlertController, private apiService: ApiService) { 
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'rut': new FormControl("", Validators.required),
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'region': new FormControl(this.regions.length > 0 ? this.regions[0].id : "", Validators.required),
      'comuna': new FormControl("", Validators.required)
    });
  }

  ionViewDidEnter() {
    this.loadRegions();
  }

  loadRegions() {
    this.apiService.getRegions().subscribe((response) => {
      this.regions = response.data;
    });
  }

  loadCommunes(regionId: number) {
    this.apiService.getCommunes(regionId).subscribe((response) => {
      this.communes = response.data;
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
