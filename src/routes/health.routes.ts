import { Router, Request, Response } from "express";

const router = Router();

router.get("/health2", (req: Request, res: Response) => {
  console.log(" Successfull health Router");
  res.json({ 
    status: "200", 
    message: "Healthy", 
    timeStamp: new Date() 
});
});

export const healthRouter = router;
 