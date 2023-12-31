// scanner.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: []
})
export class ScannerComponent implements AfterViewInit {
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  selectedDevice: MediaDeviceInfo | undefined;


  constructor() {
    
    this.scanner = new ZXingScannerComponent();
  }

  ngAfterViewInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      // Autoselect the first available camera
      if (devices.length > 0) {
        this.selectedDevice = devices[0];
      }
    });

    this.scanner.camerasNotFound.subscribe(() => {
      console.error('No cameras found');
    });

    this.scanner.scanComplete.subscribe((result: Result) => {
      // Verificar si result no es nulo ni indefinido
      if (result) {
        console.log(result.getText());
        // Realizar acciones adicionales con el resultado escaneado aquí
      }
    });

    // Start scanning
    this.scanner.restart();
  }

  onDeviceSelect(device: MediaDeviceInfo): void {
    this.selectedDevice = device;
  }
}
