import { Component } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  result: string = ''; // Texto completo del QR escaneado
  scannedDetails?: { subject: string; section: string; room: string; date: string }; // Detalles extraídos

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async scan(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Escaneando QR...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
      });

      if (result && result.ScanResult) {
        this.result = result.ScanResult;

        // Validar el formato del QR
        const regex = /^([\w]+)\|([\w]+)\|([\w]+)\|([\d]{8})$/; // Asignatura|Sección|Sala|Fecha
        const match = this.result.match(regex);

        if (match) {
          // Extraer datos del QR
          const [_, subject, section, room, date] = match;
          this.scannedDetails = { subject, section, room, date };

          // Mostrar un mensaje de éxito
          this.showAlert('Éxito', `Datos escaneados correctamente.`, 'success');
        } else {
          this.showAlert('Error', 'El formato del QR no es válido.', 'danger');
        }
      }
    } catch (error) {
      console.error('Error al escanear el QR:', error);
      this.showAlert('Error', 'Hubo un problema al escanear el QR.', 'danger');
    } finally {
      await loading.dismiss(); // Cerrar el indicador de carga
    }
  }

  // Mostrar alertas para mensajes importantes
  async showAlert(header: string, message: string, color: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: `alert-${color}`,
    });
    await alert.present();
  }
}
