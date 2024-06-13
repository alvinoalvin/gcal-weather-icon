const weatherMap = {
  "~": "~",
  undefined: "~",
  thunderstorm: "🌩",
  drizzle: "🌧",
  sky: "☼",
  "few clouds": "⛅",
  clouds: "☁",
  rain: "☔",
  snow: "⛄",
  mist: "🌫",
  smoke: "🌫",
  haze: "🌫",
  dust: "🌫",
  fog: "🌫",
};

const APIKeys = PropertiesService.getScriptProperties().getProperties();
const eventsMap = getCalendarEvents(CalendarApp.getAllOwnedCalendars());
