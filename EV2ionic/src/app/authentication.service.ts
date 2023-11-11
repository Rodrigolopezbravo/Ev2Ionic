// authentication.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = false;

  constructor() {}

  // Método para verificar el estado de autenticación
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  // Método para iniciar sesión (ajusta según tu lógica)
  login(username: string, password: string): void {
    // Lógica de autenticación (por ejemplo, verificar en un servidor, etc.)
    // Establece this.authenticated a true si las credenciales son válidas
    // De lo contrario, deberías manejar la lógica según tus necesidades.
  }

  // Método para cerrar sesión (ajusta según tu lógica)
  logout(): void {
    // Lógica de cierre de sesión
    // Establece this.authenticated a false
  }
}
