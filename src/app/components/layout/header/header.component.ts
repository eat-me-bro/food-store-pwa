import { Component, ElementRef, OnInit } from '@angular/core';
import { GsapService } from 'src/app/services/gsap.service';
import { gsap, Power2 } from 'gsap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private gsapService: GsapService, private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.animate()
  }
  
  animate(): void {    
  }

  routeHome(): void {
    this.router.navigate(['/']);   
  }

}
