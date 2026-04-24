"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
  isPlaceholder?: boolean;
};

const LOADING_PLACEHOLDER = "응답 중...";
const ERROR_REPLY = "답변을 가져오지 못했어요. 잠시 후 다시 시도해줘.";

export default function AiChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isResponding, setIsResponding] = useState(false);

  const canSend = useMemo(() => inputValue.trim().length > 0, [inputValue]);

  useEffect(() => {
    if (!isOpen) return;
    const list = listRef.current;
    if (!list) return;
    list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isResponding) return;

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMessageId = `user-${Date.now()}`;
    const placeholderId = `ai-pending-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      text: trimmed,
    };
    const loadingMessage: ChatMessage = {
      id: placeholderId,
      role: "ai",
      text: LOADING_PLACEHOLDER,
      isPlaceholder: true,
    };

    const conversationForRequest = [...messages, userMessage].map((message) => ({
      role: message.role,
      text: message.text,
    }));

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInputValue("");
    setIsResponding(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversationForRequest,
        }),
      });

      const data = (await response.json()) as { reply?: string };
      const nextText = response.ok && data.reply ? data.reply : ERROR_REPLY;

      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? { ...message, text: nextText, isPlaceholder: false }
            : message
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? { ...message, text: ERROR_REPLY, isPlaceholder: false }
            : message
        )
      );
    } finally {
      setIsResponding(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl">
          <header className="flex items-center justify-between border-b border-border/70 px-4 py-3">
            <h2 className="text-sm font-semibold tracking-tight">AI 챗봇</h2>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(false)}
              aria-label="대화창 닫기"
            >
              <X className="size-4" />
            </Button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4">
            {messages.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                메시지를 보내면 대화가 시작돼요.
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/70 bg-background text-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border/70 p-3"
          >
            <Input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="메시지를 입력하세요"
              aria-label="챗봇 메시지 입력"
              className="h-10 rounded-xl"
              disabled={isResponding}
            />
            <Button
              type="submit"
              size="icon"
              aria-label="메시지 보내기"
              disabled={!canSend || isResponding}
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}

      <Button
        type="button"
        size="icon-lg"
        className="size-14 rounded-full shadow-lg"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "챗봇 닫기" : "챗봇 열기"}
      >
        <MessageCircle className="size-6" />
      </Button>
    </div>
  );
}
