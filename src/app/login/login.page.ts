import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController} from '@ionic/angular';
import { AuthService } from '../auth.service';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
declare var KioskPlugin: any;

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

  isLoading = false;
  data:any;
  isKiosk: boolean;
  isLaunc: boolean;
  
  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private menu: MenuController,
    private store: Storage,
    private nav: NavController,
    private loading: LoadingController
  ) {
    this.menu.enable(false);
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: msg.header,
      message: msg.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loading.create({
      translucent: true,
      keyboardClose: false,
      spinner: 'crescent',
      message: "Loading"
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async presentLoadingDiss() {
    this.isLoading = false;
    return await this.loading.dismiss().then(() => console.log('dismissed'));
  }

  ngOnInit() {
    // exitKiosk();
    this.store.get('user').then(user => {
      if(user != null){
        this.nav.navigateRoot('/home');
      }});
  }

  exit(){
    // navigator['app'].exitApp(); //Normal mode exit
    KioskPlugin.exitKiosk(); //Kiosk mode exit
  }

  async login(){
    KioskPlugin.isInKiosk(function(kiosk){ this.isKiosk = kiosk });
    KioskPlugin.isSetAsLauncher(function(kiosk){ this.isLaunc = kiosk });
    if(this.form.nim == "" || this.form.password == ""){
      this.form.nim = "";
      this.form.password = "";      
      this.presentAlert({
        header: "Error",
        message: "Form harus diisi!"
      });
    }else if((!this.isKiosk) && (!this.isLaunc)){
      await this.presentAlert({header: "PERINGATAN", message: "Aplikasi tidak berjalan dimode Proteksi!\nPastikan aplikasi ini jadi Launcher atau ikuti instruksi teknisi!"});
      this.exit();
    }else{
      this.presentLoading();
      this.auth.dologin(this.form).subscribe((data)=> {
        this.data = data;
        if(this.data.meta.status == 200){
          this.presentLoadingDiss();
          this.store.set('user', this.data.data);
          this.nav.navigateRoot('/home');
        }else{
          this.presentLoadingDiss();
          this.presentAlert({
            header: "Gagal Login",
            message: this.data.meta.message
          });
        }
        //console.log(this.data);
      }, error => {
        this.presentLoadingDiss();
        this.presentAlert({
          header: "Error",
          message: "Koneksi gagal!"
        });
        console.log(error);
      });
    }
  }
}
