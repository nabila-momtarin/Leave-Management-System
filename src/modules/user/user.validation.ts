import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["admin", "user"]).default("user"),
  })
  .strict();


export const getUserQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit : z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
    // sort: z.enum(["name", "email", "createdAt"]).optional(),
    sort : z.string().optional(),
});




















// export class UserValidator {
//     constructor() {}

//     validationResult = async (req: Request, res: Response): Promise<any> => {
//         const {email, password} = req.body;

//     }
// }
