import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-test-soal',
  templateUrl: './test-soal.page.html',
  styleUrls: ['./test-soal.page.scss'],
})
export class TestSoalPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  soal = [{
    soal: 'Dimana Letak wakanda?',
    type: 1,
    jawaban: [],
  },{
    soal: 'Siapa waifu terbaik musim ini?',
    type: 2,
    jawaban: [{

      pilihan: 'Asuna',
      selected: false
    },
    {

      pilihan: 'Chika',
      selected: false
    },
    {

      pilihan: 'Kak Ros',
      selected: false
    }
    ]
  },
  {
    soal: 'Anime Terbaik?',
    type: 3,
    jawaban: [{

      pilihan: 'Naruto',
      selected: false
    },
    {

      pilihan: 'One Pice',
      selected: false
    },
    {

      pilihan: 'Black Clover',
      selected: false
    }
    ]
  },
];
  constructor(
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.storage.get('soal').then(soal => {
      if(soal !== null){
        this.soal = soal;
      }
    })

    this.slides.lockSwipeToNext(true);
  } 

  esay(){
    this.storage.set('soal', this.soal);
    this.storage.get('soal').then(soal => {
      console.log(soal);
    })
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
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
