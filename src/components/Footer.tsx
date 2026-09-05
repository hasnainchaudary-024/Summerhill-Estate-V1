import React from 'react';
import { Trees, Sparkles, Compass, Shield, Wind } from 'lucide-react';
import { LocationInfo } from '../types';

interface FooterProps {
  location: LocationInfo;
  activePage?: 'kuzagali' | 'summer-hill';
  onSelectPage?: (page: 'kuzagali' | 'summer-hill') => void;
}

export const Footer: React.FC<FooterProps> = ({ location, activePage = 'kuzagali', onSelectPage }) => {
  return (
    <footer className="bg-[#07170E] text-[#9CBBA8] py-14 border-t border-[#1B4029] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-[#143320]">
          
          {/* Col 1: Location Summary */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-[#FFFFFF] font-serif font-bold text-lg">
              <Trees className="w-5 h-5 text-[#D4AF37]" />
              <span className="tracking-wide">{location.name} & Summer Hill Grand Monograph</span>
            </div>
            <p className="text-[#9CBBA8] max-w-md leading-relaxed font-sans font-light text-xs">
              Kuzagali and Summer Hill are nestled in the high-altitude Galiyat pine forest corridor of Khyber Pakhtunkhwa, Pakistan. Elevated above 2,400 meters, this alpine sanctuary is surrounded by ancient deodars and blue pines.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[#D4AF37] font-mono text-[11px] pt-1">
              <span className="bg-[#0D2417] px-2.5 py-1 rounded-md border border-[#1E4D30]">LAT: {location.coordinates.latitude}° N</span>
              <span className="bg-[#0D2417] px-2.5 py-1 rounded-md border border-[#1E4D30]">LON: {location.coordinates.longitude}° E</span>
              <span className="bg-[#0D2417] px-2.5 py-1 rounded-md border border-[#1E4D30]">ELEV: 2,400m - 2,420m (7,940 ft)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-mono font-bold text-[#D4AF37] uppercase tracking-wider text-[11px] mb-3">
              Monograph Editions
            </h4>
            <ul className="space-y-2.5 font-sans">
              <li>
                <button
                  onClick={() => {
                    onSelectPage?.('kuzagali');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-colors cursor-pointer text-left flex items-center gap-2 ${
                    activePage === 'kuzagali' ? 'text-[#F3D993] font-bold' : 'hover:text-[#F3D993]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>01. Kuzagali Regional Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPage?.('summer-hill');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-colors cursor-pointer text-left flex items-center gap-2 ${
                    activePage === 'summer-hill' ? 'text-[#F3D993] font-bold' : 'hover:text-[#F3D993]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>02. Summer Hill Luxury Chalets</span>
                </button>
              </li>
            </ul>
          </div>


          {/* Col 3: Meteorological Info */}
          <div>
            <h4 className="font-mono font-bold text-[#D4AF37] uppercase tracking-wider text-[11px] mb-3">
              Himalayan Pine Stream
            </h4>
            <p className="text-[#9CBBA8] leading-relaxed mb-3 font-sans text-xs">
              Live weather, wind vectors, pressure, and European AQI metrics calibrated for high-altitude pine ridges.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D2417] border border-[#225737] text-[#34D399] text-[11px] font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Real-Time Atmospheric Feed Active</span>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#5A7C68] font-mono text-[11px]">
          <p>© {new Date().getFullYear()} Kuzagali Alpine Monograph • Vibrant Pine Mountain Edition</p>
          <div className="flex items-center gap-3 text-[#7A9E88]">
            <span>Galiyat Mountain Belt</span>
            <span>•</span>
            <span>Abbottabad, KP, Pakistan</span>
          </div>
        </div>

      </div>
    </footer>
  );
};


