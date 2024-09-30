// eslint-disable-next-line @typescript-eslint/no-require-imports
const { pathsToModuleNameMapper } = require("ts-jest");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // デフォルト 'node'
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  testMatch: ["**/__test__/**/*.(test|spec).(ts|tsx)"],
  globals: {
    "ts-jest": {
      tsconfig: { // tsx内のjsxコードをReactとして実行
        jsx: "react",
      },
    },
  },
};
