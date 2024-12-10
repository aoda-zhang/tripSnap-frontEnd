import devYaml from "./DEV/env/index.yaml";
import prodYaml from "./PROD/env/index.yaml";
import uatYaml from "./UAT/env/index.yaml";
const environment = import.meta.env;
const currentEnv = environment?.MODE ?? "dev";

const getConfigs = () => {
  try {
    switch (currentEnv) {
      case "dev":
        return devYaml;
      case "uat":
        return uatYaml;
      case "prod":
        return prodYaml;
      default:
        return devYaml;
    }
  } catch (error) {
    console.error("Error loading config file:", error);
    return {};
  }
};

export default getConfigs();
