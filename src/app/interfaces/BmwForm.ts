import { FormControl } from "@angular/forms";

export interface BmwForm {
    APP_ID: string | null;
  APP_MIGRATION_ACTIVITY: string | null;
  APP_NAME: string | null;
  AS_IS_APPLICATION_TYPE_AND_TECH_STACK_TAGS: string | null;
  BUDGET_DIFFERENCE: string | null;
  BUDGET_REMAINING_AT_FG_T_3_AFTER_FUNDING_DISTRIBUTION: string | null;
  BUDGET_REQUESTED: string | null;
  CLOUD_ROOM_ID: string | null;
  COMPLETION_ATTESTATION_DATE: string | null;
  COMPLETION_ATTESTATION_FUNDING_TOTAL: string | null;
  CRITICALITY: string | null;
  DASHBOARD_SCOPE: string | null;
  DB_CLOUD_TARGET: string | null;
  DB_MIGRATION_ACTIVITY: string | null;
  DEPARTMENT: string | null;
  FUNDABLE: string | null;
  FUNDABLE_REASON: string | null;
  FUNDING_GENERATED: string | null;
  HYPERSCALER: string | null;
  INFRASTRUCTURE_COMPONENTS: string | null;
  INITIAL_ATTESTATION_DATE: string | null;
  INITIAL_ATTESTATION_FUNDING_TOTAL: string | null;
  INTERFACES_IN_OUT: string | null;
  JIRA_FIX_VERSION_END: string | null;
  JIRA_FIX_VERSION_START: string | null;
  MAX_ACCEPTABLE_DOWNTIME: string | null;
  MIGRATION_METHOD: string | null;
  MIGRATION_PATH: string | null;
  PILOT: string | null;
  RESILIANCE_CLASS: string | null;
  RESULTING_AWS_T_SHIRT_LSV_JIRA: string | null;
  STORY_POINTS: string | null;
  STRATEGY_BUDGET_RECEIVED: string | null;
  T_SHIRT_INFRA_LSV: string | null;
  T_SHIRT_INTERFACES: string | null;
  TARGET_ALL_APPLICATION_TYPE_AND_TECH_STACK_TAGS: string | null;
}

export type FormControlsOf<T extends Record<string, any>> = {
    [K in keyof T]: FormControl<T[K]>;
  };