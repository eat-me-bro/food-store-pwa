import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GsapService } from 'src/app/services/gsap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private gsapService: GsapService, private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {    
    this.animate()
  }
  
  async animate() {

    await this.gsapService.fade('#squidBox', false)

    const squid = this.elementRef.nativeElement.querySelector('#squid');

    this.gsapService.updateToggle(false)
    
    let result: any = await this.gsapService.squidAnimation(squid, 'assets/img/eggs.gif')
    
    await this.gsapService.fade('#squid', true)
    await this.gsapService.fade('#squid_slogan', true)

    console.log("DONE.");
    this.router.navigate(['/result']);
    
  }

}
