import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  metaData: any;
  constructor(private http: HttpClient) { }

  fetchMetaDataFromServer() {
    return this.http.get('http://localhost:8080/');
  }

  getMetaData() {
    return this.metaData;
  }

  updateMetaData(updated: any) {
    this.metaData = updated;
  }

  generateProject() {
    const url = 'http://localhost:8080/starter.zip';
    const params =  this.getParams();
    this.http.get(url, {params, responseType: 'blob', observe:  'response'}).subscribe(data => {
      console.log(data);
      const blob = new Blob([data.body], {type: 'application/zip'});
      saveAs(blob, this.metaData.artifactId.default);
    }, error => {
      console.log(error);
    });
  }

  exploreProject() {
    const url = 'http://localhost:8080/pom.xml';
    const params = this.getParams();
    return this.http.get(url, {params, responseType: 'text', observe:  'response'});
  }

  downloadPom() {
    const blob = new Blob([this.metaData.pom], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'pom.xml');
  }

  getParams() {
    let params = new HttpParams();
    params = params.append('type', this.metaData.type.default);
    params = params.append('language', this.metaData.language.default);
    params = params.append('bootVersion', this.metaData.bootVersion.default);
    params = params.append('baseDir', this.metaData.name.default);
    params = params.append('groupId', this.metaData.groupId.default);
    params = params.append('artifactId', this.metaData.artifactId.default);
    params = params.append('name', this.metaData.name.default);
    params = params.append('description', this.metaData.description.default);
    params = params.append('packageName', this.metaData.packageName.default);
    params = params.append('packaging', this.metaData.packaging.default);
    params = params.append('javaVersion', this.metaData.javaVersion.default);
    params = params.append('dependencies', this.addDependencies());
    return  params;
  }

  addDependencies() {
    let dependencies = '';
    this.metaData.dependencies.values.forEach(list => {
      list.values.forEach(d => {
        if (d.selected) {
          if (dependencies.length > 0) {
            dependencies = dependencies + ',' + d.id;
          } else {
            dependencies = d.id;
          }
        }
      });
    });
    return dependencies;
  }

}
