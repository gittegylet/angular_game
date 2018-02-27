import { TestBed, inject } from '@angular/core/testing';

import { Table2CellService } from './table2-cell.service';

describe('Table2CellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Table2CellService]
    });
  });

  it('should be created', inject([Table2CellService], (service: Table2CellService) => {
    expect(service).toBeTruthy();
  }));
});
