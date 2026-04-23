// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!
const button = document.getElementById("fetch-alerts");
button.addEventListener("click", () => {
  const handleInput = document.getElementById("state-input");
  const value = handleInput.value;
  const result = value.trim().toUpperCase();
  if (!result) {
    throw new Error("Please enter a state abbreviation");
  }
});

const fetchWeatherAlerts = async (state) => {
  try {
    const url = weatherApi + state;
    const res = await fetch(url);
    if (res.ok) {
      throw new Error("Failed");
    }
  } catch (e) {
    console.error("Error:", e);
  }
};
