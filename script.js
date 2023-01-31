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
            calculateStr.push(str)
            let sum = eval(calculateStr.toString().replaceAll(",",""))            
            calculateStr = []
            return sum;
        })
    }

    _concateTheString(s){ 
        this.#listenerFunction(() => {
            if(s === "0") return "0"
            else if(s === "3.142857143") return "3.142857143"
            else if(s === "("){
                return s.concat(str)
            }
            else{
                let temp = str;
                return temp.concat(s)
            }
        });
    }

}

function main(){
    
    // Calculate and eventListening for numbers
    const globalObjAssign = {
        numberArray:["one","two","three","four","five","six","seven","eight","nine","zero"],
        arithmeticOperatorArray: ["addition","subtraction","multiply","division"],
        equalOperator:["equal"],
        clearOperator:["dot","clear","left-parentheses","right-parentheses","pi"]
    }

    // Will bind an Object and will return the Object
    const ObjReturn = (x) => {
        let obj = new Array();
        globalObjAssign[x].forEach(i => {
            obj.push(new ListenerEvents(i))            
        })        
        return obj;
    }


    const bindString = {
        "dot":".",
        "clear":"0",
        "left-parentheses":"(",
        "right-parentheses":")",
        "pi":"3.142857143"
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
            
            case "clearOperator":
                ObjReturn(x).forEach(i => {                    
                    i._concateTheString(bindString[i.elementId])
                })
                break;

            default:
                break;    
        }            
    }
}    

main();



// for all keyboard events
document.addEventListener('keydown', (event) => {
    var name = event.key;
        

    if(!isNaN(name) || name === "."){
        str = str === "0" ? name : str.concat(name)
        document.getElementById("displayStr").value = str;
    }
    
    
}, false);

