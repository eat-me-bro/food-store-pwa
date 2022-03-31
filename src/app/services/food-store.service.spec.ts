import { TestBed } from '@angular/core/testing';

import { FoodStoreService } from './food-store.service';

describe('FoodStoreService', () => {
  let service: FoodStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
