import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export function SelectInput({
  id,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className = "",
  disabled = false,
  name
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  useEffect(() => {
    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function commitValue(nextValue) {
    onChange?.({
      target: {
        value: nextValue,
        id,
        name
      }
    });
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-12 w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-left text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className={selectedOption ? "truncate" : "truncate text-slate-400"}>
          {selectedOption?.label || placeholder}
        </span>
        <FiChevronDown
          className={`shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
          <ul className="max-h-64 overflow-y-auto p-2" role="listbox" aria-labelledby={id}>
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => commitValue(option.value)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      isSelected
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected ? <FiCheck className="shrink-0" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
