import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusBadgeConfigService } from '../../services/status-badge-config.service';

@Component({
  selector: 'pe-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent implements OnInit, OnChanges {

  @Input() severity?: string;
  @Input() value?: any;
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';
  @HostBinding('style.--badge-color') color?: string;
  @HostBinding('style.--badge-bg-color') bgColor?: string;

  constructor(readonly config: StatusBadgeConfigService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.color = this.config.get(this.severity || '')?.color as string;
    this.bgColor = this.config.get(this.severity || '')?.bgColor as string;
  }

  ngOnInit(): void {
  }

}
