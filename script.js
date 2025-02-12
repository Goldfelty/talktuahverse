function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return; // Ignore empty messages

    // Add user message to chat
    let userMessage = document.createElement("p");
    userMessage.className = "user-message";
    userMessage.innerHTML = "<strong>You:</strong> " + userInput;
    chatBox.appendChild(userMessage);

    // AI response
    let botResponse = generateResponse(userInput);

    let botMessage = document.createElement("p");
    botMessage.className = "bot-message";
    botMessage.innerHTML = "<strong>Goldfelty AI:</strong> " + botResponse;
    chatBox.appendChild(botMessage);

    // Clear input field
    document.getElementById("user-input").value = "";

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;
}

function generateResponse(input) {
    input = input.toLowerCase().trim();

    // Greeting responses
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
        return "Hello! How can I assist you today?";
    }

    // Simple facts
    if (input.includes("what is goldfelty")) {
        return "Goldfelty is a company built on innovation and luxury.";
    }

    if (input.includes("who are you")) {
        return "I'm Goldfelty AI, your personal assistant!";
    }

    if (input.includes("how are you")) {
        return "I'm just a bot, but I'm always here to help!";
    }

    // Math question handling
    let mathMatch = input.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
    if (mathMatch) {
        let num1 = parseFloat(mathMatch[1]);
        let operator = mathMatch[2];
        let num2 = parseFloat(mathMatch[3]);
        let result;

        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num2 !== 0 ? num1 / num2 : "undefined (division by zero)"; break;
        }
        return `It's ${result}.`;
    }

    // Employment-related
    if (input.includes("how can i apply")) {
        return "Visit our employment page to apply for open positions!";
    }

    if (input.includes("jobs") || input.includes("hiring")) {
        return "Yes! We have openings. Visit the employment page for details.";
    }

    // Default response for anything else
    return "That's interesting! Can you tell me more?";
}
