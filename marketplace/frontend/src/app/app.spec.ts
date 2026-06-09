import { TestBed } from '@angular/core/testing';
import { App, buildCanonicalUrl } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should build a canonical URL for the production base path', () => {
    expect(buildCanonicalUrl('/project02/public/app/home', 'https://bacinfo.eci-liege.info')).toBe('https://bacinfo.eci-liege.info/project02/public/app/home');
    expect(buildCanonicalUrl('/home', 'http://localhost:4200')).toBe('https://bacinfo.eci-liege.info/project02/public/app/home');
  });
});
