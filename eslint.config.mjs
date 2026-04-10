import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: ["WEBSITE/**", ".next/**", "node_modules/**"],
  },
  ...nextVitals,
];

export default config;
