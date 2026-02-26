"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserQuerySchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
    email: zod_1.z.email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    role: zod_1.z.enum(["admin", "user"]).default("user"),
})
    .strict();
exports.getUserQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    // sort: z.enum(["name", "email", "createdAt"]).optional(),
    sort: zod_1.z.string().optional(),
});
// export class UserValidator {
//     constructor() {}
//     validationResult = async (req: Request, res: Response): Promise<any> => {
//         const {email, password} = req.body;
//     }
// }
