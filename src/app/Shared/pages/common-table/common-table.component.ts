import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface TableColumn {
  key: string;   // property name in data
  label: string; // column header
}

@Component({
  selector: 'app-common-table',
  imports: [CommonModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent {
@Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() showActions: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onView(row: any) {
    this.view.emit(row);
  }

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | '' = '';

  onSort(col: TableColumn) {
    if (this.sortColumn === col.key) {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : this.sortDirection === 'desc' ? '' : 'asc';
    } else {
      // Start sorting new column
      this.sortColumn = col.key;
      this.sortDirection = 'asc';
    }

    this.applySorting();
  }

  applySorting() {
    if (!this.sortColumn || !this.sortDirection) {
      return;
    }

    this.data = [...this.data].sort((a, b) => {
      const valueA = a[this.sortColumn!];
      const valueB = b[this.sortColumn!];

      if (valueA == null || valueB == null) return 0;

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return this.sortDirection === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }

}
