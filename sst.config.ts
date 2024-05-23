/// <reference path="./.sst/platform/config.d.ts" />

import { handler } from "./src/webhook";

export default $config({
  app(input) {
    return {
      name: "demo-vnet-1",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "eu-north-1",
        },
      },
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2("WebhookHandler");

    api.route("POST /", {
      handler: "src/webhook.handler",
      environment: {
        VISMA_SUBSCRIPTION_SECRET: process.env.VISMA_SUBSCRIPTION_SECRET,
        VISMA_CLIENT_ID: process.env.VISMA_CLIENT_ID,
        VISMA_CLIENT_SECRET: process.env.VISMA_CLIENT_SECRET,
      },
    });

    return {
      url: api.url,
    };
  },
});
