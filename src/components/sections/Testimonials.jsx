import { useState, useEffect } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Testimonials() {
  const { reviews } = useApp();
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const perPage = isMobile ? 1 : 2;
  const totalPages = Math.max(1, Math.ceil(reviews.length / perPage));
  const safePage = Math.min(page, totalPages - 1);
  const visibleReviews = reviews.slice(
    safePage * perPage,
    safePage * perPage + perPage,
  );

  return (
    <section id="ulasan" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#8D7B5A] uppercase">
              Cerita Pelanggan
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#1F2421] sm:text-4xl">
              Dipercaya untuk Berbagai Momen
            </h2>
            <p className="mt-2 text-sm text-[#666E68]">
              Pengalaman nyata dari pelanggan yang telah merayakan acara spesial
              bersama Dapur Ibu Sri Rahayu.
            </p>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                aria-label="Ulasan sebelumnya"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E0D5] bg-white text-[#1F2421] transition hover:border-[#24332A] disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={safePage >= totalPages - 1}
                aria-label="Ulasan berikutnya"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E0D5] bg-white text-[#1F2421] transition hover:border-[#24332A] disabled:opacity-40"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
          {visibleReviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-2xl border border-[#ECE7DD] bg-white p-6"
            >
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating || 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#9A815E] text-[#9A815E]"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed italic text-[#4E5650]">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-5 border-t border-[#F2EEE6] pt-4">
                <p className="text-sm font-bold text-[#1F2421]">
                  {review.customer_name}
                </p>
                <p className="text-xs text-[#666E68]">
                  {review.event_moment || "Pelanggan Terverifikasi"}
                </p>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Halaman ulasan ${idx + 1}`}
                onClick={() => setPage(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === safePage
                    ? "w-6 bg-[#24332A]"
                    : "w-2 bg-[#CFC8BC] hover:bg-[#9E9689]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
