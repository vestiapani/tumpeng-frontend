import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { cateringService } from "../services/cateringService";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  USER: "sri_rahayu_user",
  CART: "sri_rahayu_cart",
  LAST_ORDER: "sri_rahayu_last_order",
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.USER, null));
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.CART, []));
  const [lastOrder, setLastOrder] = useState(() =>
    readStorage(STORAGE_KEYS.LAST_ORDER, null),
  );
  // Pakai waktu lokal agar tidak geser 1 hari karena konversi UTC (WIB = UTC+7)
  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const [selectedDate, setSelectedDate] = useState(getTodayStr);

  const [menus, setMenus] = useState([]);
  const [menusLoading, setMenusLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  // Overlays state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAST_ORDER, JSON.stringify(lastOrder));
  }, [lastOrder]);

  // Initial fetch menus & reviews via service layer
  useEffect(() => {
    let active = true;
    async function loadInitialData() {
      try {
        setMenusLoading(true);
        const [menuData, reviewData] = await Promise.all([
          cateringService.getMenus(),
          cateringService.getReviews(),
        ]);
        if (active) {
          setMenus(menuData);
          setReviews(reviewData);
        }
      } catch (err) {
        if (active) showToast(err.message, "error");
      } finally {
        if (active) setMenusLoading(false);
      }
    }
    loadInitialData();
    return () => {
      active = false;
    };
  }, [showToast]);

  const addToCart = useCallback(
    (item) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex((c) => c.id === item.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            qty: updated[existingIndex].qty + 1,
          };
          return updated;
        }
        return [...prev, { ...item, qty: 1 }];
      });
      showToast(`"${item.name}" ditambahkan ke keranjang.`);
    },
    [showToast],
  );

  const updateCartQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const logoutUser = useCallback(() => {
    setUser(null);
    showToast("Anda telah keluar dari sesi pelanggan.", "info");
  }, [showToast]);

  const addReviewLocal = useCallback((newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setLastOrder((prev) => (prev ? { ...prev, reviewed: true } : prev));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        logoutUser,
        cart,
        addToCart,
        updateCartQty,
        clearCart,
        cartCount,
        cartTotal,
        selectedDate,
        setSelectedDate,
        lastOrder,
        setLastOrder,
        menus,
        menusLoading,
        reviews,
        addReviewLocal,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        successOrder,
        setSuccessOrder,
        isReviewOpen,
        setIsReviewOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp harus dipakai di dalam AppProvider");
  return ctx;
}
