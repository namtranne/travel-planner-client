export const REQUIRED_CATEGORIES = 5;

export interface CategoryData {
    name: string;
    related: string[];
}

export interface Categories {
    [key: string]: CategoryData;
}

export interface HierarchicalTagSelectorProps {
    onContinue: (selectedTags: string[]) => void;
}

export const initialCategories = [
    'City',
    'Beach',
    'Mountain',
    'Countryside',
    'Desert',
    'Island',
    'Wildlife',
    'HistoricalSites',
    'Budget-Friendly',
    'Luxury Travel',
    'SoloTravel',
    'CoupleGetaways',
    'FamilyTrips',
    'FriendshipJourneys',
    'AccessibilityNeeds',
    'PublicTransport',
    'PrivateTransport'
];

export const categoryData: Categories = {
    City: {
        name: 'City',
        related: ['NightlifeExperience', 'CulturalAttractions', 'ShoppingDistricts', 'GastronomicAdventures']
    },
    NightlifeExperience: {
        name: 'Nightlife Experience',
        related: ['Clubs', 'Bars', 'Rooftop Lounges', 'Live Music', 'Night Markets']
    },
    CulturalAttractions: {
        name: 'Cultural Attractions',
        related: ['Museums', 'Historical Sites', 'Theatres', 'Art Galleries']
    },
    ShoppingDistricts: {
        name: 'Shopping Districts',
        related: ['Luxury Malls', 'Boutique Shops', 'Local Markets', 'Souvenir Stores']
    },
    GastronomicAdventures: {
        name: 'Gastronomic Adventures',
        related: ['Street Food Walks', 'Local Cuisine Tastings', 'Fine Dining Restaurants']
    },
    Beach: {
        name: 'Beach',
        related: ['RelaxationSpots', 'WaterSportsActivities', 'BeachEntertainment', 'BeachfrontDining']
    },
    RelaxationSpots: {
        name: 'Relaxation Spots',
        related: ['Secluded Beaches', 'Spa Resorts', 'Yoga Retreats']
    },
    WaterSportsActivities: {
        name: 'Water Sports Activities',
        related: ['Snorkeling', 'Scuba Diving', 'Jet Skiing', 'Paddleboarding']
    },
    BeachEntertainment: {
        name: 'Beach Entertainment',
        related: ['Beach Parties', 'Fire Shows', 'Live Music on the Sand']
    },
    BeachfrontDining: {
        name: 'Beachfront Dining',
        related: ['Seafood Restaurants', 'Beachside Cafes', 'Tropical Bars']
    },
    Mountain: {
        name: 'Mountain',
        related: ['AdventureOutdoors', 'WinterSports', 'MountainRetreats', 'WildlifeExploration']
    },
    AdventureOutdoors: {
        name: 'Adventure Outdoors',
        related: ['Hiking Trails', 'Rock Climbing', 'Mountain Biking']
    },
    WinterSports: {
        name: 'Winter Sports',
        related: ['Skiing', 'Snowboarding', 'Ice Climbing']
    },
    MountainRetreats: {
        name: 'Mountain Retreats',
        related: ['Cabin Stays', 'Hot Springs', 'Yoga Camps']
    },
    WildlifeExploration: {
        name: 'Wildlife Exploration',
        related: ['Mountain Safari', 'Bird Watching', 'Nature Photography']
    },
    Countryside: {
        name: 'Countryside',
        related: ['NatureTrails', 'FarmLifeExperience', 'LocalCulturalImmersion']
    },
    NatureTrails: {
        name: 'Nature Trails',
        related: ['Forest Trails', 'Scenic Villages', 'Wildflower Fields']
    },
    FarmLifeExperience: {
        name: 'Farm Life Experience',
        related: ['Farm Stays', 'Harvesting Activities', 'Eco-Living Workshops']
    },
    LocalCulturalImmersion: {
        name: 'Local Cultural Immersion',
        related: ['Traditional Crafts', 'Cultural Performances', 'Rural Markets']
    },
    Desert: {
        name: 'Desert',
        related: ['DesertAdventure', 'StargazingExperiences', 'CamelSafariJourneys']
    },
    DesertAdventure: {
        name: 'Desert Adventure',
        related: ['Dune Bashing', 'Sandboarding', 'Quad Biking']
    },
    StargazingExperiences: {
        name: 'Stargazing Experiences',
        related: ['Astronomy Camps', 'Milky Way Photography']
    },
    CamelSafariJourneys: {
        name: 'Camel Safari Journeys',
        related: ['Oasis Visits', 'Traditional Camps', 'Cultural Shows']
    },
    Island: {
        name: 'Island',
        related: ['WaterBasedActivities', 'IslandRelaxation', 'IslandExploration']
    },
    WaterBasedActivities: {
        name: 'Water-Based Activities',
        related: ['Snorkeling', 'Diving', 'Deep-Sea Fishing']
    },
    IslandRelaxation: {
        name: 'Island Relaxation',
        related: ['Private Beaches', 'Luxury Villas', 'Seaside Spas']
    },
    IslandExploration: {
        name: 'Island Exploration',
        related: ['Rainforest Hikes', 'Volcanic Tours', 'Hidden Lagoons']
    },
    HistoricalSites: {
        name: 'Historical Sites',
        related: ['ArchitecturalLandmarks', 'HistoricalGuidedTours', 'PhotographySpots']
    },
    ArchitecturalLandmarks: {
        name: 'Architectural Landmarks',
        related: ['Castles', 'Palaces', 'Ancient Temples']
    },
    HistoricalGuidedTours: {
        name: 'Historical Guided Tours',
        related: ['Guided Tours', 'Interactive History Walks', 'Audio Guides']
    },
    PhotographySpots: {
        name: 'Photography Spots',
        related: ['Landmark Shots', 'Unique Angles', 'Sunrise and Sunset Views']
    },
    Wildlife: {
        name: 'Wildlife',
        related: ['SafariAdventures', 'ConservationExperiences', 'NatureExploration']
    },
    SafariAdventures: {
        name: 'Safari Adventures',
        related: ['Big Five Tours', 'Elephant Rides', 'Jeep Safaris']
    },
    ConservationExperiences: {
        name: 'Conservation Experiences',
        related: ['Volunteer Programs', 'Animal Sanctuaries', 'Wildlife Research']
    },
    NatureExploration: {
        name: 'Nature Exploration',
        related: ['Bird Watching', 'River Safaris', 'Mangrove Tours']
    },
    UserHabits: {
        name: 'User Travel Habits',
        related: [
            'TravelBudget',
            'GroupTravelType',
            'TravelTiming',
            'TransportPreferences',
            'SpecialOccasions',
            'AccessibilityNeeds'
        ]
    },
    TravelBudget: {
        name: 'Travel Budget',
        related: ['Luxury Travel', 'Mid-Range', 'Budget-Friendly', 'Backpacking']
    },
    GroupTravelType: {
        name: 'Group Travel Type',
        related: ['Solo Travel', 'Couple Getaways', 'Family Trips', 'Friends']
    },
    PublicTransport: {
        name: 'Public Transport',
        related: ['Flight Preferences', 'Train Journeys']
    },
    PrivateTransport: {
        name: 'Private Transport',
        related: ['Car Rentals', 'Motorbike']
    },
    AccessibilityNeeds: {
        name: 'Accessibility Needs',
        related: ['Wheelchair Access', 'Child-Friendly Locations', 'Senior-Friendly Activities']
    }
};
