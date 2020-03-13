import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/stores/news.store';
// import { MetaService } from '@ngx-meta/core';
import { Adstore } from 'src/app/stores/ads.store';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {



  constructor(
    private route:ActivatedRoute,
    public  detail:News,
    private router:Router,
    public ads:Adstore,
    public store:News,
    // private meta: MetaService,
    private db:DataService,
    private ds:AngularFirestore
  ) { }
  item: any
  url: any;
  deKey:any;

  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      const { slug } = param;
      this.detail.getDetail(slug);
      this.ads.fetchHeaderAd();
      let urls = "https://healthy-test.web.app"+"/detail/"+slug;
      this.url = urls;
    })

    const dataDate = this._onFormat()
  }

  goDetail(slug) {
    this.router.navigate(['detail/' + slug]);
  }

  _onFormat() {
    moment.locale('km')
    return moment(new Date()).format('Do MMMM YYYY, h:mm a')
  }
}
