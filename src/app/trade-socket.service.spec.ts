import { TestBed } from '@angular/core/testing';

import { TradeSocketService } from './trade-socket.service';

describe('TradeSocketService', () => {
  let service: TradeSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
