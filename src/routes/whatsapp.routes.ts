import { Router } from "express";
import { WhatsAppController } from "../modules/whatsapp/controller/whatsapp.controller";

const router = Router();
const controller = new WhatsAppController();

router.post("/send-message", controller.send);

export default router;