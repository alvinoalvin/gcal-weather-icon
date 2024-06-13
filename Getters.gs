function getCoords(location, geoapifyAPIKey) {
  try {
    return UrlFetchApp.fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=${geoapifyAPIKey}`
    ).getContentText();
  } catch (e) {
    console.error(`Location: ${location} Error: ${e}`);
    return null;
  }
}

/* returns weather from openweathermap api */
function getWeather(lat, lon, time, weatherAPIKey) {
  let response = JSON.parse(
    UrlFetchApp.fetch(
      `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${String(
        time.getTime()
      ).substring(0, 10)}&appid=${weatherAPIKey}`
    ).getContentText()
  ).data[0];

  return {
    ...response,
    dt: Date(response.dt),
    sunrise: Date(response.sunrise),
    sunset: Date(response.sunset),
  };
}
