"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppController = void 0;
const whatsapp_service_1 = require("../service/whatsapp.service");
class WhatsAppController {
    constructor() {
        this.service = new whatsapp_service_1.WhatsAppService();
        this.send = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { phone, message } = req.body;
            const result = yield this.service.sendMessage(phone, message);
            res.json({
                success: true,
                data: result,
            });
        });
    }
}
exports.WhatsAppController = WhatsAppController;
