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

    this.commonService.fetchMetaDataFromServer().subscribe(success => {
     this.metaData = success;
     this.metaData.selectedDependencyCount = 0;
     this.metaData.searchFilterText = '';
     this.metaData.showProjectExplorer = false;
     this.commonService.updateMetaData(this.metaData);
     console.log(this.metaData);
      }, error => {
        console.log(error);
    });

    this.http.get('http://localhost:8080/pom.xml', { responseType: 'text'}).subscribe(success => {
      this.metaData.pom = success;
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
}
