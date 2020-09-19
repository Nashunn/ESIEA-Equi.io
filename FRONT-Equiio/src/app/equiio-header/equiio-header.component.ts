import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-equiio-header',
  styleUrls: ['./equiio-header.component.scss'],
  templateUrl: './equiio-header.component.html',
})
export class EquiioHeaderComponent implements OnInit {
  constructor() { }

  @Input() public title: string;

  public ngOnInit(): void {
  }
}
