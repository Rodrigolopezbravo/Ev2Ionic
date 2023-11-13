import { Component, OnInit } from '@angular/core';
import { ScannerComponent } from 'src/app/scanner/scanner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openScanner() {
    this.router.navigate(['/scanner']);
  }

}
