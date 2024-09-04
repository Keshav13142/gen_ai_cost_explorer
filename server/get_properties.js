const models = require("./transformedModels.json");

function getModelProperties(models) {
  const properties = new Set();

  models.forEach((model) => {
    Object.keys(model).forEach((key) => properties.add(key));
  });

  console.log("Model properties:", Array.from(properties));
}

function getModesAndProviders(models) {
  const modes = new Set();
  const providers = new Set();

  models.forEach((model) => {
    modes.add(model.mode);
    providers.add(model.litellm_provider);
  });

  console.log("Modes: ", modes);
  console.log("Providers: ", providers);
}

getModelProperties(models);
getModesAndProviders(models);
