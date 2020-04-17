import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './http.interceptor';
import { LoaderService } from './loader/loader.service';

export function httpFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  loaderService: LoaderService
): Http {
  return new HttpInterceptor(xhrBackend, requestOptions, loaderService);
}
