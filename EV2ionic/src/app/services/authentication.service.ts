// authentication.service.ts
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticatedFlag = false;

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    try {
      const clave = `usuario_${username}`;
      const usuarioString = await Preferences.get({ key: clave });

      if (usuarioString && usuarioString.value) {
        const usuario = JSON.parse(usuarioString.value);

        if (usuario.password === password) {
          this.isAuthenticatedFlag = true;
          return true;
        }
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
    }

    this.isAuthenticatedFlag = false;
    return false;
  }

  logout() {
    // Lógica de cierre de sesión, establece this.isAuthenticatedFlag a false
    this.isAuthenticatedFlag = false;
  }

  login() {
    // Método para establecer la bandera de autenticación
    this.isAuthenticatedFlag = true;
  }
}
