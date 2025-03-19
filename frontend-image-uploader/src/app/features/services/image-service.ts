import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.API_URL}/upload`, formData);
  }

  downloadImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.API_URL}/files/${filename}`, { responseType: 'blob' });
  }
}
