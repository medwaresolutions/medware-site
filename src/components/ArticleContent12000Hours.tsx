"use client";

import { motion } from "framer-motion";

export default function ArticleContent() {
  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Nav back */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-[#1F2937]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-wider">
            <span className="text-[#3B82F6]">MED</span>
            <span className="text-[#F9FAFB]">WARE</span>
          </a>
          <a
            href="/"
            className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
          >
            ← Back
          </a>
        </div>
      </nav>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-6 pt-32 pb-24"
      >
        <header className="mb-16 text-center">
          <div className="text-sm text-[#3B82F6] font-medium uppercase tracking-wider mb-4">
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            What I Learned After 12,000 Hours with AI
          </h1>
          <p className="text-[#9CA3AF] text-lg">
            By Matt Martin, Founder of Medware Solutions
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none [&>p]:text-[#9CA3AF] [&>p]:leading-relaxed [&>p]:mb-6 [&>h2]:text-[#F9FAFB] [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:mt-16 [&>h2]:mb-6 [&>strong]:text-[#F9FAFB] [&>p>strong]:text-[#F9FAFB] [&>ul]:text-[#9CA3AF] [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul>li]:leading-relaxed [&>a]:text-[#3B82F6] [&>a]:underline [&>p>a]:text-[#3B82F6] [&>p>a]:underline [&>hr]:border-[#1F2937] [&>hr]:my-12">

          <p>
            At the end of last year, I promised on LinkedIn that I&apos;d run an AI training course. Life got in the way — client work, product launches, the usual chaos of running a health tech company in Sydney.
          </p>
          <p>
            So here&apos;s the next best thing: everything I&apos;ve learned after 12,000+ hours with AI, written down properly.
          </p>
          <p>
            I was in my 50s with no formal developer training when I first opened ChatGPT in November 2022. Three years later, I&apos;ve built and shipped multiple production software products — Medflow (clinical workflow management) and Medcast (medical education media). Real products, used by real businesses.
          </p>
          <p>
            I&apos;m not writing this to impress anyone. I&apos;m writing it because most of what you read about AI is either breathless hype or academic jargon, and neither helps if you&apos;re trying to actually <em>use</em> the stuff.
          </p>
          <p>This is what I&apos;ve learned. Practically. From the trenches.</p>

          <hr />

          <h2>1. The Basics Nobody Explains Well</h2>
          <p>
            Let&apos;s start with what these things actually are, because most explanations are either dumbed down to uselessness or buried in technical language.
          </p>
          <p>
            Large Language Models (LLMs) are pattern-completion engines. They&apos;ve been trained on enormous amounts of text — books, code, websites, conversations — and they&apos;ve learned to predict what comes next in a sequence. That&apos;s fundamentally it. They don&apos;t &ldquo;think&rdquo; the way you and I do. They&apos;re extraordinarily sophisticated pattern matchers.
          </p>
          <p>
            But here&apos;s what that undersells: the patterns they&apos;ve learned are so rich and so deep that the output often looks indistinguishable from genuine reasoning. When Claude writes a complex function or GPT drafts a legal summary, it&apos;s not copying something it memorised. It&apos;s generating new text based on patterns it learned during training.
          </p>
          <p><strong>The major players right now:</strong></p>
          <p>
            <strong>Claude</strong> (made by Anthropic) is my go-to for coding and complex reasoning. It understands software architecture, writes clean code, and handles nuanced instructions better than anything else I&apos;ve used.
          </p>
          <p>
            <strong>GPT</strong> (OpenAI) is the household name. Strong all-rounder, particularly good for writing tasks — emails, content, summaries. It has a natural flow that&apos;s hard to beat.
          </p>
          <p>
            <strong>Gemini</strong> (Google) has a massive context window, meaning you can feed it huge documents — entire codebases, 500-page PDFs — and it handles them well. Great for research and analysis.
          </p>
          <p>
            <strong>Llama</strong> (Meta) is open source, which means you can run it locally on your own hardware. Important for privacy-sensitive work and for the open-source community pushing things forward.
          </p>
          <p>
            <strong>Grok</strong> (xAI, Elon Musk&apos;s company) is the newest serious contender. Strong reasoning, real-time web access, and it&apos;s improving fast. One to watch.
          </p>
          <p>
            <strong>DeepSeek</strong> (Chinese lab) shocked the industry with models that rival the best at a fraction of the training cost. Open weights, strong at coding and maths. A reminder that this isn&apos;t just a Silicon Valley race.
          </p>
          <p>
            <strong>Qwen</strong> (Alibaba) and <strong>Mistral</strong> (French startup) round out the global picture — both producing excellent open-weight models that push the whole ecosystem forward.
          </p>
          <p>
            One distinction that trips people up: <strong>training</strong> versus <strong>inference</strong>. Training is when the model learns — it costs millions of dollars and takes months. Inference is when you use it — that&apos;s the chat, the API call, the prompt. When you&apos;re talking to ChatGPT, you&apos;re not teaching it anything. You&apos;re using what it already knows. Your conversations don&apos;t change the model.
          </p>
          <p>I learned all of this in my 50s. Age is irrelevant. Curiosity isn&apos;t.</p>

          <hr />

          <h2>2. What Is an Agent and Why It Matters</h2>
          <p>
            For my first year with AI, I was a copy-paste merchant. Ask ChatGPT a question, copy the code, paste it into my editor, run it, find the error, go back to ChatGPT, paste the error, get a fix, copy, paste. Dozens of browser tabs. Constant context-switching.
          </p>
          <p>Then I discovered agents, and everything changed.</p>
          <p>
            An agent is AI that doesn&apos;t just answer questions — it takes actions. It can read your files, write code, execute commands, browse the web, manage tasks. It operates in your environment, not just in a chat window.
          </p>
          <p>
            <strong>Claude Code</strong> lives in my terminal. I describe what I want, and it reads my existing codebase, understands the architecture, writes the new feature, runs the tests, and commits the code. It&apos;s not perfect — I review everything — but it&apos;s like having a tireless junior developer who knows every file in the project.
          </p>
          <p>
            <strong>Cursor</strong> is an AI-powered code editor that understands your whole project. You can highlight code, ask it to refactor, and it does it in-place.
          </p>
          <p>
            The shift from chatbot to agent is the biggest leap in practical AI usefulness I&apos;ve experienced. If you&apos;re still just having conversations with AI, you&apos;re using maybe 10% of what&apos;s available.
          </p>

          <hr />

          <h2>3. The Right AI for the Right Job</h2>
          <p>
            &ldquo;Which AI should I use?&rdquo; is the most common question I get, and the honest answer is: it depends entirely on what you&apos;re doing.
          </p>
          <p>
            <strong>For coding:</strong> Claude, and it&apos;s not close.
          </p>
          <p>
            <strong>For general writing:</strong> GPT still has the smoothest output for emails, marketing copy, blog posts, and content creation.
          </p>
          <p>
            <strong>For research and large documents:</strong> Gemini. Google&apos;s context window is enormous.
          </p>
          <p>
            <strong>For images:</strong> Midjourney for artistic, Flux for photorealism.
          </p>
          <p>
            <strong>For video:</strong> Sora and Runway are leading the pack.
          </p>
          <p>
            The real skill isn&apos;t knowing which model is &ldquo;best.&rdquo; It&apos;s knowing which model to reach for based on what you&apos;re doing right now. I switch between models multiple times a day.
          </p>

          <hr />

          <h2>4. What Nobody Tells You About Using AI Well</h2>
          <p>
            Here&apos;s the single most valuable lesson from 12,000 hours:
          </p>
          <p>
            <strong>Don&apos;t chase a poor response. Just start again.</strong>
          </p>
          <p>
            When an AI gives you a mediocre or wrong answer, your instinct is to correct it. And sometimes that works. But often the AI has committed to an approach, and it will keep trying to make that approach work rather than stepping back and rethinking.
          </p>
          <p>
            Once they start, they don&apos;t stop. They&apos;ll refactor, adjust, add workarounds — all to salvage their initial direction. I&apos;ve watched AI models spend 20 iterations trying to fix something that was wrong from the first line.
          </p>
          <p>
            The fix? Start a fresh conversation. Give it a cleaner prompt with better context. You&apos;ll get a better answer in one shot than you&apos;d have gotten in 30 rounds of correction.
          </p>
          <p>
            <strong>Prompting is a real skill.</strong> The difference between a vague prompt and a precise one is the difference between useless and extraordinary output. Be specific. Provide context. Give examples. Tell it what role to adopt. Tell it what to avoid.
          </p>
          <p>
            The gap between people who say &ldquo;AI is overhyped&rdquo; and people who say &ldquo;AI changed my life&rdquo; is almost always the gap in how they use it, not the technology itself.
          </p>

          <hr />

          <h2>5. Measure Twice, Cut Once</h2>
          <p>
            This lesson cost me hundreds of hours before I learned it.
          </p>
          <p>
            Early on, my workflow was: have an idea, describe it to AI, start building immediately. Three hours later, I&apos;d scrap it and start over with a better understanding of what I actually wanted.
          </p>
          <p>
            Then I started planning first. Not big, formal planning documents. Just 10 minutes of structured thinking before touching any code.
          </p>
          <p>
            The difference was dramatic. Projects that used to take 8-12 hours of iteration now took 2-3 hours of focused building.
          </p>
          <p>
            This pattern was so consistently valuable that I built a tool around it. <strong>Framewright</strong> (<a href="https://framewright.site">framewright.site</a>) is a free, open-source planning tool that helps you create structured specifications before you write code.
          </p>
          <p>
            No sign-up required. No paywall. It&apos;s open source. The old carpenter&apos;s rule applies perfectly to AI: measure twice, cut once.
          </p>

          <hr />

          <h2>6. What&apos;s Possible Now and What&apos;s Coming</h2>
          <p>
            When I started in November 2022, ChatGPT could write basic code but struggled with anything complex. Image generation produced nightmare fuel. Video generation didn&apos;t exist. The idea of an AI agent that could autonomously navigate a codebase was science fiction.
          </p>
          <p>Today — just over three years later:</p>
          <ul>
            <li>AI writes production-quality code across full-stack applications.</li>
            <li>Image generation is indistinguishable from photography in many cases.</li>
            <li>Video generation produces cinematic-quality footage from text descriptions.</li>
            <li>AI agents manage complex multi-step workflows with minimal oversight.</li>
            <li>A 60-year-old non-developer has multiple production software products in the market.</li>
          </ul>
          <p>
            <strong>What this means for non-developers:</strong> If you have domain expertise — in medicine, law, education, finance, anything — you can now build the tools your industry actually needs. The people who understand the problems are no longer blocked by the inability to code the solutions.
          </p>
          <p>
            That&apos;s not some future prediction. I&apos;m living proof of it, right now.
          </p>

          <hr />

          <h2>Where This Leaves Us</h2>
          <p>
            Three years ago, building software required years of training. Now it requires clarity of thought and willingness to learn. The tools do the rest.
          </p>
          <p>
            The people who&apos;ll thrive aren&apos;t the ones who know the most about AI. They&apos;re the ones who know the most about their own domain and learn enough about AI to bridge the gap.
          </p>
          <p>
            I started in my 50s with no coding background, and now I have production software in the market, an open-source tool helping others build better, and more energy for this work than I&apos;ve had for anything in decades.
          </p>
          <p className="text-[#F9FAFB] font-medium text-xl">
            The best time to start was three years ago. The second best time is today.
          </p>

          <hr />

          <p className="text-sm italic">
            Matt Martin is the founder of Medware Solutions, building Medflow (clinical workflow management) and Medcast (medical education media). He&apos;s been using AI daily since November 2022. Find his free planning tool at{" "}
            <a href="https://framewright.site">framewright.site</a>. For 1-on-1 AI training or help building with AI, reach out at{" "}
            <a href="mailto:matt@medware.com.au">matt@medware.com.au</a>.
          </p>
        </div>
      </motion.article>
    </div>
  );
}
