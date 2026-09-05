import React, { useState } from 'react';
import {
  Layers,
  Home,
  Trees,
  Car,
  Info,
  Check,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { TownPlanData, TownPlot } from '../types';

interface TownPlanMapSectionProps {
  townPlan?: TownPlanData;
  isEditing: boolean;
  onUpdate: (updated: TownPlanData) => void;
  onSelectPlotForInquiry?: (plot: TownPlot) => void;
}

export const TownPlanMapSection: React.FC<TownPlanMapSectionProps> = ({
  townPlan,
  isEditing,
  onUpdate,
  onSelectPlotForInquiry,
}) => {
  if (!townPlan) return null;

  const [activeView, setActiveView] = useState<'roster' | 'specs'>('roster');
  const [selectedPlotId, setSelectedPlotId] = useState<string>(townPlan.plots[0]?.id || 'plot-01');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'reserved' | 'sold'>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const availableCount = townPlan.plots.filter((p) => p.status === 'Available').length;
  const reservedCount = townPlan.plots.filter((p) => p.status === 'Reserved').length;
  const soldCount = townPlan.plots.filter((p) => p.status === 'Sold').length;

  const zones = Array.from(new Set(townPlan.plots.map((p) => p.zone)));

  const filteredPlots = townPlan.plots.filter((plot) => {
    const matchesStatus =
      statusFilter === 'all' || plot.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesZone = zoneFilter === 'all' || plot.zone === zoneFilter;
    const matchesSearch =
      plot.plotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.houseModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesZone && matchesSearch;
  });

  const handleUpdatePlot = (id: string, field: keyof TownPlot, val: any) => {
    const nextPlots = townPlan.plots.map((p) => (p.id === id ? { ...p, [field]: val } : p));
    onUpdate({
      ...townPlan,
      plots: nextPlots,
      availablePlots: nextPlots.filter((p) => p.status === 'Available').length,
      reservedPlots: nextPlots.filter((p) => p.status === 'Reserved').length,
      soldPlots: nextPlots.filter((p) => p.status === 'Sold').length,
    });
  };

  const handleSelectPlot = (plot: TownPlot) => {
    setSelectedPlotId(plot.id);
  };

  const handleInquireClick = (plot: TownPlot) => {
    if (onSelectPlotForInquiry) {
      onSelectPlotForInquiry(plot);
    }
    const inquireSection = document.getElementById('inquire');
    if (inquireSection) {
      inquireSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="town-plan"
      className="py-16 sm:py-24 bg-[#F4F8F5] border-b border-[#D8E6DC] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#D8E6DC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#167041] uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>[ 02 / Master Town Plan & Plot Layout ]</span>
            </div>

            {isEditing ? (
              <div className="space-y-2 mb-2">
                <input
                  type="text"
                  value={townPlan.title}
                  onChange={(e) => onUpdate({ ...townPlan, title: e.target.value })}
                  className="w-full text-2xl sm:text-4xl font-serif font-bold text-[#0B1E13] bg-[#FFFFFF] border border-[#CDE0D5] rounded-xl p-2"
                />
                <input
                  type="text"
                  value={townPlan.subtitle}
                  onChange={(e) => onUpdate({ ...townPlan, subtitle: e.target.value })}
                  className="w-full text-xs sm:text-sm font-sans text-[#167041] bg-[#FFFFFF] border border-[#CDE0D5] rounded-xl p-2 font-bold"
                />
              </div>
            ) : (
              <>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1E13] tracking-tight">
                  {townPlan.title}
                </h2>
                <p className="text-sm sm:text-base font-medium text-[#167041] mt-1 font-sans">
                  {townPlan.subtitle}
                </p>
              </>
            )}

            {isEditing ? (
              <textarea
                value={townPlan.overview}
                onChange={(e) => onUpdate({ ...townPlan, overview: e.target.value })}
                rows={2}
                className="w-full mt-2 text-xs sm:text-sm text-[#3E5C4B] bg-[#FFFFFF] border border-[#CDE0D5] rounded-xl p-2"
              />
            ) : (
              <p className="text-xs sm:text-sm text-[#3E5C4B] max-w-3xl mt-2 leading-relaxed font-sans">
                {townPlan.overview}
              </p>
            )}
          </div>

          {/* Quick Metrics Badge Group */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#CDE0D5] text-xs font-mono shadow-2xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#167041]" />
              <span className="text-[#527963]">Available:</span>
              <span className="font-bold text-[#167041]">{availableCount} Plots</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#CDE0D5] text-xs font-mono shadow-2xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[#527963]">Reserved:</span>
              <span className="font-bold text-[#B08920]">{reservedCount} Plots</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#CDE0D5] text-xs font-mono shadow-2xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6B7280]" />
              <span className="text-[#527963]">Sold:</span>
              <span className="font-bold text-[#4B5563]">{soldCount} Plots</span>
            </div>
          </div>
        </div>

        {/* 600 Sq. Yd. Value Proposition Banner */}
        <div className="bg-[#0A1F14] text-[#F4F8F5] rounded-2xl p-4 sm:p-6 mb-8 border border-[#1B4D2E] shadow-md grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-[#1B4D2E] pb-3 md:pb-0 md:pr-4">
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              Standardized Parcel Matrix
            </span>
            <h3 className="font-serif font-bold text-2xl text-[#FFFFFF]">
              600 Sq. Yards
            </h3>
            <span className="text-xs font-mono text-[#9CB6A6]">~5,400 Sq. Ft. (1 Kanal Class)</span>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#143823] text-[#F3D993] shrink-0 mt-0.5 border border-[#235838]">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">Pre-Built Turnkey Homes</span>
                <span className="text-[#9CB6A6] text-[11px] leading-snug block">
                  Every 600 sq. yd. plot includes a completed custom luxury chalet (no construction delays).
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#143823] text-[#34D399] shrink-0 mt-0.5 border border-[#235838]">
                <Trees className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">Private Forest Yards</span>
                <span className="text-[#9CB6A6] text-[11px] leading-snug block">
                  Generous 2,500+ sq. ft. private gardens with indigenous Deodar trees and viewing decks.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#143823] text-[#F3D993] shrink-0 mt-0.5 border border-[#235838]">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">Dedicated Heated Roads</span>
                <span className="text-[#9CB6A6] text-[11px] leading-snug block">
                  24-ft paved arterial loops with hydronic snow melting and direct 2-car heated garages.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs (Plot Inventory Roster & 600 Sq. Yd. Blueprint Specs) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex p-1 bg-[#E2EBE5] rounded-xl border border-[#CDE0D5] text-xs font-mono font-bold">
            <button
              onClick={() => setActiveView('roster')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'roster'
                  ? 'bg-[#0E3820] text-[#F3D993] shadow-xs border border-[#D4AF37]/30'
                  : 'text-[#3E5C4B] hover:text-[#0B1E13]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Plot Inventory Roster ({townPlan.plots.length})</span>
            </button>
            <button
              onClick={() => setActiveView('specs')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'specs'
                  ? 'bg-[#0E3820] text-[#F3D993] shadow-xs border border-[#D4AF37]/30'
                  : 'text-[#3E5C4B] hover:text-[#0B1E13]'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>600 Sq. Yd. Blueprint Specs</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="flex items-center gap-1 bg-[#FFFFFF] rounded-xl px-2.5 py-1 border border-[#CDE0D5]">
              <Filter className="w-3 h-3 text-[#527963]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-transparent border-none text-xs text-[#0B1E13] font-bold focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses ({townPlan.plots.length})</option>
                <option value="available">Available ({availableCount})</option>
                <option value="reserved">Reserved ({reservedCount})</option>
                <option value="sold">Sold ({soldCount})</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-[#FFFFFF] rounded-xl px-2.5 py-1 border border-[#CDE0D5]">
              <span className="text-[#527963] text-[10px]">Zone:</span>
              <select
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                className="bg-transparent border-none text-xs text-[#0B1E13] font-bold focus:outline-none cursor-pointer"
              >
                <option value="all">All Zones ({zones.length})</option>
                {zones.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* VIEW 1: PLOT INVENTORY ROSTER (GRID) */}
        {activeView === 'roster' && (
          <div className="space-y-6">
            
            {/* Search and summary bar */}
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#CDE0D5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#527963] absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plot number, model, or zone..."
                  className="w-full pl-9 pr-3 py-2 bg-[#F4F8F5] border border-[#CDE0D5] rounded-xl text-xs sm:text-sm text-[#0B1E13] focus:outline-none focus:ring-1 focus:ring-[#167041]"
                />
              </div>

              <div className="text-xs font-mono text-[#527963]">
                Showing <span className="font-bold text-[#0B1E13]">{filteredPlots.length}</span> of{' '}
                <span className="font-bold text-[#0B1E13]">{townPlan.plots.length}</span> plots
              </div>
            </div>

            {/* Grid of plots */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlots.map((plot) => {
                const isSelected = plot.id === selectedPlotId;

                return (
                  <div
                    key={plot.id}
                    onClick={() => handleSelectPlot(plot)}
                    className={`bg-[#FFFFFF] rounded-2xl border p-5 transition-all flex flex-col justify-between cursor-pointer hover:border-[#167041]/50 shadow-xs ${
                      isSelected ? 'ring-2 ring-[#167041] border-[#167041]' : 'border-[#CDE0D5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold text-[#167041] uppercase tracking-wider">
                          {plot.zone}
                        </span>
                        {isEditing ? (
                          <select
                            value={plot.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleUpdatePlot(plot.id, 'status', e.target.value as any)}
                            className="text-[10px] font-mono font-bold uppercase rounded-lg border border-[#CDE0D5] p-1 bg-[#F4F8F5]"
                          >
                            <option value="Available">Available</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Sold">Sold</option>
                          </select>
                        ) : (
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                              plot.status === 'Available'
                                ? 'bg-[#EEF7F2] text-[#167041] border-[#B7DBC6]'
                                : plot.status === 'Reserved'
                                ? 'bg-[#FDF7E7] text-[#B08920] border-[#F2DE9C]'
                                : 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]'
                            }`}
                          >
                            {plot.status}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-xl text-[#0B1E13] mb-1">
                        {plot.plotNumber}
                      </h3>
                      <p className="text-xs font-mono text-[#527963] mb-3">
                        {plot.plotSize} • {plot.houseSize}
                      </p>

                      <div className="bg-[#F8FAF9] rounded-xl p-3 border border-[#DCE8E0] space-y-1.5 text-xs mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[#527963]">Pre-Built Villa:</span>
                          {isEditing ? (
                            <input
                              type="text"
                              value={plot.houseModel}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleUpdatePlot(plot.id, 'houseModel', e.target.value)}
                              className="p-0.5 text-xs bg-white border border-[#CDE0D5] rounded text-[#0B1E13] font-semibold text-right"
                            />
                          ) : (
                            <span className="font-semibold text-[#0B1E13]">{plot.houseModel}</span>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#527963]">Rooms:</span>
                          <span className="font-mono text-[#0B1E13]">
                            {plot.bedrooms} Beds / {plot.bathrooms} Baths
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#527963]">Orientation:</span>
                          {isEditing ? (
                            <input
                              type="text"
                              value={plot.facing}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleUpdatePlot(plot.id, 'facing', e.target.value)}
                              className="p-0.5 text-xs bg-white border border-[#CDE0D5] rounded text-[#0B1E13] text-right"
                            />
                          ) : (
                            <span className="font-medium text-[#0B1E13]">{plot.facing}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1 text-xs text-[#3E5C4B]">
                        {plot.features.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-[#167041]" />
                            <span className="text-[11px]">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E8F0EB] flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInquireClick(plot);
                        }}
                        disabled={plot.status === 'Sold'}
                        className="text-xs font-mono font-bold text-[#167041] hover:text-[#0E4729] flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>{plot.status === 'Sold' ? 'Sold' : 'Reserve Plot'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className="text-[11px] font-mono text-[#527963]">
                        {plot.price || 'Inquire'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* VIEW 2: 600 SQ. YD. ARCHITECTURAL BLUEPRINT SPECS */}
        {activeView === 'specs' && (
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#CDE0D5] p-6 sm:p-10 shadow-xs">
            
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-mono font-bold text-[#167041] uppercase tracking-widest block mb-1">
                Standardized Parcel Architecture
              </span>
              <h3 className="font-serif font-bold text-3xl text-[#0B1E13] mb-3">
                The 600 Sq. Yard Plot Blueprint Formula
              </h3>
              <p className="text-sm text-[#3E5C4B] leading-relaxed font-sans">
                Every residential plot in Summer Hill is rigorously engineered to 600 square yards (approx. 5,400 sq. ft. / 1 Kanal standard), delivering the optimal balance between luxurious home footprint, expansive natural alpine gardens, and scenic ridge setbacks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              <div className="bg-[#F8FAF9] p-6 rounded-xl border border-[#DCE8E0]">
                <div className="p-2 rounded-lg bg-[#EEF7F2] text-[#167041] w-fit mb-3">
                  <Home className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#0B1E13] mb-2">
                  1. Pre-Built Turnkey Construction
                </h4>
                <p className="text-xs text-[#3E5C4B] leading-relaxed">
                  Avoid the complexities, high mountain supply logistical risks, and permits of independent construction. Homes are fully finished with imported alpine fixtures, fireplaces, and thermal insulation.
                </p>
              </div>

              <div className="bg-[#F8FAF9] p-6 rounded-xl border border-[#DCE8E0]">
                <div className="p-2 rounded-lg bg-[#EEF7F2] text-[#167041] w-fit mb-3">
                  <Trees className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#0B1E13] mb-2">
                  2. 50%+ Private Greenery Ratio
                </h4>
                <p className="text-xs text-[#3E5C4B] leading-relaxed">
                  With a covered building footprint capped at 2,000 to 2,800 sq. ft. on ground, over 2,600 sq. ft. of private lawn, pine trees, and wrap-around cedar decks remain untouched for outdoor relaxation.
                </p>
              </div>

              <div className="bg-[#F8FAF9] p-6 rounded-xl border border-[#DCE8E0]">
                <div className="p-2 rounded-lg bg-[#FDF7E7] text-[#B08920] w-fit mb-3">
                  <Car className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#0B1E13] mb-2">
                  3. Dedicated Vehicular Access
                </h4>
                <p className="text-xs text-[#3E5C4B] leading-relaxed">
                  Every 600 sq. yd. plot enjoys direct paved access from the 24-ft heated arterial road, complete with a private heated 2-car driveway port preventing winter ice buildup.
                </p>
              </div>

            </div>

            {/* Dimension Breakdown Table */}
            <div className="border border-[#DCE8E0] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4F8F5] border-b border-[#DCE8E0] font-mono text-[#527963] uppercase text-[11px]">
                  <tr>
                    <th className="p-3.5">Plot Parameter</th>
                    <th className="p-3.5">Dimension / Standard</th>
                    <th className="p-3.5">Architectural Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8F0EB] text-[#0B1E13]">
                  <tr>
                    <td className="p-3.5 font-bold font-mono">Gross Plot Area</td>
                    <td className="p-3.5 font-mono text-[#167041] font-bold">600 Sq. Yards (5,400 Sq. Ft.)</td>
                    <td className="p-3.5 text-[#3E5C4B]">Full legal allotment demarcated on master deed</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-mono">Frontage & Depth</td>
                    <td className="p-3.5 font-mono">60 ft Wide × 90 ft Depth (Approx)</td>
                    <td className="p-3.5 text-[#3E5C4B]">Wide frontage maximizes uninterrupted panoramic valley views</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-mono">Covered House Area</td>
                    <td className="p-3.5 font-mono">1,850 - 4,200 Sq. Ft. (2-3 Levels)</td>
                    <td className="p-3.5 text-[#3E5C4B]">Turnkey pre-built alpine villa models</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-mono">Private Garden & Deck</td>
                    <td className="p-3.5 font-mono">2,500+ Sq. Ft.</td>
                    <td className="p-3.5 text-[#3E5C4B]">Native pine lawn, hot tub terrace, and campfire hearth</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold font-mono">Setbacks & Privacy</td>
                    <td className="p-3.5 font-mono">15 ft Front / 10 ft Rear & Sides</td>
                    <td className="p-3.5 text-[#3E5C4B]">Ensures acoustic quietude and forest sightline preservation</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
