import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  ngOnInit() {}

  async login() {
    if (this.username === 'seba' && this.password === '1234') {
      // Credenciales correctas
      await this.showAlert('Ingreso Exitoso', 'Bienvenido a RegistroAPP!', 'success-alert');
      this.navCtrl.navigateForward('/home');
    } else {
      // Credenciales incorrectas
      await this.showAlert('Error en el Ingreso', 'Usuario o contraseña incorrectos.', 'error-alert');
    }
  }

  async showAlert(header: string, message: string, cssClass: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass, // Aplica la clase personalizada
    });
    await alert.present();
  }

  goToRecoverPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }
}
