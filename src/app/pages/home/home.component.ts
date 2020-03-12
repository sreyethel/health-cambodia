import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Home } from '../../stores/home.store';
import { News } from 'src/app/stores/news.store';
import { Sick } from '../../stores/sick.store';
import { Teacher } from '../../stores/teacher.store';
import { Kid } from 'src/app/stores/kid.store';

import * as moment from 'moment';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['បកក្រោយ', 'ទៅមុខ'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items:1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  }
  items: Observable<any[]>;
  constructor(
    public store:Home,
    public news:News,
    public sick:Sick,
    public kid:Kid,
    public teacher:Teacher,
    private router:Router,
    firestore: AngularFirestore

  ) { 

 
    // firestore.collection('content',ref=>ref.limit(20)).valueChanges().subscribe((item)=>{
    //   console.log('this.item', item)
    // });
    this.store.getContent()
    this.teacher.getTeacher()
    this.news.getNews()
    this.kid.getkid()
    this.kid.getKidSingle()
  
    this.sick.getsubCate()
    const dataDate = this._onFormat()

  }


  ngOnInit() {

  

   


  }

  _onFormat() {
    moment.locale('km')
    return moment(new Date()).format('Do MMMM YYYY, h:mm a')
  }

  goDetail(slug){
    this.router.navigate(['detail/'+slug]);
  }
  
}
