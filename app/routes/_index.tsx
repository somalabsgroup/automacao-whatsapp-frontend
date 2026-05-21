import { redirect, type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  // Redireciona para home
  throw redirect("/");
}

export default function Index() {
  return null;
}
