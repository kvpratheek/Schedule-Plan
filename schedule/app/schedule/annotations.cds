using MaintenancePlan_API as service from '../../srv/plan-service';

annotate service.MaintenancePlan with 
@ UI : { 
    
    SelectionFields  : [  MaintenancePlan  ],
    
    LineItem  : [
    {
        $Type : 'UI.DataFieldForAction',
        Action : 'MaintenancePlan_API.SchedulePlan',
        Label : 'Schedule'
    
    },  
    {
        $Type : 'UI.DataFieldForAction',
        Action : 'MaintenancePlan_API.RestartSchedule',
        Label : 'Re-Schedule'
    
    },       
    {
        $Type : 'UI.DataField',
        Value : MaintenancePlan
    },
    {
        $Type : 'UI.DataField',
        Value : MaintenancePlanDesc
    },
    {
        $Type : 'UI.DataField',
        Value : MaintenancePlanCategory
    },
    {
        $Type : 'UI.DataField',
        Value : MaintenanceStrategy
    },
    {
        $Type : 'UI.DataField',
        Value : MaintPlanSchedgIndicator
    },
    {
        $Type : 'UI.DataField',
        Value : CreationDate
    },
    {
        $Type : 'UI.DataField',
        Value : CreatedByUser
    }

    
], }
{
    MaintenancePlan @title : 'Maintenance Plan';
    MaintenancePlanDesc @title : 'Description';
    MaintenancePlanCategory @title : 'Category';
    MaintenanceStrategy @title : 'Strategy';
    MaintPlanSchedgIndicator @title : 'Scheduling Indicator';
    CreationDate @title : 'Creation Date';
    CreatedByUser @title: 'Created By';
};
