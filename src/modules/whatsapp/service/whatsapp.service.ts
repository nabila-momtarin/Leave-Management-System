import axios from "axios";

export class WhatsAppService {
  async sendMessage(phone: string, message: string) {
    const url = `https://graph.facebook.com/v25.0/${process.env.PHONE_NUMBER_ID}/messages`;
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
        name: "hello_template",
        language: {
          code: "en",
        },
      },
    };

    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

    try {
      console.log("Sending WhatsApp message via Axios...");
      const response = await axios.post(url, body2, { headers });
      // console.log("META RESPONSE:", JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error : any) {
      //  catch (error) {
      //   // console.error("ERROR sending WhatsApp message:", error.response ? error.response.data : error.message);
      //   console.error("\nERROR sending WhatsApp message:\n", error);
      //   throw error;
      // }
      if (error.response) {
        console.error(
          "ERROR sending WhatsApp message:",
          JSON.stringify(error.response.data, null, 2),
        ); // Log full error response
      } else {
        console.error("Unknown error:", error.message);
      }
      throw error;
    }
  }
}
