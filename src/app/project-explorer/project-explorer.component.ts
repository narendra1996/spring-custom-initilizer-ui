import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'project-explorer',
  templateUrl: './project-explorer.component.html',
  styleUrls: ['./project-explorer.component.scss']
})
export class ProjectExplorerComponent implements OnInit {

  metaData: any;
  showExplorer = true;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.metaData = this.commonService.getMetaData();
    this.commonService.exploreProject().subscribe(data => {
      this.metaData.pom =  data.body;
      }, error => {
        console.log(error);
    });
  }

  onClose() {
    this.showExplorer = false;
  }

  downloadPom() {
    this.commonService.downloadPom();
  }

}
