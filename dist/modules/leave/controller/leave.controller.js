"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.LeaveController = void 0;
const tsyringe_1 = require("tsyringe");
const leave_service_1 = require("../service/leave.service");
const api_response_1 = require("../../../utils/api.response");
let LeaveController = class LeaveController {
    constructor(LeaveService) {
        this.LeaveService = LeaveService;
        this.postLeave = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // try {
            console.log("Entered in LEAVE CONTROLLER");
            const body = req.body;
            if (!body.employeeId ||
                !body.leaveType ||
                !body.leaveStatus ||
                !body.startDate ||
                !body.endDate ||
                typeof body.startDate !== "string" ||
                typeof body.endDate !== "string" ||
                typeof body.employeeId !== "string" ||
                typeof body.leaveType !== "string" ||
                typeof body.leaveStatus !== "string") {
                console.log("Controller: Invalid request payload");
                throw new api_response_1.ApiError("Invalid request payload", 400);
            }
            const data = body;
            console.log(`request data in CONTROLLER : ${data}`);
            console.log("\n", data);
            const leave = yield this.LeaveService.createLeave(data);
            if (!leave) {
                console.log("Controller: Leave not created");
                throw new api_response_1.ApiError("Leave not created", 400);
            }
            return res.status(200).json({
                status: "200",
                message: "Leave added successfully",
                timeStamp: new Date(),
                data: leave,
            });
            // } catch (err) {
            //   console.log("ERROR in Leave CONTROLLER : ", err);
            //   return res.status(400).json(err);
            // }
        });
    }
};
exports.LeaveController = LeaveController;
exports.LeaveController = LeaveController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [leave_service_1.LeaveService])
], LeaveController);
