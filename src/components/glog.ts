/**
 * glog -- because greg is tired of typing "console.log"
 *
 * Usage:
 * - glog(msg, msg, msg): sends all opts to console.log()
 * - glog.category(msg, msg, msg): sends all opts to console.log() if the category is enabled in logConfig
 *
 */

const logConfig: Record<
  string,
  { enabled: boolean; prefix?: string; sgr?: string }
> = {
  component: { enabled: true, prefix: "Component starting", sgr: "35;1" },
  db: { enabled: true, prefix: "Supabase call", sgr: "103;1" },
  dbAuth: { enabled: false, prefix: "Supabase call", sgr: "103;1" },
  rotateCountdown: { enabled: false, prefix: "rotateCountdown", sgr: "103;1" },
  // Add more categories as needed
  // Add more categories as needed
};

// Core base logging function
function baseGlog(...args: unknown[]): void {
  console.log(...args);
}

// Dynamic Proxy for category-specific logging
const glog = new Proxy(baseGlog, {
  get(target, prop: string) {
    if (prop in logConfig) {
      return (...args: unknown[]) => {
        const config = logConfig[prop];
        if (config.enabled) {
          if (config.prefix) {
            const prefix = config.sgr
              ? `\x1B[${config.sgr}m${config.prefix}\x1B[m`
              : config.prefix;
            if (typeof args[0] === "string") {
              const [format, ...rest] = args;
              target(`${prefix}: ${format}`, ...rest);
            } else {
              target(config.prefix, ...args);
            }
          } else {
            target(...args);
          }
        }
      };
    } else {
      console.warn(`[glog] Unknown log category: ${String(prop)}`);
      return () => {}; // No-op for unknown categories
    }
  },
}) as typeof baseGlog & Record<string, (...args: unknown[]) => void>;

// Runtime control functions

// Enable a single category
function setLogCategoryEnabled(category: string, enabled: boolean): void {
  if (category in logConfig) {
    logConfig[category].enabled = enabled;
  } else {
    console.warn(`[glog] Cannot set unknown category: ${category}`);
  }
}

// Enable all categories
function enableAllLogs(): void {
  for (const key in logConfig) {
    logConfig[key].enabled = true;
  }
}

// Disable all categories
function disableAllLogs(): void {
  for (const key in logConfig) {
    logConfig[key].enabled = false;
  }
}

// Enable or disable a list of categories
function setLogCategories(enabled: boolean, categories: string[]): void {
  for (const key of categories) {
    if (key in logConfig) {
      logConfig[key].enabled = enabled;
    }
  }
}

export default glog;
export {
  setLogCategoryEnabled,
  enableAllLogs,
  disableAllLogs,
  setLogCategories,
};
