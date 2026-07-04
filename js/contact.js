/**
 * ==========================================================================
 * SECURE PRODUCTION DATA INTAKE GATEWAY (WEB3FORMS ASYNC ENGINES)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const leadForm = document.getElementById("leadCaptureForm");
    const statusBox = document.getElementById("form-status-msg");

    if (leadForm) {
        leadForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Stems standard disruptive page reloads instantly

            const submitButton = leadForm.querySelector(".form-submit-btn");
            const baseButtonText = submitButton.innerHTML;
            
            // 1. Cyber Security Vector Scan: Intercept automated bot attempts
            const botcheck = leadForm.querySelector('input[name="botcheck"]');
            if (botcheck && botcheck.checked) {
                console.warn("Spam vector signature caught. Request lifecycle aborted.");
                return false;
            }

            // 2. Access Token Vetting Block
            const accessKeyInput = leadForm.querySelector('input[name="access_key"]');
            if (accessKeyInput.value === "YOUR_WEB3FORMS_ACCESS_KEY" || accessKeyInput.value.trim() === "") {
                statusBox.style.display = "block";
                statusBox.style.color = "var(--secondary)";
                statusBox.innerText = "❌ Configuration Alert: Please replace 'YOUR_WEB3FORMS_ACCESS_KEY' with your valid token.";
                return;
            }

            // 3. UI Progression State Switch
            submitButton.disabled = true;
            submitButton.style.opacity = "0.6";
            submitButton.innerHTML = `<span>Encrypting Payload Metrics... <i class="fa-solid fa-circle-notch fa-spin" style="margin-left:0.5rem;"></i></span>`;
            
            statusBox.style.display = "block";
            statusBox.style.color = "var(--primary)";
            statusBox.innerText = "Processing secure network connection...";

            // 4. Extracting Form Data Payload Arrays
            const formData = new FormData(leadForm);
            const jsonPayload = JSON.stringify(Object.fromEntries(formData));

            // 5. Asynchronous Network Dispatch Phase via fetch API
            try {
                const networkResponse = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: jsonPayload
                });

                const serverResult = await networkResponse.json();

                if (networkResponse.status === 200 || serverResult.success) {
                    // Success Matrix Integration Pipeline
                    statusBox.style.color = "#10b981";
                    statusBox.innerText = "✅ Transmission Secured! Re-routing to headquarters tracking dashboard...";
                    leadForm.reset();

                    // Absolute smooth programmatic transition to execution success zone page
                    setTimeout(() => {
                        window.location.href = "thank-you.html";
                    }, 1500);

                } else {
                    // Server-side Rejected Validation States Fallbacks
                    throw new Error(serverResult.message || "Endpoint rejected payload parsing parameters.");
                }

            } catch (networkError) {
                console.error("Transmission Error Encountered:", networkError);
                statusBox.style.color = "var(--secondary)";
                statusBox.innerText = `❌ Grid Error: ${networkError.message || "Failed to establish synchronization hook. Retry profile dispatch."}`;
                
                // Restore button states for retry evaluation loops
                submitButton.disabled = false;
                submitButton.style.opacity = "1";
                submitButton.innerHTML = baseButtonText;
            }
        });
    }

    // Advanced Input Border Transitions for UX Optimization
    const selectDropdown = document.getElementById("course_stream");
    if (selectDropdown) {
        selectDropdown.addEventListener("change", () => {
            if (selectDropdown.value !== "") {
                selectDropdown.style.borderColor = "var(--primary)";
                selectDropdown.style.fontWeight = "600";
            }
        });
    }
});