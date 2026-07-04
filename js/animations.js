/**
 * ==========================================================================
 * CORE DYNAMIC MOTION ENGINE &SPOTLIGHT HOVER VECTOR INTERCEPTORS
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Mouse Tracking Spotlight Glow Engine for Cards Mesh
    const cardsMesh = document.querySelectorAll(".service-card-premium");
    if (cardsMesh.length > 0) {
        cardsMesh.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const boundaries = card.getBoundingClientRect();
                const mouseVectorX = e.clientX - boundaries.left;
                const mouseVectorY = e.clientY - boundaries.top;
                
                card.style.setProperty("--mouse-x", `${mouseVectorX}px`);
                card.style.setProperty("--mouse-y", `${mouseVectorY}px`);
            });
        });
    }

    // 2. Hardware-Safe Numeric Linear Counter System
    const triggerBanner = document.querySelector(".stats-counter-banner");
    let verificationToken = false;

    if (triggerBanner) {
        const calculateCounterSequence = () => {
            const viewportBoundaries = triggerBanner.getBoundingClientRect();
            const calculationThreshold = window.innerHeight - 40;

            if (viewportBoundaries.top < calculationThreshold && !verificationToken) {
                document.querySelectorAll(".counter-val").forEach(node => {
                    const finalMetricValue = +node.getAttribute("data-target");
                    if (!finalMetricValue) return;
                    let startingBase = 0;
                    const iterationStep = finalMetricValue / 50;

                    const processFrame = () => {
                        startingBase += iterationStep;
                        if (startingBase < finalMetricValue) {
                            node.innerText = Math.floor(startingBase);
                            setTimeout(processFrame, 20);
                        } else {
                            node.innerText = finalMetricValue;
                        }
                    };
                    processFrame();
                });
                verificationToken = true;
            }
        };

        window.addEventListener("scroll", calculateCounterSequence);
        calculateCounterSequence(); // Active tracking scan fallback
    }

    // 3. Third Party Initialization Safeguards
    try {
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 700,
                once: true
            });
        }
    } catch(e) {
        console.warn("Motion graphics engine delayed loading. Baseline visual grid stable.");
    }
});