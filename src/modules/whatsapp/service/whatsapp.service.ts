import axios from "axios";

export class WhatsAppService {
  async sendMessage(phone: string, message: string) {
    const url = `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`;
    //v22.0
    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: phone,
        // type: "text",
        // text: {
        //   body: message,
        // },
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("META RESPONSE:", JSON.stringify(response.data, null, 2));
    return response.data;
  }
}
