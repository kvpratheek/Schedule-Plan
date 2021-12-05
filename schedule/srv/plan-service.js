const cds = require('@sap/cds');
const api = require('@sap/cloud-sdk-vdm-maintenance-plan-service');
const { functionImports } = require('@sap/cloud-sdk-vdm-maintenance-plan-service');

module.exports = cds.service.impl(async function() {

    const plan = await cds.connect.to('API_MAINTENANCEPLAN');

    this.on('READ', 'MaintenancePlan', async req => {
        console.log("Read Called");
        return plan.run(req.query);
    });

    api.startMaintPlnSchedule
    this.on('SchedulePlan', async req => {
        console.log(req.params[0].MaintenancePlan);
     //   StartMaintPlnScheduleParameters.MaintenancePlan = req.params[0].MaintenancePlan;
        functionImports.startMaintPlnSchedule()
        return await functionImports.startMaintPlnSchedule({ MaintenancePlan : req.params[0].MaintenancePlan}).execute({ destinationName:'api-mplan' });
    }); 
    
    this.on('RestartSchedule', async req => {
        console.log("Restart Called");
        return await functionImports.restartMaintPlnSchedule({ MaintenancePlan : req.params[0].MaintenancePlan})
        .addCustomQueryParameters.execute({ destinationName:'api-mplan' });
    });     

    

});