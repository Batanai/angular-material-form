import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data/app-data.service';
import { AppData } from '../interfaces/AppData';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    LoaderComponent,
    MatFormFieldModule,
    MatInputModule

  ],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent implements OnInit {

  appData: AppData[] = [];
  loading$ = this.appDataService.loading;

  datasetLength = 0;
  filter: string = '';
  sortDirection: string = 'asc';
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [5, 10, 25, 100];
  loading = true;


  displayedColumns: string[] = [
    'APP_ID',
    'APP NAME',
    'DEPARTMENT',
    'Budget Difference',
    'Target All Application Type and Tech Stack Tags',
    'Fundable reason',
    'T-Shirt Infra LSV',
    'Funding generated',
    'Budget remaining at FG-T-3 after funding distribution',
    'Strategy Budget received',
    'Interfaces In/Out',
    'T-Shirt Interfaces',
    'Budget requested',
    'Completion Attestation Date',
    'Dashboard Scope',
    'Criticality',
    'Resulting AWS T-Shirt LSV/JIRA',
    'App Migration Activity',
    'Completion Attestation Funding Total',
    'Resilience Class',
    'DB Migration Activity',
    'Fundable',
    'Initial Attestation Funding Total',
    'Hyperscaler',
    'Migration Method',
    'Migration Path',
    'Pilot',
    'DB Cloud Target',
    'Infrastructure Components',
    'Initial Attestation Date',
  ];


  constructor(
    private appDataService: AppDataService, 
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.loadAppData();
    this.appDataService.totalDataLength$.subscribe(length => this.datasetLength = length);
  }

  async loadAppData(filter: string = '') {
    this.loading = true;
    await this.appDataService.getAppData(filter, this.sortDirection, this.pageIndex, this.pageSize)
      .subscribe(data => {
        this.appData = data;
        this.loading = false;
      }, 
      (error) => {
        console.error('Error fetching app data', error);
        this.loading = false;
      }
    );
  }


  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      const filterValue = inputElement.value.trim();
      this.loadAppData(filterValue);
    }
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAppData();
  }

  onSortChange(event: any) {
    this.sortDirection = event.direction;
    this.loadAppData();
  }

  onFilterChange(filterValue: string) {
    this.filter = filterValue;
    this.loadAppData();
  }


  openEditDialog(element: AppData): void {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '80%',
      height: '100vh',
      maxWidth: '100vw',
      panelClass: 'custom-dialog-container',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the updated result, e.g., save to server or update the local data array
        console.log('The dialog was closed with data: ', result);
      }
    });
  }

  editApp(appId: string){
    this.router.navigate(['/edit', appId]);
  }

}
