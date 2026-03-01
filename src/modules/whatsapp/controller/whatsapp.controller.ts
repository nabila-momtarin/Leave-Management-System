import { Request, Response } from "express";
import { WhatsAppService } from "../service/whatsapp.service";

export class WhatsAppController {
  private whatsappservice = new WhatsAppService();

  send = async (req: Request, res: Response) => {
    const { phone, message } = req.body;

    const result = await this.whatsappservice.sendMessage(phone, message);

    res.json({
      success: true,
      data: result,
    });
  };
}