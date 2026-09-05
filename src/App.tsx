import React, { useState, useEffect } from 'react';
import { LocationPinBanner } from './components/LocationPinBanner';
import { WeatherConditionsBar } from './components/WeatherConditionsBar';
import { Toolbar } from './components/Toolbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { HighlightsSection } from './components/HighlightsSection';
import { GallerySection } from './components/GallerySection';
import { SeasonsSection } from './components/SeasonsSection';
import { SummerHillPage } from './components/SummerHillPage';
import { Footer } from './components/Footer';
import {
  KUZAGALI_LOCATION,
  fetchKuzagaliWeather,
  fetchKuzagaliAirQuality,
  getFallbackWeather,
  getFallbackAirQuality,
} from './services/weatherService';
import { INITIAL_PROFILE_CONTENT, INITIAL_SUMMER_HILL_CONTENT } from './data/defaultContent';
import { WeatherCondition, AirQualityData, ProfileContent, SummerHillContent } from './types';

const STORAGE_KEY = 'kuzagali_profile_content_v1';
const SUMMER_HILL_STORAGE_KEY = 'summer_hill_project_content_v1';

export default function App() {
  const [activePage, setActivePage] = useState<'kuzagali' | 'summer-hill'>('kuzagali');
  const [weather, setWeather] = useState<WeatherCondition>(getFallbackWeather());
  const [airQuality, setAirQuality] = useState<AirQualityData>(getFallbackAirQuality());
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Kuzagali profile content
  const [content, setContent] = useState<ProfileContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved profile content', e);
    }
    return INITIAL_PROFILE_CONTENT;
  });

  // Summer Hill project content
  const [summerHillContent, setSummerHillContent] = useState<SummerHillContent>(() => {
    try {
      const saved = localStorage.getItem(SUMMER_HILL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved Summer Hill content', e);
    }
    return INITIAL_SUMMER_HILL_CONTENT;
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Fetch live weather & air quality on mount
  const loadAtmosphericData = async () => {
    setWeatherLoading(true);
    try {
      const [wData, aqiData] = await Promise.all([
        fetchKuzagaliWeather(),
        fetchKuzagaliAirQuality(),
      ]);
      setWeather(wData);
      setAirQuality(aqiData);
    } catch (err) {
      console.error('Failed to load atmospheric data', err);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    loadAtmosphericData();
  }, []);

  const handleUpdateContent = (updated: Partial<ProfileContent>) => {
    setContent((prev) => {
      const next = { ...prev, ...updated };
      setHasUnsavedChanges(true);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Local save error', err);
      }
      return next;
    });
  };

  const handleUpdateSummerHill = (updated: Partial<SummerHillContent>) => {
    setSummerHillContent((prev) => {
      const next = { ...prev, ...updated };
      setHasUnsavedChanges(true);
      try {
        localStorage.setItem(SUMMER_HILL_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Summer hill save error', err);
      }
      return next;
    });
  };

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      localStorage.setItem(SUMMER_HILL_STORAGE_KEY, JSON.stringify(summerHillContent));
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Failed to save', err);
    }
  };

  const handleResetSample = () => {
    if (activePage === 'kuzagali') {
      setContent(INITIAL_PROFILE_CONTENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROFILE_CONTENT));
      } catch (err) {
        console.error('Reset save error', err);
      }
    } else {
      setSummerHillContent(INITIAL_SUMMER_HILL_CONTENT);
      try {
        localStorage.setItem(SUMMER_HILL_STORAGE_KEY, JSON.stringify(INITIAL_SUMMER_HILL_CONTENT));
      } catch (err) {
        console.error('Reset save error', err);
      }
    }
    setHasUnsavedChanges(true);
  };

  const handleClearToBlank = () => {
    if (activePage === 'kuzagali') {
      const blankContent: ProfileContent = {
        tagline: 'Your Custom Location Tagline Here',
        welcomeHeading: 'Kuzagali Location Profile',
        welcomeText: 'Click here to write your introduction, history, or overview of Kuzagali...',
        aboutSection: {
          title: 'About Kuzagali',
          summary: 'Enter your summary of Kuzagali here...',
          paragraphs: [
            'First paragraph: Write about the geography, mountains, or access roads...',
            'Second paragraph: Write about the local community, pine forests, or experiences...',
          ],
          quickFacts: [
            { label: 'Altitude', value: '2,400 m (7,874 ft)' },
            { label: 'Province', value: 'Khyber Pakhtunkhwa' },
            { label: 'District', value: 'Abbottabad' },
            { label: 'Region', value: 'Galiyat' },
            { label: 'Custom Field', value: 'Fill in detail' },
          ],
        },
        highlights: [
          {
            id: 'hl-1',
            title: 'Highlight / Attraction 1',
            category: 'Nature & Trails',
            description: 'Describe this scenic spot, trail, viewpoint, or local feature...',
            imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
            distance: '0.5 km',
            tag: 'Featured',
          },
        ],
        gallery: [
          {
            id: 'gal-1',
            title: 'Photo Title 1',
            caption: 'Add caption for your first photograph...',
            imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
            author: 'Your Name',
          },
        ],
        seasons: [
          {
            id: 'sea-1',
            season: 'Spring (March - May)',
            months: 'March - May',
            temperatureRange: '10°C - 20°C',
            highlights: 'Describe spring weather, flowers, and trail conditions...',
            tips: 'Travel recommendations...',
          },
        ],
        directory: [
          {
            id: 'dir-1',
            name: 'Listing Name',
            category: 'Stay & Hotels',
            description: 'Fill in details about lodging, food, or local services...',
            contact: 'Phone or contact information',
            location: 'Kuzagali',
          },
        ],
        customSections: [
          {
            id: 'cs-1',
            title: 'Blank Custom Section',
            subtitle: 'Click Edit Mode to fill in any text, notices, or guidelines',
            type: 'text',
            content: 'This section is blank and ready for you to fill in your own custom content...',
          },
        ],
      };

      setContent(blankContent);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blankContent));
      } catch (err) {
        console.error('Blank save error', err);
      }
    } else {
      const blankSummerHill: SummerHillContent = {
        tagline: 'Your Custom Project Subtitle',
        projectHeading: 'Summer Hill Project',
        projectSubheading: 'Describe the vision, location, and key concept of the Summer Hill project...',
        overviewSummary: 'Summarize the Summer Hill masterplan, architects, and site acreage...',
        visionParagraphs: [
          'Detail the primary architectural concept, materials, and eco-sustainable ethos...',
          'Detail the community amenities, road access, and private facilities...',
        ],
        projectSpecs: [
          { label: 'Site Area', value: 'Enter acreage' },
          { label: 'Elevation', value: '2,420 m (7,940 ft)' },
          { label: 'Location', value: 'Kuzagali Ridge' },
        ],
        chalets: [
          {
            id: 'ch-1',
            name: 'Sample Chalet Model A',
            type: '3-Bedroom Mountain Villa',
            areaSqFt: 3000,
            bedrooms: 3,
            bathrooms: 3,
            description: 'Describe this chalet archetype, terrace views, and interior layout...',
            features: ['Panoramic terrace', 'Stone fireplace'],
            imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
            status: 'Available',
          },
        ],
        amenities: [
          {
            id: 'am-1',
            title: 'Clubhouse & Spa',
            category: 'Wellness',
            description: 'Describe clubhouse, sauna, pool, or gym amenities...',
            icon: 'HeartPulse',
          },
        ],
        milestones: [
          {
            id: 'ms-1',
            phase: 'Phase 01',
            title: 'Groundwork & Infrastructure',
            timeline: '2025',
            status: 'In Progress',
            description: 'Describe progress on this project phase...',
          },
        ],
        accessibility: [
          { route: 'Islamabad / Rawalpindi', time: '90 mins', distance: '68 km' },
          { route: 'Murree Mall Road', time: '25 mins', distance: '18 km' },
        ],
        developerInfo: {
          name: 'Developer / Project Desk',
          office: 'Kuzagali Site Office',
          phone: '+92 300 0000000',
          email: 'info@summerhill.com',
          brochureUrl: '#',
        },
      };

      setSummerHillContent(blankSummerHill);
      try {
        localStorage.setItem(SUMMER_HILL_STORAGE_KEY, JSON.stringify(blankSummerHill));
      } catch (err) {
        console.error('Blank save error', err);
      }
    }

    setIsEditing(true);
    setHasUnsavedChanges(true);
  };

  const handleExport = () => {
    const exportData = {
      kuzagali: content,
      summerHill: summerHillContent,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kuzagali-summer-hill-data-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = (newContent: any) => {
    if (newContent.kuzagali && newContent.summerHill) {
      setContent(newContent.kuzagali);
      setSummerHillContent(newContent.summerHill);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent.kuzagali));
      localStorage.setItem(SUMMER_HILL_STORAGE_KEY, JSON.stringify(newContent.summerHill));
    } else if (newContent.welcomeHeading !== undefined) {
      setContent(newContent);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } else if (newContent.projectHeading !== undefined) {
      setSummerHillContent(newContent);
      localStorage.setItem(SUMMER_HILL_STORAGE_KEY, JSON.stringify(newContent));
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] flex flex-col selection:bg-[#D44D26] selection:text-[#FFFFFF] font-sans antialiased">
      
      {/* 1. Location Pin on Top */}
      <LocationPinBanner location={KUZAGALI_LOCATION} />

      {/* 2. Weather, Conditions & Air Quality Bar */}
      <WeatherConditionsBar
        weather={weather}
        airQuality={airQuality}
        loading={weatherLoading}
        onRefresh={loadAtmosphericData}
      />

      {/* 3. Fill-in / Edit Mode & Customization Toolbar with Page Navigation */}
      <Toolbar
        activePage={activePage}
        onSelectPage={setActivePage}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onResetSample={handleResetSample}
        onClearToBlank={handleClearToBlank}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {/* Main Website Content */}
      <main className="flex-1">
        {activePage === 'kuzagali' ? (
          <>
            {/* Welcome / Hero */}
            <HeroSection
              content={content}
              isEditing={isEditing}
              onUpdate={handleUpdateContent}
            />

            {/* About & Quick Facts */}
            <AboutSection
              about={content.aboutSection}
              isEditing={isEditing}
              onUpdate={(updatedAbout) => handleUpdateContent({ aboutSection: updatedAbout })}
            />

            {/* Key Highlights & Landmarks */}
            <HighlightsSection
              highlights={content.highlights}
              isEditing={isEditing}
              onUpdate={(updatedHighlights) => handleUpdateContent({ highlights: updatedHighlights })}
            />

            {/* Visual Gallery */}
            <GallerySection
              gallery={content.gallery}
              isEditing={isEditing}
              onUpdate={(updatedGallery) => handleUpdateContent({ gallery: updatedGallery })}
            />

            {/* Four Seasons Climate Guide */}
            <SeasonsSection
              seasons={content.seasons}
              isEditing={isEditing}
              onUpdate={(updatedSeasons) => handleUpdateContent({ seasons: updatedSeasons })}
            />
          </>
        ) : (
          <SummerHillPage
            content={summerHillContent}
            isEditing={isEditing}
            onUpdate={handleUpdateSummerHill}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        location={KUZAGALI_LOCATION}
        activePage={activePage}
        onSelectPage={setActivePage}
      />

    </div>
  );
}

