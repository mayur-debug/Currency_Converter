const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const swapBtn = document.querySelector("#swap-btn");
const amountInput = document.querySelector("#amount");

for(let select of dropdown){
    for( let currcode in countryList){
        let newoption= document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from"&& currcode==="USD"){
            newoption.selected="selected";
        }
        if(select.name==="to"&& currcode==="INR"){  
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

let convert=btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount= document.querySelector(".amount input");
    let amtvalue=amount.value;
   if (amtvalue <= 0 || isNaN(amtvalue)) {
    msg.innerText = "Please enter a valid amount";
    return;
}
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
   const response = await fetch(URL);
   const data = await response.json();
let rate =data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]; 
    console.log(response);
    let finalamount=amtvalue * rate;
    msg.innerText = `${amtvalue} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;                          
});
amountInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        convertCurrency();
    }
});
swapBtn.addEventListener("click", () => {
    let temp = fromcurr.value;
    fromcurr.value = tocurr.value;
    tocurr.value = temp;

    updateFlag(fromcurr);
    updateFlag(tocurr);
});