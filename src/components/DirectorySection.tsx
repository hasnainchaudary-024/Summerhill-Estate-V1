import React, { useState } from 'react';
import { Phone, MapPin, Plus, Trash2, ShieldCheck, Compass, Coffee, Hotel, Search, Trees, Sparkles } from 'lucide-react';
import { DirectoryItem } from '../types';

interface DirectorySectionProps {
  directory: DirectoryItem[];
  isEditing: boolean;
  onUpdate: (updated: DirectoryItem[]) => void;
}

export const DirectorySection: React.FC<DirectorySectionProps> = ({
  directory,
  isEditing,
  onUpdate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'Stay & Hotels', 'Dining & Cafes', 'Trails & Nature', 'Emergency & Health', 'General'];

  const filteredItems = directory.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleAddItem = () => {
    const newItem: DirectoryItem = {
      id: `dir-${Date.now()}`,
      name: 'New Listing or Contact',
      category: 'General',
      description: 'Add details regarding opening hours, services, or travel notes...',
      contact: 'Phone / Email / Address',
      location: 'Kuzagali Mountain Area',
    };
    onUpdate([...directory, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof DirectoryItem, val: string) => {
    const updated = directory.map((d) => (d.id === id ? { ...d, [field]: val } : d));
    onUpdate(updated);
  };

  const handleRemoveItem = (id: string) => {
    onUpdate(directory.filter((d) => d.id !== id));
  };

  const getCategoryIcon = (category: DirectoryItem['category']) => {
    switch (category) {
      case 'Stay & Hotels':
        return <Hotel className="w-4 h-4 text-[#D4AF37]" />;
      case 'Dining & Cafes':
        return <Coffee className="w-4 h-4 text-[#D97706]" />;
      case 'Trails & Nature':
        return <Trees className="w-4 h-4 text-[#167041]" />;
      case 'Emergency & Health':
        return <ShieldCheck className="w-4 h-4 text-[#DC2626]" />;
      default:
        return <MapPin className="w-4 h-4 text-[#3D604D]" />;
    }
  };

  return (
    <section id="directory" className="py-16 sm:py-20 bg-[#F4F8F5] border-b border-[#D6E3DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#D6E3DB]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#167041] uppercase tracking-widest mb-2">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>[ CHAPTER V • ESSENTIAL CONCIERGE & LOCAL SANCTUARIES ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1E13] tracking-tight">
              Essential Contacts & Mountain Amenities
            </h2>
            <p className="text-xs sm:text-sm text-[#3E5C4B] mt-1.5 font-sans">
              Forest lodges, chai sanctuaries, emergency mountain aid, and trailheads in Kuzagali.
            </p>
          </div>

          {isEditing && (
            <button
              onClick={handleAddItem}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-[#FFFFFF] bg-gradient-to-r from-[#14532D] to-[#166534] hover:from-[#0F3D21] hover:to-[#14532D] border border-[#D4AF37]/40 rounded-xl transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Directory Entry</span>
            </button>
          )}
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8 pb-4 border-b border-[#D6E3DB]">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0E3820] text-[#F3D993] font-bold border border-[#D4AF37]/50 shadow-xs'
                    : 'bg-[#FFFFFF] text-[#476654] hover:bg-[#EAF5EE] hover:text-[#0B1E13] border border-[#D6E3DB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#6B8E7B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search contacts, hotels, trails..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FFFFFF] border border-[#D6E3DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#167041] text-[#0B1E13] font-sans shadow-2xs placeholder-[#7A9887]"
            />
          </div>
        </div>

        {/* Directory Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] hover:border-[#167041]/50 rounded-2xl p-5 border border-[#D6E3DB] transition-all duration-300 flex flex-col justify-between relative shadow-xs hover:shadow-md group"
            >
              {isEditing && (
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-xl bg-[#F4FAF6] text-[#7A9887] hover:text-[#991B1B] transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-2 rounded-xl bg-[#EAF5EE] border border-[#A8D5BA]">
                    {getCategoryIcon(item.category)}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#167041] uppercase tracking-wider">
                    {isEditing ? (
                      <select
                        value={item.category}
                        onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value as any)}
                        className="bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg p-1 text-xs text-[#0B1E13]"
                      >
                        <option value="Stay & Hotels">Stay & Hotels</option>
                        <option value="Dining & Cafes">Dining & Cafes</option>
                        <option value="Trails & Nature">Trails & Nature</option>
                        <option value="Emergency & Health">Emergency & Health</option>
                        <option value="General">General</option>
                      </select>
                    ) : (
                      item.category
                    )}
                  </span>
                </div>

                {isEditing ? (
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                      className="w-full font-serif font-bold text-sm bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg p-2 text-[#0B1E13]"
                      placeholder="Name"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full text-xs text-[#2A4436] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg p-2"
                      placeholder="Description..."
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-serif font-bold text-[#0B1E13] text-lg mb-1.5 group-hover:text-[#167041] transition-colors">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-[#3E5C4B] leading-relaxed mb-4 font-sans font-normal">
                      {item.description}
                    </p>
                  </>
                )}
              </div>

              {/* Contact & Location Footer */}
              <div className="pt-3.5 border-t border-[#EAF2ED] flex flex-wrap items-center justify-between gap-2 text-xs text-[#4F685A] font-mono">
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <input
                      type="text"
                      value={item.location || ''}
                      onChange={(e) => handleUpdateItem(item.id, 'location', e.target.value)}
                      className="p-1.5 text-[11px] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#0B1E13]"
                      placeholder="Location / Address"
                    />
                    <input
                      type="text"
                      value={item.contact || ''}
                      onChange={(e) => handleUpdateItem(item.id, 'contact', e.target.value)}
                      className="p-1.5 text-[11px] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#0B1E13]"
                      placeholder="Contact details"
                    />
                  </div>
                ) : (
                  <>
                    {item.location && (
                      <span className="flex items-center gap-1.5 text-xs text-[#4F685A]">
                        <MapPin className="w-3.5 h-3.5 text-[#34D399]" />
                        <span>{item.location}</span>
                      </span>
                    )}
                    {item.contact && (
                      <span className="flex items-center gap-1.5 text-[#0E3820] font-bold text-xs bg-[#EAF5EE] px-2.5 py-1 rounded-lg border border-[#A8D5BA]">
                        <Phone className="w-3.5 h-3.5 text-[#167041]" />
                        <span>{item.contact}</span>
                      </span>
                    )}
                  </>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


