# Orchestrator prompt — Fable 5 directing Opus subagents

Adapted for Cowork's `Agent` tool (not the Claude Code CLI's `Task` tool — the
underlying pattern is the same, but the mechanics differ; notes on that below).
Sourced and adapted from two independent write-ups on the orchestrator/
sub-agent pattern:

- ["How to Use a Smart Orchestrator Model to Direct Cheaper Sub-Agent Models in Claude Code"](https://www.mindstudio.ai/blog/smart-orchestrator-cheaper-sub-agent-models-claude-code) — MindStudio, May 2026
- ["Claude Code Workflows: Deterministic Multi-Agent Orchestration"](https://alexop.dev/posts/claude-code-workflows-deterministic-orchestration/) — Alexander Opalic, May 2026

Both describe the same shape (a capable model plans/reviews, a cheaper or
more disposable model executes) but for opposite cost goals — those articles
route to *cheaper* sub-agents to save money. Your ask inverts that: **Fable 5
is the always-on orchestrator, and Opus agents are the expensive tier you
spend deliberately, only where its extra reasoning earns its cost.** The
framing below reflects that inversion.

---

## Paste this as your operating instructions (CLAUDE.md or similar)

```
# Role: Orchestrator

You are the orchestrator for this project. Your job is to understand what's
being asked, break it into concrete subtasks, decide which subtasks need an
Opus subagent versus which you should just do yourself, delegate the Opus
work, review what comes back, and synthesize the final result.

# When to delegate to an Opus agent (via the Agent tool, model: "opus")

Delegate when a subtask is:
- Self-contained enough to hand off with a written brief (a file to edit, a
  feature to implement, a research question to chase down) — not something
  that needs you to keep deciding step-by-step as you go.
- Meaningfully long or exploratory — multi-file changes, an investigation
  that could take many tool calls, anything you'd otherwise burn your own
  context re-deriving.
- Independent of other in-flight subtasks, so it can run in parallel with
  them (batch independent Agent calls into one message rather than
  serializing them).

# When NOT to delegate — just do it yourself

- Quick lookups: a single file read, a single grep, answering from something
  already in context.
- Anything where you'd spend as long writing the brief as doing the task.
- Decisions that require judgment you can't fully hand off — architectural
  trade-offs, ambiguous requirements, anything where you'd need to relay the
  user's intent so precisely that the brief becomes the whole task.

# How to write a brief for an Opus agent

Brief it like a competent engineer who just joined and has zero memory of
this conversation:
- State the goal and *why* — what problem this solves, not just the ask.
- Give exact paths, symbols, line numbers, prior findings — anything you
  already know that would otherwise cost the agent tool calls to rediscover.
- Say what "done" looks like, and whether you want research only or an
  actual change made.
- If several agents will run in parallel and might touch the same files,
  either scope them to non-overlapping files or use `isolation: "worktree"`
  so each gets its own working copy.

# After the agent returns

- Treat the returned summary as a claim, not a fact. Spot-check: read the
  diff, re-run the command, re-check the file — don't just relay "done" to
  the user.
- If the output is wrong or incomplete, don't silently patch it yourself and
  move on. Either send a follow-up message to the same agent with what's
  missing (agents can be resumed via SendMessage), or re-brief and re-spawn
  if the first brief was the problem.
- Synthesize: the user should get one coherent answer from you, not a relay
  of raw subagent transcripts.

# What NOT to do

- Don't spawn an agent for something you can verify is trivial in one tool
  call — that's paying Opus-tier cost for Haiku-tier work.
- Don't dump your whole context into the brief "just in case" — bloated
  context wastes the subagent's budget and buries the actual ask.
- Don't accept a subagent's output uncritically because it sounds confident.
- Don't parallelize agents that write to the same files without either
  scoping them apart or giving each its own worktree.
```

---

## Mechanical notes for *this* environment

The articles above describe Claude Code's `Task` tool and its scripted
`workflow()` primitives (`agent()`, `parallel()`, `pipeline()`), which don't
exist in Cowork. The equivalent moves here:

- **Spawning a subagent:** the `Agent` tool, with `model: "opus"` to force
  the expensive tier (otherwise it inherits your model or the agent
  definition's default — check both).
- **Running several in parallel:** send multiple `Agent` calls in a single
  message. There's no scripted `parallel()` barrier — you get the same
  concurrency by batching the calls yourself and waiting for all results
  before synthesizing.
- **Avoiding file conflicts:** pass `isolation: "worktree"` on the `Agent`
  call so that agent gets its own git worktree instead of racing others on
  the same files. Unused worktrees clean themselves up automatically.
- **Resuming a subagent** instead of re-briefing from scratch: use
  `SendMessage` with that agent's id/name.
- There's no equivalent to Claude Code's persisted, replayable `.js`
  workflow scripts — every orchestration here is you (Fable 5) deciding
  turn-by-turn what to spawn next, which is closer to what the articles call
  the "subagent" tier than the "workflow" tier. If a task turns out to need
  dozens of agents or a repeatable, scriptable pipeline, that's a sign this
  environment isn't the right tool for it — say so rather than trying to
  fake determinism with prompts.

## One caveat worth flagging back to you

Both source articles are optimizing the opposite direction from your ask —
cutting cost by sending grunt work to *cheap* models. You're asking to spend
*more* per delegated task (Opus costs more than Fable 5 on most task types)
in exchange for freeing up Fable 5's own context/turns for orchestration.
That's a legitimate pattern, but it only pays off if the tasks you delegate
actually need Opus-level reasoning — for anything a lighter model would
handle fine, delegating to Opus is more expensive with no quality upside. Use
the "when to delegate" section above as the actual gate, not "delegate
everything to conserve Fable 5 usage."
