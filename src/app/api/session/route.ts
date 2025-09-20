// handlers for mutating and querying session data

import { defaultSession, SessionData, sessionOptions } from "@/lib/session/session.lib";
import { RefreshTokenType } from "@/types/user.types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

// POST /api/session
// login user
export async function POST(request: Request) {
  try {
    const userData = await request.json();

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    session.user = userData.user;
    session.token = userData.token;
    session.refreshToken = userData.refreshToken;
    session.expiresIn = userData.expiresIn;
    session.isLoggedIn = true;
    await session.save();

    return Response.json(session);
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
}

// DELETE /api/session
// logout user
export async function DELETE() {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.destroy();
    return Response.json(defaultSession);
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
}

// GET /api/session
// get session data
export async function GET() {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isLoggedIn) {
      return Response.json(defaultSession);
    }
    return Response.json(session);
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
}

// PATCH /api/session
// refresh session token
export async function PATCH(request: Request) {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isLoggedIn) {
      return Response.json(defaultSession);
    }
    const refreshTokenData = (await request.json()) as RefreshTokenType;

    const { token, refreshToken, expiresIn } = refreshTokenData;
    session.token = token;
    session.refreshToken = refreshToken;
    session.expiresIn = expiresIn;
    session.isLoggedIn = true;
    await session.save();

    return Response.json(session);
  } catch (error) {
    const err = error as Error;
    return new Response(err.message, { status: 500 });
  }
}
