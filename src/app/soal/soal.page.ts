import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonSlides, NavController, AlertController, MenuController, ToastController, LoadingController } from '@ionic/angular';
import { interval } from 'rxjs';
import "hammerjs";

@Component({
  selector: 'app-soal',
  templateUrl: './soal.page.html',
  styleUrls: ['./soal.page.scss'],
})
export class SoalPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
//   soal = [{
//     quest: 'Dimana Letak wakanda?',
//     type: 1,
//     jawaban: [],
//   },{
//     quest: 'Siapa waifu terbaik musim ini?',
//     type: 2,
//     jawaban: [{

//       pilihan: 'Asuna',
//       selected: false
//     },
//     {

//       pilihan: 'Chika',
//       selected: false
//     },
//     {

//       pilihan: 'Kak Ros',
//       selected: false
//     }
//     ]
//   },
//   {
//     quest: 'Anime Terbaik?',
//     type: 3,
//     jawaban: [{

//       pilihan: 'Naruto',
//       selected: false
//     },
//     {

//       pilihan: 'One Pice',
//       selected: false
//     },
//     {

//       pilihan: 'Black Clover',
//       selected: false
//     }
//     ]
//   },
// ];
  public soal: any;
  public require: any;
  public duration: number;
  public time: any;
  // public isSlide: boolean;
  // public disableBackBtn: boolean;
  // public disableNextBtn: boolean;
  public index: any;
  public sendSoal: any;
  public soalDetail: any;
  isLoading = false;
  data: any;

  constructor(
    private menu: MenuController,
    private store: Storage,
    private nav: NavController,
    private alert: AlertController,
    private toast: ToastController,
    private loading: LoadingController,
    private auth: AuthService,
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.index = 1;
    this.store.get('user').then(async user => {
      if(user == null){
        this.nav.navigateRoot('/login');
      }else{
        await this.store.get('soal').then(async soal => {
          await this.store.get('times').then(times => {
            this.duration = parseInt(times);
          });
          if(this.duration == 0){
            this.duration = user.data_soal.waktu * 60;
          }
          if(soal){
            this.soal = soal;
            console.log(this.soal);
          }else{
            this.soal = user.data_soal.soal;
            console.log(this.soal);
          }
        });
        this.time = this.duration;
        // this.time = 10;
        let counting = interval(1000).subscribe((val) => {
          this.time = this.time - 1;
          this.store.set('times', this.time);
          // console.log(this.time);
          // var stat = val;
          if(this.time == 0) {
            this.timeover();
            counting.unsubscribe();
          }
        });
      }
    })
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);
  }

  async timeover(){
    this.store.set('soal', this.soal);
    await this.toastmsg("Waktu Sudah Habis!").then(async (data) => {
      this.presentLoading();
        await this.store.get('user').then((data) =>{
          this.require = data.detail;
          this.soalDetail = data.data_soal;
          console.log(data.detail);
        });

        await this.store.get('soal').then((data) => {
          this.sendSoal = {
            // data: data,
            user: this.require,
            data: {
              idsoal  : this.soalDetail.idsoal,
              idmapel : this.soalDetail.idmapel,
              mapel   : this.soalDetail.mapel,
              dosen   : this.soalDetail.dosen,
              waktu   : this.soalDetail.waktu,
              tanggal : this.soalDetail.tanggal,
              soal: data
            }
          };
          console.log("Send =",this.sendSoal)
        });

        // koneksi ke server untuk kirim jawaban
        this.auth.doupload(this.sendSoal).subscribe(data => {
          this.data = data;
          
          if(this.data.meta.status == 200){
            this.presentLoadingDiss();
            this.store.set('hasil', this.data.data);
            this.nav.navigateRoot('/hasil');
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
        }
      );
    });

  }

  next(){
    this.store.set('soal', this.soal);
    this.store.get('soal').then(soal => {
      console.log(soal);
    });
    this.slides.isEnd().then(data => {
      if(data){
        this.finish();;
      } 
    });
      this.slides.lockSwipeToNext(false);
      this.slides.slideNext();
      this.slides.getActiveIndex().then((val) => {
        console.log(val);
        this.index = val+1;
      });
      this.slides.lockSwipeToNext(true);
  }

  back(){
    this.store.set('soal', this.soal);
    this.store.get('soal').then(soal => {
      console.log(soal);
    })
    this.slides.isBeginning().then((data) => {
      if(data){
        this.toastmsg("Ini adalah soal pertama");
      } 
    });
      this.slides.lockSwipeToPrev(false);
      this.slides.slidePrev();
      this.slides.getActiveIndex().then((val) => {
        console.log(val);
        this.index = val+1;
      });
      this.slides.lockSwipeToPrev(true);
  }

  finish(){
    this.store.set('soal', this.soal);
    this.presentAlert().then(async (res) => {
      console.log(res);
      if(res.data){
        this.presentLoading();

        await this.store.get('user').then((data) =>{
          this.require = data.detail;
          this.soalDetail = data.data_soal;
          console.log(data.detail);
        });

        await this.store.get('soal').then((data) => {
          this.sendSoal = {
            // data: data,
            user: this.require,
            data: {
              idsoal  : this.soalDetail.idsoal,
              idmapel : this.soalDetail.idmapel,
              mapel   : this.soalDetail.mapel,
              dosen   : this.soalDetail.dosen,
              waktu   : this.soalDetail.waktu,
              tanggal : this.soalDetail.tanggal,
              soal: data
            }
          };
          console.log("Send =",this.sendSoal)
        });

        // koneksi ke server untuk kirim jawaban
        this.auth.doupload(this.sendSoal).subscribe(data => {
          this.data = data;
          
          if(this.data.meta.status == 200){
            this.presentLoadingDiss();
            this.store.set('hasil', this.data.data);
            this.nav.navigateRoot('/hasil');
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
        }
        );
      }else{
        this.toastmsg("Silahkan lanjutkan ujiannya 😊");
      }
    });
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

  async presentAlert() {
    let choice
    const alert = await this.alert.create({
        header: "Konfirmasi",
        message: "Ujian selesai?",
        buttons: [{
            text: 'Ya',
            handler: () => {
                alert.dismiss(true)
                return false
            }
        }, {
            text: 'Belum',
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

  pilihanGanda(soal, jawaban){
    for(let x = 0; x < this.soal[soal].jawaban.length; x++){
      if(x == jawaban){
        this.soal[soal].jawaban[x].selected = true;
      } else {
        this.soal[soal].jawaban[x].selected = false;
      }
    }
    this.store.set('soal', this.soal);
    console.log(this.soal);
  }

  multiChoice(){
    this.store.set('soal', this.soal);
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

  async Alert(msg) {
    const alert = await this.alert.create({
      header: msg.header,
      message: msg.message,
      buttons: ['OK']
    });

    await alert.present();
  }
  convertTime (miliseconds:  number) {
    let sec: number = miliseconds;
    let minutes, seconds: number;
    let minutes_str, seconds_str: string;

    // hours = Math.floor(((sec % 31536000) % 86400) / 3600);
    // hours_str = (hours <=9) ? '0' + hours.toString() : hours.toString() ;

    minutes = Math.floor((((sec % 31536000) % 86400) % 3600) / 60);
    minutes_str = (minutes <=9) ? '0' + minutes.toString() : minutes.toString() ;

    seconds = Math.floor(((sec % 31536000) % 86400) % 3600) % 60;
    seconds_str = (seconds <=9) ? '0' + seconds.toString() : seconds.toString() ;

    // return hours_str +':'+ minutes_str +':'+ seconds_str;
    return minutes_str +':'+ seconds_str;
  }
}
