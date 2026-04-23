// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!
const button = document.getElementById("fetch-alerts");
button.addEventListener("click", async () => {
  const handleInput = document.getElementById("state-input");
  const value = handleInput.value;
  const result = value.trim().toUpperCase();

  if (!result) {
    throw new Error("Please enter a state abbreviation");
  }
  const data = await fetchWeatherAlerts(result);

  displayAlerts(data);
});

const fetchWeatherAlerts = async (state) => {
  try {
    const url = weatherApi + state;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed");
    }
    const parse = await res.json();
    return parse;
  } catch (e) {
    console.error("Error:", e);
    return { features: [] };
  }
};

const displayAlerts = (data) => {
  const alertsDiv = document.getElementById("alerts-display");
  alertsDiv.innerHTML = "";
  const features = data.features;
  if (!features || features.length === 0) {
    alertsDiv.innerHTML = "<p>No active alerts at this time.</p>";
    return;
  }
  features.forEach((alert) => {
    const info = alert.properties;

    const alertCard = document.createElement("div");
    alertCard.classList.add("alert-card");

    alertCard.innerHTML = `
    <h3>${info.headline}</h3>
    <p><strong>Severity:</strong> ${info.severity}</p>
    <p><strong>Area:</strong> ${info.areaDesc}</p>
    <p>${info.description}</p>
  `;

    alertsDiv.appendChild(alertCard);
  });
};
