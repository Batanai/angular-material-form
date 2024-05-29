import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data/app-data.service';
import { AppData } from '../interfaces/AppData';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
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

  displayedColumns: string[] = [
    'APP_ID', 
    'APP_MIGRATION_ACTIVITY', 
    'APP_NAME', 
    'AS_IS_APPLICATION_TYPE_AND_TECH_STACK_TAGS', 
    'BUDGET_DIFFERENCE', 
    'BUDGET_REMAINING_AT_FG_T_3_AFTER_FUNDING_DISTRIBUTION', 
    'BUDGET_REQUESTED', 
    'CLOUD_ROOM_ID', 
    'COMPLETION_ATTESTATION_DATE', 
    'COMPLETION_ATTESTATION_FUNDING_TOTAL', 
    'CRITICALITY', 
    'DASHBOARD_SCOPE', 
    'DB_CLOUD_TARGET', 
    'DB_MIGRATION_ACTIVITY', 
    'DEPARTMENT', 
    'FUNDABLE', 
    'FUNDABLE_REASON', 
    'FUNDING_GENERATED', 
    'HYPERSCALER', 
    'INFRASTRUCTURE_COMPONENTS', 
    'INITIAL_ATTESTATION_DATE', 
    'INITIAL_ATTESTATION_FUNDING_TOTAL', 
    'INTERFACES_IN_OUT', 
    'JIRA_FIX_VERSION_END', 
    'JIRA_FIX_VERSION_START', 
    'MAX_ACCEPTABLE_DOWNTIME', 
    'MIGRATION_METHOD', 
    'MIGRATION_PATH', 
    'PILOT', 
    'RESILIANCE_CLASS', 
    'RESULTING_AWS_T_SHIRT_LSV_JIRA', 
    'STORY_POINTS', 
    'TOTAL_FUNDING_RECEIVED', 
    'TOTAL_LSV_JIRA', 
    'TARGET_INTERFACES_IN_OUT', 
    'TARGET_ALL_APPLICATION_TYPE_AND_TECH_STACK_TAGS',
    'actions'
  ];


  constructor(private appDataService: AppDataService, private router: Router) { }

  ngOnInit() {
    this.loadAppData();
    this.appDataService.totalDataLength$.subscribe(length => this.datasetLength = length);
  }

  loadAppData() {
    this.appDataService.getAppData(this.filter, this.sortDirection, this.pageIndex, this.pageSize)
      .subscribe(data => this.appData = data);
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

  editApp(appId: string){
    this.router.navigate(['/edit', appId]);
  }

}
