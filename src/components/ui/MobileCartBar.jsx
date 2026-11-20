import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatRupiah } from "../../utils/formatRupiah";

export default function MobileCartBar() {
  const { cartCount, cartTotal, isCartOpen, setIsCartOpen } = useApp();

  return (
    <AnimatePresence>
      {cartCount > 0 && !isCartOpen && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed right-4 bottom-4 left-4 z-40 lg:hidden"
        >
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex w-full items-center justify-between rounded-2xl bg-[#24332A] px-4 py-3.5 text-white shadow-2xl ring-1 ring-white/15 active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#C8B287] px-1 text-[10px] font-bold text-[#1F2421]">
                  {cartCount}
                </span>
              </div>
              <div className="text-left leading-tight">
                <p className="text-[11px] text-white/75">Total Keranjang</p>
                <p className="text-sm font-bold">{formatRupiah(cartTotal)}</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[#24332A]">
              Checkout
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
