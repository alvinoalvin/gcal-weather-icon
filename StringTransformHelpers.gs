function transformLocationString(location) {
  if (!location) return location;

  if (location.includes("|")) location = removeTitle(location);
  if (location.includes("#")) location = changeUnitFormat(location);

  return location;
}

function changeUnitFormat(location) {
  const locationArr = location.split(",");
  const address = locationArr[1].split(" ");

  address[1] += "-" + address[address.length - 1].substring(1); //add new unit number to unit
  address.pop(); //remove old unit number
  locationArr[1] = address.join(" ");

  return locationArr.join(",");
}

function removeTitle(location) {
  return location.substring(location.indexOf("|") + 2);
}
