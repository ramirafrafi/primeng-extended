import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActionConfigService, ActionDefinition } from '../../services/action-config.service';

@Component({
  selector: 'pe-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit, OnChanges {
  @Input() item?: any;
  @Input() config?: string | ActionDefinition;
  definition?: ActionDefinition;
  _config?: ActionDefinition;

  constructor(readonly actionConfig: ActionConfigService) { }

  ngOnChanges(changes: SimpleChanges) {
    'config' in changes && this.setupConfig();
  }

  ngOnInit(): void {
    this.actionConfig.configChanges$.subscribe(() => this.setupConfig());
  }

  setupConfig() {
    this._config = typeof this.config === 'string'
      ? { action: this.config }
      : this.config;

    this.definition = this.actionConfig.get(this._config?.action || '') as ActionDefinition;
    this._config = Object.assign({}, this.actionConfig.getDefault(), this.definition, this._config);
  }

  runCallback() {
    this._config?.callback?.(this.item);
  }

}
