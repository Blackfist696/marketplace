import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AiAssistantService } from './ai-assistant.service';

describe('AiAssistantService', () => {
  let service: AiAssistantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AiAssistantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post prompt to the AI endpoint with credentials enabled', () => {
    service.ask('Aide-moi à choisir un produit').subscribe(response => {
      expect(response.data.reply).toBe('Réponse IA');
    });

    const req = httpMock.expectOne('/api/ai/chat');
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBe(true);
    expect(req.request.body).toEqual({ prompt: 'Aide-moi à choisir un produit' });

    req.flush({
      status: 200,
      message: 'Reponse AI',
      data: { reply: 'Réponse IA', model: 'mistral', correlation_id: 'abc' },
    });
  });
});
