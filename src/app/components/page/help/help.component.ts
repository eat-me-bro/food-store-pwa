import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GsapService } from 'src/app/services/gsap.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private gsapService: GsapService, private router: Router) { }

  ngOnInit(): void {
    this.animate()
  }

  async animate() {
    await this.gsapService.fade('#helpBox', false)
  }

  routeHome(): void {
    this.router.navigate(['/']);
  }


}
