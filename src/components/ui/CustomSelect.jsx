import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Pilih opsi...",
  size = "md",
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) =>
    typeof opt === "string" ? opt === value : opt.value === value,
  );

  const displayLabel = selectedOption
    ? typeof selectedOption === "string"
      ? selectedOption
      : selectedOption.label
    : placeholder;

  const displayMeta =
    selectedOption && typeof selectedOption !== "string"
      ? selectedOption.meta
      : null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const triggerHeight =
    size === "sm"
      ? "min-h-[42px] px-3 py-2 text-sm sm:text-xs"
      : "min-h-[46px] px-3.5 py-2.5 text-base sm:text-sm";

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="block text-xs font-semibold text-[#1F2421]">
          {label}
        </label>
      )}

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`mt-1.5 flex w-full items-center justify-between gap-2 rounded-xl border bg-[#F9F7F2] text-left text-[#1F2421] transition outline-none ${triggerHeight} ${
          open
            ? "border-[#24332A] bg-white ring-2 ring-[#24332A]/10"
            : "border-[#E5E0D5] hover:border-[#B8B0A0]"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2 truncate font-medium">
          {displayMeta && <span className="shrink-0">{displayMeta}</span>}
          <span className="truncate">{displayLabel}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#666E68] transition-transform duration-200 ${
            open ? "rotate-180 text-[#24332A]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 left-0 z-30 mt-1.5 max-h-60 overflow-auto rounded-2xl border border-[#E5E0D5] bg-white p-1.5 shadow-xl ring-1 ring-black/5"
          >
            {options.map((opt) => {
              const optVal = typeof opt === "string" ? opt : opt.value;
              const optLabel = typeof opt === "string" ? opt : opt.label;
              const optDesc = typeof opt === "string" ? null : opt.description;
              const optMeta = typeof opt === "string" ? null : opt.meta;
              const isSelected = optVal === value;

              return (
                <li key={optVal} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(optVal);
                      setOpen(false);
                    }}
                    className={`flex min-h-[42px] w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left transition ${
                      isSelected
                        ? "bg-[#24332A] text-white"
                        : "text-[#1F2421] hover:bg-[#F2EFE7]"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-sm font-semibold sm:text-xs">
                        {optMeta && <span className="shrink-0">{optMeta}</span>}
                        <span className="truncate">{optLabel}</span>
                      </div>
                      {optDesc && (
                        <p
                          className={`mt-0.5 text-[11px] leading-snug ${
                            isSelected ? "text-white/75" : "text-[#666E68]"
                          }`}
                        >
                          {optDesc}
                        </p>
                      )}
                    </div>
                    {isSelected && <Check className="h-4 w-4 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
