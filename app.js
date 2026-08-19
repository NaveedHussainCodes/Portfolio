let sideMenu = document.querySelector("#sidemenu");

function openMenu(){
    sideMenu.style.right = "0";
}

function closeMenu(){
    sideMenu.style.right = "-200px";
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";

    try {
        const response = await fetch("https://formsubmit.co/ajax/513298e85866a54efc54b8951edc169f", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                    name: contactForm.elements.name.value,
                    email: contactForm.elements.email.value,
                    message: contactForm.elements.message.value,
                _subject: "New client from portfolio contact message",
                _template: "table"
            })
        });

        if (!response.ok) {
            throw new Error("The message was not sent. Please try again.");
        }

        contactForm.reset();
        formStatus.textContent = "Your message has been sent successfully!";
        formStatus.className = "success";
        setTimeout(() => {
            formStatus.textContent = "";
            formStatus.className = "";
        }, 5000);
    } catch (error) {
        formStatus.textContent = "The message was not sent. Please try again.";
        formStatus.className = "error";
        setTimeout(() => {
            formStatus.textContent = "";
            formStatus.className = "";
        }, 5000);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
    }
});