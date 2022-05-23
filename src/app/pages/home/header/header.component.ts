import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  returnName: string = "";

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnName = this.route.snapshot.queryParams['name'] || '/';
  }

}
