import { readFile, writeFile } from "fs";

// Read the JSON file
readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Array to hold the transformed data
  const transformedData = [];

  // Iterate over each model and flatten the structure
  for (const [modelName, modelData] of Object.entries(jsonData)) {
    transformedData.push({ model_name: modelName, ...modelData });
  }

  // Write the transformed data to a new JSON file
  writeFile(
    "transformedModels.json",
    JSON.stringify(transformedData, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log(
          "Data transformation complete. Transformed data saved to transformedModels.json"
        );
      }
    }
  );
});
