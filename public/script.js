async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("Kamu", message);
  saveToLocalStorage("Kamu", message);
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "(tidak ada balasan)";
    appendMessage("AI", reply);
    saveToLocalStorage("AI", reply);
  } catch (error) {
    console.error("Fetch error:", error);
    const errorMsg = "(Terjadi kesalahan saat menghubungi AI)";
    appendMessage("AI", errorMsg);
    saveToLocalStorage("AI", errorMsg);
  }
}

function appendMessage(who, text) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.classList.add("message");

  if (who === "Kamu") {
    msg.classList.add("user-message");
  } else {
    msg.classList.add("ai-message");
  }

  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight; // auto scroll ke bawah
}

function saveToLocalStorage(who, text) {
  const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  history.push({ who, text });
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

function loadChatHistory() {
  const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  history.forEach(({ who, text }) => appendMessage(who, text));
}

window.addEventListener("load", loadChatHistory);
