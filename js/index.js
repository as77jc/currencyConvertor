const apiUrl = 'https://api.exchangeratesapi.io/latest';
import { flag } from '../js/flag.js'
import { flagCode } from '../js/flagCode.js'

let inputAmount = document.getElementById('original-currency-amount');
let exchangeFromList = document.getElementById('original-currency-unit');
let exchangeToList = document.getElementById('new-currency-unit');
let outputText = document.getElementById('output-text');

let curencyArray = [];
let rate = [];

let currentFrom = '';
let currentTo = '';
let currentRate = 0;

let indexFrom = 0;
let indexTo = 1;


let html = '';

async function getRate() {
    const data = await fetch(apiUrl);
    const currencyRate = await data.json();
    
    curencyArray = Object.keys(currencyRate.rates);
    curencyArray.unshift('EUR');
    
    rate = Object.values(currencyRate.rates);
    rate.unshift(1);
    
    curencyArray.forEach(cur => {
        html += `<option value="${cur}">${cur} ${flag[curencyArray.indexOf(cur)]}</option>`
    });
    
    // console.log(html)
    
    currentFrom = curencyArray[0];
    currentTo = curencyArray[1];
    currentRate = rate[1]

    exchangeFromList.innerHTML = html;
    exchangeToList.innerHTML = html;
    exchangeToList.value = 'CAD';
    
    update();
}

getRate();

///////////////////////////////////////////////////////////////////////
/// Update Output 
///////////////////////////////////////////////////////////////////////

function update () {
    currentRate = 1 / rate[indexFrom ] * rate[indexTo]
    
    outputText.innerHTML = `
        ${inputAmount.value} 
        ${flag[indexFrom]} 
        Converted by rate: 
        ${currentRate.toFixed(3)} 
        is 
        ${(inputAmount.value * currentRate).toFixed(3)} 
        ${flag[indexTo]} 
        `;
}

///////////////////////////////////////////////////////////////////////
/// Update Rate To Currency
///////////////////////////////////////////////////////////////////////

exchangeToList.addEventListener('change', e => {
    currentTo = '';
    
    indexTo = curencyArray.indexOf(exchangeToList.value);
    currentTo = curencyArray[indexTo];
    
    
    update();
})

///////////////////////////////////////////////////////////////////////
/// Update Rate From Currency
///////////////////////////////////////////////////////////////////////

exchangeFromList.addEventListener('change', e => {
    currentFrom = '';
    
    indexFrom = curencyArray.indexOf(exchangeFromList.value);
    currentFrom = curencyArray[indexFrom];
    
    update();
})

///////////////////////////////////////////////////////////////////////
/// Update when type new Amount
///////////////////////////////////////////////////////////////////////

inputAmount.addEventListener('keyup', e =>{
    
    update();
    
})
