export const createTableData = (defaultState, ratesData)  => {
  let finUnits = defaultState.finUnits;
  let positions = defaultState.positions;
  let rates = ratesData.rates;
  let tableData = [];
  let aggregatedData = [];

  positions.forEach((position) => {
    let finUnit = finUnits.find(finUnit => finUnit.id === position.fuOriginId);
    let currency = position.data.currency.ccy;
    let rate = rates[currency]
    let notionalValue = position.data.currency.notionalValue;

    // table data elem
    let obj = {
      finUnitName : finUnit.name,
      notionalValue,
      rate,
      currency,
      calculatedValue : notionalValue / rate
    }

    // aggregate data elem
    if(!aggregatedData.some(item => item.name === obj.finUnitName)) {
      aggregatedData.push({
        name: obj.finUnitName,
        calculatedValue: obj.calculatedValue
      });
    } else {
      aggregatedData.forEach((item, i) => {
        if (item.name === obj.finUnitName) {
          item.calculatedValue += obj.calculatedValue;
        }
      });
    }

    tableData.push(obj);

  });
  return {tableData, aggregatedData, rates};

};
