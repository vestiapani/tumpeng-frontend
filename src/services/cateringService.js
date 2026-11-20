import { api } from "./api";
import {
  MOCK_MENUS,
  MOCK_REVIEWS,
  generateMockCalendar,
} from "../data/mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const cateringService = {
  async getMenus() {
    if (USE_MOCK) {
      await delay(400);
      return MOCK_MENUS;
    }
    const { data } = await api.get("/menus");
    return data;
  },

  async getCalendarSlots(year, month) {
    if (USE_MOCK) {
      await delay(300);
      return generateMockCalendar(year, month);
    }
    const monthParam = `${year}-${String(month).padStart(2, "0")}`;
    const { data } = await api.get("/calendar", {
      params: { month: monthParam },
    });
    return data;
  },

  async verifyCustomer(payload) {
    if (USE_MOCK) {
      await delay(300);
      return { verified: true, ...payload };
    }
    const { data } = await api.post("/customers/verify", payload);
    return data;
  },

  async createOrder(payload) {
    if (USE_MOCK) {
      await delay(500);
      return {
        order_id: `TMP-${Math.floor(1000 + Math.random() * 9000)}`,
        status: "Menunggu Konfirmasi WA",
        created_at: new Date().toISOString(),
        ...payload,
      };
    }
    const { data } = await api.post("/orders", payload);
    return data;
  },

  async updateOrderStatus(orderId, status) {
    if (USE_MOCK) {
      await delay(300);
      return { order_id: orderId, status };
    }
    const { data } = await api.patch(`/orders/${orderId}/status`, { status });
    return data;
  },

  async getReviews() {
    if (USE_MOCK) {
      await delay(250);
      return MOCK_REVIEWS;
    }
    const { data } = await api.get("/reviews");
    return data;
  },

  async submitReview(payload) {
    if (USE_MOCK) {
      await delay(400);
      return {
        id: Date.now(),
        ...payload,
      };
    }
    const { data } = await api.post("/reviews", payload);
    return data;
  },
};
