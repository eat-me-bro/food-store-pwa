import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.animate()
  }
  
  animate(): void {    
  }

  routeHome(): void {
    this.router.navigate(['/']);   
  }

}
