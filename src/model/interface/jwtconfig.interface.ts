import { StringValue } from "ms";

export interface IJwtConfig {
    secretKey: string;
    expiresIn: StringValue ;
}