// ==UserScript==
// @name         GemAr AI Bridge
// @namespace    https://gemar-ai.netlify.app
// @version      1.0
// @description  Automatically injects GemAr AI workspace triggers into the Gemini interface.
// @match        https://gemini.google.com/*
// @run-at       document_end
// @downloadURL  https://gemar-ai.netlify.app/gemar-bridge.user.js
// @updateURL    https://gemar-ai.netlify.app/gemar-bridge.user.js
// ==/UserScript==

(function() {
    'use strict';

    function injectGemArButton() {
        // Prevent duplicate injection
        if (document.getElementById('gemar-custom-trigger')) {
            return;
        }

        // Look for the upgrade button or its container elements in the Gemini DOM
        const upgradeButton = document.querySelector('[data-test-id="upgrade-button"]') || 
                              document.querySelector('a[href*="advanced"]') || 
                              document.querySelector('button'); 

        if (upgradeButton) {
            // Create the container wrapper
            const wrapper = document.createElement('div');
            wrapper.id = 'gemar-custom-trigger';
            wrapper.style.cssText = 'margin: 12px 0; padding: 0 16px; width: 100%; box-sizing: border-box;';

            // Create the custom button
            const customBtn = document.createElement('button');
            customBtn.innerText = 'Want to create website click here';
            customBtn.style.cssText = `
                width: 100%;
                padding: 10px 14px;
                background: linear-gradient(135deg, #1a73e8, #34a853);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                transition: all 0.2s ease;
            `;

            // Hover effects
            customBtn.onmouseover = () => {
                customBtn.style.opacity = '0.9';
                customBtn.style.transform = 'translateY(-1px)';
            };
            customBtn.onmouseout = () => {
                customBtn.style.opacity = '1';
                customBtn.style.transform = 'translateY(0)';
            };

            // Action on click: Opens your Netlify website in a new tab
            customBtn.onclick = () => {
                window.open('https://gemar-ai.netlify.app', '_blank');
            };

            wrapper.appendChild(customBtn);

            // Insert your button right after the upgrade button
            upgradeButton.parentNode.insertBefore(wrapper, upgradeButton.nextSibling);
        }
    }

    // Run immediately when the script loads
    injectGemArButton();

    // Use a MutationObserver to continuously watch for dynamic page reloads or navigation changes
    const observer = new MutationObserver(() => {
        injectGemArButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();