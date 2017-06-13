import { TestBed, inject } from '@angular/core/testing';

import { ChainPathService } from './chain-path.service';

describe('ChainPathDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChainPathService]
    });
  });

  it('should be created', inject([ChainPathService], (service: ChainPathService) => {
    expect(service).toBeTruthy();
  }));
});
