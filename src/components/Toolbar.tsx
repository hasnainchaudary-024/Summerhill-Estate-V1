import React, { useState, useRef, useEffect } from 'react';
import {
  Edit3,
  Eye,
  Save,
  RotateCcw,
  Download,
  Upload,
  Printer,
  Check,
  FilePlus,
  AlertTriangle,
  X,
  Volume2,
  VolumeX,
  Trees,
  Sparkles,
} from 'lucide-react';
import { ProfileContent } from '../types';
import { alpineAudio } from '../utils/alpineSound';

interface ToolbarProps {
  activePage: 'kuzagali' | 'summer-hill';
  onSelectPage: (page: 'kuzagali' | 'summer-hill') => void;
  isEditing: boolean;
  onToggleEdit: () => void;
  onResetSample: () => void;
  onClearToBlank: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: (content: ProfileContent) => void;
  hasUnsavedChanges: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activePage,
  onSelectPage,
  isEditing,
  onToggleEdit,
  onResetSample,
  onClearToBlank,
  onSave,
  onExport,
  onImport,
}) => {
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'blank' | 'reset' | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleAudio = () => {
    const nextState = alpineAudio.toggle();
    setIsAudioPlaying(nextState);
  };

  const handleSaveClick = () => {
    onSave();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.welcomeHeading !== undefined || parsed.projectHeading !== undefined || (parsed.kuzagali && parsed.summerHill)) {
            onImport(parsed);
          }
        } catch (err) {
          console.error('Failed to parse profile JSON', err);
        }
      };
      reader.readAsText(file);
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#091710]/95 backdrop-blur-md text-[#F4F8F5] border-b border-[#1E3B29] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Brand & Crest */}
          <div className="flex items-center flex-wrap gap-3">
            <div className="flex items-center gap-2 mr-1">
              <div className="p-1.5 rounded-lg bg-[#143322] border border-[#D4AF37]/40 text-[#D4AF37] shadow-xs">
                <Trees className="w-4 h-4 text-[#34D399]" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm text-[#FFFFFF] tracking-wide block leading-none">
                  Kuzagali & Summer Hill
                </span>
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest block mt-0.5">
                  Alpine Pine Sanctuary • 2,420M
                </span>
              </div>
            </div>

            {/* Navigation Switcher Tabs */}
            <nav className="flex items-center p-0.5 rounded-xl bg-[#0D2217] border border-[#1E3F2D] text-xs font-mono">
              <button
                onClick={() => onSelectPage('kuzagali')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                  activePage === 'kuzagali'
                    ? 'bg-gradient-to-r from-[#1B5233] to-[#246A44] text-[#F3D993] shadow-md border border-[#D4AF37]/30'
                    : 'text-[#9CB6A6] hover:text-white hover:bg-[#143021]'
                }`}
              >
                <span>01. Kuzagali Monograph</span>
              </button>
              <button
                onClick={() => onSelectPage('summer-hill')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                  activePage === 'summer-hill'
                    ? 'bg-gradient-to-r from-[#1B5233] to-[#246A44] text-[#F3D993] shadow-md border border-[#D4AF37]/30'
                    : 'text-[#9CB6A6] hover:text-white hover:bg-[#143021]'
                }`}
              >
                <span>02. Summer Hill Estate</span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#D4AF37]/20 text-[#F3D993] border border-[#D4AF37]/40 font-mono">
                  VIP Luxury
                </span>
              </button>
            </nav>

            <div
              className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-colors hidden md:flex items-center gap-1 ${
                isEditing
                  ? 'bg-[#3D2214] text-[#F9B98A] border-[#D4AF37]/40'
                  : 'bg-[#102B1D] text-[#6EE7B7] border-[#1B5233]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isEditing ? 'bg-[#F9B98A]' : 'bg-[#10B981] animate-pulse'}`} />
              <span>{isEditing ? 'Curator Edit Mode' : 'Alpine Sanctuary Mode'}</span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
            
            {/* Ambient Alpine Wind Audio Synthesizer */}
            <button
              onClick={handleToggleAudio}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                isAudioPlaying
                  ? 'bg-[#143A26] border-[#34D399] text-[#6EE7B7] shadow-sm'
                  : 'bg-[#0E2419] border-[#1E3F2D] text-[#9CB6A6] hover:text-white hover:border-[#2D5A40]'
              }`}
              title="Toggle Ambient Himalayan Pine Breeze Audio"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#34D399] animate-pulse" />
                  <span className="font-semibold text-[11px]">Pine Breeze On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#9CB6A6]" />
                  <span className="hidden sm:inline text-[11px]">Pine Breeze</span>
                </>
              )}
            </button>

            {/* Toggle Edit / Preview */}
            <button
              onClick={onToggleEdit}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer shadow-md ${
                isEditing
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#091710] hover:brightness-110'
                  : 'bg-[#143021] hover:bg-[#1C4530] text-[#FFFFFF] border border-[#2D5A40]'
              }`}
              title="Toggle between editing fields and clean live preview"
            >
              {isEditing ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Finish & View</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Customize / Edit</span>
                </>
              )}
            </button>

            {/* Blank Template Option */}
            {isEditing && (
              <button
                onClick={() => setConfirmAction('blank')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0E2419] hover:bg-[#143021] text-[#A3C2AE] hover:text-[#FFFFFF] border border-[#1E3F2D] transition-colors cursor-pointer"
                title="Clear text to leave blank fields for you to fill in"
              >
                <FilePlus className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Leave Blank</span>
              </button>
            )}

            {/* Reset sample */}
            {isEditing && (
              <button
                onClick={() => setConfirmAction('reset')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0E2419] hover:bg-[#143021] text-[#A3C2AE] hover:text-[#FFFFFF] border border-[#1E3F2D] transition-colors cursor-pointer"
                title="Reset to default guide content"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#34D399]" />
                <span className="hidden sm:inline">Reset Sample</span>
              </button>
            )}

            {/* Save to local */}
            <button
              onClick={handleSaveClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0E2419] hover:bg-[#143021] text-[#F3D993] border border-[#D4AF37]/50 font-bold transition-colors cursor-pointer shadow-xs"
              title="Save changes to browser memory"
            >
              {showSavedToast ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Save className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span>{showSavedToast ? 'Saved!' : 'Save'}</span>
            </button>

            {/* Import JSON */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json,application/json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl bg-[#0E2419] hover:bg-[#143021] text-[#A3C2AE] hover:text-white border border-[#1E3F2D] transition-colors cursor-pointer"
              title="Import JSON profile"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>

            {/* Export JSON */}
            <button
              onClick={onExport}
              className="p-2 rounded-xl bg-[#0E2419] hover:bg-[#143021] text-[#A3C2AE] hover:text-white border border-[#1E3F2D] transition-colors cursor-pointer"
              title="Export website data as JSON"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            {/* Print / PDF */}
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-[#0E2419] hover:bg-[#143021] text-[#A3C2AE] hover:text-white border border-[#1E3F2D] transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>
      </header>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#0D2217] border border-[#1E432E] rounded-2xl p-6 max-w-md w-full shadow-2xl text-[#F4F8F5] relative">
            <button
              onClick={() => setConfirmAction(null)}
              className="absolute top-4 right-4 text-[#A3C2AE] hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-3.5 mb-4">
              <div className="p-3 rounded-xl bg-[#143825] border border-[#D4AF37]/40 text-[#D4AF37]">
                <AlertTriangle className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#FFFFFF]">
                  {confirmAction === 'blank'
                    ? 'Clear to Blank Template?'
                    : 'Reset to Sample Data?'}
                </h3>
                <p className="text-xs text-[#A3C2AE] mt-1 leading-relaxed font-sans">
                  {confirmAction === 'blank'
                    ? 'This will replace current text with empty placeholder fields ready for custom data entry.'
                    : 'This will restore all default curated monographs, landmarks, and atmospheric descriptions.'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2.5 mt-6 font-mono text-xs">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 rounded-xl bg-[#143021] hover:bg-[#1B402C] text-[#A3C2AE] transition-colors cursor-pointer border border-[#1E3F2D]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmAction === 'blank') {
                    onClearToBlank();
                  } else {
                    onResetSample();
                  }
                  setConfirmAction(null);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#091710] font-bold transition-all cursor-pointer shadow-md hover:brightness-110"
              >
                Confirm {confirmAction === 'blank' ? 'Clear' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


