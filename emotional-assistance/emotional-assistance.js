// Get reference to the response paragraph
const responseParagraph = document.getElementById("response-text");

// Function to handle button clicks and provide responses
function handleEmotionSelection(emotion) {
    let response;
    switch (emotion) {
        case "happy":
            response = "I'm thrilled to hear that you're feeling happy! Embracing moments of joy is so important for our overall well-being. It's fantastic that you're experiencing positive emotions, and I encourage you to savor this feeling and reflect on what has brought you happiness. Whether it's spending time with loved ones, achieving a personal goal, or simply appreciating the little things in life, happiness is a wonderful emotion to cherish. Remember to continue nurturing your happiness by engaging in activities that bring you joy, expressing gratitude for the positive aspects of your life, and spreading kindness to others. Your happiness is valuable and deserving of celebration, so bask in the glow of this positive emotion and let it inspire you to keep shining bright!";
            break;
        case "sad":
            response = "I'm sorry to hear that you're feeling sad. It's completely normal to experience sadness from time to time, and it's important to take care of yourself during these moments. Remember that it's okay to express your feelings and that you're not alone. Sometimes, engaging in activities that bring you joy or spending time with loved ones can help lift your spirits. You might also find it helpful to practice self-care techniques such as deep breathing, meditation, or engaging in hobbies that you enjoy. If your feelings of sadness persist or become overwhelming, it's okay to reach out for additional support from friends, family, or a mental health professional. Take things one step at a time, and remember that you deserve kindness and compassion, especially during difficult times";
            break;
        case "angry":
            response = "I understand that you're feeling angry right now. It's okay to feel that way, and it's important to acknowledge and express your emotions. However, it's also helpful to find healthy ways to manage your anger. Take a deep breath, try to identify the source of your anger, and consider expressing your feelings calmly and assertively. You could also try engaging in relaxation techniques or physical activity to help release tension. Remember, anger is a natural emotion, but how we respond to it can make a big difference in how we feel. You're not alone, and I'm here to support you through this";
            break;
        case "tired":
            response = "It sounds like you're feeling tired, and that's completely understandable. Taking care of yourself is essential, especially when you're feeling worn out. Remember to listen to your body and give yourself permission to rest. Whether it's taking a short break, practicing deep breathing exercises, or engaging in activities that help you unwind, finding moments of relaxation can make a big difference in how you feel. Prioritizing self-care, such as getting enough sleep, staying hydrated, and nourishing your body with nutritious food, can also help replenish your energy levels. Additionally, reaching out to friends or loved ones for support and sharing how you're feeling can provide comfort and encouragement. Remember that it's okay to take things one step at a time and to be gentle with yourself during moments of fatigue. You're doing the best you can, and taking time to recharge is an important part of maintaining your well-being.";
            break;
        // Add more cases for other emotions as needed
        default:
            response = "Select an emotion to receive assistance.";
            break;
    }
    responseParagraph.textContent = response;
}

// Add event listeners to emotion buttons
document.getElementById("happy-btn").addEventListener("click", () => handleEmotionSelection("happy"));
document.getElementById("sad-btn").addEventListener("click", () => handleEmotionSelection("sad"));
document.getElementById("angry-btn").addEventListener("click", () => handleEmotionSelection("angry"));
document.getElementById("tired-btn").addEventListener("click", () => handleEmotionSelection("tired"));
// Add event listeners for other emotion buttons as needed
