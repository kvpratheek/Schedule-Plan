using schedule.maintenanceplan as mplan from '../db/data-model';

service MaintenancePlan_API {
    entity MaintenancePlan as projection on mplan.MaintenancePlan
    actions {
    action SchedulePlan( @title: 'Scheduling Start Date' schedulingStartDate : Date,
                         @title: 'Scheduling Start Time' schedulingStartTime : Time, 
                         @title: 'Start Counter Reading Value' maintPlanStartCntrReadingValue : String );
                         
    action RestartSchedule( @title : 'Keep Fututre calls?' maintPlanSchedFutrCallsAreKept : Boolean, 
                            @title : 'New Start Date' schedulingStartDate : Date,
                            @title: 'New Start Time' schedulingStartTime : Time,
                            @title: 'New Counter Reading Value' maintPlanStartCntrReadingValue : String );
    }
}
 