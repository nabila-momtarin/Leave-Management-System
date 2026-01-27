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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const user_model_1 = __importDefault(require("../../../model/user.model"));
let UserService = class UserService {
    constructor() {
        this.createUser = (userData) => __awaiter(this, void 0, void 0, function* () {
            console.log("Entered in USER SERVICE");
            console.log(`request userData in CONTROLLER : ${userData}\n`);
            const existingUser = yield user_model_1.default.findOne({ email: userData.email });
            if (existingUser) {
                console.log("Error : User already exists");
                throw new Error("User already exists");
            }
            const user = yield user_model_1.default.create(userData);
            console.log(`user in SERVICE : ${user}\n\n`);
            return user;
        });
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Entered in USER SERVICE");
                const users = yield user_model_1.default.find({});
                console.log("SERVICE : users : ", users);
                return users;
            }
            catch (err) {
                console.log("SERVICE : Error : ", err);
                throw err;
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
