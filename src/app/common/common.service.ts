import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  metaData: any;
  constructor(private http: HttpClient) { }

  fetchMetaDataFromServer() {
    this.http.get('http://localhost:8080/').subscribe(success => {
      this.metaData = success;
      this.metaData.selectedDependencyCount = 0;
      this.metaData.searchFilterText = '';
    }, error => {
      console.log(error);
    });
  }

  getMetaData() {
    return this.metaData;
  }

  updateMetaData(updated: any) {
    this.metaData = updated;
  }

}
