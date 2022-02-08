import { EventEmitter, Injectable } from '@angular/core';
import { assign } from 'lodash';

export interface SeverityDefinition {
  severity: string;
  color: string;
  bgColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatusBadgeConfigService {
  severities: Record<string, SeverityDefinition> = {};
  configChanges$ = new EventEmitter();

  constructor() { }

  clear() {
    this.severities = {};
    this.configChanges$.emit();
  }

  configure(severities: Record<string, SeverityDefinition>) {
    assign(this.severities, severities);
    this.configChanges$.emit();
  }

  get(severity?: string): Record<string, SeverityDefinition> | SeverityDefinition | undefined {
    return (severity !== undefined) ? this.severities[severity] : this.severities;
  }
}
