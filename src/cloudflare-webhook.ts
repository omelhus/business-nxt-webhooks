import { handleOrderUpdate } from "./handlers/handleOrderUpdate";
import { handleProductUpdate } from "./handlers/handleProductUpdate";
import { BusinessNXTWebhookPayloadSchema } from "./schema/BusinessNXTWebhookPayloadSchema";

export default {
  async fetch(req: Request, env: any) {
    if (req.method == "POST") {
      try {
        const request_data = await req.json();
        console.log("req", request_data, env);
        const body = req.body
          ? BusinessNXTWebhookPayloadSchema.safeParse(request_data)
          : null;

        if (!body?.success) {
          console.error("invalid body");
          return new Response(
            JSON.stringify({ status: "invalid body" }, null, 2),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }

        const { data } = body;

        switch (data.tableIdentifier) {
          case "Product":
            await handleProductUpdate(data, env);
            break;
          case "Order":
            await handleOrderUpdate(data, env);
            break;
        }

        return new Response(`ok`);
      } catch (e) {
        console.log(e);
        return new Response(
          "error: " + e.toString() + "\n" + JSON.stringify(req.body)
        );
      }
    }
  },
};
