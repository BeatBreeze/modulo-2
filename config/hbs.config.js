//HELPERS PARTIALS//
const hbs = require("hbs");
hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper("prettyDate", (date) => {
  return date.toLocaleDateString("es-ES", {});
});
hbs.registerHelper('arrayEquals', (array1, array2, options) => {

  // Función para comparar dos arrays
  function arraysAreEqual(arr1, arr2) {
    
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].id !== arr2[i].id) {
        return false;
      }
    }
    return true;
  }

  if (arraysAreEqual(array1, array2)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
