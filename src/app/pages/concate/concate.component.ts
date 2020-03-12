import { Component, OnInit } from '@angular/core';
import { Category } from '../../stores/category.store';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-concate',
  templateUrl: './concate.component.html',
  styleUrls: ['./concate.component.scss']
})
export class ConcateComponent implements OnInit {
  key:any;

  constructor(
    public store:Category,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param:any)=>{
      const { key } = param;
      this.key = key;
      this.store.fetchNewestPost(key);
    })

    const dataDate = this._onFormat()

  }

  viewMore(page){
    this.store.getCaMore(page,this.key);
  }


  _onFormat() {
    moment.locale('km')
    return moment(new Date()).format('Do MMMM YYYY, h:mm a')
  }

  goDetail(slug){
    this.router.navigate(['detail/'+slug]);
  }
}
