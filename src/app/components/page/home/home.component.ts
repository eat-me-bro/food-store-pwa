import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodStore } from 'src/app/models/food-store';
import { FoodStoreService } from 'src/app/services/food-store.service';
import { GsapService } from 'src/app/services/gsap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private gsapService: GsapService, 
    private elementRef: ElementRef, 
    private router: Router,
    private fss: FoodStoreService) { }

  ngOnInit(): void {
    // Clear session storage
    localStorage.removeItem('fsList')
    this.animate()
  }
  
  async animate() {

    await this.gsapService.fade('#squidBox', false)

    const squid = this.elementRef.nativeElement.querySelector('#squid');

    this.gsapService.updateToggle(false)
       
    // Register animation
    await this.gsapService.squidAnimation(squid)
    
    let fsData: FoodStore = await this.getGeoLocation()
    
    // Get all food stores
    this.fss.getFoodStores(fsData).subscribe(data => {

      console.log("FSDATA: ", fsData);
      console.log("DATA: ", data);
      
      let fsList: FoodStore[] = data

      // Set food stores into local storage
      localStorage.setItem('fsList', JSON.stringify(fsList))

      // this.gsapService.fade('#squid', true)
      // this.gsapService.fade('#squid_slogan', true)
            
      // Display results
      this.router.navigate(['/result']);
      console.log(fsList);

    })
    
    
  }

  async getGeoLocation(): Promise<FoodStore> {

    let fsData: FoodStore = {
      long: undefined,
      lat: undefined,
      id: undefined,
      foodStore: undefined,
      favorite: undefined,
      lastVisite: undefined,
      placeId: undefined,
      mapsUrl: undefined
    }

    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(res => {
          fsData.long = res.coords.longitude
          fsData.lat = res.coords.latitude
  
          resolve(fsData)  
        })
      } else {
        reject("No GSP Data")
      }
    })
  }

}
