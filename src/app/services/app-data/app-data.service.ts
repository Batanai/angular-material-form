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

  public loading$ = this.loadingSubject.asObservable();
  private appData: AppData[] = []; // Mock data or fetched data should be stored here

  private BASE_URL = 'http://localhost:8000'; // API URL

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

  getAppData(filter: string, sortDirection: string, pageIndex: number, pageSize: number): Observable<AppData[]> {
    this.loadingSubject.next(true);

    return this.http.get<AppData[]>(`${this.BASE_URL}/form-data`).pipe(
      map(data => {
        let filteredData = data;
        
        // Apply filter
        if (filter) {
          filteredData = filteredData.filter(item =>
            Object.values(item).some(val =>
              val?.toString().toLowerCase().includes(filter.toLowerCase())
            )
          );
        }
        
        // Apply sorting
        if (sortDirection) {
          filteredData.sort((a: any, b: any) => {
            const isAsc = sortDirection === 'asc';
            return compare(a['property'], b['property'], isAsc);
          });
        }
        
        // Apply pagination
        const startIndex = pageIndex * pageSize;
        const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
        
        return paginatedData;
      }),
      catchError(error => {
        console.error('Error fetching data', error);
        return [];
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  get loading(): Observable<boolean> {
    return this.loading$;
  }
}

function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

  
