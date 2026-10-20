const micButton = document.getElementById("micButton");
const commandInput = document.getElementById("commandInput");
const commandForm = document.getElementById("commandForm");
const response = document.getElementById("response");
const status = document.getElementById("status");

function speak(message) {
    if (!("speechSynthesis" in window)) {
        response.textContent = message;
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 0.85;

    window.speechSynthesis.speak(speech);
}

function reply(message) {
    response.textContent = message;
    speak(message);
}

function processCommand(command) {
    const text = command.toLowerCase().trim();

    status.textContent = "PROCESSING COMMAND...";

    if (text.includes("hello")) {
        reply("Hello, sir. JARVIS is online.");
    }

    else if (text.includes("your name")) {
        reply("I am JARVIS, your personal AI assistant.");
    }

    else if (text.includes("time")) {
        reply("The current time is " +
            new Date().toLocaleTimeString("en-IN"));
    }

    else if (text.includes("date")) {
        reply("Today's date is " +
            new Date().toLocaleDateString("en-IN"));
    }

    else if (text.includes("open youtube")) {
        reply("Opening YouTube, sir.");

        setTimeout(() => {
            window.open(
                "https://www.youtube.com/",
                "_blank"
            );
        }, 800);
    }

    else if (text.includes("open google")) {
        reply("Opening Google, sir.");

        setTimeout(() => {
            window.open(
                "https://www.google.com/",
                "_blank"
            );
        }, 800);
    }

    else if (text.includes("who are you")) {
        reply(
            "I am your browser-based assistant. " +
            "My AI capabilities can be expanded " +
            "by connecting an AI service."
        );
    }

    else if (text.includes("stop speaking")) {
        window.speechSynthesis.cancel();
        response.textContent = "Speech stopped.";
    }

    else {
        reply(
            "I have received your command, sir. " +
            "An AI API is needed to answer this " +
            "question intelligently."
        );
    }

    status.textContent = "SYSTEM ONLINE";
}

commandForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const command = commandInput.value.trim();

    if (!command) return;

    commandInput.value = "";

    processCommand(command);
});

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener("click", function() {
        try {
            status.textContent = "LISTENING...";
            recognition.start();
        } catch (error) {
            status.textContent =
                "PLEASE WAIT OR TRY AGAIN";
        }
    });

    recognition.onresult = function(event) {
        const command =
            event.results[0][0].transcript;

        processCommand(command);
    };

    recognition.onerror = function() {
        status.textContent =
            "VOICE ERROR - TRY TEXT INPUT";
    };

    recognition.onend = function() {
        if (status.textContent === "LISTENING...") {
            status.textContent = "SYSTEM ONLINE";
        }
    };

} else {
    micButton.textContent = "VOICE NOT SUPPORTED";
}