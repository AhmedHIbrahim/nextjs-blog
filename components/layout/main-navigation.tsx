import React from "react";
import Link from "next/link";
import Logo from "./logo";

import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";

function MainNavigation() {
  const session = useSession();

  function logoutHandler(event: any) {
    signOut();
  }
  
  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {session.status !== "loading" && !session.data && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session.data && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session.data && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
