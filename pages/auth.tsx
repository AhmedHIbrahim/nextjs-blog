import AuthForm from "@/components/auth/auth-form";
import { getSession, useSession } from "next-auth/react";
import React from "react";

function Auth() {
  // # - - OPTION #1
  // const session = useSession()
  // if (session.status === "loading") {
  //   return <p>Loading...</p>;
  // }
  // if (session.status === 'authenticated') {
  //   window.location.href = "/";
  // }

  // # - - OPTION #2
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       router.replace("/");
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);
  // if(isLoading){
  //   return <p>Loading...</p>
  // }

  return <AuthForm />;
}

// # - - OPTION #3
export async function getServerSideProps(context: any) {
  const session = await getSession({
    req: context.req,
  });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Auth;
