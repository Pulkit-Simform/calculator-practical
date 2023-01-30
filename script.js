'use strict'


let str = "0";
let calculateStr = [];

class ListenerEvents{

    #elementMap = new Map([
        ["zero","0"],
        ["one","1"],
        ["two","2"],
        ["three","3"],
        ["four","4"],
        ["five","5"],
        ["six","6"],
        ["seven","7"],
        ["eight","8"],
        ["nine","9"]
    ])

    #textDisplay = document.getElementById("displayStr")
    #elementFromListener = "0";
    


    constructor(elementId){
        this.elementId = elementId;        
        this.#textDisplay.value = str;
        this.#elementFromListener = document.getElementById(this.elementId)
    }


    // listener callback function that retrun callback : higher order function
    #listenerFunction(callbackfn){
        this.#elementFromListener.addEventListener("click",() => {            
            callbackfn();
            console.log("Before coming str value",str)
            this.#textDisplay.value = str;
            // alert("from listener function",str)
        })
    }
    


    // Adding events for individual units
    //events for number
    _listeningNumberEvents = () => {
        this.#listenerFunction(() => {
            str = str === "0" ? this.#elementMap.get(this.elementId).toString() : str.concat(this.#elementMap.get(this.elementId).toString())            
        })       
    }

    //events for arithmetic operators
    _listeningArithmeticEvents(){
        this.#listenerFunction(() => {
            calculateStr.push(str,this.#elementFromListener.textContent)
            str = "0";
            console.log("After all does this calling ?")
        })
    }

    //after equal operator clicks or enter
    _returnArithmeticOperations(){
        this.#listenerFunction(() => {
            calculateStr.push(str)
            let sum = eval(calculateStr.toString().replaceAll(",",""))            
            str = sum;
            
            calculateStr = []
        })
    }

    _clearScreen(){
        this.#listenerFunction(() => {
            str = 12;
        })        
    }

}

function main(){
    
    // Calculate and eventListening for numbers
    const globalObjAssign = {
        numberArray:["one","two","three","four","five","six","seven","eight","nine","zero"],
        arithmeticOperatorArray: ["addition","subtraction","multiply","division"],
        equalOperator:["equal"],
        clearOperator:["clear"]
    }
    
    
    // main logic
    for(let x of Object.keys(globalObjAssign)){
    
        switch(x){
            case "numberArray":
                globalObjAssign[x].forEach(i => {
                    let obj = new ListenerEvents(i)
                    obj._listeningNumberEvents()
                })
                break;
            
            case "arithmeticOperatorArray":
                globalObjAssign[x].forEach(i => {
                    let obj = new ListenerEvents(i)
                    obj._listeningArithmeticEvents()
                })
                break;
    
            case "equalOperator":
                globalObjAssign[x].forEach(i => {
                    let obj = new ListenerEvents(i)
                    obj._returnArithmeticOperations()
                })
                break;
            
            case "clearOperator":
                globalObjAssign[x].forEach(i => {
                    let obj = new ListenerEvents(i)
                    obj._clearScreen()
                })
                break;
                
            default:
                break;
    
        }
            
    }

}    

main();



document.getElementById("clear").addEventListener("click",() => {
    str = 0;
    document.getElementById("displayStr").value = str;
})



// keyboard events listening
// will listen globally

document.addEventListener('keydown', (event) => {
    var name = event.key;
        

    if(!isNaN(name) || name === "."){
        str = str === "0" ? name : str.concat(name)
        document.getElementById("displayStr").value = str;
    }
    
    
}, false);

document.getElementById("dot").addEventListener("click",() => {
    str = str.concat(".")
    document.getElementById("displayStr").value = str;
})