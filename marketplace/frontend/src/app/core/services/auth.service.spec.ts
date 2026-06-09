import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should use the current user prenom for the display name', () => {
    service.currentUser.set({
      id_utilisateur: 1,
      email: 'client@example.com',
      nom: 'Durand',
      prenom: 'Claire',
      id_role: 3,
      actif: 1,
    });

    expect(service.getDisplayName()).toBe('Claire');
  });
});
