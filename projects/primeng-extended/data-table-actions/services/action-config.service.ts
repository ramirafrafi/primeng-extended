import { EventEmitter, Injectable } from '@angular/core';
import { assign } from 'lodash';

export interface ActionDefinition {
  action: string;

  // Optional
  icon?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  tooltip?: string;
  badge?: any;
  callback?: Function;
  routerLink?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActionConfigService {
  actions: Record<string, ActionDefinition> = {};
  defaultConfig: Partial<ActionDefinition> = {
    icon: 'pi pi-ellipsis-v',
    type: 'primary'
  };
  configChanges$ = new EventEmitter();

  constructor() { }

  clear() {
    this.actions = {};
    this.configChanges$.emit();
  }

  configureDefault(definition: Partial<ActionDefinition>) {
    assign(this.defaultConfig, definition);
    this.configChanges$.emit();
  }

  configure(actions: Record<string, ActionDefinition>) {
    assign(this.actions, actions);
    this.configChanges$.emit();
  }

  get(action?: string): Record<string, ActionDefinition> | ActionDefinition | undefined {
    return (action !== undefined) ? this.actions[action] : this.actions;
  }

  getDefault(): Partial<ActionDefinition> {
    return this.defaultConfig;
  }

}
