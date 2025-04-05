const posate = (n) => { return (n < 0) ? n * -1 : n }


const Min = (a, b) => {
    return Math.min(a, b);
}


const Max = (a, b) => {
    return Math.max(a, b);
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
    const root = document.querySelector(":root");

    let primaryColor = hslToHex(0, 0, 0);
    let secondaryColor = hslToHex(0, 0, 0);
    let primaryTextColor = hslToHex(0, 0, 0);
    let secondaryTextColor = hslToHex(0, 0, 0);
    let accentColor = hslToHex(0, 0, 0);


    let useCustomHue = false;
    let useCustomSaturation = false;
    let useCustomLightness = false;
    let CustomHue = 0
    let CustomSaturation = 0
    let CustomLightness = 0



    const RandomizeColors = (h = -1, s = -1, l = -1) => {

        if (h >= 0) {
            h %= 360;
        }
        l = Min(l, 100);
        s = Min(s, 100);


        //* ========== Primary Color ==========
        const primaryHue = (h >= 0) ? h : Math.floor(Math.random() * 360);
        const primarySaturation = (s >= 0) ? s : Math.floor(40 + Math.random() * 60);
        const primaryLightness = (l >= 0) ? l + ((Math.random() > 0.5) ? (Math.floor(Math.random() * 5)) : (Math.floor(Math.random() * 5) * -1)) : Math.floor(Math.random() * 20);
        primaryColor = `${hslToHex(primaryHue, primarySaturation, primaryLightness)}`;


        //* ========== Secondary Color ==========
        const secondaryHue = (((primaryHue + (10 + Math.random() * ((Math.random() > 0.5) ? +20 : -20)))) + 360) % 360;
        const secondaryLightness = Min(100, primaryLightness + ((primaryLightness > 50) ? ((10 + Math.random() * 5) * -1) : (10 + Math.random() * 5)));
        const secondarySaturation = Min(100, (primarySaturation));
        secondaryColor = `${hslToHex(secondaryHue, secondarySaturation, secondaryLightness)}`;


        //* ========== Complementery Color ==========
        const complementaryHue = (primaryHue + 180) % 360;


        //* ========== Accent Color ==========
        let accentHue = Math.floor(Math.random() * 360);
        let accentSaturation = Min(Math.floor(40 + Math.random() * 60) + s, 100);
        let hueDifference = accentHue - primaryHue;
        hueDifference = (hueDifference < 0) ? hueDifference * -1 : hueDifference;
        if (hueDifference < 160) {
            accentHue += 160 - hueDifference;
            accentHue %= 360;
        }
        const accentLightness = Max(40, Min(80, primaryLightness + ((primaryLightness > 50) ? ((50 + Math.random() * 10) * -1) : (50 + Math.random() * 10))));

        accentColor = `${hslToHex(accentHue, accentSaturation, accentLightness)}`;


        //* ==========  Text Color ==========

        const primaryTextLightness = primaryLightness < 50
            ? Math.min(100, primaryLightness + 90)
            : Math.max(0, primaryLightness - 90);
        const secondaryTextLightness = primaryTextLightness + ((primaryTextLightness < 50)
            ? (13 + Math.random() * 5)
            : ((13 + Math.random() * 5) * -1));

        primaryTextColor = `${hslToHex(complementaryHue, 0, primaryTextLightness)}`;
        secondaryTextColor = `${hslToHex(primaryHue, 0, secondaryTextLightness)}`;


        // Apply styles
        primaryColorBox.style.backgroundColor = primaryColor;
        primaryColorBox.style.color = primaryTextColor;
        primaryColorBox.querySelector(".colorHexCode").innerHTML = `${primaryColor}`;

        secondaryColorBox.style.backgroundColor = secondaryColor;
        secondaryColorBox.style.color = primaryTextColor;
        secondaryColorBox.querySelector(".colorHexCode").innerHTML = `${secondaryColor}`;

        accentColorBox.style.backgroundColor = accentColor;
        accentColorBox.style.color = primaryColor;
        accentColorBox.querySelector(".colorHexCode").innerHTML = `${accentColor}`;

        primaryTextColorBox.style.backgroundColor = primaryTextColor;
        primaryTextColorBox.style.color = primaryColor;
        primaryTextColorBox.querySelector(".colorHexCode").innerHTML = `${primaryTextColor}`;

        secondaryTextColorBox.style.backgroundColor = secondaryTextColor;
        secondaryTextColorBox.style.color = primaryColor;
        secondaryTextColorBox.querySelector(".colorHexCode").innerHTML = `${secondaryTextColor}`;



        root.style.setProperty("--primaryColor", primaryColor)
        root.style.setProperty("--secondaryColor", secondaryColor)
        root.style.setProperty("--accentColor", accentColor)
        root.style.setProperty("--primaryTextColor", primaryTextColor)
        root.style.setProperty("--secondaryTextColor", secondaryTextColor)


    }

    const Randomize = () => {
        RandomizeColors(
            (useCustomHue) ? CustomHue : -1,
            (useCustomSaturation) ? CustomSaturation : -1,
            (useCustomLightness) ? CustomLightness : -1

        )
    }



    // Changing Custom Hue
    const hueControl = document.getElementById("hueControl")
    const hueControlValueText = document.getElementById("hueControlValue")
    const saturationControl = document.getElementById("saturationControl")
    const saturationControlValueText = document.getElementById("saturationControlValue")
    const lightnessControl = document.getElementById("lightnessControl")
    const lightnessControlValueText = document.getElementById("lightnessControlValue")

    const hueSlider = document.getElementById("hueSlider")
    const saturationSlider = document.getElementById("saturationSlider")
    const lightnessSlider = document.getElementById("lightnessSlider")


    const updateHue = (n = -1) => {
        const v = (n >= 0) ? n : hueControl.value
        hueControlValueText.innerHTML = v;
        root.style.setProperty("--selectedHue", v)
        CustomHue = parseInt(v)

    }
    updateHue()


    // Changing Custom Saturation
    const updateSaturation = (n = -1) => {
        const v = (n >= 0) ? n : saturationControl.value
        saturationControlValueText.innerHTML = v;
        root.style.setProperty("--selectedSaturation", v + "%")
        CustomSaturation = parseInt(v)
    }
    updateSaturation()

    // Changing Custom Lightness
    const updateLightness = (n = -1) => {
        const v = (n >= 0) ? n : lightnessControl.value
        lightnessControlValueText.innerHTML = v;
        root.style.setProperty("--selectedLightness", v + "%")
        CustomLightness = parseInt(v)
    }
    updateLightness()

    const UpdateSlidersVisibility = () => {
        const HIDE_CLASS = "hide"
        if (useCustomHue) {
            hueSlider.classList.remove(HIDE_CLASS)
        } else {
            hueSlider.classList.add(HIDE_CLASS)
        }
        if (useCustomSaturation) {
            saturationSlider.classList.remove(HIDE_CLASS)
        } else {
            saturationSlider.classList.add(HIDE_CLASS)
        }
        if (useCustomLightness) {
            lightnessSlider.classList.remove(HIDE_CLASS)
        } else {
            lightnessSlider.classList.add(HIDE_CLASS)
        }
    }

    UpdateSlidersVisibility()



    hueControl.addEventListener("input", () => {
        updateHue()
    })
    saturationControl.addEventListener("input", () => {
        updateSaturation()
    })
    lightnessControl.addEventListener("input", () => {
        updateLightness()
    })


    // Reset
    const resetSaturation = document.getElementById("resetSaturation")
    resetSaturation.addEventListener("click", () => {
        saturationControl.value = 100;
        updateSaturation()
    })


    const resetLightness = document.getElementById("resetLightness")
    resetLightness.addEventListener("click", () => {
        lightnessControl.value = (lightnessControl.value == 90) ? 10 : (lightnessControl.value == 10) ? 90 : (lightnessControl.value > 50) ? 10 : 90;
        updateLightness()
    })

    const resetLightness2 = document.getElementById("resetLightness2")
    resetLightness2.addEventListener("click", () => {
        lightnessControl.value = 50;
        updateLightness()
    })


    // Close Window
    const closeWindowBtn = document.getElementById("closeCustomColorWindowButton")
    const sliders = document.querySelector(".sliders")
    const EXPANDED_CLASS = "expanded"

    closeWindowBtn.addEventListener("click", () => {
        if (sliders.classList.contains(EXPANDED_CLASS)) {
            sliders.classList.remove(EXPANDED_CLASS)
        }
    })

    const ShowCustomColorWindow = document.getElementById("ShowCustomColorWindow")

    ShowCustomColorWindow.addEventListener("click", () => {
        if (!sliders.classList.contains(EXPANDED_CLASS)) {
            sliders.classList.add(EXPANDED_CLASS)
        }
    })


    // Custom Controls Enable/Disable
    const CustomHueCheckBox = document.getElementById("CustomHue")
    const CustomSaturationCheckBox = document.getElementById("CustomSaturation")
    const CustomLightnessCheckBox = document.getElementById("CustomLightness")

    useCustomHue = CustomHueCheckBox.checked
    CustomHueCheckBox.addEventListener("input", () => {
        useCustomHue = CustomHueCheckBox.checked
        UpdateSlidersVisibility()
    })

    useCustomSaturation = CustomSaturationCheckBox.checked
    CustomSaturationCheckBox.addEventListener("input", () => {
        useCustomSaturation = CustomSaturationCheckBox.checked
        UpdateSlidersVisibility()
    })

    useCustomLightness = CustomLightnessCheckBox.checked
    CustomLightnessCheckBox.addEventListener("input", () => {
        useCustomLightness = CustomLightnessCheckBox.checked
        UpdateSlidersVisibility()
    })

    UpdateSlidersVisibility()

    Randomize()
    RandomizeBTN.addEventListener("click", () => {
        Randomize()
    })






}