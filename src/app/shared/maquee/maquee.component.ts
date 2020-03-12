import { Component, OnInit } from '@angular/core';
import { Home } from '../../stores/home.store';

@Component({
  selector: 'app-maquee',
  templateUrl: './maquee.component.html',
  styleUrls: ['./maquee.component.scss']
})
export class MaqueeComponent implements OnInit {

  constructor(
    public store:Home
  ) { }

  ngOnInit() {
    this.store.getContent();
  }

}
