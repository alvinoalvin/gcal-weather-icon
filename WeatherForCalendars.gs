function main() {
  Object.keys(eventsMap).forEach((eventKey) => {
    const calendar = eventsMap[eventKey];

    if (calendar) {
      calendar.forEach((event) => {
        const location = transformLocationString(event.getLocation());
        if (location) {
          const response = getCoords(location, APIKeys.geoapifyAPIKey);
          const weather = response ? getWeather(
            JSON.parse(response).results[0].lat.toFixed(6),
            JSON.parse(response).results[0].lon.toFixed(6),
            event.getStartTime(),
            APIKeys.weatherAPIKey
          )
            : null;

          weather &&
            changeWeather(
              weatherMap,
              event,
              getIcon(weatherMap, weather.weather[0].description),
              weather
            );
        }
      });
    }
  });
}

/* get calendar events for next 4 days */
function getCalendarEvents(calendars) {
  let eventsMap = {};
  const currDate = new Date();
  const lastDay = new Date(currDate.getTime() + 4 * 24 * 60 * 60 * 1000);

  calendars.forEach(
    (cal) => (eventsMap[cal.getName()] = cal.getEvents(currDate, lastDay))
  );
  return eventsMap;
}

function getIcon(weatherMap, description) {
  const weatherKey = Object.keys(weatherMap).find((mapDescr) =>
    description.includes(mapDescr)
  );
  return weatherMap[weatherKey];
}

function changeWeather(weatherMap, event, icon, weather) {
  const title = event.getTitle().split("");
  const existingIcon = title.find((char) =>
    Object.values(weatherMap).includes(char)
  );

  if (existingIcon) {
    event.setTitle(event.getTitle().replace(existingIcon, icon));
    const description = event
      .getDescription()
      .substring(
        0,
        event.getDescription().indexOf("\n~~~~~~~~~~~~~~~~~~~~~~\n") >= 0
          ? event.getDescription().indexOf("\n~~~~~~~~~~~~~~~~~~~~~~\n")
          : event.getDescription().length
      );
    event.setDescription(
      description +
      "\n~~~~~~~~~~~~~~~~~~~~~~\n" +
      JSON.stringify(weather, undefined, 4)
    );
  }
}
