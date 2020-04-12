import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  metaData: any;
  showProjectExplorer = false;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.metaData = this.commonService.getMetaData();
  }

  exploreProject() {
    this.showProjectExplorer = true;
    this.commonService.exploreProject();
  }

  generateProject() {
    this.commonService.generateProject();
  }

}
