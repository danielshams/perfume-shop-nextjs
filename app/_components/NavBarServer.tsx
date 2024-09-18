import { GetServerSidePropsContext } from "next";
import { auth } from "../_lib/auth";
import { NavBar } from "./NavBar";
import { Session } from "next-auth";

export async function getServerSideProps(context: {
  req: GetServerSidePropsContext;
}) {
  const session = await auth(context.req);
  return {
    props: {
      session,
    },
  };
}

interface NavBarServerProps {
  showSearch?: boolean;
  session: Session | null;
  hideUserIcon?: boolean;
}

export default function NavBarServer({
  showSearch = true,
  session,
  hideUserIcon = false,
}: NavBarServerProps) {
  return (
    <NavBar
      showSearch={showSearch}
      session={session}
      hideUserIcon={hideUserIcon}
    />
  );
}
