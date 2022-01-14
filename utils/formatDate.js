const formatDate = (date) => {
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  return new Date(date).toLocaleString("en-us", options);
};

module.exports = formatDate;