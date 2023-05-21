import Head from "next/head";
import ContactForm from "@/components/contact/contact-form";
import React, { Fragment } from "react";

function Contact() {
  return (
    <Fragment>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="send me your messages" />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default Contact;
