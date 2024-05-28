export default {
  async fetch(req: Request) {
    if (req.method == "POST") {
      console.log(req.body);
      return new Response(`ok`);
    }
  },
};
