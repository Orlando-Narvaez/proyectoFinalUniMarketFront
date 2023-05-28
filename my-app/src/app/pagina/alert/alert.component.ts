import { Component, Input } from '@angular/core';
import { Alert } from 'src/app/modelo/Alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() alert!: Alert | null;

  constructor() {}

  ngOnInit(): void {
    
  }

  public close() {
    this.alert = null;
  }
}
