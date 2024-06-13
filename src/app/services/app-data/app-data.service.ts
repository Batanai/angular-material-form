import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { AppData } from '../../interfaces/AppData';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  private appDataSubject = new BehaviorSubject<AppData[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalDataLengthSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public totalDataLength$ = this.totalDataLengthSubject.asObservable();

  private appData: AppData[] = []; // Mock data or fetched data should be stored here

  private BASE_URL = 'https://bxrbxetym6.execute-api.eu-west-1.amazonaws.com'; // API URL

  constructor(private http: HttpClient) {
    // Initialize with mock data or fetch initial data
    this.initializeAppData();
  }

  private initializeAppData() {
    // You can fetch data from server here or initialize with mock data
    this.appData = [
      // Add initial mock data here
    ];
  }

  getAppData(): Observable<AppData[]> {
    this.loadingSubject.next(true);

    return this.http.get<AppData[]>(`${this.BASE_URL}/items`).pipe(
      map(data => data.map(this.mapAppData)),
      catchError(error => {
        console.error('Error fetching data', error);
        return [];
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }


  getAppDataById(id: string): Observable<AppData> {
    return this.http.get<AppData>(`${this.BASE_URL}/items/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching data by ID', error);
        throw error;
      })
    );
  }

  updateAppData(id: string | null, appData: Partial<AppData>): Observable<AppData> {
    return this.http.put<AppData>(`${this.BASE_URL}/items`, appData);
  }


  private mapAppData(data: any): AppData {
    return {
      'Budget Difference': data['Budget Difference'],
      'Target All Application Type and Tech Stack Tags': data['Target All Application Type and Tech Stack Tags'],
      'Fundable reason': data['Fundable reason'],
      'APP_ID': data['APP_ID'],
      'APP NAME': data['APP NAME'],
      'DEPARTMENT': data['DEPARTMENT'],
      'T-Shirt Infra LSV': data['T-Shirt Infra LSV'],
      'Funding generated': data['Funding generated'],
      'Budget remaining at FG-T-3 after funding distribution': data['Budget remaining at FG-T-3 after funding distribution'],
      'Strategy Budget received': data['Strategy Budget received'],
      'Interfaces In/Out': data['Interfaces In/Out'],
      'T-Shirt Interfaces': data['T-Shirt Interfaces'],
      'Budget requested': data['Budget requested'],
      'Completion Attestation Date': data['Completion Attestation Date'],
      'Dashboard Scope': data['Dashboard Scope'],
      'Criticality': data['Criticality'],
      'Resulting AWS T-Shirt LSV/JIRA': data['Resulting AWS T-Shirt LSV/JIRA'],
      'App Migration Activity': data['App Migration Activity'],
      'Completion Attestation Funding Total': data['Completion Attestation Funding Total'],
      'Resilience Class': data['Resilience Class'],
      'DB Migration Activity': data['DB Migration Activity'],
      'Fundable': data['Fundable'],
      'Initial Attestation Funding Total': data['Initial Attestation Funding Total'],
      'Hyperscaler': data['Hyperscaler'],
      'Migration Method': data['Migration Method'],
      'Migration Path': data['Migration Path'],
      'Pilot': data['Pilot'],
      'DB Cloud Target': data['DB Cloud Target'],
      'Infrastructure Components': data['Infrastructure Components'],
      'Initial Attestation Date': data['Initial Attestation Date'],
    };
  }

  get loading(): Observable<boolean> {
    return this.loading$;
  }
}



function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

  
