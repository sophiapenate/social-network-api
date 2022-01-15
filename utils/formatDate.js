const formatDate = (date) => {
  const nth = d => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'st'; 
      case 3: return 'st'; 
      default: return 'th'; 
    }
  }

  const month = new Date(date).toLocaleString("en-us", { month: "short" });
  const day = new Date(date).toLocaleString("en-us", { day: "numeric" });
  const year = new Date(date).toLocaleString("en-us", { year: "numeric" });
  const time = new Date(date).toLocaleString("en-us", { hour: "numeric", minute: "numeric" }).toLowerCase();

  return `${month} ${day + nth(day)}, ${year} at ${time}`;
};

module.exports = formatDate;