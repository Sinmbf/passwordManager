// Select Items
const table = document.querySelector(".table");
const alertDelete = document.querySelector(".alert-delete");

// Function to show items
const showItems = () => {
    if (localStorage.length < 1) {
        table.innerHTML = `
            <!-- Alert -->
            <div class="alert alert-danger fade show mt-3" role="alert">
               <strong> No Passwords Currently Stored! </strong> <a href="./index.html " class="
               alert-link text-success">Add Passwords</a>
            </div>
        `
    } else {
        table.innerHTML = "";
        table.innerHTML += `
            <thead class="table-dark">
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
                <tbody class="table-light">
                    <tr>
                        <td id="${element.website}${index}">${element.website} <i onclick="copyText('${element.website}',this)" class="copy-btn fa-solid fa-copy"></i> <button class="btn btn-secondary btn-sm" id="tool-tip">Copied!</button></td>
                        <td>${element.username} <i onclick="copyText('${element.username}',this)" class="copy-btn fa-solid fa-copy"></i> <button class="btn btn-secondary btn-sm" id="tool-tip">Copied!</button></td>
                        <td>${maskPassword(element.password)} <i onclick="copyText('${element.password}',this)" class="copy-btn fa-solid fa-copy"></i> <button class="btn btn-secondary btn-sm" id="tool-tip">Copied!</button></td>
                        <td><button onclick="deleteItems(this)" class="btn btn-primary btn-sm">Delete</button></td>
                    </tr>
                </tbody>
            `
        })
    }
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
    } else {
        showAlertDelete();
    }
    showItems();
}

// Function to mask password
const maskPassword = (password) => {
    let str = "";
    for (let i = 0; i < password.length; i++) {
        str += "*";
    }
    return str;
}

// Function to copy text
const copyText = (text, copyElement) => {
    // Copy the text to clipboard
    navigator.clipboard.writeText(text);
    // Show copy alert
    const tooltip = copyElement.parentElement.lastElementChild;
    tooltip.classList.add("show-toolTip");
    // Remove copy alert
    setTimeout(() => {
        tooltip.classList.remove("show-toolTip");
    }, 1000)
}

// Function to show alert
const showAlertDelete = () => {
    alertDelete.classList.add("show-alert");
    setTimeout(() => {
        alertDelete.classList.remove("show-alert");
    }, 1000)
}

// Load items 
window.addEventListener("DOMContentLoaded", () => {
    showItems();
})