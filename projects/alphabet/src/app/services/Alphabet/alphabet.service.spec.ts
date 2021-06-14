import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AlphabetService } from './alphabet.service';

describe('AlphabetService', () => {
  let service: AlphabetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    // Inject the http service and test controller for each test
    const httpClient = TestBed.get(HttpClient);
    const httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(AlphabetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
