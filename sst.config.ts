/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "demo-vnet-1",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws:  {
          region: "eu-north-1"
        }
      }
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2("WebhookHandler");
    api.route("POST /", {
      handler: "src/webhook.handler"
    });


    return {
      url: api.url
    }
  },
});
