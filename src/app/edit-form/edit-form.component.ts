import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from '../services/app-data/app-data.service';
import { AppData } from '../interfaces/AppData';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class EditFormComponent {

  form: FormGroup;
  appData: AppData | undefined;


  constructor(
      private fb: FormBuilder, 
      private route: ActivatedRoute,
      private appDataService: AppDataService
  ){
    this.form = this.fb.group({
      APP_ID: [''],
      'APP NAME': ['', [Validators.required]],
      DEPARTMENT: ['', [Validators.required]],
      'Budget Difference': ['', [Validators.required]],
      'Target All Application Type and Tech Stack Tags': ['', [Validators.required]],
      'Fundable reason': ['', [Validators.required]],
      'T-Shirt Infra LSV': ['', [Validators.required]],
      'Funding generated': ['', [Validators.required]],
      'Budget remaining at FG-T-3 after funding distribution': ['', [Validators.required]],
      'Strategy Budget received': ['', [Validators.required]],
      'Interfaces In/Out': ['', [Validators.required]],
      'T-Shirt Interfaces': ['', [Validators.required]],
      'Budget requested': ['', [Validators.required]],
      'Completion Attestation Date': ['', [Validators.required]],
      'Dashboard Scope': ['', [Validators.required]],
      Criticality: ['', [Validators.required]],
      'Resulting AWS T-Shirt LSV/JIRA': ['', [Validators.required]],
      'App Migration Activity': ['', [Validators.required]],
      'Completion Attestation Funding Total': ['', [Validators.required]],
      'Resilience Class': ['', [Validators.required]],
      'DB Migration Activity': ['', [Validators.required]],
      Fundable: ['', [Validators.required]],
      'Initial Attestation Funding Total': ['', [Validators.required]],
      Hyperscaler: ['', [Validators.required]],
      'Migration Method': ['', [Validators.required]],
      'Migration Path': ['', [Validators.required]],
      Pilot: ['', [Validators.required]],
      'DB Cloud Target': ['', [Validators.required]],
      'Infrastructure Components': ['', [Validators.required]],
      'Initial Attestation Date': ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const appId = this.route.snapshot.paramMap.get('id');
    if (appId) {
      this.loadAppData(appId);
    }  
  }

  loadAppData(appId: string): void {
    this.appDataService.getAppDataById(appId).subscribe(data => {
      this.appData = data;
      this.form.patchValue(this.appData);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    }
  }
}
