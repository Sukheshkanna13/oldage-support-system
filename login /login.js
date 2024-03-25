document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    let accountNumber = document.getElementById("accountNumber").value;
    let password = document.getElementById("password").value;
    
    // Default account number and password
    const defaultAccountNumber = "123456789";
    const defaultPassword = "1234";
    
    // Check if entered account number and password match the defaults
    if (accountNumber === defaultAccountNumber && password === defaultPassword) {
        // Redirect to index.html
        window.location.href = "../main-menu/main-menu.html";
    } else {
        // Display error message or handle invalid login
        alert("Invalid account number or password. Please try again.");
    }
});
