'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { SITE } from '@/content/site'

type Msg = { role: 'user' | 'assistant'; content: string }

const GREETING =
  "Hi! I'm Skilltech's solar assistant ☀️ Ask me about rooftop solar, the PM Surya Ghar subsidy, KSEB net-metering, pricing, or any of our services."

const SUGGESTIONS = [
  'What does a 5 kW system cost?',
  'How much subsidy can I get?',
  'How does KSEB net-metering work?',
]

// After this many customer messages, hand off to a human on WhatsApp.
const MAX_USER_MESSAGES = 8

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: GREETING }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const shouldReduce = useReducedMotion()

  // Keep the latest message in view as it streams in.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    if (messages.filter((m) => m.role === 'user').length >= MAX_USER_MESSAGES) return
    setInput('')
    const history = [...messages, { role: 'user' as const, content: trimmed }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      // Surface friendly server messages (rate limit / not configured) as a reply.
      if (!res.ok) {
        const note = (await res.text().catch(() => '')).trim()
        setMessages((m) => {
          const c = [...m]
          c[c.length - 1] = {
            role: 'assistant',
            content: note || 'The assistant is unavailable right now — please try again shortly or reach us on WhatsApp.',
          }
          return c
        })
        return
      }
      if (!res.body) throw new Error('no body')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages((m) => {
          const c = [...m]
          c[c.length - 1] = { role: 'assistant', content: acc }
          return c
        })
      }
      if (!acc.trim()) {
        setMessages((m) => {
          const c = [...m]
          c[c.length - 1] = {
            role: 'assistant',
            content: "Sorry, I couldn't answer that just now — please message us on WhatsApp and we'll help right away.",
          }
          return c
        })
      }
    } catch {
      setMessages((m) => {
        const c = [...m]
        c[c.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong reaching the assistant. You can reach our team directly on WhatsApp or the contact page.',
        }
        return c
      })
    } finally {
      setLoading(false)
    }
  }

  const streaming = loading && messages[messages.length - 1]?.role === 'assistant' && messages[messages.length - 1]?.content === ''
  const userCount = messages.filter((m) => m.role === 'user').length
  const capped = userCount >= MAX_USER_MESSAGES
  const showSuggestions = messages.length === 1
  const waHref = SITE.whatsapp.number
    ? `https://wa.me/${SITE.whatsapp.number}?text=${SITE.whatsapp.message}`
    : '/contact'

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        className="fixed right-5 bottom-6 max-md:bottom-[7rem] z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1828] text-white shadow-[0_8px_30px_rgba(26,24,40,0.35)] ring-1 ring-white/10"
        whileHover={shouldReduce ? undefined : { scale: 1.06 }}
        whileTap={shouldReduce ? undefined : { scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F7B538] opacity-70" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#F7B538]" />
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Skilltech chat assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed z-[60] flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_70px_rgba(26,24,40,0.28)]
                       right-4 bottom-24 max-md:bottom-[7.5rem] max-md:left-4 max-md:right-4
                       w-[min(92vw,384px)] h-[min(70vh,560px)] max-md:w-auto max-md:h-[calc(100dvh-9.5rem)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#1A1828] px-4 py-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <Sparkles size={18} className="text-[#F7B538]" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold leading-tight">Skilltech Assistant</p>
                <p className="text-[0.7rem] text-white/60 leading-tight">Solar, subsidy & net-metering help</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#1A1828]/[0.02] px-3.5 py-4" data-lenis-prevent>
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[82%] rounded-2xl rounded-br-sm bg-[#1A1828] px-3.5 py-2.5 text-sm leading-relaxed text-white'
                        : 'max-w-[88%] rounded-2xl rounded-bl-sm border border-black/[0.06] bg-white px-3.5 py-2.5 text-sm leading-relaxed text-[#1A1828] shadow-sm'
                    }
                  >
                    {m.content ? (
                      m.role === 'assistant' ? <AssistantMessage content={m.content} /> : m.content
                    ) : streaming && i === messages.length - 1 ? <TypingDots /> : null}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestion chips */}
            {showSuggestions && !capped && (
              <div className="flex flex-wrap gap-2 border-t border-black/[0.06] px-3.5 py-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-[#1A1828]/15 px-3 py-1.5 text-[0.72rem] font-medium text-[#1A1828] transition hover:border-[#1A1828]/40 hover:bg-[#1A1828]/[0.04]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input — or, once the session cap is hit, a hand-off to WhatsApp */}
            {capped ? (
              <div className="border-t border-black/[0.06] bg-white px-3.5 py-3 text-center">
                <p className="mb-2.5 text-[0.78rem] leading-relaxed text-[#1A1828]/70">
                  Thanks for chatting! For a detailed quote or a free site survey, our team will help you directly.
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-bold text-white transition hover:brightness-95"
                >
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="flex items-center gap-2 border-t border-black/[0.06] bg-white p-2.5"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about solar, subsidy, pricing…"
                  aria-label="Type your message"
                  className="h-10 flex-1 rounded-full border border-black/10 bg-[#1A1828]/[0.03] px-4 text-sm text-[#1A1828] outline-none transition placeholder:text-[#1A1828]/40 focus:border-[#1A1828]/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7B538] text-[#1A1828] transition disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:brightness-95"
                >
                  <Send size={18} />
                </button>
              </form>
            )}

            {/* AI disclaimer */}
            <p className="bg-white px-3.5 pb-2 text-center text-[0.6rem] leading-tight text-[#1A1828]/40">
              Powered by AI · answers may be imperfect — please confirm details with our team.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function AssistantMessage({ content }: { content: string }) {
  return (
    <div className="space-y-1.5">
      {content.split('\n').map((line, index) => {
        const bullet = line.match(/^\s*(?:[-*•])\s+(.+)$/)
        if (bullet) {
          return (
            <div key={index} className="flex gap-2">
              <span aria-hidden="true" className="mt-0.5 text-[#F7B538]">•</span>
              <span>{formatInlineText(bullet[1])}</span>
            </div>
          )
        }

        return line ? <p key={index}>{formatInlineText(line)}</p> : <div key={index} className="h-1" />
      })}
    </div>
  )
}

// The model occasionally uses Markdown emphasis. Render the small safe subset
// we support instead of exposing literal ** markers in the customer-facing UI.
function formatInlineText(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#1A1828]/40"
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}
