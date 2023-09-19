//HELPERS PARTIALS//
const hbs = require("hbs");
hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper("prettyDate", (date) => {
  return date.toLocaleDateString("es-ES", {});
});
hbs.registerHelper("yearDate", (date) => {
  return date.split("-")[0];
});
hbs.registerHelper("eq", (a, b) => {
  if (a !== b) {
    return true;
  } else {
    return false;
  }
});
hbs.registerHelper("genreUrl", (genre) => {
  const genreNoSpace = genre.replace(/\s+/g, "-");
  return genreNoSpace;
});
