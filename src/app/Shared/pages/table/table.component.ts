import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material Module/material.module';

export interface TableAction {
  label: string;   // e.g. "Edit"
  icon?: string;   // Optional material icon
  action: string;  // e.g. "edit" (identifier to emit)
}

interface ColorScheme {
  backgroundColor: string;
  textColor: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  
  // Default table data
  @Input() displayedColumns: string[] = ['time', 'protocol', 'patient', 'type'];
  @Input() dataSource: any[] = [
  {
    time: '10:00 AM',
    protocol: 'Diabetes',
    patient: 'Christopher Jackson',
    type: 'Booked',
    status: 'booked'
  },
  {
    time: '10:00 AM',
    protocol: 'Heart Failure',
    patient: 'Melissa Miller',
    type: 'Booked',
    status: 'booked'
  },
  {
    time: '10:00 AM',
    protocol: 'Cancer',
    patient: 'Anthony Wong',
    type: 'Pending',
    status: 'pending'
  },
  {
    time: '10:00 AM',
    protocol: 'General',
    patient: 'Debra Gray',
    type: 'Pending',
    status: 'pending'
  },
  {
    time: '10:00 AM',
    protocol: 'Asthma',
    patient: 'Kimberly Simmons',
    type: 'Cancelled',
    status: 'cancelled'
  },
  {
    time: '10:00 AM',
    protocol: 'Stroke',
    patient: 'Jacob Simmons',
    type: 'Cancelled',
    status: 'cancelled'
  }
];
  @Input() enableRowSelection = true;

  // Default actions
  @Input() actions: TableAction[] = [
    { label: 'Edit', icon: 'edit', action: 'edit' },
    { label: 'Delete', icon: 'delete', action: 'delete' }
  ];

  @Output() rowSelected = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<{ action: string, row: any }>();

  onRowClick(row: any) {
    if (this.enableRowSelection) {
      this.rowSelected.emit(row);
    }
  }

  selectedRow: any = null;

  onActionClick(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }


  getBadgeColor(value: string): ColorScheme {
  const input = value.toLowerCase();

  switch (input) {
    // Protocols
    case 'heart failure':
      return { backgroundColor: '#f8d7da', textColor: '#721c24' };  // Light red bg, dark red text
    case 'cancer':
      return { backgroundColor: '#d1ecf1', textColor: '#0c5460' };  // Light blue bg, dark blue text
    case 'general':
      return { backgroundColor: '#d4edda', textColor: '#155724' };  // Light green bg, dark green text
    case 'diabetes':
      return { backgroundColor: '#fff3cd', textColor: '#856404' };  // Light yellow bg, dark yellow text
    case 'asthma':
      return { backgroundColor: '#cce5ff', textColor: '#004085' };  // Light sky blue bg, dark blue text
    case 'stroke':
      return { backgroundColor: '#fefefe', textColor: '#383d41' };  // Light grey bg, dark grey text

    // Statuses
    case 'booked':
      return { backgroundColor: '#d4edda', textColor: '#155724' };  // Green
    case 'pending':
      return { backgroundColor: '#fff3cd', textColor: '#856404' };  // Yellow
    case 'cancelled':
      return { backgroundColor: '#f8d7da', textColor: '#721c24' };  // Red

    // Default fallback
    default:
      return { backgroundColor: '#e2e3e5', textColor: '#6c757d' };  // Neutral grey
  }
}



}
