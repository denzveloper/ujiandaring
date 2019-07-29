import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonSlides, NavController, AlertController, MenuController } from '@ionic/angular';

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
  public soal : any;
  public disableBackBtn: boolean;
  public disableNextBtn: boolean;
  public index: any;

  constructor(
    private menu: MenuController,
    private storage: Storage,
    private nav: NavController,
    private alert: AlertController,
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.index = 1;
    this.storage.get('user').then(user => {
      if(user == null){
        this.nav.navigateRoot('/login');
      }else{
        this.storage.get('soal').then(soal => {
          if(soal){
            this.soal = soal;
            console.log(this.soal);
          }else{
            this.soal = user.soal;
            console.log(this.soal);
          }
        });
      }
    })
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);
  } 

  next(){
    this.storage.set('soal', this.soal);
    this.storage.get('soal').then(soal => {
      console.log(soal);
    });
    if(this.slides.isEnd()){
      this.slides.lockSwipeToNext(false);
      this.slides.slideNext();
      this.slides.getActiveIndex().then((val) => {
        console.log(val);
        this.index = val+1;
      });
      this.slides.lockSwipeToNext(true);
    }
  }

  back(){
    this.storage.set('soal', this.soal);
    this.storage.get('soal').then(soal => {
      console.log(soal);
    })
    if(this.slides.isBeginning()){
      this.slides.lockSwipeToPrev(false);
      this.slides.slidePrev();
      this.slides.getActiveIndex().then((val) => {
        console.log(val);
        this.index = val+1;
      });
      this.slides.lockSwipeToPrev(true);
    }
  }

  finish(){
    this.presentAlert().then((res) => {
      console.log(res);
      if(res.data){
        this.nav.navigateRoot('/hasil');
      }
    });
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
        choice = data
    })
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
    this.storage.set('soal', this.soal);
    console.log(this.soal);
  }

  multiChoice(){
    this.storage.set('soal', this.soal);
  }
}
