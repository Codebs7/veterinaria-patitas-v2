
import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret_dev_only";
const key = new TextEncoder().encode(SECRET_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch {
        return null;
    }
}

import { cookies } from "next/headers";

export async function getSession(): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const sessionCookie = (await cookies()).get("session");
    if (!sessionCookie) return null;
    return await verifyToken(sessionCookie.value);
}
