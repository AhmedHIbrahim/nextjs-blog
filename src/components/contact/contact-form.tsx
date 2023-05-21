import React, { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactDetails: any) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: {
        "Ccontent-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

function ContactForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [requestStatus, setRequestStatus] = useState(""); //pending, success, error
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        if (emailInputRef.current !== null) {
          emailInputRef.current.value = "";
        }
        if (nameInputRef.current !== null) {
          nameInputRef.current.value = "";
        }
        if (messageInputRef.current !== null) {
          messageInputRef.current.value = "";
        }
        //setRequestStatus("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);




  async function sendMessageHandler(event: any) {
    event.preventDefault();

    const emailValue = emailInputRef.current?.value;
    const nameValue = nameInputRef.current?.value;
    const messageValue = messageInputRef.current?.value;

    try {
      setRequestStatus("pending");
      const response = await sendContactData({
        email: emailValue,
        name: nameValue,
        message: messageValue,
      });

      setRequestStatus("success");
      console.log(response);
    } catch (err: any) {
      console.log(err);
      setRequestStatus("error");
      setRequestError(err.message);
    }
  }

  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending Message...",
      message: "Your Message is in its way",
    };
  } else if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  } else if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input ref={emailInputRef} type="email" id="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input ref={nameInputRef} type="text" id="name" required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message"> Your Message</label>
          <textarea ref={messageInputRef} id="message" rows={5}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
