
let str = "0";
let calculateStr = [];

class ListenerEventsForNumbers{

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
    #elementFromListener = null;
    


    constructor(elementId){
        this.elementId = elementId;        
        this.#textDisplay.textContent = str;
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
            this.#textDisplay.textContent = str
        })       
    }

    //events for arithmetic operators
    _listeningArithmeticEvents(){
        this.#listenerFunction(() => {
            calculateStr.push(str,this.#elementFromListener.textContent)
            this.#textDisplay?.textContent = "0";
        })
    }

}

// Calculate and eventListening for numbers
let numberArray = ["one","two","three","four","five","six","seven","eight","nine","zero"]

numberArray.forEach(i => {
    let obj = new ListenerEventsForNumbers(i)
    obj._listeningNumberEvents()
})


// Event Listening for arithmetic operator

const arithmeticOperatorArray = ["addition","subtraction","multiply","division"] 










