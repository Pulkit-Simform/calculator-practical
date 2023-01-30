let str = "0"

let textDisplay = document.getElementById("displayStr")


document.getElementById("pi")?.addEventListener("click",() =>{
    str = "3.14"  
})

textDisplay.textContent = str;


