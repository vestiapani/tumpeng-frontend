import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Toast() {
  const { toast } = useApp();

  const iconMap = {
    success: <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />,
    error: <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />,
    info: <Info className="h-4 w-4 shrink-0 text-amber-300" />,
  };

  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-50">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-xl bg-[#1D2821] px-4 py-3 text-sm font-medium text-white shadow-xl ring-1 ring-white/10"
          >
            {iconMap[toast.type] || iconMap.success}
            <span className="leading-snug">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
