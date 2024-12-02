import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  newPassword: string = ''; 
  confirmPassword: string = ''; 
  constructor(private navCtrl: NavController) {}

  updatePassword() {
    if (this.newPassword === this.confirmPassword) {
      console.log('Contraseña actualizada:', this.newPassword);
      this.navCtrl.navigateBack('/login'); 
    } else {
      console.error('Las contraseñas no coinciden');
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/login'); 
  }
}
