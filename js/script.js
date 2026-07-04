/**
 * ==========================================================================
 * MASTER INTERFACE LIFECYCLE ENGINE (REFACTORED WITH DRAWER LOCKS)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Progress Multi-Stage Tracker Matrix
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // 2. Translucent Navbar Padding Compression Logic
    const header = document.querySelector(".glass-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                header.style.background = "rgba(247, 250, 253, 0.97)";
                header.style.boxShadow = "0 10px 35px rgba(7, 19, 33, 0.06)";
            } else {
                header.style.background = "rgba(247, 250, 253, 0.85)";
                header.style.boxShadow = "none";
            }
        });
    }

    // 3. Functional Hamburger Responsive Menu Engagement Trigger 
    const hamburger = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("responsive-active");
            
            // Prevent dynamic scrolling loops when modal state active
            if (navMenu.classList.contains("responsive-active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Close drawer modal when clicking on external body spaces
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("responsive-active");
                document.body.style.overflow = "";
            }
        });
    }

    // 4. UI Accordion Interface Trigger System (FAQ Setup)
    document.querySelectorAll(".faq-accordion-item").forEach(item => {
        const trigger = item.querySelector(".faq-trigger");
        const panel = item.querySelector(".faq-panel");
        const icon = item.querySelector(".accordion-icon i");

        if (trigger && panel) {
            trigger.addEventListener("click", () => {
                const isOpen = item.classList.contains("active");
                
                // Clear all open instances safely
                document.querySelectorAll(".faq-accordion-item").forEach(sib => {
                    sib.classList.remove("active");
                    sib.querySelector(".faq-panel").style.maxHeight = null;
                    const sibIcon = sib.querySelector(".accordion-icon i");
                    if(sibIcon) sibIcon.className = "fa-solid fa-plus";
                });

                if (!isOpen) {
                    item.classList.add("active");
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    if(icon) icon.className = "fa-solid fa-minus";
                }
            });
        }
    });
});
/* ==========================================================================
   DYNAMIC FORM INTERACTION HANDLING (SHOW/HIDE CUSTOM COURSE INPUT)
   ========================================================================== */
function toggleCustomCourseField() {
    const selectElement = document.getElementById('course_stream');
    const customWrapper = document.getElementById('custom_course_wrapper');
    const customInput = document.getElementById('custom_course');

    if (selectElement.value === 'other') {
        // Smoothly reveal the text box and force it to be required
        customWrapper.style.display = 'flex';
        customInput.setAttribute('required', 'required');
        customInput.focus();
    } else {
        // Hide and clear parameters if user switches back to standard drop tracks
        customWrapper.style.display = 'none';
        customInput.removeAttribute('required');
        customInput.value = '';
    }
}