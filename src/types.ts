export interface LocationInfo {
  name: string;
  alternateNames: string[];
  district: string;
  region: string;
  province: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  elevation: {
    meters: number;
    feet: number;
  };
  postalCode?: string;
  timezone: string;
}

export interface WeatherCondition {
  temp: number; // Celsius
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  conditionCode: number;
  conditionText: string;
  conditionIcon: string;
  humidity: number; // %
  windSpeed: number; // km/h
  windDirection: string;
  windDirectionDegrees: number;
  pressure: number; // hPa
  uvIndex: number;
  visibility: number; // km
  cloudCover: number; // %
  dewPoint: number;
  precipitationProbability: number;
  sunrise: string;
  sunset: string;
  lastUpdated: string;
  hourly: {
    time: string;
    temp: number;
    conditionText: string;
    icon: string;
    precipitationProb: number;
  }[];
  daily: {
    day: string;
    date: string;
    tempMax: number;
    tempMin: number;
    conditionText: string;
    icon: string;
  }[];
}

export interface AirQualityData {
  aqi: number; // US AQI scale or European EAQI
  status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  color: string;
  pm2_5: number; // ug/m3
  pm10: number; // ug/m3
  ozone: number; // ug/m3
  nitrogenDioxide: number; // ug/m3
  carbonMonoxide?: number;
  advice: string;
  lastUpdated: string;
}

export interface HighlightCard {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  distance?: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  author?: string;
}

export interface SeasonGuide {
  id: string;
  season: string;
  months: string;
  temperatureRange: string;
  highlights: string;
  tips: string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  category: 'Stay & Hotels' | 'Dining & Cafes' | 'Transport & Roads' | 'Trails & Nature' | 'Emergency & Health' | 'General';
  description: string;
  contact?: string;
  location?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  subtitle?: string;
  type: 'text' | 'cards' | 'list';
  content: string;
  items?: { id: string; title: string; text: string; tag?: string }[];
}

export interface SummerHillChalet {
  id: string;
  name: string;
  type: string;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  imageUrl: string;
  status: 'Available' | 'Reserved' | 'Phase II';
}

export interface ProjectMilestone {
  id: string;
  phase: string;
  title: string;
  timeline: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  description: string;
}

export interface TownPlot {
  id: string;
  plotNumber: string;
  plotSize: string; // e.g. "600 Sq. Yds. (~5,400 Sq. Ft.)"
  houseModel: string; // e.g. "The Deodar Grand Villa", "Pine Ridge Lodge", "Mistwood Chalet"
  houseSize: string; // e.g. "3,800 Sq. Ft. Built-up"
  bedrooms: number;
  bathrooms: number;
  facing: string; // e.g. "North-East Valley View"
  status: 'Available' | 'Reserved' | 'Sold';
  zone: string; // e.g. "Upper Ridge Loop", "Orchard Crescent", "Pine Glade Trail"
  features: string[];
  price?: string;
  x?: number; // X coordinate % for map
  y?: number; // Y coordinate % for map
}

export interface TownPlanData {
  title: string;
  subtitle: string;
  overview: string;
  plotSizeStandard: string;
  totalPlots: number;
  availablePlots: number;
  reservedPlots: number;
  soldPlots: number;
  mapImageUrl?: string;
  plots: TownPlot[];
}

export interface SummerHillContent {
  tagline: string;
  projectHeading: string;
  projectSubheading: string;
  overviewSummary: string;
  visionParagraphs: string[];
  projectSpecs: { label: string; value: string }[];
  townPlan?: TownPlanData;
  chalets: SummerHillChalet[];
  amenities: { id: string; title: string; category: string; description: string; icon: string }[];
  milestones: ProjectMilestone[];
  accessibility: { route: string; time: string; distance: string }[];
  developerInfo: {
    name: string;
    office: string;
    phone: string;
    email: string;
    brochureUrl?: string;
  };
}

export interface ProfileContent {
  tagline: string;
  welcomeHeading: string;
  welcomeText: string;
  aboutSection: {
    title: string;
    summary: string;
    paragraphs: string[];
    quickFacts: { label: string; value: string }[];
  };
  highlights: HighlightCard[];
  gallery: GalleryItem[];
  seasons: SeasonGuide[];
  directory: DirectoryItem[];
  customSections: CustomSection[];
}

