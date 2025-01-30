document.addEventListener("DOMContentLoaded", function () {
    // Locomotive data (Electric & Diesel)
    const locomotives = {
        "WAP-1": { type: "Electric", use: "Passenger", hp: "3900 HP", features: "First electric passenger loco (1980)" },
        "WAP-4": { type: "Electric", use: "Passenger", hp: "5000 HP", features: "Widely used for Express trains" },
        "WAP-5": { type: "Electric", use: "Passenger", hp: "6000 HP", features: "High-speed loco, used in Rajdhani/Shatabdi" },
        "WAP-7": { type: "Electric", use: "Passenger", hp: "6350 HP", features: "Most powerful passenger loco, used in Vande Bharat" },
        "WAG-9": { type: "Electric", use: "Freight", hp: "6350 HP", features: "Powerful AC loco, modern freight train use" },
        "WAG-12": { type: "Electric", use: "Freight", hp: "12000 HP", features: "India’s most powerful freight locomotive" },
        "WDM-3D": { type: "Diesel", use: "Mixed (Passenger & Freight)", hp: "3300 HP", features: "More fuel-efficient than WDM-3A" },
        "WDG-4": { type: "Diesel", use: "Freight", hp: "4500 HP", features: "Powerful freight loco (EMD design)" },
        "WDP-4D": { type: "Diesel", use: "Passenger", hp: "4000 HP", features: "Used in Superfast trains" },
        "MMTS": { type: "Electric", use: "MMTS", hp: "1400 HP", features: "MMTS local train" },
        "MEMU": { type: "Diesel", use: "MMTS", hp: "1400 HP", features: "MMTS local train" }
    };

    // Coach and Freight Types
    const coaches = {
        "Passenger": ["Express", "Rajdhani Superfast Express", "Shatabdi Superfast Express", "Vande Bharat Express", "Garib Rath Express", "Luxury"],
        "Freight": ["Box Wagon", "Flat Wagon", "Container Wagon", "Tank Wagon", "Hopper Wagon", "Gondola Wagon", "Mixed wagons"],
        "Track Inspection Car": ["Track Inspection Car"],
        "MMTS": ["MMTS Local"]
    };

    // Platforms including loop lines
    const platforms = ["Platform 1", "Platform 2", "Platform 3", "Platform 4", "Platform 5", "Platform 6", "Platform 7", "Platform 8", "Platform 9", "Platform 10"];
    for (let i = 1; i <= 25; i++) {
        platforms.push(`Loop Line ${i}`);
    }

    // Get elements from the DOM
    const locoSelect = document.getElementById("loco");
    const numLocosInput = document.getElementById("num-locos");
    const coachRadioButtons = document.querySelectorAll('input[name="coach"]');
    const coachTypeSelect = document.getElementById("coaches");
    const numCoachesInput = document.querySelectorAll('input[name="num-coaches"]');
    const platformSelect = document.getElementById("platform");
    const result = document.getElementById("result");
    const announcement = document.getElementById("announcement");
    const coupleButton = document.getElementById("couple-btn");
    const doneButton = document.getElementById("done-btn");
    const announceButton = document.getElementById("announce-btn");

    // Populate dropdowns
    Object.keys(locomotives).forEach(loco => {
        const option = document.createElement("option");
        option.value = loco;
        option.textContent = loco;
        locoSelect.appendChild(option);
    });

    platforms.forEach(platform => {
        const option = document.createElement("option");
        option.value = platform;
        option.textContent = platform;
        platformSelect.appendChild(option);
    });

    // Handle Coach Type selection
    coachRadioButtons.forEach(button => {
        button.addEventListener("change", function () {
            const selectedCoachType = this.value;
            coachTypeSelect.innerHTML = ""; // Clear current options
            coaches[selectedCoachType].forEach(coach => {
                const option = document.createElement("option");
                option.value = coach;
                option.textContent = coach;
                coachTypeSelect.appendChild(option);
            });
        });
    });

    // Handle "Couple Coaches" button click
    coupleButton.addEventListener("click", function () {
        const loco = locoSelect.value;
        const numLocos = numLocosInput.value;
        const coachType = coachTypeSelect.value;
        const selectedNumCoaches = document.querySelector('input[name="num-coaches"]:checked')?.value;

        if (loco && coachType && selectedNumCoaches) {
            result.innerHTML = `⏳ Coupling ${selectedNumCoaches} ${coachType} coaches to ${numLocos} ${loco} locomotives...`;

            // Play sound for coupling (make sure sound file is available)
            const couplingSound = new Audio('coupling-sound.mp3');
            couplingSound.play();

            // Show progress bar animation
            showCouplingProgress();

            // Display locomotive details
            const locoDetails = locomotives[loco];
            document.getElementById("loco-type").textContent = locoDetails.type;
            document.getElementById("loco-use").textContent = locoDetails.use;
            document.getElementById("loco-hp").textContent = locoDetails.hp;
            document.getElementById("loco-features").textContent = locoDetails.features;
        } else {
            result.textContent = "⚠️ Please select locomotive, coach type, and number of coaches.";
        }
    });

    // Handle "Shunt Train" button click
    doneButton.addEventListener("click", function () {
        const selectedPlatform = platformSelect.value;
        if (selectedPlatform) {
            result.innerHTML = `🚆 Shunting train to ${selectedPlatform}...`;
        } else {
            result.innerHTML = "⚠️ Please select a platform to shunt the train.";
        }
    });

    // Handle "Announcement" button click
    announceButton.addEventListener("click", function () {
        const selectedPlatform = platformSelect.value;
        if (selectedPlatform) {
            announcement.innerHTML = `📢 Announcement: Train is approaching ${selectedPlatform}. Please stand clear of the platform.`;
        } else {
            announcement.innerHTML = "⚠️ Please select a platform to make the announcement.";
        }
    });

    // Show progress bar for coupling operation
    function showCouplingProgress() {
        const progressBar = document.createElement("div");
        progressBar.id = "progress-bar";
        const progressDiv = document.createElement("div");
        progressBar.appendChild(progressDiv);
        result.innerHTML = "";
        result.appendChild(progressBar);

        progressDiv.style.animation = "loading 2s ease-in-out forwards";
        setTimeout(() => {
            result.innerHTML = `✅ Successfully coupled ${selectedNumCoaches} coaches.`;
        }, 2000); // Adjust the timing according to the operation duration
    }
});