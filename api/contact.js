export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "Appointment Request <onboarding@resend.dev>",
                to: "jglasscounselling@gmail.com",
                subject: "New Appointment Request",
                html: `
                    <h2>New Appointment Request</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `
            })
        });

        if (!response.ok) {
            return res.status(500).json({ message: "Email failed to send" });
        }

        return res.status(200).json({ message: "Request sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}