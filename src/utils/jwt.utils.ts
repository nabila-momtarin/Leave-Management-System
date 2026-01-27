import jwt from "jsonwebtoken";
import { SECRET_KEY, EXPIRES_IN } from "../config/jwt";
import { StringValue } from "ms";

export const generateAccessToken =  (userId: string): string => {
  try {
    console.log("\nExpires In: ", EXPIRES_IN);
    console.log("Secret Key :", SECRET_KEY);
    console.log(`accessToken : in JWT.UTILS : ${userId}`);
    const accessToken = jwt.sign({ userId }, SECRET_KEY, {
      expiresIn: EXPIRES_IN as StringValue,
    });
    console.log(`\naccessToken in utils : ${accessToken}\n`);

    return accessToken;
  } catch (err: unknown) {
    console.log(`Error while generating accessToken ${err}`);
    throw new Error("Error while generating accessToken");
    // process.exit(1);
  }
};


export const verifyAccessToken = ( token : string): any => {
  try {
    console.log("Secret Key in Verify token jwtutils : ", SECRET_KEY);
    console.log("JWTUTILS : TOKEN : ", token);
    const verifiedToken = jwt.verify(token, SECRET_KEY);

    console.log(`decodedToken in utils : ${verifiedToken}\n`);

    return verifiedToken;
  } catch (err: unknown) {
    console.log(`JWT.UTILS :Error while verifying accessToken ${err}`);
    throw new Error("Error while verifying accessToken");
    // process.exit(1);
  }
}
//error throw korle pexit eya lage na cz 2ta e fun return er kaj kore, r8?

//StringValue
//jwt.SignOptions["expiresIn"]
