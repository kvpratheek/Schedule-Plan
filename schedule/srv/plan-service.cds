using schedule.maintenanceplan as mplan from '../db/data-model';

service MaintenancePlan_API {
    entity MaintenancePlan as projection on mplan.MaintenancePlan
    actions {
    action SchedulePlan();
    action RestartSchedule();
    }
}
 