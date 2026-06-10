import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AiChatResponse {
  status: number;
  message: string;
  data: {
    reply: string;
    model: string;
    correlation_id: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AiAssistantService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ask(prompt: string): Observable<AiChatResponse> {
    return this.http.post<AiChatResponse>(`${this.base}/api/ai/chat`, { prompt }, { withCredentials: true });
  }
}
