let validationObj = new Object();

validationObj.validateSchedule = (mPlan, data) => {

    let result = { error: false, message: "", data: {} };

    result.data.maintenancePlan = mPlan.maintenancePlan;

    if (mPlan.MaintenanceCall > 0) {
        result.error = true;
        result.message = `Maintenance Plan ${mPlan.MaintenancePlan} already Scheduled`;
        return result;
    }

    if (mPlan.MaintPlanSchedgIndicator == '3') {

        if (data.maintPlanStartCntrReadingValue === null) {
            result.error = true;
            result.message = `Maintenance Plan ${mPlan.MaintenancePlan} is Performance based, Please provide Start Counter Reading Value`;
            return result;
        }

        result.data.maintPlanStartCntrReadingValue = data.maintPlanStartCntrReadingValue;

    }

    if (mPlan.MaintPlanSchedgIndicator !== '3') {

        if (data.schedulingStartDate === null) {
            result.error = true;
            result.message = `Maintenance Plan ${mPlan.MaintenancePlan} is Time based, Please provide Scheduling Start Date`;
            return result;
        }

        result.data.schedulingStartDate = data.schedulingStartDate;

        if (data.schedulingStartTime !== null) {
            result.data.schedulingStartTime = data.schedulingStartTime;
        }

    }
    return result;

};

validationObj.validateRestart = (mPlan, data) => {

    let result = { error: false, message: "", data: {} };

    result.data.maintenancePlan = mPlan.maintenancePlan;

    if (mPlan.MaintenanceCall == '0') {
        result.error = true;
        result.message = `Maintenance Plan ${mPlan.MaintenancePlan} never Scheduled`;
        return result;
    }

    if (mPlan.MaintPlanSchedgIndicator == '3') {

        if (data.maintPlanStartCntrReadingValue === null) {
            result.error = true;
            result.message = `Maintenance Plan ${mPlan.MaintenancePlan} is Performance based, Please provide Start Counter Reading Value`;
            return result;
        }

        result.data.maintPlanStartCntrReadingValue = data.maintPlanStartCntrReadingValue;

    }

    if (mPlan.MaintPlanSchedgIndicator !== '3') {

        if (data.schedulingStartDate === null) {
            result.error = true;
            result.message = `Maintenance Plan ${mPlan.MaintenancePlan} is Time based, Please provide Scheduling Start Date`;
            return result;
        }

        result.data.schedulingStartDate = data.schedulingStartDate;

        if (data.schedulingStartTime !== null) {
            result.data.schedulingStartTime = data.schedulingStartTime;
        }

    }
    result.data.maintPlanSchedFutrCallsAreKept = data.maintPlanSchedFutrCallsAreKept;
    return result;
};

module.exports = validationObj;