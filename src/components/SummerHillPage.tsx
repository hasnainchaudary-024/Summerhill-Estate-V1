import React, { useState } from 'react';
import {
  Mountain,
  MapPin,
  Trees,
  Compass,
  HeartPulse,
  Shield,
  Zap,
  Car,
  Home,
  CheckCircle2,
  Clock,
  Send,
  Download,
  Plus,
  Trash2,
  Sparkles,
  Phone,
  Mail,
  Building,
  Check,
  Map,
} from 'lucide-react';
import { SummerHillContent, SummerHillChalet, ProjectMilestone, TownPlot, TownPlanData } from '../types';
import { TownPlanMapSection } from './TownPlanMapSection';

interface SummerHillPageProps {
  content: SummerHillContent;
  isEditing: boolean;
  onUpdate: (updated: Partial<SummerHillContent>) => void;
}

export const SummerHillPage: React.FC<SummerHillPageProps> = ({
  content,
  isEditing,
  onUpdate,
}) => {
  const [selectedChaletTab, setSelectedChaletTab] = useState<string>('all');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: 'The Deodar Grand Villa (600 Sq. Yd. Plot)',
    message: '',
  });

  const handleSelectPlotForInquiry = (plot: TownPlot) => {
    setInquiryData((prev) => ({
      ...prev,
      interestedIn: `${plot.plotNumber} (${plot.plotSize}) - ${plot.houseModel}`,
      message: prev.message || `I am interested in reserving ${plot.plotNumber} (${plot.plotSize}, ${plot.houseModel}, ${plot.facing}). Please send me the master deed, contour drawings, and payment milestone schedule.`,
    }));
  };

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-[#D44D26]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#1B4D3E]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#D44D26]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#C87D20]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#1B4D3E]" />;
      case 'Trees':
      default:
        return <Trees className="w-5 h-5 text-[#1B4D3E]" />;
    }
  };

  const handleVisionParagraphChange = (index: number, val: string) => {
    const nextParas = [...content.visionParagraphs];
    nextParas[index] = val;
    onUpdate({ visionParagraphs: nextParas });
  };

  const handleAddVisionParagraph = () => {
    onUpdate({
      visionParagraphs: [
        ...content.visionParagraphs,
        'Add details about the project vision, alpine lifestyle, or architectural nuances...',
      ],
    });
  };

  const handleRemoveVisionParagraph = (index: number) => {
    const nextParas = content.visionParagraphs.filter((_, i) => i !== index);
    onUpdate({ visionParagraphs: nextParas });
  };

  const handleSpecChange = (index: number, field: 'label' | 'value', val: string) => {
    const nextSpecs = [...content.projectSpecs];
    nextSpecs[index] = { ...nextSpecs[index], [field]: val };
    onUpdate({ projectSpecs: nextSpecs });
  };

  const handleAddSpec = () => {
    onUpdate({
      projectSpecs: [...content.projectSpecs, { label: 'New Attribute', value: 'Specify detail' }],
    });
  };

  const handleRemoveSpec = (index: number) => {
    onUpdate({ projectSpecs: content.projectSpecs.filter((_, i) => i !== index) });
  };

  const handleUpdateChalet = (id: string, field: keyof SummerHillChalet, val: any) => {
    const nextChalets = content.chalets.map((ch) =>
      ch.id === id ? { ...ch, [field]: val } : ch
    );
    onUpdate({ chalets: nextChalets });
  };

  const handleAddChalet = () => {
    const newCh: SummerHillChalet = {
      id: `ch-${Date.now()}`,
      name: 'Himalayan Ridge Chalet',
      type: '3-Bedroom Alpine Chalet',
      areaSqFt: 3100,
      bedrooms: 3,
      bathrooms: 3,
      description: 'Custom handcrafted alpine lodge overlooking the wooded valley.',
      features: ['Panoramic terrace', 'Stone fireplace', 'Underfloor heating'],
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      status: 'Available',
    };
    onUpdate({ chalets: [...content.chalets, newCh] });
  };

  const handleRemoveChalet = (id: string) => {
    onUpdate({ chalets: content.chalets.filter((ch) => ch.id !== id) });
  };

  const handleUpdateMilestone = (id: string, field: keyof ProjectMilestone, val: any) => {
    const nextMilestones = content.milestones.map((ms) =>
      ms.id === id ? { ...ms, [field]: val } : ms
    );
    onUpdate({ milestones: nextMilestones });
  };

  const handleAddMilestone = () => {
    const newMs: ProjectMilestone = {
      id: `ms-${Date.now()}`,
      phase: `Phase 0${content.milestones.length + 1}`,
      title: 'New Project Milestone',
      timeline: 'Upcoming Quarter',
      status: 'Upcoming',
      description: 'Describe this phase of development or construction...',
    };
    onUpdate({ milestones: [...content.milestones, newMs] });
  };

  const handleRemoveMilestone = (id: string) => {
    onUpdate({ milestones: content.milestones.filter((ms) => ms.id !== id) });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryData({
        name: '',
        email: '',
        phone: '',
        interestedIn: 'The Deodar Grand Villa',
        message: '',
      });
    }, 4000);
  };

  const filteredChalets =
    selectedChaletTab === 'all'
      ? content.chalets
      : content.chalets.filter((ch) => ch.status.toLowerCase().includes(selectedChaletTab));

  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A]">
      
      {/* 1. Hero Header */}
      <section className="relative bg-[#1A1A1A] text-[#F9F7F2] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#2C2A28]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#1A1A1A]/95 to-[#1A1A1A]/90" />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#292420] border border-[#423A33] text-[#F9A891] text-[11px] font-mono tracking-widest uppercase mb-6 shadow-sm">
            <Trees className="w-3.5 h-3.5 text-[#D44D26]" />
            {isEditing ? (
              <input
                type="text"
                value={content.tagline}
                onChange={(e) => onUpdate({ tagline: e.target.value })}
                className="bg-transparent border-b border-[#D44D26] text-[#F9F7F2] focus:outline-none px-1 py-0.5"
              />
            ) : (
              <span>[ PROJECT MONOGRAPH & MASTER PLAN ]</span>
            )}
          </div>

          {/* Heading */}
          {isEditing ? (
            <div className="mb-4">
              <label className="text-xs text-[#D44D26] font-mono block mb-1">Project Heading:</label>
              <input
                type="text"
                value={content.projectHeading}
                onChange={(e) => onUpdate({ projectHeading: e.target.value })}
                className="w-full text-center text-3xl sm:text-5xl font-serif font-bold text-white bg-[#292420] border border-[#423A33] rounded-xl p-2.5"
              />
            </div>
          ) : (
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#FFFFFF] tracking-tight leading-[1.1] mb-6">
              {content.projectHeading}
            </h1>
          )}

          {/* Subheading */}
          {isEditing ? (
            <div className="mb-6">
              <label className="text-xs text-[#D44D26] font-mono block mb-1">Project Subheading:</label>
              <textarea
                value={content.projectSubheading}
                onChange={(e) => onUpdate({ projectSubheading: e.target.value })}
                className="w-full text-sm sm:text-base text-[#D0C9BE] bg-[#292420] border border-[#423A33] rounded-xl p-3"
                rows={3}
              />
            </div>
          ) : (
            <p className="text-base sm:text-xl text-[#D0C9BE] max-w-2xl mx-auto leading-relaxed mb-8 font-sans font-light">
              {content.projectSubheading}
            </p>
          )}

          {/* Quick Stat Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#D0C9BE] font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24211E] border border-[#38332E]">
              <Mountain className="w-3.5 h-3.5 text-[#D44D26]" />
              <span>2,420 m Ridge Elevation</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24211E] border border-[#38332E]">
              <Trees className="w-3.5 h-3.5 text-[#A5C4AB]" />
              <span>60 Kanals Eco-Sanctuary</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24211E] border border-[#38332E]">
              <Home className="w-3.5 h-3.5 text-[#E0C097]" />
              <span>600 Sq. Yd. Standard Plots</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24211E] border border-[#38332E]">
              <Building className="w-3.5 h-3.5 text-[#D44D26]" />
              <span>Pre-Built Turnkey Villas</span>
            </div>
          </div>

        </div>
      </section>

      {/* 1. Overview & Architectural Vision */}
      <section className="py-16 sm:py-20 bg-[#F9F7F2] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#E5DFD5]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D44D26] uppercase tracking-widest mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>[ 01 / Architectural Vision & Master Plan ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                The Summer Hill Vision
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {isEditing ? (
                <div>
                  <label className="text-xs font-mono font-bold text-[#D44D26] block mb-1">
                    Overview Summary:
                  </label>
                  <textarea
                    value={content.overviewSummary}
                    onChange={(e) => onUpdate({ overviewSummary: e.target.value })}
                    rows={3}
                    className="w-full text-base font-serif italic text-[#1A1A1A] bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-3.5"
                  />
                </div>
              ) : (
                <p className="text-lg sm:text-xl font-serif italic text-[#1A1A1A] leading-relaxed border-l-2 border-[#D44D26] pl-4">
                  {content.overviewSummary}
                </p>
              )}

              <div className="space-y-4">
                {content.visionParagraphs.map((para, idx) => (
                  <div key={idx} className="relative">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <textarea
                          value={para}
                          onChange={(e) => handleVisionParagraphChange(idx, e.target.value)}
                          rows={3}
                          className="w-full text-sm text-[#403B35] bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-3"
                        />
                        <button
                          onClick={() => handleRemoveVisionParagraph(idx)}
                          className="p-2 text-[#8C827A] hover:text-[#D44D26] hover:bg-[#FDF0EB] rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm sm:text-base text-[#4A443D] leading-relaxed font-sans">
                        {para}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <button
                  onClick={handleAddVisionParagraph}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold text-[#D44D26] bg-[#FDF0EB] hover:bg-[#FBE4DD] border border-[#F5CBBF] rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Narrative Paragraph</span>
                </button>
              )}
            </div>

            {/* Specifications Matrix (5 cols) */}
            <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl p-6 border border-[#E5DFD5] shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5DFD5]">
                <h3 className="font-serif font-bold text-[#1A1A1A] text-base">
                  Project Specifications & Master Site
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1B4D3E] bg-[#EBF3ED] px-2 py-0.5 rounded border border-[#C5DDCB]">
                  Verified Plan
                </span>
              </div>

              <div className="space-y-1">
                {content.projectSpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 text-xs sm:text-sm py-2.5 border-b border-[#F0EBE3] last:border-0"
                  >
                    {isEditing ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={spec.label}
                          onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                          className="w-1/2 p-1.5 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded font-semibold text-[#1A1A1A]"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                          className="w-1/2 p-1.5 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded text-[#1A1A1A] font-bold"
                        />
                        <button
                          onClick={() => handleRemoveSpec(idx)}
                          className="p-1 text-[#8C827A] hover:text-[#D44D26]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-[#6B635B] font-mono text-xs uppercase tracking-wide">
                          {spec.label}
                        </span>
                        <span className="font-serif font-bold text-[#1A1A1A] text-right">
                          {spec.value}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <button
                  onClick={handleAddSpec}
                  className="mt-4 w-full py-2 flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-[#1A1A1A] bg-[#F4F0E8] hover:bg-[#EBE5DB] border border-[#E5DFD5] rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D44D26]" />
                  <span>Add Project Attribute</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 2. Master Town Plan & 600 Sq. Yd. Plot Map */}
      {content.townPlan && (
        <TownPlanMapSection
          townPlan={content.townPlan}
          isEditing={isEditing}
          onUpdate={(updatedTownPlan) => onUpdate({ townPlan: updatedTownPlan })}
          onSelectPlotForInquiry={handleSelectPlotForInquiry}
        />
      )}

      {/* 3. The Chalet & Residence Collection */}
      <section id="chalets" className="py-16 sm:py-20 bg-[#F9F7F2] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E5DFD5]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D44D26] uppercase tracking-widest mb-2">
                <Home className="w-3.5 h-3.5" />
                <span>[ 03 / The Pre-Built Alpine Residences ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                Chalet Archetypes & Turnkey Villas
              </h2>
              <p className="text-xs sm:text-sm text-[#6B635B] mt-1.5 font-sans">
                Turnkey architectural residences constructed on 600 sq. yd. plots, engineered for sub-zero alpine winters.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isEditing && (
                <button
                  onClick={handleAddChalet}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-[#FFFFFF] bg-[#D44D26] hover:bg-[#B83E1B] rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Chalet Model</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredChalets.map((chalet) => (
              <div
                key={chalet.id}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E5DFD5] overflow-hidden shadow-xs hover:border-[#C4BCAD] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-52 w-full bg-[#1A1A1A] overflow-hidden">
                    <img
                      src={chalet.imageUrl}
                      alt={chalet.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent pointer-events-none" />

                    <span
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                        chalet.status === 'Available'
                          ? 'bg-[#1E3027] text-[#A5C4AB] border-[#1B4D3E]/60'
                          : chalet.status === 'Reserved'
                          ? 'bg-[#3D221A] text-[#F9A891] border-[#D44D26]/60'
                          : 'bg-[#292420] text-[#E0C097] border-[#423A33]'
                      }`}
                    >
                      {chalet.status}
                    </span>

                    {isEditing && (
                      <button
                        onClick={() => handleRemoveChalet(chalet.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#D44D26] text-white hover:bg-[#B83E1B]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-mono text-[#D0C9BE] block">
                        {chalet.areaSqFt} SQ FT • {chalet.bedrooms} BEDS • {chalet.bathrooms} BATHS
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {isEditing ? (
                      <div className="space-y-2 mb-4">
                        <input
                          type="text"
                          value={chalet.name}
                          onChange={(e) => handleUpdateChalet(chalet.id, 'name', e.target.value)}
                          className="w-full p-1.5 font-serif font-bold bg-[#FAF8F5] border border-[#E5DFD5] rounded text-[#1A1A1A]"
                        />
                        <input
                          type="text"
                          value={chalet.type}
                          onChange={(e) => handleUpdateChalet(chalet.id, 'type', e.target.value)}
                          className="w-full p-1 text-xs font-mono text-[#D44D26] bg-[#FAF8F5] border border-[#E5DFD5] rounded"
                        />
                        <div className="grid grid-cols-3 gap-1 text-xs">
                          <input
                            type="number"
                            value={chalet.areaSqFt}
                            onChange={(e) =>
                              handleUpdateChalet(chalet.id, 'areaSqFt', Number(e.target.value))
                            }
                            className="p-1 bg-[#FAF8F5] border border-[#E5DFD5] rounded"
                            placeholder="Sq Ft"
                          />
                          <input
                            type="number"
                            value={chalet.bedrooms}
                            onChange={(e) =>
                              handleUpdateChalet(chalet.id, 'bedrooms', Number(e.target.value))
                            }
                            className="p-1 bg-[#FAF8F5] border border-[#E5DFD5] rounded"
                            placeholder="Beds"
                          />
                          <input
                            type="number"
                            value={chalet.bathrooms}
                            onChange={(e) =>
                              handleUpdateChalet(chalet.id, 'bathrooms', Number(e.target.value))
                            }
                            className="p-1 bg-[#FAF8F5] border border-[#E5DFD5] rounded"
                            placeholder="Baths"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D44D26] block mb-1">
                          {chalet.type}
                        </span>
                        <h3 className="font-serif font-bold text-[#1A1A1A] text-xl leading-snug">
                          {chalet.name}
                        </h3>
                      </div>
                    )}

                    {isEditing ? (
                      <textarea
                        value={chalet.description}
                        onChange={(e) => handleUpdateChalet(chalet.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full p-2 text-xs text-[#524B42] bg-[#FAF8F5] border border-[#E5DFD5] rounded mb-3"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-[#524B42] leading-relaxed mb-4">
                        {chalet.description}
                      </p>
                    )}

                    {/* Features checklist */}
                    <div className="pt-4 border-t border-[#F0EBE3] space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#6B635B] uppercase tracking-wider block mb-2">
                        Architectural Inclusions
                      </span>
                      {chalet.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#403B35]">
                          <Check className="w-3.5 h-3.5 text-[#1B4D3E] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <a
                    href="#inquire"
                    onClick={() => setInquiryData((prev) => ({ ...prev, interestedIn: chalet.name }))}
                    className="block w-full text-center py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F4F0E8] hover:bg-[#EBE5DB] border border-[#E5DFD5] rounded-xl transition-all"
                  >
                    Request Brochure & Specs
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Curated Amenities & Lifestyle */}
      <section className="py-16 sm:py-20 bg-[#F9F7F2] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#E5DFD5]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D44D26] uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>[ 04 / Master Amenities & Private Infrastructure ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                Estate Living & Resort Privileges
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E5DFD5] shadow-xs flex flex-col justify-between hover:border-[#C4BCAD] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5]">
                      {getAmenityIcon(amenity.icon)}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D44D26]">
                      {amenity.category}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-[#1A1A1A] text-lg mb-2">
                    {amenity.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#524B42] leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Phased Project Roadmap */}
      <section className="py-16 sm:py-20 bg-[#F4F0E8] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#E5DFD5]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D44D26] uppercase tracking-widest mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>[ 05 / Development Milestones & Delivery Roadmap ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                Project Phasing & Timeline
              </h2>
            </div>

            {isEditing && (
              <button
                onClick={handleAddMilestone}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[#D44D26] bg-[#FFFFFF] border border-[#E5DFD5] rounded-lg"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Phase</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.milestones.map((ms, idx) => (
              <div
                key={ms.id}
                className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E5DFD5] shadow-xs flex flex-col justify-between relative"
              >
                {isEditing && (
                  <button
                    onClick={() => handleRemoveMilestone(ms.id)}
                    className="absolute top-3 right-3 p-1 text-[#8C827A] hover:text-[#D44D26]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#D44D26]">
                      {ms.phase}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase border ${
                        ms.status === 'Completed'
                          ? 'bg-[#EBF3ED] text-[#1B4D3E] border-[#C5DDCB]'
                          : ms.status === 'In Progress'
                          ? 'bg-[#FDF0EB] text-[#D44D26] border-[#F5CBBF]'
                          : 'bg-[#FAF8F5] text-[#6B635B] border-[#E5DFD5]'
                      }`}
                    >
                      {ms.status}
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="space-y-2 mb-2">
                      <input
                        type="text"
                        value={ms.title}
                        onChange={(e) => handleUpdateMilestone(ms.id, 'title', e.target.value)}
                        className="w-full font-serif font-bold text-sm bg-[#FAF8F5] border border-[#E5DFD5] rounded p-1"
                      />
                      <input
                        type="text"
                        value={ms.timeline}
                        onChange={(e) => handleUpdateMilestone(ms.id, 'timeline', e.target.value)}
                        className="w-full text-xs font-mono text-[#D44D26] bg-[#FAF8F5] border border-[#E5DFD5] rounded p-1"
                      />
                      <textarea
                        value={ms.description}
                        onChange={(e) => handleUpdateMilestone(ms.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full text-xs text-[#524B42] bg-[#FAF8F5] border border-[#E5DFD5] rounded p-1"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-serif font-bold text-[#1A1A1A] text-base mb-1">
                        {ms.title}
                      </h3>
                      <span className="text-xs font-mono text-[#6B635B] block mb-3">
                        {ms.timeline}
                      </span>
                      <p className="text-xs text-[#524B42] leading-relaxed">
                        {ms.description}
                      </p>
                    </>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-[#F0EBE3] flex items-center gap-1.5 text-[11px] font-mono text-[#8C827A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D3E]" />
                  <span>Verified Schedule</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Location, Accessibility & Regional Connectivity */}
      <section className="py-16 sm:py-20 bg-[#F9F7F2] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#E5DFD5]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D44D26] uppercase tracking-widest mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>[ 06 / Regional Connectivity & Mountain Access ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                Access Routes & Travel Times
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xs">
              <h3 className="font-serif font-bold text-[#1A1A1A] text-lg mb-4 pb-2 border-b border-[#E5DFD5]">
                Direct Highway & Corridor Proximity
              </h3>
              <div className="space-y-3">
                {content.accessibility.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-2 border-b border-[#F0EBE3] last:border-0 text-xs sm:text-sm"
                  >
                    <span className="font-medium text-[#1A1A1A]">{item.route}</span>
                    <div className="flex items-center gap-3 font-mono text-xs text-[#6B635B]">
                      <span>{item.distance}</span>
                      <span className="text-[#D44D26] font-bold bg-[#FDF0EB] px-2 py-0.5 rounded border border-[#F5CBBF]">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#292420] text-[#F9F7F2] rounded-2xl p-6 sm:p-8 border border-[#423A33] shadow-md">
              <span className="text-[10px] font-mono font-bold text-[#F9A891] uppercase tracking-widest block mb-2">
                Mountain Winter Access Protocol
              </span>
              <h3 className="font-serif font-bold text-xl text-[#FFFFFF] mb-3">
                Year-Round Alpine Reachability
              </h3>
              <p className="text-xs sm:text-sm text-[#D0C9BE] leading-relaxed mb-6 font-sans">
                Summer Hill features a private asphalt feeder loop equipped with sub-surface heating tubes along sharp elevation hairpins, backed by estate snow removal machinery to ensure uninhibited winter holiday access.
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-[#A5C4AB]">
                <Check className="w-4 h-4 text-[#A5C4AB]" />
                <span>N-75 Link Corridor Clearance</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Inquiry, Developer Information & Brochure Download */}
      <section id="inquire" className="py-16 sm:py-20 bg-[#F4F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Developer Factsheet (5 cols) */}
            <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D44D26] uppercase tracking-widest mb-2">
                <Building className="w-3.5 h-3.5" />
                <span>[ 07 / Developer Desk & Private Allocation ]</span>
              </div>
              <h3 className="font-serif font-bold text-[#1A1A1A] text-2xl mb-4">
                {content.developerInfo.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#524B42] leading-relaxed mb-6">
                Direct all plot allocations, architectural customization inquiries, and private site visit bookings to our project coordinators.
              </p>

              <div className="space-y-4 text-xs font-sans pb-6 border-b border-[#E5DFD5]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D44D26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">Site & Liaison Office</span>
                    <span className="text-[#6B635B]">{content.developerInfo.office}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D44D26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">Direct Inquiries</span>
                    <span className="font-mono text-[#1A1A1A]">{content.developerInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D44D26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">Electronic Correspondence</span>
                    <span className="font-mono text-[#1A1A1A]">{content.developerInfo.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() =>
                    alert('Summer Hill Estate masterplan and architectural brochure download initialized.')
                  }
                  className="w-full py-3 flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#1A1A1A] hover:bg-[#2C2A28] rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#D44D26]" />
                  <span>Download Master Plan (PDF)</span>
                </button>
              </div>
            </div>

            {/* Registration / Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-mono font-bold text-[#D44D26] uppercase tracking-widest block mb-1">
                  Private Allocation Registration
                </span>
                <h3 className="font-serif font-bold text-[#1A1A1A] text-2xl">
                  Register Interest for 600 Sq. Yd. Plots & Villas
                </h3>
                <p className="text-xs sm:text-sm text-[#6B635B] mt-1">
                  Request detailed contour survey, payment milestone plan, or schedule a private estate viewing in Kuzagali.
                </p>
              </div>

              {inquirySubmitted ? (
                <div className="p-8 bg-[#EBF3ED] rounded-2xl border border-[#C5DDCB] text-center animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#1B4D3E] mb-2">
                    Inquiry Received Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-[#2D5A4A] max-w-md mx-auto leading-relaxed">
                    Our Summer Hill estate advisor will contact you within 24 hours with the detailed masterplan and chalet availability.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#1A1A1A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryData.name}
                        onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                        placeholder="e.g. Tariq Malik"
                        className="w-full p-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D44D26]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#1A1A1A] mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={inquiryData.phone}
                        onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full p-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D44D26]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#1A1A1A] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={inquiryData.email}
                        onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full p-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D44D26]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#1A1A1A] mb-1">
                        Plot / Chalet of Interest
                      </label>
                      <input
                        type="text"
                        value={inquiryData.interestedIn}
                        onChange={(e) =>
                          setInquiryData({ ...inquiryData, interestedIn: e.target.value })
                        }
                        placeholder="e.g. Plot 01 - The Deodar Grand Villa"
                        className="w-full p-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D44D26] font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1A1A1A] mb-1">
                      Message / Custom Architectural Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={inquiryData.message}
                      onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                      placeholder="Specify your preferred elevation contour, investment timeline, or site visit date..."
                      className="w-full p-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D44D26]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#D44D26] hover:bg-[#B83E1B] rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Private Registration</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
