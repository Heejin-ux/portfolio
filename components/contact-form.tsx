"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SubmitState = "idle" | "success" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("idle");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setSubmitState("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        }),
      });

      const result = (await response.json()) as { success?: boolean };
      if (response.ok && result.success) {
        setSubmitState("success");
        form.reset();
        return;
      }

      setSubmitState("error");
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-6 space-y-5" aria-label="연락 문의 폼" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          이름
        </label>
        <Input
          id="contact-name"
          name="name"
          placeholder="이름을 입력해주세요"
          autoComplete="name"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          이메일
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          메시지
        </label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="문의 내용을 자유롭게 남겨주세요"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2 pt-1">
        <Button
          type="submit"
          size="lg"
          className="h-11 rounded-xl px-6"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? "보내는 중..." : "보내기"}
        </Button>

        {submitState === "success" && (
          <p className="text-xs text-muted-foreground">
            메일이 전송됐어요. 곧 답장드릴게요
          </p>
        )}
        {submitState === "error" && (
          <p className="text-xs text-destructive">
            전송에 실패했어요. 잠시 후 다시 시도해주세요
          </p>
        )}
      </div>
    </form>
  );
}
