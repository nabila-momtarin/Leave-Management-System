"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whatsapp_controller_1 = require("../modules/whatsapp/controller/whatsapp.controller");
const router = (0, express_1.Router)();
const controller = new whatsapp_controller_1.WhatsAppController();
router.post("/send-message", controller.send);
exports.default = router;
