const { DAILY_SAL } = require("../common/constant/product");

const getEligibleSalaryData = ( nmber ) => {
    const count = parseInt(nmber);
    if( 2 <= count > 0 ){
        return DAILY_SAL.find(x => x.count == 2);
    } else if (5 <= count > 2) {
        return DAILY_SAL.find(x => x.count == 5);
    } else if (10 <= count > 5) {
        return DAILY_SAL.find(x => x.count == 10);
    } else if (20 <= count > 10) {
        return DAILY_SAL.find(x => x.count == 20);
    } else if (50 <= count > 20) {
        return DAILY_SAL.find(x => x.count == 50);
    } else if (100 <= count > 50) {
        return DAILY_SAL.find(x => x.count == 100);
    }
}

module.exports = { getEligibleSalaryData };