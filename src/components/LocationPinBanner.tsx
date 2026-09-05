import React, { useState } from 'react';
import { MapPin, Compass, Mountain, ExternalLink, Map, X, Trees, Sparkles, Navigation } from 'lucide-react';
import { LocationInfo } from '../types';

interface LocationPinBannerProps {
  location: LocationInfo;
}

export const LocationPinBanner: React.FC<LocationPinBannerProps> = ({ location }) => {
  const [showMapModal, setShowMapModal] = useState(false);

  // OpenStreetMap embed coordinates for Kuzagali
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.coordinates.longitude - 0.04}%2C${location.coordinates.latitude - 0.025}%2C${location.coordinates.longitude + 0.04}%2C${location.coordinates.latitude + 0.025}&layer=mapnik&marker=${location.coordinates.latitude}%2C${location.coordinates.longitude}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.latitude},${location.coordinates.longitude}`;

  return (
    <div className="w-full bg-[#08150E] text-[#F4F8F5] border-b border-[#1A3826] relative overflow-hidden">
      {/* Subtle pine needle background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08150E] via-[#0E281A] to-[#08150E] opacity-70" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Location Pin & Coordinates */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123622] border border-[#D4AF37]/50 text-[#F3D993] font-mono font-semibold text-[11px] tracking-wider uppercase shadow-xs">
              <Trees className="w-3.5 h-3.5 text-[#34D399] animate-pulse" />
              <span>Alpine Pin</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-[#FFFFFF] text-base tracking-wide flex items-center gap-1.5">
                {location.name}
              </span>
              <span className="text-[#3E654E] hidden sm:inline">•</span>
              <span className="text-[#A7C5B2] text-xs font-sans tracking-wide">
                {location.region}, {location.province}, {location.country}
              </span>
            </div>

            {/* Urdu / Alternate Name Badge */}
            <span className="text-xs px-2.5 py-0.5 rounded-lg bg-[#0E2419] text-[#E0EFE6] font-serif hidden md:inline-block border border-[#1E432E]">
              {location.alternateNames.join(' / ')}
            </span>
          </div>

          {/* Elevation, Coordinates & Map Trigger */}
          <div className="flex items-center flex-wrap gap-2.5 text-xs text-[#A7C5B2] font-mono">
            <div className="flex items-center gap-1.5 bg-[#0D2217] px-3 py-1 rounded-xl border border-[#1E3F2D] text-[#F3D993]">
              <Mountain className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                <strong>{location.elevation.meters.toLocaleString()}m</strong> ({location.elevation.feet.toLocaleString()} ft)
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#0D2217] px-3 py-1 rounded-xl border border-[#1E3F2D] hidden sm:flex">
              <Compass className="w-3.5 h-3.5 text-[#34D399]" />
              <span>
                {location.coordinates.latitude.toFixed(4)}° N, {location.coordinates.longitude.toFixed(4)}° E
              </span>
            </div>

            <button
              onClick={() => setShowMapModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#091710] font-sans font-bold transition-all cursor-pointer shadow-md hover:brightness-110"
              title="Open Topographic Location Map"
            >
              <Navigation className="w-3.5 h-3.5 text-[#091710]" />
              <span>Topographic Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#091710] border border-[#1E432E] rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E3F2D] bg-[#0C1E14]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#143322] border border-[#D4AF37]/40 text-[#D4AF37]">
                  <Trees className="w-5 h-5 text-[#34D399]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#FFFFFF] text-base">
                    Kuzagali & Galiyat Mountain Topography
                  </h3>
                  <p className="text-xs text-[#A3C2AE] font-sans">
                    Hazara Himalayan Pine Belt • Elevation 2,400m - 2,420m
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="p-2 rounded-xl text-[#A3C2AE] hover:text-[#FFFFFF] hover:bg-[#143021] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-80 sm:h-96 bg-[#06100A]">
              <iframe
                title="Kuzagali Location Map"
                src={osmEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            <div className="px-5 py-3.5 bg-[#0C1E14] border-t border-[#1E3F2D] flex flex-wrap items-center justify-between gap-3 text-xs text-[#A3C2AE] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping" />
                <span>Coordinates: 34.0162° N, 73.4146° E • Murree-Abbottabad Corridor</span>
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-[#F3D993] hover:text-[#FFFFFF] underline font-sans font-bold"
              >
                <span>Navigate in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F3D993]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


