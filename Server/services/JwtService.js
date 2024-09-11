import { COOKIE_EXPIRES } from "../config/index.js";

export const JwtService = (user, message, statusCode, res)=>{
    const token = user.getJWTToken();
    console.log(token)
    res.status(statusCode).cookie("token", token, {
        expires: new Date(
            Date.now() + COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "None",
        secure: true,
    }).json({
        success: true,
        message,
        user
    })
}  