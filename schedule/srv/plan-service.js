const cds = require('@sap/cds');

const cloudSDK = require('@sap/cloud-sdk-vdm-maintenance-plan-service');

module.exports = cds.service.impl(async function () {

    const plan = await cds.connect.to('API_MAINTENANCEPLAN');

    this.on('READ', 'MaintenancePlan', async req => {
        console.log("Read Called");
        return plan.run(req.query);
    });


    this.on('SchedulePlan', async req => {
        const mplanID = req.params[0].MaintenancePlan;
        console.log("Schedule Started with " + mplanID);
        try {
            const entity = await cloudSDK.MaintenancePlan.requestBuilder().getByKey(mplanID).execute({ destinationName: 'api-mplan' });
            console.log(entity.versionIdentifier + "The call is " + entity.maintenanceCall + "of Plan " + entity.maintenancePlan);
            const schedule = await cloudSDK.functionImports.startMaintPlnSchedule({ maintenancePlan: mplanID })
                .addCustomHeaders({ 'if-match': entity.versionIdentifier }).execute({ destinationName: 'api-mplan' });
            console.log("Schedule" + schedule);
            req.reply(entity);
        } catch (error) {
            req.reject( "Error Occured. Check if Maintenance Plan is already Scheduled.")
            return;
        }
        
    });

    this.on('RestartSchedule', async req => {
        const mplanID = req.params[0].MaintenancePlan;
        console.log("Schedule Started with " + mplanID);
        const entity = await cloudSDK.MaintenancePlan.requestBuilder().getByKey(mplanID).execute({ destinationName: 'api-mplan' });
        console.log(entity.versionIdentifier + "The call is " + entity.maintenanceCall + "of Plan " + entity.maintenancePlan);
        return await cloudSDK.functionImports.startMaintPlnSchedule({ maintenancePlan: mplanID })
            .addCustomHeaders({ 'if-match': entity.versionIdentifier }).execute({ destinationName: 'api-mplan' });
    });



});