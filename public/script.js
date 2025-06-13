async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("Kamu", message);
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log("API response:", data); // 🐛 Debug log
    const reply = data.choices?.[0]?.message?.content || "(tidak ada balasan)";
    appendMessage("AI", reply);
  } catch (error) {
    console.error("Fetch error:", error);
    appendMessage("AI", "(Terjadi kesalahan saat menghubungi AI)");
  }
}

function appendMessage(who, text) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${who}:</strong> ${text}`;
  chatBox.appendChild(msg);
}
