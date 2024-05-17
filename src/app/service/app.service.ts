import { Injectable } from '@angular/core';
import { environment } from './environments/environments';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from './util/util';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private resourceUrl = environment.apiUrl;

  constructor(
    protected http: HttpClient
  ) { }
  public changeResourceUrl(url: string) {
    this.resourceUrl = url;
  }

  create(entity: any, requestUrl: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.resourceUrl + requestUrl,
      entity,
      { observe: 'response' }
    );
  }

  update(entity: any, requestUrl: any, headers:any): Observable<HttpResponse<any>> {
    return this.http.patch<any>(
      this.resourceUrl + requestUrl,
      entity,
      {
        headers: headers,
        observe: 'response',
      }
    );
  }

  find(id: number, requestUrl: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${this.resourceUrl + requestUrl}/${id}`,
      { observe: 'response' }
    );
  }

  getById(id: number, requestUrl: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.resourceUrl + requestUrl + '?id=' + id,
      { observe: 'response' }
    );
  }

  query(req: any, requestUrl: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<any>(
      this.resourceUrl + requestUrl,
      { params: options, observe: 'response' }
    );
  }

  delete(id: number, requestUrl: any): Observable<HttpResponse<{}>> {
    return this.http.delete(
      `${this.resourceUrl + requestUrl + '?id='}${id}`,
      { observe: 'response' }
    );
  }

  deleteOption(
    req: any,
    requestUrl: any,
    option: any
  ): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.delete<any>(this.resourceUrl + requestUrl + option, {
      params: options,
      observe: 'response',
    });
  }
  postOption(
    entity: any,
    requestUrl: any,
    option: any
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + requestUrl + option, entity, {
      observe: 'response',
    });
  }

  postByOption(requestUrl: any, option: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + requestUrl + option, {
      observe: 'response',
    });
  }

  getOption(
    req: any,
    requestUrl: any,
    option: any
  ): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.resourceUrl + requestUrl + option, {
      params: options,
      observe: 'response',
    });
  }

  getByOption(requestUrl: any, option: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl + requestUrl + option, {
      observe: 'response',
    });
  }

  putOption(
    entity: any,
    requestUrl: any,
    option: any
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.resourceUrl + requestUrl + option, entity, {
      observe: 'response',
    });
  }

  uploadFile(
    fileToUpload: File,
    requestUrl: any,
    option: any
  ): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http.post(this.resourceUrl + requestUrl + option, formData, {
      observe: 'response',
    });
  }
  get(requestUrl: any, option: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl + requestUrl + option, {
      observe: 'response',
    });
  }
  post(
    entity: any,
    requestUrl: any,
    option: any
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + requestUrl + option, entity, {
      observe: 'response',
    });
  }
}
