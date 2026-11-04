"use client";

import { Mail, Phone } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    return newErrors;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("https://formspree.io/f/mleyqyzl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ message: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="relative min-h-dvh py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              className="glass rounded-2xl p-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="mb-6 text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                🧗‍♂️
              </motion.div>
              <motion.h2
                className="text-sub-text mb-6 text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Thanks for reaching out!
              </motion.h2>
              <motion.p
                className="text-sub-text mb-8 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I'll get back to you as soon as possible. In the meantime, feel
                free to check out my projects or connect with me on social
                media.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="glass text-sub-text"
                >
                  Send Another Message
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative min-h-dvh py-20">
      <div className="container mx-auto px-4">
        <div ref={containerRef} className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            className="mb-16 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="mb-6 text-5xl font-bold">Join the ascent</h2>
          </motion.div>

          <div className="text-sub-text grid gap-8 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                className="glass rounded-2xl p-8"
                variants={fadeInLeft}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="mb-2 text-3xl font-bold">Get In Touch</h3>
                <p className="text-sub-text mb-8">
                  Whether you're looking to collaborate or just want to say hi,
                  I'd love to hear from you!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className={`glass placeholder:text-sub-text/60 ${
                        errors.name
                          ? "border-destructive focus:ring-destructive"
                          : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`glass placeholder:text-sub-text/60 ${
                        errors.email
                          ? "border-destructive focus:ring-destructive"
                          : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Tell me about your project or just say hello..."
                      className={`glass placeholder:text-sub-text/60 resize-none ${
                        errors.message
                          ? "border-destructive focus:ring-destructive"
                          : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 text-lg font-medium"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending Message...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Map and Contact Info */}
            <div className="lg:col-span-3">
              <motion.div
                className="glass relative h-full min-h-[500px] overflow-hidden rounded-2xl"
                variants={fadeInRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  title="San Diego Location"
                  className="absolute inset-0"
                  frameBorder={0}
                  marginHeight={0}
                  marginWidth={0}
                  style={{ filter: "opacity(0.8)" }}
                  src="https://www.google.com/maps/embed/v1/place?q=San+Diego,+CA+92107,+USA&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                />

                {/* Contact Info Overlay */}
                <div className="absolute right-6 bottom-6 left-6">
                  <div className="glass rounded-xl p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="text-sub-text mb-2 text-sm font-semibold tracking-wider uppercase">
                          Location
                        </h3>
                        <p className="text-sub-text">San Diego, CA 92107</p>
                      </div>
                      <div>
                        <h3 className="text-sub-text mb-2 text-sm font-semibold tracking-wider uppercase">
                          Contact
                        </h3>
                        <div className="space-y-2">
                          <a
                            href="mailto:blakecrowther7@gmail.com"
                            className="text-sub-text hover:text-sub-text/80 flex items-center gap-2 transition-colors"
                          >
                            <Mail className="h-4 w-4" />
                            <span className="underline underline-offset-2">
                              blakecrowther7@gmail.com
                            </span>
                          </a>
                          <a
                            href="tel:951-553-9046"
                            className="text-sub-text hover:text-sub-text/80 flex items-center gap-2 transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            <span className="underline underline-offset-2">
                              951-553-9046
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
