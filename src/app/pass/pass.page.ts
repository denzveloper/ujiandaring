import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {
  form = {
    pasb: '',
    pasn: '',
    pasc: '',
  }

  isLoading = false;
  data: any;

  constructor(
    private store: Storage,
    private menu: MenuController,
    private nav: NavController,
    private route: Router,
    private alert: AlertController,
    private toast: ToastController,
    private auth: AuthService,
    private loading: LoadingController,
    private comp: AppComponent,
  ) { 
    this.menu.enable(false);
  }

  ngOnInit() {
    this.store.get('user').then(async user => {
      if(user == null){
        this.nav.navigateRoot('/login');
      }
    });
  }

  back(){
    this.menu.enable(true);
    this.route.navigate(['/profil']);
    // this.nav.navigateRoot('/login');
  }

  gantimodal(){
    if(this.form.pasb == '' || this.form.pasn == '' || this.form.pasc == ''){
      this.clearData();
      this.Alert({
        header: "Error",
        message: "Form harus diisi!"
      });
    }else if(this.form.pasn != this.form.pasc){
      this.clearData();
      this.Alert({
        header: "Error",
        message: "Password baru dengan konfirmasi berbeda"
      });
    }else if(this.form.pasb == this.form.pasn){
      this.clearData();
      this.Alert({
        header: "Error",
        message: "Password tidak berubah"
      });
      this.route.navigate(['/profil']);
    }else{
      this.presentLoading();
      this.presentAlert().then(async (res) =>{
        if(res.data){
          await this.store.get('user').then((user)=> {
            var sending = {
              nim: user.detail.nim,
              // nama: user.detail.nama,
              // kelas: user.detail.kelas,
              password: this.form
            }
            this.auth.doupasw(sending).subscribe(data => {
              this.data = data;
              if(this.data.meta.status == 200){
                this.presentLoadingDiss();
                this.toastmsg("Password baru Disimpan, Login Kembali.");
                // this.store.set('hasil', this.data.data);
                // this.nav.navigateRoot('/hasil');
                this.comp.logout();
              }else{
                this.presentLoadingDiss();
                this.Alert({
                  header: "Error",
                  message: this.data.meta.message
                });
              }
            }, error => {
              this.presentLoadingDiss();
              this.Alert({
                header: "Error",
                message: "Tidak dapat koneksi ke server!"
              });
              console.log(error);
            });
          });
        }else{
          this.clearData();
          this.toastmsg("Kembali ke pengaturan profil");
          this.route.navigate(['/profil']);
        }
      });
    }
  }

  async presentAlert() {
    let choice
    const alert = await this.alert.create({
        header: "Konfirmasi",
        subHeader: "Yakin Ubah Sandi?",
        message: "<i><sup color='medium'>Setelah tekan \"Ya\" Anda akan dikeluarkan dari sistem</sup></i>",
        buttons: [{
            text: 'Ya',
            handler: () => {
                alert.dismiss(true)
                return false
            }
        }, {
            text: 'Tidak',
            handler: () => {
                alert.dismiss(false);
                return false;
            }
        }]
    });
    await alert.present();
    await alert.onDidDismiss().then((data) => {
      choice = data;
    });
    return choice;
  }

  async toastmsg(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      mode: "md",
      closeButtonText: "X",
      showCloseButton: true,
      color: "dark",
      translucent: true,
    });
    toast.present();
  }

  async Alert(msg) {
    const alert = await this.alert.create({
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

  clearData(){
    this.form.pasb = '';
    this.form.pasn = '';
    this.form.pasc = '';
  }
}
