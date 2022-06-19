import { TestBed } from '@angular/core/testing';

import { ChatservService } from './chatserv.service';

describe('ChatservService', () => {
  let service: ChatservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
