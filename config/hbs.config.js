//HELPERS PARTIALS//
const hbs = require("hbs");
hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper("prettyDate", (date) => {
  return date.toLocaleDateString("es-ES", {});
});

hbs.registerHelper("#myCarousel", () => {
  const carousel = new bootstrap.Carousel(myCarouselElement, {
    interval: 2000,
    touch: false,
  });
  return carousel;
});
