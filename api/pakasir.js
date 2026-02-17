export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = req.body;

    console.log("Webhook masuk:", data);

    // cek pembayaran sukses
    if (data.status === "completed") {

      // kirim notif ke telegram admin
      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.ADMIN_ID,
          text:
`💰 PEMBAYARAN MASUK

Order : ${data.order_id}
Nominal : Rp ${data.amount}
Metode : ${data.payment_method}

Status : SUCCESS`
        })
      });

      // disini nanti bisa:
      // - aktifkan panel otomatis
      // - tambah saldo user
      // - kirim akun panel
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
  }
