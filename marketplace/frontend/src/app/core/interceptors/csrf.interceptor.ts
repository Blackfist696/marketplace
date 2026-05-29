import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const mutatingMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
let csrfToken: string | null = null;

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const isApiCall = req.url.startsWith(environment.apiUrl);
  const isMutating = mutatingMethods.has(req.method.toUpperCase());

  let request = req;
  if (isApiCall && isMutating && req.withCredentials && csrfToken) {
    request = req.clone({
      setHeaders: {
        'X-CSRF-Token': csrfToken,
      },
    });
  }

  return next(request).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const nextToken = event.headers.get('X-CSRF-Token');
        if (nextToken) {
          csrfToken = nextToken;
        }
      }
    })
  );
};
