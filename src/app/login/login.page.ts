import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = {
    nim: '', 
    password: ''
  }
  data:any;
  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private menu: MenuController,
    private store: Storage,
    private nav: NavController
  ) {
    this.menu.enable(false);
   }

  ngOnInit() {
    this.store.get('user').then(user => {
      if(user != null){
        this.nav.navigateRoot('/home');
      }});
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: msg.header,
      message: msg.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  login(){
    if(this.form.nim == "" || this.form.password == ""){
      this.presentAlert({
        header: "Error",
        message: "Form harus diisi!"
      })
    }else{
      this.auth.dologin(this.form).subscribe(data=> {
        this.data = data;
        if(this.data.meta.status_code == 200){
          this.store.set('user', this.data.data);
          this.nav.navigateRoot('/home');
        }else{
          this.presentAlert({
            header: "Gagal Login",
            message: this.data.meta.message
          });
        }
        //console.log(this.data);
      }, error => {
        this.presentAlert({
          header: "Error",
          message: "Koneksi gagal!"
        });
        console.log(error);
      });
    }
  }
}
