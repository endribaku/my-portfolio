import { contact } from "@/lib/contact";

export function Intro() {
  return (
    <section className="max-w-xl">
      <h1 className="text-[24px] leading-none">Endri Baku</h1>

      <div className="mt-16 space-y-6">
        <p>I am a software engineer based in Tirana, Albania.</p>
        <p>
          I build things across the stack: interfaces, systems and the parts in
          between. Most of my time goes to the web. The rest goes to mobile,
          tinkering with machine learning experiments and wiring AI models into
          products.
        </p>
        <p>I like solving problems that don&apos;t have an obvious shape yet.</p>
        <p>
          You can reach out to me via{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-link underline decoration-dotted underline-offset-2"
          >
            email
          </a>
          , or see more on{" "}
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="text-link underline decoration-dotted underline-offset-2"
          >
            GitHub
          </a>
          <span>.</span>
        </p>
      </div>
    </section>
  );
}
