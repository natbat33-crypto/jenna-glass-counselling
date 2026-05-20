const appointmentForm = document.getElementById("appointmentForm");
const formStatus = document.getElementById("formStatus");

appointmentForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    formStatus.textContent = "Sending request...";

    const formData = new FormData(appointmentForm);

    const requestData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message")
    };

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();

        if (response.ok) {
            formStatus.textContent = "Your request has been sent successfully.";
            appointmentForm.reset();
        } else {
            formStatus.textContent = result.message || "Something went wrong. Please try again.";
        }
    } catch (error) {
        formStatus.textContent = "Unable to send request. Please try again later.";
    }
});