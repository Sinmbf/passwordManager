// Select items
const form = document.getElementById("detailForm");
const websiteName = document.getElementById("website-name");
const username = document.getElementById("username");
const password = document.getElementById("password");
const submitBtn = document.getElementById("btn-submit");
const table = document.querySelector(".table");


// Function to add to local storage
const filterAndInsert = (arr) => {
    const siteName = websiteName.value;
    const uName = username.value;
    const passW = password.value;
    // check if the array already has the same input
    const condition1 = arr.some(e => e.website === siteName);
    const condition2 = arr.some(e => e.username === uName);
    const condition3 = arr.some(e => e.password === passW);
    /* Conditions
    
    1. Different website but same username and password
    2. Different username and different password
    3. Same username but different password
    4. Different username but same password
    
    */

    if ((!condition1 && condition2 && condition3) || (!condition2 && !condition3) || (condition2 && !condition3) || (!condition2 && condition3)) {
        arr.push({
            website: siteName,
            username: uName,
            password: passW
        })
    }
    localStorage.setItem("passwords", JSON.stringify(arr));
    showItems();
}

// Function to show items
const showItems = () => {
    if (localStorage.length < 1) {
        table.innerHTML = `
            <div div class = "alert alert-danger fade show" role = "alert" >
               <strong>No passwords currently stored!</strong> 
            </div>
        `
    } else {
        table.innerHTML = "";
        table.innerHTML += `
            <thead>
                <tr>
                    <th scope="col">Website</th>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
        `
        const items = JSON.parse(localStorage.getItem("passwords"));
        items.forEach((element, index) => {
            table.innerHTML += `
                <tbody>
                    <tr>
                        <td id="${element.website}${index}">${element.website} <i onclick="copyText('${element.website}',this)" class="copy-btn fa-solid fa-copy"></i> <button class="btn btn-secondary btn-sm">Copied!</button></td>
                        <td>${element.username} <i onclick="copyText('${element.username}',this)" class="copy-btn fa-solid fa-copy"></i> <button class="btn btn-secondary btn-sm">Copied!</button></td>
                        <td>${maskPassword(element.password)} <i onclick="copyText('${element.password}',this)" class="copy-btn fa-solid fa-copy"></i> <button class="btn btn-secondary btn-sm">Copied!</button></td>
                        <td><button onclick="deleteItems(this)" class="btn btn-primary">Delete</button></td>
                    </tr>
                </tbody>
            `
        })
    }
}

// Function to mask password
const maskPassword=(password)=>{
    let str="";
    for(let i=0;i<password.length;i++){
        str+="*";
    }
    return str;
} 

// Function to copy text
const copyText = (text,copyElement) => {
    // Copy the text to clipboard
    navigator.clipboard.writeText(text);
    // Show copy alert
    const tooltip=copyElement.parentElement.lastElementChild;
    tooltip.classList.add("show-btn");
    setTimeout(()=>{
        tooltip.classList.remove("show-btn");
    },1000)
}

// Function to delete items
const deleteItems = (btn) => {
    const arr = JSON.parse(localStorage.getItem("passwords"));
    const Id = btn.parentElement.parentElement.firstElementChild.id;
    const filterArr = arr.filter((element, index) => {
        if (`${element.website}${index}` !== Id) {
            return element;
        }
    })
    localStorage.setItem("passwords", JSON.stringify(filterArr));
    const storage = JSON.parse(localStorage.getItem("passwords"));
    if (storage.length < 1) {
        localStorage.removeItem("passwords");
    }
    showItems();

}

// Function to reset form
const resetForm = () => {
    websiteName.value = "www.";
    username.value = "";
    password.value = "";
}

// Submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (localStorage.length < 1) {
        let arr = new Array;
        arr.push({
            website: websiteName.value,
            username: username.value,
            password: password.value
        })
        localStorage.setItem("passwords", JSON.stringify(arr));
        showItems();
        resetForm();
    } else {
        let arr = JSON.parse(localStorage.getItem("passwords"));
        filterAndInsert(arr);
        resetForm();
    }
})

window.addEventListener("DOMContentLoaded", () => {
    showItems();
})