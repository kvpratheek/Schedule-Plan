namespace schedule.maintenanceplan;
using { API_MAINTENANCEPLAN as plan } from '../srv/external/API_MAINTENANCEPLAN.csn';
entity MaintenancePlan as projection on plan.MaintenancePlan {
  key MaintenancePlan,
      MaintenancePlanDesc,
      MaintenanceStrategy,
      MaintenancePlanCategory,
      MaintPlanSchedgIndicator,
      BasicStartDate,
      SchedulingStartDate,
      SchedulingStartTime,
      CreationDate,
      CreatedByUser,
      LastChangeDate,
      LastChangedByUser
}