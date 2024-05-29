import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  itemId: string = '';


  constructor(private fb: FormBuilder, private route: ActivatedRoute){
    this.form = this.fb.group({
      APP_ID: ['', Validators.required],
      APP_MIGRATION_ACTIVITY: ['', [Validators.required]],
      APP_NAME: ['', [Validators.required]],
      AS_IS_APPLICATION_TYPE_AND_TECH_STACK_TAGS: ['', Validators.required],
      BUDGET_DIFFERENCE: ['', [Validators.required]],
      BUDGET_REMAINING_AT_FG_T_3_AFTER_FUNDING_DISTRIBUTION: ['', [Validators.required]],
      BUDGET_REQUESTED: ['', Validators.required],
      CLOUD_ROOM_ID: ['', [Validators.required]],
      COMPLETION_ATTESTATION_DATE: ['', [Validators.required]],
      COMPLETION_ATTESTATION_FUNDING_TOTAL: ['', Validators.required],
      CRITICALITY: ['', [Validators.required]],
      DASHBOARD_SCOPE: ['', [Validators.required]],
      DB_CLOUD_TARGET: ['', [Validators.required]],
      DB_MIGRATION_ACTIVITY: ['', [Validators.required]],
      DEPARTMENT: ['', Validators.required],
      FUNDABLE: ['', [Validators.required]],
      FUNDABLE_REASON: ['', [Validators.required]],
      FUNDING_GENERATED: ['', [Validators.required]],
      HYPERSCALER: ['', [Validators.required]],
      INFRASTRUCTURE_COMPONENTS: ['', [Validators.required]],
      INITIAL_ATTESTATION_DATE: ['', [Validators.required]],
      INITIAL_ATTESTATION_FUNDING_TOTAL: ['', Validators.required],
      INTERFACES_IN_OUT: ['', [Validators.required]],
      JIRA_FIX_VERSION_END: ['', [Validators.required]],
      JIRA_FIX_VERSION_START: ['', [Validators.required]],
      MAX_ACCEPTABLE_DOWNTIME: ['', [Validators.required]],
      MIGRATION_METHOD: ['', [Validators.required]],
      MIGRATION_PATH: ['', [Validators.required]],
      PILOT: ['', Validators.required],
      RESILIANCE_CLASS: ['', [Validators.required]],
      RESULTING_AWS_T_SHIRT_LSV_JIRA: ['', [Validators.required]],
      STORY_POINTS: ['', [Validators.required]],
      STRATEGY_BUDGET_RECEIVED: ['', [Validators.required]],
      T_SHIRT_INFRA_LSV: ['', Validators.required],
      T_SHIRT_INTERFACES: ['', [Validators.required]],
      TARGET_ALL_APPLICATION_TYPE_AND_TECH_STACK_TAGS: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // this.itemId = this.route.snapshot.params.id;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    }
  }
}
