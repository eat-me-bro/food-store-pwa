import { Injectable } from '@angular/core';
import { gsap, Power2 } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class GsapService {

  private squidToggle: boolean = false

  constructor() { }

  public updateToggle(_toggle: boolean): void {
    this.squidToggle = _toggle
  }

  public fade(_item: string, _fadeOut: boolean) {
    let _opacity: number = 1
    if (_fadeOut) {
      _opacity = 0
    }
    return new Promise(resolve => {
      let fade = gsap.timeline({ paused: true, defaults: { duration: 0.2 } })
      .to(_item,  { opacity: _opacity })

      setTimeout(()=> {
        fade.restart();
        resolve(true)
      }, 100)

    })
  }
 
  public squidAnimation(item: any,): any {
    return new Promise(resolve => {

      let rotateSquid: any = gsap.to("#squid", {
        rotation: 360, 
        duration: 1.3,
        ease: 'elastic',
        repeat: -1,
        paused: true,
      }).timeScale(1);

      item.addEventListener('click', () => {

        window.navigator.vibrate([200,30,150,25,100,20,40]);
        
        let _timeScale: number

        if (!this.squidToggle) {
          this.squidToggle = true
            
          rotateSquid.play();
          gsap.to(rotateSquid, { timeScale: 1, duration: 1 });
                   
          
          setTimeout(()=> {
            gsap.to(rotateSquid, { timeScale: 0, duration: 0 });            
            resolve(true)
          }, 1300)          
        }
        
      })
    })    
  }

}