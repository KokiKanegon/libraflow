import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/v1/graphql",
  documents: ["./src/**/*.tsx", "./src/**/*.ts"],
  ignoreNoDocuments: false, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};

export default config;
