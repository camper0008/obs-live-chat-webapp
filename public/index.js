const chatlogElement = document.getElementById("chatlog")
const usernameElement = document.getElementById("username");
const usernameLimitElement = document.getElementById("username-limit");
const messageElement = document.getElementById("message");
const messageLimitElement = document.getElementById("message-limit");
const submitElement = document.getElementById("submit");
const statusElement = document.getElementById("status");

const fillChatLog = (data) => {
    if (data.length === 0) {
        chatlogElement.textContent = "The chat is empty."
    } else {
        chatlogElement.textContent = data.map((chat) => chat.time + " " + "["+chat.username+"]: " + chat.message + "\n").join("\n");
    }
}

const refresh = async () => {
    const res = await (await fetch("/api/chat")).json();
    
    fillChatLog(res);
}

const updateCharLimits = () => {
    usernameLimitElement.textContent = usernameElement.value.length + '/32';
    messageLimitElement.textContent = messageElement.value.length + '/256';
}


const send = async () => {
    const username = usernameElement.value;
    const message = messageElement.value;

    const body = JSON.stringify({
        username,
        message,
    });

    const headers = new Headers({"Content-Type": "application/json"});

    const res = await fetch("/api/submit", {
        headers,
        body,
        method: "POST",
    });

    const res_body = await res.json();

    statusElement.textContent = res_body.message;
    if (res.ok) {
        statusElement.className = "success";
    } else {
        statusElement.className = "failure";
    }

    refresh();
}

const main = () => {
    refresh();
    updateCharLimits();
    submitElement.addEventListener("click", () => send());
    usernameElement.addEventListener("input", () => updateCharLimits());
    messageElement.addEventListener("input", () => updateCharLimits());
}
main();
