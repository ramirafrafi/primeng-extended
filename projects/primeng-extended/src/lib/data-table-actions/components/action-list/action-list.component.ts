import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActionDefinition } from '../../services/action-config.service';

@Component({
  selector: 'pe-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit, OnChanges {
  @Input() item?: any;
  @Input() actions?: (string | ActionDefinition | null | undefined)[];
  @Input() flexDirection: 'row' | 'column' = 'row';
  _actions?: (string | ActionDefinition)[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('actions' in changes) {
      this._actions = this.actions?.filter(action => Boolean(action)) as any[];
    }
  }

  ngOnInit(): void {
  }

}
