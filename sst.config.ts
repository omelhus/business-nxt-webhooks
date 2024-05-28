/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "demo-bnxt-webhooks",
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
        VISMA_SUBSCRIPTION_SECRET: process.env.VISMA_SUBSCRIPTION_SECRET!,
        VISMA_CLIENT_ID: process.env.VISMA_CLIENT_ID!,
        VISMA_CLIENT_SECRET: process.env.VISMA_CLIENT_SECRET!,
      },
    });

    const worker = new sst.cloudflare.Worker("CfWebhookHandler", {
      handler: "./src/cloudflare-webhook.ts",
      url: true,
    });

    return {
      url: api.url,
      cloudflareUrl: worker.url,
    };
  },
});
