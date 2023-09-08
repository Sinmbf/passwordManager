// Import functions


// Select items
const form = document.getElementById("detailForm");
const alertStored = document.querySelector(".alert-stored");
const websiteName = document.getElementById("website-name");
const username = document.getElementById("username");
const password = document.getElementById("password");
const submitBtn = document.getElementById("btn-submit");

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
}

// Function to show alert
const showAlertStored=()=>{
    alertStored.classList.add("show-alert");
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
        showAlertStored();
        resetForm();
    } else {
        let arr = JSON.parse(localStorage.getItem("passwords"));
        filterAndInsert(arr);
        showAlertStored();
        resetForm();
    }
})
