import React from "react";
import classes from "./hero.module.css";
import Image from "next/image";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/blogger.webp"
          alt="blogger image"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I am Ahmed</h1>
      <p>I blog about web development - especially frontend framweorks</p>
    </section>
  );
}

export default Hero;
