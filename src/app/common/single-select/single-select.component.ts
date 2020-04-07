import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('value') value: any;

  constructor(private commonService: CommonService) { }

  metaData: any;
  list: any;
  selected: any;

  ngOnInit() {
    this.metaData = this.commonService.getMetaData();
    this.list = this.metaData[this.value].values;
    this.selected = this.metaData[this.value].default;
    if (this.value === 'type') {
      this.filterList();
    }
  }

  filterList() {
   this.list = this.list.filter( obj =>  obj && obj.tags && obj.tags.format && obj.tags.format !== 'build');
  }
  onSelect(id: any) {
    this.metaData[this.value].default = id;
    this.selected = id;
    this.commonService.updateMetaData(this.metaData);
  }

}
