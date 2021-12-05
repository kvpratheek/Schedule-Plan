const cds = require('@sap/cds');

const moment = require('moment');

const cloudSDK = require('@sap/cloud-sdk-vdm-maintenance-plan-service');

module.exports = cds.service.impl(async function () {

    const plan = await cds.connect.to('API_MAINTENANCEPLAN');

    this.on('READ', 'MaintenancePlan', async req => {
        console.log("Read Called");
        return plan.run(req.query);
    });


    this.on('SchedulePlan', async req => {
        const mplanID = req.params[0].MaintenancePlan;
        try {
            const entity = await cloudSDK.MaintenancePlan.requestBuilder().getByKey(mplanID).execute({ destinationName: 'api-mplan' });
            console.log(entity.versionIdentifier + "The call is " + entity.maintenanceCall + "of Plan " + entity.maintenancePlan);
            const schedule = await cloudSDK.functionImports.startMaintPlnSchedule({ maintenancePlan: mplanID })
                .addCustomHeaders({ 'if-match': entity.versionIdentifier }).execute({ destinationName: 'api-mplan' });
            console.log("Schedule" + schedule);
            return entity;
        } catch (error) {
            return req.reject(400, 'Error Occured. Check if Maintenance Plan is already Scheduled.');
        }
        
    });

    this.on('RestartSchedule', async req => {
        const mplanID = req.params[0].MaintenancePlan;
        req.data.maintenancePlan = mplanID;
         if(req.data.schedulingStartDate != null){
             let dateVal = String(req.data.schedulingStartDate);
              req.data.schedulingStartDate = moment(dateVal, 'YYYY-MM-DD');   //dateVal; 
         }
        try {
        const entity = await cloudSDK.MaintenancePlan.requestBuilder().getByKey(mplanID).execute({ destinationName: 'api-mplan' });
        console.log("Read Success");
        const restart = await cloudSDK.functionImports.restartMaintPlnSchedule(req.data)
                               .addCustomHeaders({ 'if-match': entity.versionIdentifier }).execute({ destinationName: 'api-mplan' });
        console.log(JSON.stringify(restart));                       
        return entity;
        } catch (error) {
            return req.reject(400, error);
        }            
    });



});