const posate = (n) => { return (n < 0) ? n * -1 : n }


const Min = (a, b) => {
    return Math.min(a, b);
}


const Max = (a, b) => {
    return Math.min(a, b);
}

function hslToHex(h, s, l) {

    h += 360;
    h = h % 360;
    while (h < 0) {
        h += 360;
        h = h % 360;
    }

    h /= 360;
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h * 6) % 2 - 1));
    let m = l - c / 2;
    let r, g, b;

    if (0 <= h && h < 1 / 6) {
        [r, g, b] = [c, x, 0];
    } else if (1 / 6 <= h && h < 2 / 6) {
        [r, g, b] = [x, c, 0];
    } else if (2 / 6 <= h && h < 3 / 6) {
        [r, g, b] = [0, c, x];
    } else if (3 / 6 <= h && h < 4 / 6) {
        [r, g, b] = [0, x, c];
    } else if (4 / 6 <= h && h < 5 / 6) {
        [r, g, b] = [x, 0, c];
    } else {
        [r, g, b] = [c, 0, x];
    }

    const clamp = (value) => Math.max(0, Math.min(255, Math.round((value + m) * 255)));
    r = clamp(r);
    g = clamp(g);
    b = clamp(b);



    // Convert to hex
    return '#' +
        r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0');

}


window.onload = () => {
    const RandomizeBTN = document.getElementById("Randomize")
    const primaryColorBox = document.querySelector(".box#primary")
    const secondaryColorBox = document.querySelector(".box#secondary")
    const primaryTextColorBox = document.querySelector(".box#primaryText")
    const accentColorBox = document.querySelector(".box#accent")
    const secondaryTextColorBox = document.querySelector(".box#secondaryText")


    let primaryColor = hslToHex(0, 0, 0);
    let secondaryColor = hslToHex(0, 0, 0);
    let primaryTextColor = hslToHex(0, 0, 0);
    let secondaryTextColor = hslToHex(0, 0, 0);
    let accentColor = hslToHex(0, 0, 0);

    const RandomizeColors = (h = -1, s = -1, l = -1) => {

        if (h >= 0) {
            h += 360;
            h %= 360;
        }
        l = Min(l, 100);
        s = Min(s, 100);


        //* ========== Primary Color ==========
        const primaryHue = (h >= 0) ? ((h + Math.random() * (Math.random() < 0.1 ? -20 : 20)) + 360) % 360 : Math.floor(Math.random() * 360);
        const primarySaturation = (s >= 0) ? s : Math.floor(40 + Math.random() * 60);
        const primaryLightness = (l >= 0) ? l : Math.floor(Math.random() * 25);
        primaryColor = `${hslToHex(primaryHue, primarySaturation, primaryLightness)}`;


        //* ========== Secondary Color ==========
        const secondaryHue = (((primaryHue + (10 + Math.random() * ((Math.random() > 0.5) ? +20 : -20)))) + 360) % 360;
        const secondaryLightness = Min(100, primaryLightness + ((primaryLightness > 50) ? -5 : 5));
        const secondarySaturation = Min(100, (primarySaturation + ((primarySaturation < 50) ? (13 + Math.random() * 2) : -(13 + Math.random() * 2))));
        secondaryColor = `${hslToHex(secondaryHue, secondarySaturation, secondaryLightness)}`;


        //* ========== Complementery Color ==========
        const complementaryHue = (primaryHue + 180) % 360;


        //* ========== Accent Color ==========
        let accentHue = Math.floor(Math.random() * 360);
        let accentSaturation = Min(Math.floor(40 + Math.random() * 60) + s, 100);
        accentSaturation %= 100;
        let hueDifference = accentHue - primaryHue;
        hueDifference = (hueDifference < 0) ? hueDifference * -1 : hueDifference;
        if (hueDifference < 140) {
            accentHue += 140 - hueDifference;
            accentHue %= 360;
        }
        const accentLightness = Min(100, primaryLightness + ((primaryLightness > 50) ? (50 + Math.random() * 20) * -1 : (50 + Math.random() * 20)));

        accentColor = `${hslToHex(accentHue, accentSaturation, accentLightness)}`;


        //* ==========  Text Color ==========

        const primaryTextLightness = primaryLightness < 50
            ? Math.min(100, primaryLightness + 90)
            : Math.max(0, primaryLightness - 90);
        const secondaryTextLightness = primaryTextLightness + ((primaryTextLightness < 50)
            ? (13 + Math.random() * 2)
            : ((13 + Math.random() * 2) * -1));

        primaryTextColor = `${hslToHex(complementaryHue, 0, primaryTextLightness)}`;
        secondaryTextColor = `${hslToHex(primaryHue, 0, secondaryTextLightness)}`;


        // Apply styles
        primaryColorBox.style.backgroundColor = primaryColor;
        primaryColorBox.style.color = primaryTextColor;
        primaryColorBox.innerText = `${primaryColor}`;

        secondaryColorBox.style.backgroundColor = secondaryColor;
        secondaryColorBox.style.color = primaryTextColor;
        secondaryColorBox.innerText = `${secondaryColor}`;

        accentColorBox.style.backgroundColor = accentColor;
        accentColorBox.style.color = primaryColor;
        accentColorBox.innerText = `${accentColor}`;

        primaryTextColorBox.style.backgroundColor = primaryTextColor;
        primaryTextColorBox.style.color = primaryColor;
        primaryTextColorBox.innerText = `${primaryTextColor}`;

        secondaryTextColorBox.style.backgroundColor = secondaryTextColor;
        secondaryTextColorBox.style.color = primaryColor;
        secondaryTextColorBox.innerText = `${secondaryTextColor}`;


        RandomizeBTN.style.backgroundColor = primaryColor
        RandomizeBTN.style.color = primaryTextColor
        RandomizeBTN.style.borderColor = primaryColor
    }


    RandomizeColors()

    RandomizeBTN.addEventListener("click", () => {
        RandomizeColors()
    })


}