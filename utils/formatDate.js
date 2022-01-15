const formatDate = (date) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return new Date(date).toLocaleString("en-us", options);
};

module.exports = formatDate;