"use client";
import { Snackbar } from "@mui/material";
import { useState, type FormEvent } from "react";
import { MessageSquare, User, Mail } from "lucide-react";
import UseAnimations from "react-useanimations";
import send from "react-useanimations/lib/send";
import { useForm } from "@formspree/react";

import { Card } from "../components/card";

const fieldClass =
  "w-full rounded-lg border border-zinc-700/80 bg-zinc-900/50 px-3 py-2.5 font-mono text-sm text-zinc-100 outline-none transition-colors duration-300 placeholder:text-zinc-500 focus:border-[#ff174f]/50 focus:bg-zinc-900/80";

export default function MessageForm() {
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    email: "",
  });
  const [, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_TOKEN || "",
  );
  const [showMessageSentAlert, setShowMessageSentAlert] = useState(false);
  const [showEmailInvalidAlert, setShowEmailInvalidAlert] = useState(false);
  const [showMessageNotSentAlert, setShowMessageNotSentAlert] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmailValid(formData.email)) {
      setShowEmailInvalidAlert(true);
    } else {
      setShowMessageSentAlert(true);
      resetForm();
      const id = window.setTimeout(async () => {
        setShowEmailInvalidAlert(false);
        setShowMessageSentAlert(false);
        setShowMessageNotSentAlert(false);
        await handleSubmit(formData);
      }, 6000);
      setTimeoutId(id);
    }
  };

  const resetForm = () => {
    setFormData({ message: "", name: "", email: "" });
  };

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  };

  const undoSend = (
    <button
      onClick={() => {
        setShowMessageSentAlert(false);
        setShowMessageNotSentAlert(true);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }}
    >
      UNDO
    </button>
  );

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          <div className="col-span-2 flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
              <MessageSquare size={16} className="text-zinc-400" />
              Message
            </div>
            <textarea
              value={formData.message}
              rows={6}
              className={`${fieldClass} min-h-[10rem] flex-1 resize-none`}
              id="message"
              name="message"
              placeholder="Type your message here"
              required={true}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          <div className="col-span-1 flex w-full flex-col gap-5">
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
                <User size={16} className="text-zinc-400" />
                Name
              </div>
              <input
                value={formData.name}
                type="text"
                name="name"
                required={true}
                placeholder="Full Name"
                className={fieldClass}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
                <Mail size={16} className="text-zinc-400" />
                Email
              </div>
              <input
                value={formData.email}
                className={fieldClass}
                type="email"
                name="email"
                placeholder="Email Address"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative mt-auto flex w-full flex-col gap-1">
              <Card className="h-full">
                <UseAnimations
                  animation={send}
                  size={16}
                  interaction="hover-replay"
                  render={(eventProps, animationProps) => (
                    <button
                      type="submit"
                      className="group/send relative flex h-full w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-zinc-700/80 bg-zinc-900/40 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-200 transition-colors duration-500 hover:border-zinc-500 hover:bg-zinc-900/70 hover:text-white"
                      {...eventProps}
                    >
                      <span className="relative">Send</span>
                      <span {...animationProps} />
                    </button>
                  )}
                />
              </Card>
              {showMessageSentAlert && (
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  onClose={() => {
                    setShowMessageSentAlert(false);
                  }}
                  open={showMessageSentAlert}
                  autoHideDuration={6000}
                  action={undoSend}
                  message="Message Sent"
                  style={{ position: "absolute", top: "120%" }}
                />
              )}
              {showEmailInvalidAlert && (
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  onClose={() => {
                    setShowEmailInvalidAlert(false);
                  }}
                  open={showEmailInvalidAlert}
                  autoHideDuration={6000}
                  message="Invalid Email Address"
                  style={{ position: "absolute", top: "120%" }}
                />
              )}
              {showMessageNotSentAlert && (
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  onClose={() => {
                    setShowMessageNotSentAlert(false);
                  }}
                  open={showMessageNotSentAlert}
                  autoHideDuration={6000}
                  message="Message not sent"
                  style={{ position: "absolute", top: "120%" }}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
