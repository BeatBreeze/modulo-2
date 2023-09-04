//HELPERS PARTIALS//
const hbs = require("hbs");
hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper("prettyDate", (date) => {
  return date.toLocaleDateString("es-ES", {});
});
