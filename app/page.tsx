const sections = ["intro", "work", "about", "contact"]

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-24 px-6 py-24">
      {sections.map((name) => (
        <section
          key={name}
          id={name}
          data-section={name}
          className="flex min-h-[70svh] flex-col justify-center gap-4"
        >
          <span className="text-muted-foreground/60 font-mono text-[10px] tracking-[0.22em] uppercase">
            {name}
          </span>
          <h2 className="text-4xl font-semibold tracking-tight">
            Section {name}
          </h2>
          <p className="text-muted-foreground max-w-prose">
            Scroll, move the cursor, resize the window, or switch tabs — every
            rail updates live.
          </p>
        </section>
      ))}
    </div>
  )
}
