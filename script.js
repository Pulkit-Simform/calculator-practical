'use strict'


let str = "0";
let calculateStr = [];

const factorialFunction = (value) => {
    if(value === "0") return "1"            
    else if(value === "1") return "1"
    else{
        let temp = parseInt(value)
        let sum = 1;
        while(temp!==0){
            sum *= temp;
            temp--;
        }
        return sum;
    }
}

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
            str = callbackfn();
            this.#textDisplay.value = str;            
        })
    }

    // Adding events for individual units
    //events for number
    _listeningNumberEvents = () => {
        this.#listenerFunction(() => {
            return str === "0" ? this.#elementMap.get(this.elementId).toString() : str.concat(this.#elementMap.get(this.elementId).toString())            
        })              
    }

    //events for arithmetic operators
    _listeningArithmeticEvents(){
        this.#listenerFunction(() => {
            calculateStr.push(str,this.#elementFromListener.textContent)
            return "0";            
        })
    }

    //after equal operator clicks or enter
    _returnArithmeticOperations(){
        this.#listenerFunction(() => {
            // console.log(calculateStr.length)
            if(calculateStr.length > 0){
                calculateStr.push(str)
            
                let sum = eval(calculateStr.toString().replaceAll(",",""))
                calculateStr = []
                return sum;
            }else{
                let sum = this.#textDisplay.value                                
                return eval(sum);
            }
        })
    }

    _miscOperation(s){ 
        this.#listenerFunction(() => {            
            if(!isNaN(parseInt(s))) return s;            
            else if(s === "(" || s === "-") return s.concat(str)            
            else{
                let temp = str;
                return temp.concat(s)
            }
        });
    }

    _computeOperation(s){
        this.#listenerFunction(() => {
            let t = Number(str)
            let tempObj = {
                "sineFunction":Math.sin(t),
                "cosineFunction":Math.cos(t),
                "tangentFunction":Math.tan(t),
                "log":Math.log(t),
                "raiseToTen":Math.pow(10,t),
                "abs":Math.abs(t),
                "root":Math.sqrt(t), 
                "square":Math.pow(t,2)
            }
           if(s === "factorial"){
               return factorialFunction(str)
           }
           else {
            return tempObj[s];
           }
           
        });
    }

    _clearOperation(s){
        this.#listenerFunction(() => {
            let temp = str;
            
            if(s === "clear" && temp.length > 1){                
                temp = temp.split("")
                temp.pop();
                temp = temp.toString().replaceAll(",","")            
                return temp                
            }
            if(s === "ce"){
                calculateStr = [];
                return "0"
            }
            else{
                return "0"
            }
        })
    }

}

function main(){
    
    // Calculate and eventListening for numbers
    const globalObjAssign = {
        numberArray:["one","two","three","four","five","six","seven","eight","nine","zero"],
        arithmeticOperatorArray: ["addition","subtraction","multiply","division","modulo"],
        equalOperator:["equal"],
        clearOperator:["clear","ce","c"],
        miscOperator:["dot","left-parentheses","right-parentheses","pi","exponential","plus-minus","raiseTo"],
        computeOperator:["factorial","sineFunction","cosineFunction","tangentFunction","log","abs","root","raiseToTen","square"],        
    }

    // Will bind an Object and will return the Object
    const ObjReturn = (x) => {
        let obj = new Array();
        globalObjAssign[x].forEach(i => {
            obj.push(new ListenerEvents(i))            
        })        
        return obj;
    }

    //bind string for equal operator
    // you can add there and will later 
    const bindString = {
        "dot":".",        
        "left-parentheses":"(",
        "right-parentheses":")",
        "pi":"3.142857143",
        "exponential":"2.718281828",
        "plus-minus":"-",
        "raiseTo":"**"
    };

    
    
    // main logic
    for(let x of Object.keys(globalObjAssign)){
    
        switch(x){
            case "numberArray":                
                ObjReturn(x).forEach(x => x._listeningNumberEvents())
                break;
            
            case "arithmeticOperatorArray":
                ObjReturn(x).forEach(i => i._listeningArithmeticEvents())
                break;
    
            case "equalOperator":
                ObjReturn(x).forEach(i => i._returnArithmeticOperations())
                break;
            
            case "miscOperator":
                ObjReturn(x).forEach(i => {                    
                    i._miscOperation(bindString[i.elementId])
                })
                break;

            case "clearOperator":
                ObjReturn(x).forEach(i => {
                    i._clearOperation(i.elementId)
                })
                break;

            case "computeOperator":
                ObjReturn(x).forEach(i => {                    
                    i._computeOperation(i.elementId)
                })
                break;
            
            default:
                break;    
        }            
    }
}    

main();

// keyboard event listening

let prev = ""

document.addEventListener('keydown', (event) => {
    let val = event.key;
    console.log(val)
    let numericReg = /^\d+$/;
    let operandCheck = /[\+\-\*\/\%\.\!]/g;

    let displayStr = document.getElementById("displayStr")
    // for numeric regex checking
    if(numericReg.test(val)){        
        if(displayStr.value === "0"){        
            displayStr.value = val;
        }else{
            displayStr.value += val;
        }        
    }

    // for plus minus division and multiplication reg checking
    if(operandCheck.test(val)){
        if(displayStr.value === "0"){        
            displayStr.value = val;
        }else{
            displayStr.value += val;
        }
    }

    if(val === "Enter" || val === "="){
        try{
            let answer = null;
            if(displayStr.value.slice(-1) === "!"){
                answer = factorialFunction(displayStr.value.slice(0,-1))
            }else{
                answer = eval(displayStr.value)
            }

            // setTimeout(() => {                
            //     displayStr.value = "0"
            // },500)
            
            displayStr.value = answer

        }catch (e) {                        
         
            setTimeout(() => { 
                displayStr.value = "0"            
                displayStr.classList.remove("bg-danger","text-white");
            },1000)                
        
            displayStr.value = "Please Enter the Proper Value"
            displayStr.classList.add("bg-danger","text-white");
            
        }
    }

    if(val === "Backspace"){
        if(displayStr.value === "0" || displayStr.value.length === 1){        
            displayStr.value = 0;
        }
        else{
            displayStr.value = displayStr.value.slice(0,displayStr.value.length-1)            
        }
    }


    if((prev === "Shift" && val === "(") || (prev === "Shift" && val === ")") ){
        
        if(displayStr.value === "0"){        
            displayStr.value = val;
        }
        else{
            displayStr.value += val;
        }
    }

   



    prev = val

  }, false);

  //cancel button
  document.querySelector("#cancelButton").addEventListener("click",() => {
    document.querySelector(".switch").classList.remove("d-none")
    document.querySelector(".switchTo").classList.add("d-none")
  })

  document.querySelector("#showButton").addEventListener("click",() => {
    document.querySelector(".switch").classList.add("d-none")
    document.querySelector(".switchTo").classList.remove("d-none")
  })

  document.getElementById("hideButton").addEventListener("click",() => {
    let s = document.querySelector(".displayShow")
    if(s.classList?.contains("d-none")) s.classList.remove("d-none")
    else s.classList.add("d-none")
  })