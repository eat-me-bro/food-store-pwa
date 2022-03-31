import { Component, ElementRef, OnInit } from '@angular/core';
import { GsapService } from 'src/app/services/gsap.service';
import { gsap, Power2 } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private gsapService: GsapService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.animate()
  }
  
  animate(): void {
    const menuToggle = this.elementRef.nativeElement.querySelector('#menuToggle');
    const anim = this.gsapService.menuBarAnimation(menuToggle)
  }

}
