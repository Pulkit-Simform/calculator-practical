
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
        this.#elementFromListener.addEventListener("click",callbackfn)
    }
    


    // Adding events for individual units
    //events for number
    _listeningNumberEvents = () => {
        this.#listenerFunction(() => {
            str = str === "0" ? this.#elementMap.get(this.elementId).toString() : str.concat(this.#elementMap.get(this.elementId).toString())            
            this.#textDisplay.value = str
        })       
    }

    //events for arithmetic operators
    _listeningArithmeticEvents(){
        this.#listenerFunction(() => {
            calculateStr.push(str,this.#elementFromListener.textContent)
            // alert(calculateStr)
            this.#textDisplay.textContent = "0";
            str = "0";
        })
    }

}

// Calculate and eventListening for numbers
let numberArray = ["one","two","three","four","five","six","seven","eight","nine","zero"]

numberArray.forEach(i => {
    let obj = new ListenerEvents(i)
    obj._listeningNumberEvents()
})


// Event Listening for arithmetic operator

const arithmeticOperatorArray = ["addition","subtraction","multiply","division"] 

arithmeticOperatorArray.forEach((i) => {
    let obj = new ListenerEvents(i)
    obj._listeningArithmeticEvents()
})

document.getElementById("equal").addEventListener("click",() => {
    calculateStr.push(str)
    let sum = eval(calculateStr.toString().replaceAll(",",""))
    document.getElementById("displayStr").value = sum;
    str = sum;    
    calculateStr = [];
}); 

document.getElementById("clear").addEventListener("click",() => {
    str = 0;
    document.getElementById("displayStr").value = str;
})



// keyboard events listening
// will listen globally

document.addEventListener('keydown', (event) => {
    var name = event.key;
    
    

    if(/^\d+$/.test(name) || name === "."){
        str = str === "0" ? name : str.concat(name)
        document.getElementById("displayStr").value = str;
    }
    // Alert the key name and key code on keydown
    
}, false);

document.getElementById("dot").addEventListener("click",() => {
    str = str.concat(".")
    document.getElementById("displayStr").value = str;
})