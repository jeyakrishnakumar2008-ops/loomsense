/* =====================================================
                    VARIABLES
===================================================== */

let humidity = 68.2;

let temperature = 30.1;

let humidityThreshold = 70;

let lightOn = true;

let autoLight = true;



/* =====================================================
                    DATE & TIME
===================================================== */

function updateDateTime() {

    const now = new Date();

    const date = now.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

    const time = now.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

    document.getElementById("dateTime").innerText =
        date + " | " + time;

    document.getElementById("lastChecked").innerText =
        time;
}


updateDateTime();

setInterval(updateDateTime, 1000);



/* =====================================================
                    PAGE NAVIGATION
===================================================== */

function showPage(pageName, clickedButton = null) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.add("hidden");

    });


    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.remove("hidden");

    }


    const menus =
        document.querySelectorAll(".menu");

    menus.forEach(function(menu) {

        menu.classList.remove("active");

    });


    if (clickedButton) {

        clickedButton.classList.add("active");

    }

}



/* =====================================================
                    UPDATE DASHBOARD
===================================================== */

function updateDashboard() {

    document.getElementById("humidity").innerText =
        humidity.toFixed(1);

    document.getElementById("temperature").innerText =
        temperature.toFixed(1);

    document.getElementById("alertHumidity").innerText =
        humidity.toFixed(1) + " %RH";


    checkHumidity();

}



/* =====================================================
                    HUMIDITY CHECK
===================================================== */

function checkHumidity() {

    const statusBanner =
        document.getElementById("statusBanner");

    const statusSymbol =
        document.getElementById("statusSymbol");

    const mainStatus =
        document.getElementById("mainStatus");

    const mainMessage =
        document.getElementById("mainMessage");

    const humidityStatus =
        document.getElementById("humidityStatus");


    if (humidity > humidityThreshold) {

        /* HIGH HUMIDITY */

        statusBanner.classList.remove(
            "normal-banner"
        );

        statusBanner.classList.add(
            "danger-banner"
        );


        statusSymbol.innerText = "!";


        statusSymbol.style.background =
            "#ef4444";


        mainStatus.innerText =
            "ACTION REQUIRED";


        mainMessage.innerText =
            "Humidity is too high. Please check the loom area.";


        humidityStatus.innerText =
            "● HIGH";


        humidityStatus.style.color =
            "#d52d39";


    } else {

        /* NORMAL */

        statusBanner.classList.remove(
            "danger-banner"
        );

        statusBanner.classList.add(
            "normal-banner"
        );


        statusSymbol.innerText = "✓";


        statusSymbol.style.background =
            "#22a45a";


        mainStatus.innerText =
            "NO ACTION NEEDED";


        mainMessage.innerText =
            "Your loom is operating normally.";


        humidityStatus.innerText =
            "● SAFE";


        humidityStatus.style.color =
            "#169447";

    }

}



/* =====================================================
                    SENSOR SIMULATION
===================================================== */

function simulateSensors() {

    humidity +=
        (Math.random() - 0.5) * 1.5;

    temperature +=
        (Math.random() - 0.5) * 0.3;


    /* Keep humidity in range */

    if (humidity < 60) {

        humidity = 60;

    }

    if (humidity > 78) {

        humidity = 78;

    }


    /* Keep temperature in range */

    if (temperature < 27) {

        temperature = 27;

    }

    if (temperature > 35) {

        temperature = 35;

    }


    updateDashboard();

    updateChart();

}


setInterval(simulateSensors, 4000);



/* =====================================================
                    LIGHT CONTROL
===================================================== */

function toggleAutoLight() {

    const checkbox =
        document.getElementById("autoLight");

    autoLight = checkbox.checked;


    if (autoLight) {

        showToast(
            "✓",
            "Automatic light control enabled"
        );

    } else {

        showToast(
            "✓",
            "Manual light control enabled"
        );

    }

}



/* =====================================================
                    MANUAL LIGHT
===================================================== */

function toggleLight() {

    lightOn = !lightOn;


    const lightStatus =
        document.getElementById("lightStatus");


    const lightControlText =
        document.getElementById(
            "lightControlText"
        );


    const lightMessage =
        document.getElementById(
            "lightControlMessage"
        );


    if (lightOn) {

        lightStatus.innerText = "ON";

        lightControlText.innerText =
            "Light is ON";

        lightMessage.innerText =
            "Additional light is active";


        showToast(
            "💡",
            "Light switched ON"
        );

    } else {

        lightStatus.innerText = "OFF";

        lightControlText.innerText =
            "Light is OFF";

        lightMessage.innerText =
            "Additional light is switched off";


        showToast(
            "💡",
            "Light switched OFF"
        );

    }

}



/* =====================================================
                    SAVE THRESHOLD
===================================================== */

function saveThreshold() {

    const input =
        document.getElementById(
            "thresholdInput"
        );


    const value =
        parseFloat(input.value);


    if (isNaN(value)) {

        showToast(
            "!",
            "Please enter a valid value"
        );

        return;

    }


    humidityThreshold = value;


    document.getElementById(
        "displayThreshold"
    ).innerText = value;


    updateDashboard();


    showToast(
        "✓",
        "Humidity limit saved"
    );

}



/* =====================================================
                    TOAST
===================================================== */

function showToast(icon, message) {

    const toast =
        document.getElementById("toast");

    const toastIcon =
        document.getElementById("toastIcon");

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    toastIcon.innerText = icon;

    toastMessage.innerText = message;


    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 2500);

}



/* =====================================================
                    ALERT DETAILS
===================================================== */

function showAlertDetails() {

    showToast(
        "🔔",
        "Humidity alert was sent to the user"
    );

}



/* =====================================================
                    CHART
===================================================== */

const chartCanvas =
    document.getElementById(
        "humidityChart"
    );


const chartLabels = [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM"
];


const chartValues = [
    64,
    66,
    72.5,
    69,
    67,
    68,
    69,
    67,
    68
];


const humidityChart =
    new Chart(
        chartCanvas,
        {

            type: "line",

            data: {

                labels: chartLabels,

                datasets: [

                    {

                        label: "Humidity %RH",

                        data: chartValues,

                        borderWidth: 3,

                        tension: 0.4,

                        fill: true

                    },

                    {

                        label: "Safe Limit",

                        data: [
                            70,
                            70,
                            70,
                            70,
                            70,
                            70,
                            70,
                            70,
                            70
                        ],

                        borderWidth: 1,

                        borderDash: [6, 6],

                        pointRadius: 0,

                        fill: false

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "top"

                    }

                },

                scales: {

                    y: {

                        min: 50,

                        max: 85

                    }

                }

            }

        }
    );



/* =====================================================
                    UPDATE CHART
===================================================== */

function updateChart() {

    if (!humidityChart) {
        return;
    }


    humidityChart.data.labels.push(
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )
    );


    humidityChart.data.datasets[0].data.push(
        humidity
    );


    if (
        humidityChart.data.labels.length > 10
    ) {

        humidityChart.data.labels.shift();

        humidityChart.data.datasets[0]
            .data.shift();

    }


    humidityChart.update();

}



/* =====================================================
                    CHART RANGE
===================================================== */

function changeChartRange() {

    const range =
        document.getElementById(
            "chartRange"
        ).value;


    if (range === "Today") {

        showToast(
            "📈",
            "Showing today's readings"
        );

    }

    else if (range === "Last 7 Days") {

        showToast(
            "📈",
            "Showing last 7 days"
        );

    }

    else {

        showToast(
            "📈",
            "Showing last 30 days"
        );

    }

}



/* =====================================================
                    INITIALIZE
===================================================== */

updateDashboard();