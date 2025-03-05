import devYaml from "./dev/env/index.yaml";
import prodYaml from "./prod/env/index.yaml";
import uatYaml from "./uat/env/index.yaml";
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
