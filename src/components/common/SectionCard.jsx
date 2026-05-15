export function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-card backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}
