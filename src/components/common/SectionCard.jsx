export function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-card backdrop-blur sm:rounded-[32px] sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}
