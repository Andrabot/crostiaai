export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metode tidak diizinkan" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://crostiaai.vercel.app", // GANTI sesuai domain Vercel kamu
        "X-Title": "Chat AI Vercel"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // Pastikan model ini tersedia di akun kamu
        messages: [
          {
            role: "system",
            content: `Nama kamu adalah Crostia AI. Kamu adalah asisten virtual pintar yang ramah dan profesional. Kamu dikembangkan oleh Danil DTH pada tanggal 13 Juni 2025. Saat ditanya siapa kamu, selalu jawab sesuai identitas ini.`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API error:", data);
      return res.status(500).json({ error: "OpenRouter API error", details: data });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
