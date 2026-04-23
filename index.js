// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!
const button = document.getElementById("fetch-alerts");
const errorDiv = document.getElementById("error-message");

button.addEventListener("click", async () => {
  const handleInput = document.getElementById("state-input");
  const value = handleInput.value;
  const result = value.trim().toUpperCase();

  if (!result) {
    errorDiv.classList.remove("hidden");
    errorDiv.textContent = "Please enter a state abbreviation";
    return;
  }

  try {
    const data = await fetchWeatherAlerts(result);

    errorDiv.classList.add("hidden");
    errorDiv.textContent = "";

    displayAlerts(data);

    handleInput.value = "";
  } catch (e) {
    errorDiv.classList.remove("hidden");
    errorDiv.textContent = e.message;
  }
});

const fetchWeatherAlerts = async (state) => {
  try {
    const url = weatherApi + state;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Network issue");
    }

    const parse = await res.json();
    return parse;
  } catch (e) {
    console.error("Error:", e);
    throw e;
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

  alertsDiv.innerHTML = `<h2>Weather Alerts: ${features.length}</h2>`;

  features.forEach((alert) => {
    const info = alert.properties || alert;

    const headline = info.headline || info.title;
    const severity = info.severity;
    const area = info.areaDesc || info.area;
    const description = info.description;

    const alertCard = document.createElement("div");
    alertCard.classList.add("alert-card");

    alertCard.innerHTML = `
      <h3>${headline}</h3>
      <p><strong>Severity:</strong> ${severity}</p>
      <p><strong>Area:</strong> ${area}</p>
      <p>${description}</p>
    `;

    alertsDiv.appendChild(alertCard);
  });
};
