const splitCalc = (data) => {

    
const {ID, Amount, SplitInfo} = data;
let Balance = Amount;
let SplitBreakdown = [];
let result = {
    ID,
    Balance
};
let totalRatio = 0;
const splitRatio = [];
const splitPerc = [];

SplitInfo.forEach(element => {
    let {SplitType, SplitValue, SplitEntityId} = element;
    if(SplitType == 'FLAT') {
        Balance = Balance - SplitValue;
        SplitBreakdown.push({
            SplitEntityId,
            "Amount": SplitValue
        })
    } else if (SplitType == 'PERCENTAGE') {
        splitPerc.push(element);
    } else if(SplitType == 'RATIO') {
        splitRatio.push(element)
        totalRatio = totalRatio + element.SplitValue;
    } 
});

splitPerc.forEach(element => {
        let {SplitValue, SplitEntityId} = element;
        let perc = ((SplitValue * Balance) / 100);
        Balance = Balance - perc;
        SplitBreakdown.push({
            SplitEntityId,
            "Amount": perc,
    
        })
    
    }
    
    );


if(splitRatio.length>0){

    splitRatio.forEach( element => {
        let {SplitValue, SplitEntityId} = element;
        let ratioValue = (SplitValue * Balance) / totalRatio;
        SplitBreakdown.push({
            SplitEntityId,
            "Amount": ratioValue,
    
        })
        
    })
    Balance = 0;
}

if(Balance<0){
    Balance = 0;
}
return {...result, SplitBreakdown, Balance};
}

module.exports = splitCalc;