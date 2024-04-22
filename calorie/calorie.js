let foods = [];

window.onload = function() {
    // Load foods from local storage on page load
    let savedFoods = localStorage.getItem('foods');
    if (savedFoods) {
        foods = JSON.parse(savedFoods);
        displayFoods();
    }
};

function addFood(event) {
    event.preventDefault();

    // Get food name and calories from form
    const foodNameInput = document.getElementById("food-name");
    const caloriesInput = document.getElementById("calories");
    const foodName = foodNameInput.value;
    const calories = parseInt(caloriesInput.value);

    // Validate inputs
    if (foodName === "" || isNaN(calories)) {
        alert("Please enter valid food details.");
        return;
    }

    // Create new food object
    const food = {
        name: foodName,
        calories: calories
    };

    // Add food to foods array
    foods.push(food);

    // Render foods
    displayFoods();

    // Clear form inputs
    foodNameInput.value = "";
    caloriesInput.value = "";
}

function deleteFood(event) {
    if (event.target.classList.contains("delete-btn")) {
        // Get food index from data-id attribute
        const foodIndex = parseInt(event.target.getAttribute("data-id"));

        // Remove food from foods array
        foods.splice(foodIndex, 1);

        // Render foods
        displayFoods();
    }
}

function displayFoods() {
    let calorieList = document.getElementById("calorie-list");
    calorieList.innerHTML = "";

    let totalCalories = 0;

    foods.forEach((food, index) => {
        let foodRow = document.createElement("tr");
        foodRow.innerHTML = `
            <td>${food.name}</td>
            <td>${food.calories}</td>
            <td class="delete-btn" data-id="${index}">Delete</td>
        `;
        calorieList.appendChild(foodRow);

        // Update total calories
        totalCalories += food.calories;
    });

    // Display total calories
    let totalCaloriesElement = document.getElementById("total-calories");
    totalCaloriesElement.textContent = totalCalories;

    // Save foods to local storage
    localStorage.setItem('foods', JSON.stringify(foods));
}

// Add event listeners
const calorieForm = document.getElementById("calorie-form");
calorieForm.addEventListener("submit", addFood);
const calorieList = document.getElementById("calorie-list");
calorieList.addEventListener("click", deleteFood);

// Render initial foods on page load
displayFoods();
