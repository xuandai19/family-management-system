// src/components/adminComponents/AncestralHouse/PhotoGallery.jsx
import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  ZoomIn,
  ImageOff,
} from "lucide-react";

// Component hiển thị ảnh với fallback khi lỗi
const ImageWithFallback = ({ src, alt, className, onClick }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return (
      <div
        className={`${className} bg-slate-200 flex items-center justify-center`}
      >
        <ImageOff size={24} className="text-slate-400" />
      </div>
    );
  }

  return (
    <>
      {loading && <div className={`${className} bg-slate-200 animate-pulse`} />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loading ? "hidden" : ""}`}
        onClick={onClick}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </>
  );
};

const PhotoGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon size={32} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">
          Chưa có hình ảnh
        </h3>
        <p className="text-slate-500 text-sm">
          Thêm hình ảnh để lưu giữ kỷ niệm về nhà thờ tổ
        </p>
      </div>
    );
  }

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ImageIcon size={20} className="text-amber-500" />
            Hình ảnh nhà thờ tổ
          </h3>
          <span className="text-sm text-slate-500">
            {images.length} hình ảnh
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-slate-100"
            >
              <ImageWithFallback
                src={img}
                alt={`Hình ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <ZoomIn
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] px-16">
            <img
              src={images[selectedIndex]}
              alt={`Hình ${selectedIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-xl overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === selectedIndex
                      ? "border-amber-500 scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
