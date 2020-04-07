import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyTileComponent } from './dependency-tile.component';

describe('DependencyTileComponent', () => {
  let component: DependencyTileComponent;
  let fixture: ComponentFixture<DependencyTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
