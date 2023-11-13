// not-found.page.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Error 404</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Not Found</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>The requested page was not found.</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
})
export class NotFoundPage {}
