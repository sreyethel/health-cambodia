import { Component, OnInit } from '@angular/core';
import { Home } from '../../stores/home.store';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  constructor(public store: Home,
    private router: Router

  ) { }

  ngOnInit() {
    const dataDate = this._onFormat()
  }

  _onFormat() {
    moment.locale('km')
    return moment(new Date()).format('Do MMMM YYYY, h:mm a')
  }

  goDetail(slug) {
    this.router.navigate(['detail/' + slug]);
  }

}
