import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/visma/schema.graphql",
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: "src/queries/*.ts",
  generates: {
    "src/gql/": {
      preset: `client`,
      plugins: [],
    },
  },
};

export default config;
