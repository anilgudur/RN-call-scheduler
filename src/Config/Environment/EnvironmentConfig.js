import React from "react";

import {
  environment
} from "./Environment";
import {
  configDevelopment
} from "./development";
import {
  configStaging
} from "./staging";
import {
  configProduction
} from "./production";

/**
 * Get Config
 */
function getConfig() {
  switch (environment) {
    case 'development':
      return configDevelopment;
    case 'staging':
      return configStaging;
    case 'production':
      return configProduction;
  }
}

export const CONFIG = getConfig();