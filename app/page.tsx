import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const hasSession = cookieStore
    .getAll()
    .some((cookie) => /^sb-.*-auth-token(?:\.\d+)?$/.test(cookie.name));

  redirect(hasSession ? "/dashboard" : "/login");
}
