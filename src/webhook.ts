import { APIGatewayEvent } from "aws-lambda";

export async function handler(req: APIGatewayEvent){
    console.log("request", req);
    const body = req.body ? JSON.parse(req.body) : null;
    console.log(body);
    return {
        statusCode: 200,
        body: JSON.stringify({ status: "ok", test: 123 }, null, 2),
    };
}