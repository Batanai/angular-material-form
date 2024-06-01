import { Component, Inject } from '@angular/core';

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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatNativeDateModule,
    MatProgressSpinnerModule,

  ],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class EditFormComponent {

  form: FormGroup;
  appData: AppData | undefined;
  loading = false;


  constructor(
      private fb: FormBuilder, 
      public dialogRef: MatDialogRef<EditFormComponent>,
      private appDataService: AppDataService,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: AppData
  ){
    this.form = this.fb.group({
      APP_ID: [this.data.APP_ID],
      'APP NAME': [this.data['APP NAME']],
      DEPARTMENT: [this.data.DEPARTMENT],
      'Budget Difference': [this.data['Budget Difference']],
      'Target All Application Type and Tech Stack Tags': [this.data['Target All Application Type and Tech Stack Tags']],
      'Fundable reason': [this.data['Fundable reason']],
      'T-Shirt Infra LSV': [this.data['T-Shirt Infra LSV']],
      'Funding generated': [this.data['Funding generated']],
      'Budget remaining at FG-T-3 after funding distribution': [this.data['Budget remaining at FG-T-3 after funding distribution']],
      'Strategy Budget received': [this.data['Strategy Budget received']],
      'Interfaces In/Out': [this.data['Interfaces In/Out']],
      'T-Shirt Interfaces': [this.data['T-Shirt Interfaces']],
      'Budget requested': [this.data['Budget requested']],
      'Completion Attestation Date': [this.data['Completion Attestation Date']],
      'Dashboard Scope': [this.data['Dashboard Scope']],
      Criticality: [this.data.Criticality],
      'Resulting AWS T-Shirt LSV/JIRA': [this.data['Resulting AWS T-Shirt LSV/JIRA']],
      'App Migration Activity': [this.data['App Migration Activity']],
      'Completion Attestation Funding Total': [this.data['Completion Attestation Funding Total']],
      'Resilience Class': [this.data['Resilience Class']],
      'DB Migration Activity': [this.data['DB Migration Activity']],
      Fundable: [this.data.Fundable],
      'Initial Attestation Funding Total': [this.data['Initial Attestation Funding Total']],
      Hyperscaler: [this.data.Hyperscaler],
      'Migration Method': [this.data['Migration Method']],
      'Migration Path': [this.data['Migration Path']],
      Pilot: [this.data.Pilot],
      'DB Cloud Target': [this.data['DB Cloud Target']],
      'Infrastructure Components': [this.data['Infrastructure Components']],
      'Initial Attestation Date': [this.data['Initial Attestation Date']]
    });
  }

  ngOnInit(): void {
 
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;

      this.appDataService.updateAppData(this.data.APP_ID, this.form.value).subscribe(
        (response) => {
          this.loading = false;
          this.snackBar.open('Update successful!', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(response);

        },
        (error) => {
          this.loading = false;
          this.snackBar.open('Error updating app data', 'Close', {
            duration: 3000,
          });
          console.error('Error updating app data', error);
        }
      );
    }
  }
}
