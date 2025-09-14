// Location-based Agricultural Data Service
class LocationService {
  constructor() {
    this.stateData = this.initializeStateData();
    this.districtData = this.initializeDistrictData();
  }

  initializeStateData() {
    return {
      'punjab': {
        climate: { type: 'subtropical', avgTemp: 24, avgRainfall: 496 },
        soilTypes: ['alluvial', 'sandy-loam'],
        majorCrops: ['wheat', 'rice', 'maize', 'cotton', 'sugarcane'],
        irrigation: 'canal-tubewell',
        cropping: 'intensive'
      },
      'haryana': {
        climate: { type: 'subtropical', avgTemp: 25, avgRainfall: 560 },
        soilTypes: ['alluvial', 'sandy'],
        majorCrops: ['wheat', 'rice', 'cotton', 'sugarcane'],
        irrigation: 'canal-tubewell',
        cropping: 'intensive'
      },
      'uttar pradesh': {
        climate: { type: 'subtropical', avgTemp: 26, avgRainfall: 1013 },
        soilTypes: ['alluvial', 'clayey'],
        majorCrops: ['wheat', 'rice', 'sugarcane', 'potato'],
        irrigation: 'canal-tubewell',
        cropping: 'intensive'
      },
      'madhya pradesh': {
        climate: { type: 'tropical', avgTemp: 25, avgRainfall: 1194 },
        soilTypes: ['black', 'red', 'alluvial'],
        majorCrops: ['wheat', 'rice', 'soybean', 'cotton'],
        irrigation: 'mixed',
        cropping: 'extensive'
      },
      'maharashtra': {
        climate: { type: 'tropical', avgTemp: 27, avgRainfall: 1181 },
        soilTypes: ['black', 'red', 'laterite'],
        majorCrops: ['cotton', 'sugarcane', 'soybean', 'wheat'],
        irrigation: 'mixed',
        cropping: 'intensive'
      },
      'karnataka': {
        climate: { type: 'tropical', avgTemp: 26, avgRainfall: 1139 },
        soilTypes: ['red', 'black', 'laterite'],
        majorCrops: ['rice', 'maize', 'cotton', 'sugarcane'],
        irrigation: 'canal-tank',
        cropping: 'mixed'
      },
      'andhra pradesh': {
        climate: { type: 'tropical', avgTemp: 28, avgRainfall: 966 },
        soilTypes: ['red', 'black', 'alluvial'],
        majorCrops: ['rice', 'cotton', 'sugarcane', 'groundnut'],
        irrigation: 'canal-tank',
        cropping: 'intensive'
      },
      'telangana': {
        climate: { type: 'tropical', avgTemp: 27, avgRainfall: 906 },
        soilTypes: ['red', 'black'],
        majorCrops: ['rice', 'cotton', 'maize', 'soybean'],
        irrigation: 'canal-tank',
        cropping: 'mixed'
      },
      'tamil nadu': {
        climate: { type: 'tropical', avgTemp: 29, avgRainfall: 998 },
        soilTypes: ['red', 'black', 'alluvial'],
        majorCrops: ['rice', 'sugarcane', 'cotton', 'groundnut'],
        irrigation: 'tank-well',
        cropping: 'intensive'
      },
      'kerala': {
        climate: { type: 'tropical', avgTemp: 27, avgRainfall: 3055 },
        soilTypes: ['laterite', 'alluvial', 'forest'],
        majorCrops: ['rice', 'coconut', 'rubber', 'spices'],
        irrigation: 'natural',
        cropping: 'plantation'
      },
      'west bengal': {
        climate: { type: 'tropical', avgTemp: 26, avgRainfall: 1582 },
        soilTypes: ['alluvial', 'red', 'laterite'],
        majorCrops: ['rice', 'wheat', 'jute', 'potato'],
        irrigation: 'canal-river',
        cropping: 'intensive'
      },
      'odisha': {
        climate: { type: 'tropical', avgTemp: 27, avgRainfall: 1451 },
        soilTypes: ['red', 'laterite', 'alluvial'],
        majorCrops: ['rice', 'wheat', 'sugarcane', 'cotton'],
        irrigation: 'canal-tank',
        cropping: 'mixed'
      },
      'bihar': {
        climate: { type: 'subtropical', avgTemp: 26, avgRainfall: 1205 },
        soilTypes: ['alluvial', 'clayey'],
        majorCrops: ['rice', 'wheat', 'maize', 'sugarcane'],
        irrigation: 'canal-tubewell',
        cropping: 'intensive'
      },
      'gujarat': {
        climate: { type: 'arid-semiarid', avgTemp: 27, avgRainfall: 803 },
        soilTypes: ['black', 'sandy', 'saline'],
        majorCrops: ['cotton', 'groundnut', 'wheat', 'rice'],
        irrigation: 'canal-well',
        cropping: 'mixed'
      },
      'rajasthan': {
        climate: { type: 'arid-semiarid', avgTemp: 27, avgRainfall: 531 },
        soilTypes: ['sandy', 'red', 'black'],
        majorCrops: ['wheat', 'barley', 'mustard', 'cotton'],
        irrigation: 'canal-well',
        cropping: 'extensive'
      }
    };
  }

  initializeDistrictData() {
    return {
      'ludhiana': { state: 'punjab', specialty: 'wheat-rice', soilHealth: 'good' },
      'amritsar': { state: 'punjab', specialty: 'wheat-rice', soilHealth: 'good' },
      'nashik': { state: 'maharashtra', specialty: 'grapes-onion', soilHealth: 'excellent' },
      'pune': { state: 'maharashtra', specialty: 'sugarcane-cotton', soilHealth: 'good' },
      'bangalore': { state: 'karnataka', specialty: 'vegetables-flowers', soilHealth: 'good' },
      'mysore': { state: 'karnataka', specialty: 'rice-sugarcane', soilHealth: 'excellent' }
    };
  }

  getLocationData(location) {
    const locationLower = location?.toLowerCase();
    
    // Check if it's a state
    if (this.stateData[locationLower]) {
      return {
        type: 'state',
        data: this.stateData[locationLower],
        name: location
      };
    }
    
    // Check if it's a district
    if (this.districtData[locationLower]) {
      const district = this.districtData[locationLower];
      return {
        type: 'district',
        data: {
          ...this.stateData[district.state],
          specialty: district.specialty,
          soilHealth: district.soilHealth
        },
        name: location,
        state: district.state
      };
    }
    
    return null;
  }

  getCropSuitability(location, cropId) {
    const locationData = this.getLocationData(location);
    if (!locationData) return null;
    
    const suitabilityScore = locationData.data.majorCrops.includes(cropId) ? 
      (locationData.data.majorCrops.indexOf(cropId) === 0 ? 95 : 85) : 60;
    
    return {
      score: suitabilityScore,
      climate: locationData.data.climate,
      soilTypes: locationData.data.soilTypes,
      irrigation: locationData.data.irrigation
    };
  }

  getSeasonalRecommendations(location, season) {
    const locationData = this.getLocationData(location);
    if (!locationData) return [];
    
    const seasonalCrops = {
      'kharif': ['rice', 'maize', 'cotton', 'sugarcane', 'soybean'],
      'rabi': ['wheat', 'mustard', 'gram', 'pea', 'barley'],
      'zaid': ['maize', 'fodder', 'vegetables']
    };
    
    const availableCrops = seasonalCrops[season?.toLowerCase()] || [];
    return availableCrops.filter(crop => 
      locationData.data.majorCrops.includes(crop)
    );
  }
}

const locationService = new LocationService();
export default locationService;
