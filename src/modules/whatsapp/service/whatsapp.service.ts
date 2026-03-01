import axios from "axios";

export class WhatsAppService {
  async sendMessage(phone: string, message: string) {
    const url = `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`;
    //v22.0
    //text
    const body1 = {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: {
        body: message,
      },
    };
    //template
    const body2 = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US",
        },
      },
    };

    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

    try{
      console.log("Sending WhatsApp message via Axios...");
      const response = await axios.post(url, body1, { headers });
      // console.log("META RESPONSE:", JSON.stringify(response.data, null, 2));
    return response.data;
    } catch(error){
      console.error("Error sending WhatsApp message:", error);
      throw error;
    }
  }
}
