export default class GooglePalmService {
  static async generateText({ text }) {
    console.log("google palm service generateText called", text);
    const rsp = await fetch(
      `https://finai-server.deno.dev/generativelanguage/v1beta2/models/text-bison-001:generateText`,
      {
        method: "POST",
        body: JSON.stringify({
          prompt: { text },
        }),
      }
    ).then((rsp) => rsp.json());

    console.log("rsp.json()", rsp);
    return rsp;
  }

  static async generateMessage({ messages }) {
    console.log("google palm service generateMessage called", messages);
    const rsp = await fetch(
      `https://finai-server.deno.dev/generativelanguage/v1beta2/models/chat-bison-001:generateMessage`,
      {
        method: "POST",
        body: JSON.stringify({
          prompt: { messages },
        }),
      }
    ).then((rsp) => rsp.json());

    console.log("rsp.json()", rsp);
    return rsp;
  }
  static async embeddingText({ text }) {
    console.log("google palm service embedText called", text);
    const rsp = await fetch(
      `https://finai-server.deno.dev/generativelanguage/v1beta2/models/embedding-gecko-001:embedText`,
      {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
      }
    ).then((rsp) => rsp.json());

    console.log("rsp.json()", rsp);
    return rsp;
  }
}
