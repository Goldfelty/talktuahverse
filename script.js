const apiKey = "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"; // Replace with your actual OpenAI API key

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return; // Ignore empty messages

    // Add user message to chat
    let userMessage = document.createElement("p");
    userMessage.className = "user-message";
    userMessage.innerHTML = "<strong>You:</strong> " + userInput;
    chatBox.appendChild(userMessage);

    // Show "thinking..." message
    let botMessage = document.createElement("p");
    botMessage.className = "bot-message";
    botMessage.innerHTML = "<strong>Goldfelty AI:</strong> Thinking...";
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let botResponse = await getAIResponse(userInput);
        botMessage.innerHTML = `<strong>Goldfelty AI:</strong> ${botResponse}`;
    } catch (error) {
        botMessage.innerHTML = "<strong>Goldfelty AI:</strong> Oops! Something went wrong.";
        console.error("OpenAI API Error:", error);
    }

    // Clear input field
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(userInput) {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a helpful AI assistant." }, 
                       { role: "user", content: userInput }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
