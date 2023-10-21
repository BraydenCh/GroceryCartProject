let countEl = document.getElementById("count-el")
const qty =document.getElementById("qty")
const name2 =document.getElementById("uname")
const ulEl = document.getElementById("table-el")
let nameEl = document.getElementById("name-el")
let myNamesArray =[]
let myQtyArray=[]
let count =0;
let button = document.getElementById("increment-btn");
let price =0;





button.addEventListener("click",function() {
   let nameValue = name2.value
    let qtyValue = qty.value
    count=count+1
    countEl.innerText=count + ' unique items';
    myNamesArray.push(nameValue)
    myQtyArray.push(qtyValue)
    console.log(nameValue);
    ulEl.innerHTML +="<tr>"+"<td>" +nameValue + "</td><td> " + qtyValue + "</td><td> "+price+"</td></tr>"
})


