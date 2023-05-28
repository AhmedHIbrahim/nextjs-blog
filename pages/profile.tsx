import UserProfile from "@/components/profile/user-profile";
import { getSession } from "next-auth/react";
import React from "react";

function Profile() {
  return <UserProfile />;
}

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      revalidate: 1000
    },
  };
}

export default Profile;
