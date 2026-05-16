export function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`rounded-[28px] border border-white/80 bg-white/88 p-5 shadow-card backdrop-blur-md sm:rounded-[32px] sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}
