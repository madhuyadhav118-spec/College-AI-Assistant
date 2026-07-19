import { Request, Response, NextFunction } from "express";

export const authorize = (...roles: string[]) => {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const user = (req as any).user;

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Check if role is allowed
        if (!roles.includes(user.role)) {
            return res.status(403).json({
                message: "Access Forbidden"
            });
        }

        next();

    };

};