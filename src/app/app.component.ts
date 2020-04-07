import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonService } from './common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  metaData: any;
  isSearchSelected = true;
  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.fetchMetaDataFromServer();
    //  https://start.spring.io/
    this.http.get('http://localhost:8080/').subscribe(success => {
     this.metaData = success;
     this.metaData.selectedDependencyCount = 0;
     this.metaData.searchFilterText = '';
     console.log(this.metaData);
      }, error => {
        console.log(error);
    });
    this.http.get('http://localhost:8080/pom.xml', { responseType: 'text'}).subscribe(success => {
      this.metaData.pom = success;
      // console.log(success);
       }, error => {
         console.log(error);
    });
  }
  onSubmit(selected: any, type: any) {
    console.log(selected);
    console.log(type);
    this.metaData[type].default = selected;
  }

  onDependencyListSelect(index: any) {
    this.metaData.dependencies.values[index].selected = !this.metaData.dependencies.values[index].selected ;
  }

  onDependencySelect(listindex: any, itemIndex: any) {
    this.metaData.dependencies.values[listindex].values[itemIndex].selected =
    !this.metaData.dependencies.values[listindex].values[itemIndex].selected;
  }

  toggleSearchAndList(flag: any) {
    this.isSearchSelected = flag;
  }

  hoverDependency(listindex: any, itemIndex: any) {
    this.metaData.dependencies.values[listindex].values[itemIndex].hovered =
    !this.metaData.dependencies.values[listindex].values[itemIndex].hovered;
  }

  onSearch(searchText: string) {
    this.metaData.searchFilterText = searchText;
    console.log(searchText);
  }

  generateProject() {
    const url = 'http://localhost:8080/starter.zip';
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

    this.http.get(url, {params, responseType: 'blob', observe:  'response'}).subscribe(data => {
      console.log(data);
      const blob = new Blob([data.body], {type: 'application/zip'});
      // window.open(window.URL.createObjectURL(blob));
    }, error => {
      console.log(error);
    });
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
