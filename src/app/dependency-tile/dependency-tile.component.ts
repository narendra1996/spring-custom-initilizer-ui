import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dependency-tile',
  templateUrl: './dependency-tile.component.html',
  styleUrls: ['./dependency-tile.component.scss']
})
export class DependencyTileComponent {

  // tslint:disable-next-line: no-input-rename
  @Input('metaData') metaData: any;
  // tslint:disable-next-line: no-input-rename
  @Input('index') index: any;
  // tslint:disable-next-line: no-input-rename
  @Input('showAll') showAll: boolean;
  // tslint:disable-next-line: no-input-rename
  @Input('showSelected') showSelected: boolean;
  // tslint:disable-next-line: no-input-rename
  @Input('showFiltered') showFiltered: boolean;

  constructor() { }

  onDependencySelect(listindex: any, itemIndex: any) {

    this.metaData.dependencies.values[listindex].values[itemIndex].selected =
    !this.metaData.dependencies.values[listindex].values[itemIndex].selected;

    if (this.metaData.dependencies.values[listindex].values[itemIndex].selected) {
      this.metaData.selectedDependencyCount++;
    } else {
      this.metaData.selectedDependencyCount--;
    }
    /*
    Below Code is to handle the hovering icons correctly in search section
    */
    if (this.showSelected || this.showFiltered) {
      this.metaData.dependencies.values[listindex].values[itemIndex].hovered =
      !this.metaData.dependencies.values[listindex].values[itemIndex].hovered;
    }

  }

  hoverDependency(listindex: any, itemIndex: any) {
    this.metaData.dependencies.values[listindex].values[itemIndex].hovered =
    !this.metaData.dependencies.values[listindex].values[itemIndex].hovered;
  }

}
