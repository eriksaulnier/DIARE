import { TestBed, inject } from '@angular/core/testing';

import { PagedisplayUserjournalService } from './pagedisplay-userjournal.service';

describe('PagedisplayUserjournalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagedisplayUserjournalService]
    });
  });

  it('should ...', inject([PagedisplayUserjournalService], (service: PagedisplayUserjournalService) => {
    expect(service).toBeTruthy();
  }));
});
