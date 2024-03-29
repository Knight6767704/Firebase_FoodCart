import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL: "https://cart-88ce6-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const shoppingListInDB=ref(database,"shoppingList")

const inputFeildEl=document.getElementById("input-field")
const addButtonEl=document.getElementById("add-button")
const shoppingListEl=document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFeildEl.value.trim(); // Trim leading and trailing spaces

    // Check if input value is not empty
    if (inputValue !== "") {
        push(shoppingListInDB, inputValue);
        clearInputFieldEl();
    } else {
        // Alert the user to enter a valid input
        alert("Should not be Null.");
    }
});


onValue(shoppingListInDB,function(snapshot){

    if(snapshot.exists()){
        let itemsArray=Object.entries(snapshot.val())


        clearShoppingListEl()

        for(let i=0;i<itemsArray.length;i++){
            let currentItem=itemsArray[i]
            let currentItemID=currentItem[0]
            let currentItemValue=currentItem[1]
            appendItemToShoppingEl(currentItem)
        }

    } else{
        shoppingListEl.innerHTML="No items here... yet"
    }
   
})

function clearInputFieldEl(){
    inputFeildEl.value=""
}

function appendItemToShoppingEl(item){
    //shoppingListEl.innerHTML+=`<li>${itemValue}</li>`
    let itemID=item[0]
    let itemValue=item[1]

    let newEl=document.createElement("li")

    newEl.textContent=itemValue

    newEl.addEventListener("click",function(){
        let exactLocationOfItemInDB=ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML=""
}