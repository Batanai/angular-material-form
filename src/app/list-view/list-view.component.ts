import { Component, OnInit, ViewChild } from '@angular/core';
import { AppDataService } from '../services/app-data/app-data.service';
import { AppData } from '../interfaces/AppData';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
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
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  filteredData: AppData[] = [];
  dataSource = new MatTableDataSource<AppData>();


  loading$ = this.appDataService.loading;
  searchSubject = new Subject<string>();


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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appDataService: AppDataService, 
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.loadAppData();
    this.appDataService.totalDataLength$.subscribe(length => this.datasetLength = length);

    // Subscribe to the searchSubject with a debounce time
    this.searchSubject.pipe(debounceTime(300)).subscribe(searchText => {
      this.filterData(searchText);
    });
  }

  async loadAppData(filter: string = '') {
    this.loading = true;
    await this.appDataService.getAppData()
      .subscribe(data => {
        this.appData = data;
        this.filteredData = data;
        this.datasetLength = data.length;
        this.applyPagination();
        this.loading = false;
      }, 
      (error) => {
        console.error('Error fetching app data', error);
        this.loading = false;
      }
    );
  }

  filterData(searchText: string): void {
    if (searchText) {
      this.filteredData = this.appData.filter(item => item.APP_ID && item.APP_ID.includes(searchText));
      this.dataSource.data = this.filteredData
      this.datasetLength = this.filteredData.length;
      this.applyPagination();
    } else {
      this.filteredData = [...this.appData];
      this.dataSource.data = this.filteredData
      this.applyPagination();

      this.datasetLength = this.appData.length;
    }
  }


  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value;
    this.searchSubject.next(searchText);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }

  applyPagination(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.filteredData.slice(startIndex, endIndex);
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
        this.ngOnInit();
      }
    });
  }

  editApp(appId: string){
    this.router.navigate(['/edit', appId]);
  }

}
