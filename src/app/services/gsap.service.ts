import { Injectable } from '@angular/core';
import { gsap, Power2 } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class GsapService {

  constructor() { }

  public rotateItem(_play: any, _pause: any): void {
    
    let pauseTween: any
    let audio = document.createElement("audio");
    audio.loop = true;
    audio.src  = "https://upload.wikimedia.org/wikipedia/en/d/d8/You_Spin_Me_Round_by_Dead_or_Alive.ogg";

    let rotateCD: any = gsap.to("#creature", {
      rotation: 360, 
      duration:0.3,
      ease: 'none',
      repeat: -1,
      paused: true
    }).timeScale(0);

    _play.addEventListener('click', () => {

      // Rotation
      rotateCD.play();
      gsap.to(rotateCD, { timeScale: 1, duration: 3 });

      // Audio
      if (audio.paused) {
        gsap.set(audio, { volume: 0, playbackRate: 0.5 });
      }
      gsap.to(audio, { volume: 1, playbackRate: 1, duration:3 });
      audio.play();

    });

    _pause.addEventListener('click', () => {

      // Rotation
      rotateCD.play();
      gsap.to(rotateCD, { timeScale: 0, duration: 3 });

      // Audio
      gsap.to(audio, {
        volume: 0, 
        playbackRate: 0.5, 
        duration:3,
        onComplete: audio.pause, 
        callbackScope: audio 
      });

    });

    // _pause.onclick = () => {
    //   gsap.to(rotateCD, {
    //     timeScale: 0, 
    //     duration: 3
    //   });
    // };
    
    // pauseTween && pauseTween.kill();
    // if (audio.paused) gsap.set(audio, { volume: 0, playbackRate: 0.5 });  
    // gsap.to(audio,  { volume: 1, playbackRate: 1, duration:3 });
    // audio.play();
};

// pause.onclick = function() {
//   gsap.to(rotateCD, { timeScale: 0, duration:3, onComplete: function() { this.pause(); }});
  
//   pauseTween && pauseTween.kill();
//   pauseTween = gsap.to(audio, { 
//     volume: 0, 
//     playbackRate: 0.5, 
//     duration:3,
//     onComplete: audio.pause, 
//     callbackScope: audio 
//   });
// };
  
  public menuBarAnimation(e: any): void {
    let menuBar = gsap.timeline({ paused: true});

    menuBar.to('.bar-1', 0.5, {
      attr:{d: "M8,2 L2,8"},
      x:1,
      ease: Power2.easeInOut
    }, 'start')
    
    menuBar.to('.bar-2', 0.5,{
      autoAlpha:0
    }, 'start')
    
    menuBar.to('.bar-3', 0.5,{
      attr:{d: "M8,8 L2,2"},
      x:1,
      ease: Power2.easeInOut
    }, 'start')
    
    menuBar.reverse();

    let navTl = gsap.timeline({ paused:true });

    navTl.to('.fullpage-menu', {
      duration:0,
      display: "block",
      ease: Power2.easeInOut
    }, "<");

    navTl.to('.menu-bg', {
      duration:1,
      opacity:1,
      ease: Power2.easeInOut
    }, "<");

    navTl.from('.main-menu li a', {
      duration:1.5,
      y:"100%",
      rotateY:30,
      stagger:0.2,
      ease: Power2.easeInOut 
    }, "-=0.5");

    navTl.reverse();

    e.addEventListener('click', () => {
      menuBar.reversed(!menuBar.reversed());
      navTl.reversed(!navTl.reversed());
    })

  }

}
