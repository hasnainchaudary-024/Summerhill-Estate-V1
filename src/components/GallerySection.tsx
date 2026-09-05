import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, X, Maximize2, Upload, Trees, Sparkles, Camera } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  gallery: GalleryItem[];
  isEditing: boolean;
  onUpdate: (updated: GalleryItem[]) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  gallery,
  isEditing,
  onUpdate,
}) => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const handleAddPhoto = () => {
    const newPhoto: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: 'Kuzagali Pine Ridge View',
      caption: 'Add description or photographic notes for this scenic view...',
      imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      author: 'Alpine Forest Guild',
    };
    onUpdate([...gallery, newPhoto]);
  };

  const handleUpdatePhoto = (id: string, field: keyof GalleryItem, val: string) => {
    const updated = gallery.map((g) => (g.id === id ? { ...g, [field]: val } : g));
    onUpdate(updated);
  };

  const handleRemovePhoto = (id: string) => {
    onUpdate(gallery.filter((g) => g.id !== id));
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          handleUpdatePhoto(id, 'imageUrl', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#F4F8F5] border-b border-[#D6E3DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#D6E3DB]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#167041] uppercase tracking-widest mb-2">
              <Camera className="w-4 h-4 text-[#D4AF37]" />
              <span>[ CHAPTER III • ALPINE VISUAL ARCHIVE & PANORAMAS ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1E13] tracking-tight">
              Kuzagali Mountain Archive
            </h2>
            <p className="text-xs sm:text-sm text-[#3E5C4B] mt-1.5 font-sans">
              High-resolution captures of old-growth deodar cedar forests, morning alpine mists, and ridge panoramas.
            </p>
          </div>

          {isEditing && (
            <button
              onClick={handleAddPhoto}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-[#FFFFFF] bg-gradient-to-r from-[#14532D] to-[#166534] hover:from-[#0F3D21] hover:to-[#14532D] border border-[#D4AF37]/40 rounded-xl transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Photography</span>
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#D6E3DB] shadow-xs hover:shadow-xl hover:border-[#167041]/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Box */}
              <div
                onClick={() => !isEditing && setActiveImage(item)}
                className={`relative h-60 w-full overflow-hidden bg-[#07170E] ${!isEditing ? 'cursor-pointer' : ''}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06140D]/90 via-[#06140D]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {!isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-3 rounded-full bg-[#0D2418]/90 text-[#F3D993] border border-[#D4AF37]/50 backdrop-blur-xs shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                )}

                {/* Overlaid Title & Caption on image in preview mode */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white pointer-events-none">
                  <h4 className="font-serif font-bold text-sm leading-tight text-[#FFFFFF] drop-shadow-sm">{item.title}</h4>
                  {item.author && (
                    <p className="text-[10px] font-mono text-[#F3D993] drop-shadow-sm mt-1">Photo by {item.author}</p>
                  )}
                </div>

                {isEditing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePhoto(item.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-xl bg-[#991B1B] text-white hover:bg-[#7F1D1D] transition-colors cursor-pointer shadow-md"
                    title="Delete photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Editable Fields in Edit Mode */}
              {isEditing && (
                <div className="p-4 bg-[#FFFFFF] border-t border-[#EAF2ED] space-y-2 text-xs">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdatePhoto(item.id, 'title', e.target.value)}
                    className="w-full p-1.5 font-serif font-bold bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#0B1E13]"
                    placeholder="Photo title"
                  />
                  <textarea
                    value={item.caption}
                    onChange={(e) => handleUpdatePhoto(item.id, 'caption', e.target.value)}
                    rows={2}
                    className="w-full p-1.5 text-[11px] text-[#2A4436] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg"
                    placeholder="Photo caption..."
                  />
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="text"
                      value={item.imageUrl}
                      onChange={(e) => handleUpdatePhoto(item.id, 'imageUrl', e.target.value)}
                      className="p-1.5 text-[10px] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#2A4436] truncate font-mono"
                      placeholder="Image URL"
                    />
                    <input
                      type="text"
                      value={item.author || ''}
                      onChange={(e) => handleUpdatePhoto(item.id, 'author', e.target.value)}
                      className="p-1.5 text-[10px] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#2A4436]"
                      placeholder="Photographer"
                    />
                  </div>

                  <label className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#EAF5EE] hover:bg-[#DEEBE2] text-[#0E3820] text-[11px] font-mono font-medium cursor-pointer border border-[#A8D5BA] transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#167041]" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(item.id, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Luxury Fullscreen Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030A06]/92 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#091D12] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/40"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#0D2418]/80 text-[#F3D993] hover:bg-[#143524] border border-[#D4AF37]/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeImage.imageUrl}
              alt={activeImage.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[70vh] object-contain bg-black/40"
            />

            <div className="p-6 sm:p-8 bg-[#091D12] border-t border-[#164028] text-[#F4F8F5]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] mb-1">
                <Trees className="w-3.5 h-3.5 text-[#34D399]" />
                <span>KUZAGALI ALPINE ARCHIVE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFFFFF]">{activeImage.title}</h3>
              <p className="text-sm text-[#CDE3D5] mt-2 font-sans leading-relaxed">{activeImage.caption}</p>
              {activeImage.author && (
                <div className="mt-4 pt-3 border-t border-[#164028] flex items-center justify-between text-xs text-[#F3D993] font-mono">
                  <span>Photo credit: {activeImage.author}</span>
                  <span className="text-[#6EA887]">Himalayan Galiyat Range</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


