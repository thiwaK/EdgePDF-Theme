// ==UserScript==
// @name         EdgePDF Theme
// @namespace    http://tampermonkey.net/
// @version      2025-01-02
// @description  Apply selected custom theme based on the selected text color.
// @author       thiwaK
// @match        file://*/*.pdf
// @grant        none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';

    console.log("EdgePDF Theme script loaded.");

    if (window.location.href.endsWith('.pdf')) {
        var cover = document.createElement("div");
        let css = `
            position: fixed;
            pointer-events: none;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #f4ecd8;
            mix-blend-mode: difference;
            z-index: 1;
        `;
        cover.setAttribute("style", css);

        document.body.appendChild(cover);
        console.log("Overlay added to the page.");

        const gearButton = document.createElement("button");
        gearButton.innerHTML = "&#1421";
        gearButton.style.position = "fixed";
        gearButton.style.bottom = "10px";
        gearButton.style.right = "35px";
        gearButton.style.width = "40px";
        gearButton.style.height = "40px";
        gearButton.style.borderRadius = "50%";
        gearButton.style.backgroundColor = "#0078D7AA";
        gearButton.style.color = "white";
        gearButton.style.border = "1px";
        gearButton.style.cursor = "pointer";
        gearButton.style.zIndex = "1000";
        gearButton.style.fontSize = "17px";
        gearButton.style.borderColor = "#0000FF22";

        document.body.appendChild(gearButton);

        // Create theme selector menu
        const themeMenu = document.createElement("div");
        themeMenu.style.position = "fixed";
        themeMenu.style.bottom = "60px";
        themeMenu.style.right = "10px";
        themeMenu.style.backgroundColor = "white";
        themeMenu.style.border = "1px solid #ccc";
        themeMenu.style.padding = "10px";
        themeMenu.style.borderRadius = "5px";
        themeMenu.style.display = "none";
        themeMenu.style.zIndex = "1001";
        themeMenu.style.transition = "opacity 0.3s ease";
        themeMenu.style.opacity = "0";

        // Add menu caption
        const menuCaption = document.createElement("div");
        menuCaption.textContent = "Select text color";
        menuCaption.style.fontWeight = "bold";
        menuCaption.style.marginBottom = "10px";
        themeMenu.appendChild(menuCaption);

        const themes = [
            { name: "Light", color: "white" },
            { name: "Dark", color: "black" },
            { name: "Sepia", color: "#f4ecd8" },
            { name: "Light Gray", color: "#eeeeee" },
            { name: "Warm Beige", color: "#f5f5dc" },
            { name: "Pale Mint", color: "#d4f1e3" },
            { name: "Light Lavender", color: "#e6e6fa" },
            { name: "Powder Blue", color: "#b0e0e6" },
            { name: "Ivory", color: "#fffff0" },
            { name: "Pastel Yellow", color: "#f7f7a1" },
            { name: "Peach Puff", color: "#ffdab9" },
            { name: "Misty Rose", color: "#ffe4e1" }
        ];

        themes.forEach((theme, index) => {
            const themeOption = document.createElement("div");
            themeOption.style.display = "flex";
            themeOption.style.alignItems = "center";
            themeOption.style.cursor = "pointer";
            themeOption.style.padding = "5px 0";

            const colorCircle = document.createElement("div");
            colorCircle.style.width = "12px";
            colorCircle.style.height = "12px";
            colorCircle.style.borderRadius = "50%";
            colorCircle.style.backgroundColor = theme.color;
            colorCircle.style.border = "2px solid #80808088";
            colorCircle.style.marginRight = "10px";

            const themeName = document.createElement("span");
            themeName.textContent = theme.name;

            themeOption.appendChild(colorCircle);
            themeOption.appendChild(themeName);

            themeOption.addEventListener("click", () => {
                console.log(`Theme selected: ${theme.name}`);
                cover.style.backgroundColor = theme.color;
                closeMenu();
            });

            themeMenu.appendChild(themeOption);

            if (index < themes.length - 1) {
                const separator = document.createElement("hr");
                separator.style.border = "none";
                separator.style.borderTop = "1px solid #ccc";
                separator.style.margin = "5px 0";
                themeMenu.appendChild(separator);
            }
        });

        document.body.appendChild(themeMenu);

        const openMenu = () => {
            themeMenu.style.display = "block";
            requestAnimationFrame(() => {
                themeMenu.style.opacity = "1";
            });
        };

        const closeMenu = () => {
            themeMenu.style.opacity = "0";
            setTimeout(() => {
                themeMenu.style.display = "none";
            }, 300);
        };

        // Toggle theme menu visibility on gear button click
        gearButton.addEventListener("click", (e) => {
            e.stopPropagation();
            if (themeMenu.style.display === "none") {
                openMenu();
            } else {
                closeMenu();
            }
        });


        console.log("Gear button and theme menu added.");
    } else {
        console.log("Not a .pdf file. Script skipped.");
    }
})();
