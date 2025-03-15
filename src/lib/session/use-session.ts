import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { defaultSession, SessionData } from "./session.lib";
import { RefreshTokenType, UserType } from "@/types/user.types";
const sessionAPIRoute = "/api/session";

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

function doLogin(url: string, { arg }: { arg: UserType & RefreshTokenType }) {
  return fetchJson<SessionData>(url, {
    method: "POST",
    body: JSON.stringify({ ...arg }),
  });
}

function doLogout(url: string) {
  return fetchJson<SessionData>(url, {
    method: "DELETE",
  });
}

function doUpdate(url: string) {
  return fetchJson<SessionData>(url, {
    method: "PATCH",
  });
}

export default function useSession() {
  const { isLoading, data: session } = useSWR(sessionAPIRoute, fetchJson<SessionData>, {
    fallbackData: defaultSession,
  });
  const { trigger: login } = useSWRMutation(sessionAPIRoute, doLogin);
  const { trigger: logout } = useSWRMutation(sessionAPIRoute, doLogout);
  const { trigger: updateToken } = useSWRMutation(sessionAPIRoute, doUpdate);
  return { login, logout, updateToken, isLoading, session };
}
