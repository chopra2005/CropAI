// Comprehensive Crop Database with Real Agricultural Data
class CropDatabase {
  constructor() {
    this.crops = this.initializeCropData();
    this.regions = this.initializeRegionalData();
    this.soilTypes = this.initializeSoilData();
  }

  initializeCropData() {
    return {
      // CEREALS
      wheat: {
        id: 'wheat',
        name: { hi: 'गेहूं', en: 'Wheat', mr: 'गहू', gu: 'ઘઉં' },
        category: 'cereal',
        season: ['rabi', 'winter'],
        duration: { min: 120, max: 150 },
        
        climate: {
          temperature: { min: 15, max: 25, optimal: 20 },
          rainfall: { min: 300, max: 750, optimal: 500 },
          humidity: { min: 50, max: 70 },
          sunlight: 'full'
        },
        
        soil: {
          types: ['loamy', 'clay', 'alluvial'],
          ph: { min: 6.0, max: 7.5, optimal: 6.5 },
          drainage: 'well-drained',
          depth: 'deep'
        },
        
        cultivation: {
          sowingTime: { start: 'Nov', end: 'Dec' },
          harvestTime: { start: 'Apr', end: 'May' },
          seedRate: '100-125 kg/ha',
          spacing: '20-25 cm rows',
          depth: '3-5 cm'
        },
        
        yield: { min: 25, max: 45, average: 35, unit: 'quintals/hectare' },
        
        economics: {
          investment: { min: 15000, max: 25000, currency: 'INR/hectare' },
          marketPrice: { min: 2200, max: 2800, currency: 'INR/quintal' },
          profitability: 'high'
        },
        
        regions: {
          suitable: ['punjab', 'haryana', 'up', 'mp', 'rajasthan', 'bihar'],
          optimal: ['punjab', 'haryana', 'up']
        },
        
        care: {
          irrigation: ['21 days', '42 days', '65 days', '85 days'],
          fertilizer: {
            basal: 'NPK 120:60:40',
            topdressing: 'Urea at tillering and grain filling'
          },
          pestManagement: ['Aphids', 'Termites', 'Rust disease'],
          weedControl: '2-3 weedings required'
        }
      },

      maize: {
        id: 'maize',
        name: { hi: 'मक्का', en: 'Maize', mr: 'मका', gu: 'મકાઈ' },
        category: 'cereal',
        season: ['kharif', 'summer', 'rabi'],
        duration: { min: 90, max: 120 },
        
        climate: {
          temperature: { min: 20, max: 35, optimal: 28 },
          rainfall: { min: 500, max: 1200, optimal: 750 },
          humidity: { min: 60, max: 80 },
          sunlight: 'full'
        },
        
        soil: {
          types: ['loamy', 'alluvial', 'red', 'black'],
          ph: { min: 5.8, max: 7.8, optimal: 6.5 },
          drainage: 'well-drained',
          depth: 'deep'
        },
        
        cultivation: {
          sowingTime: { start: 'Jun', end: 'Jul' },
          harvestTime: { start: 'Sep', end: 'Nov' },
          seedRate: '20-25 kg/ha',
          spacing: '60x20 cm',
          depth: '3-4 cm'
        },
        
        yield: { min: 40, max: 80, average: 60, unit: 'quintals/hectare' },
        
        economics: {
          investment: { min: 20000, max: 35000, currency: 'INR/hectare' },
          marketPrice: { min: 1800, max: 2400, currency: 'INR/quintal' },
          profitability: 'high'
        },
        
        regions: {
          suitable: ['karnataka', 'ap', 'telangana', 'maharashtra', 'mp', 'bihar', 'up'],
          optimal: ['karnataka', 'ap', 'maharashtra']
        },
        
        care: {
          irrigation: ['15 days', '30 days', '45 days', '60 days'],
          fertilizer: {
            basal: 'NPK 150:75:40',
            topdressing: 'Urea at knee-high and tasseling'
          },
          pestManagement: ['Stem borer', 'Fall armyworm', 'Blight'],
          weedControl: 'Pre and post-emergence herbicides'
        }
      },

      rice: {
        id: 'rice',
        name: { hi: 'धान', en: 'Rice', mr: 'भात', gu: 'ચોખા' },
        category: 'cereal',
        season: ['kharif', 'monsoon'],
        duration: { min: 120, max: 160 },
        
        climate: {
          temperature: { min: 22, max: 32, optimal: 27 },
          rainfall: { min: 1000, max: 2500, optimal: 1500 },
          humidity: { min: 70, max: 90 },
          sunlight: 'full'
        },
        
        soil: {
          types: ['clay', 'clayey-loam', 'alluvial'],
          ph: { min: 5.5, max: 7.0, optimal: 6.0 },
          drainage: 'poor-drainage-preferred',
          depth: 'medium-to-deep'
        },
        
        cultivation: {
          sowingTime: { start: 'Jun', end: 'Jul' },
          harvestTime: { start: 'Oct', end: 'Dec' },
          seedRate: '20-25 kg/ha',
          spacing: '20x15 cm',
          depth: '2-3 cm'
        },
        
        yield: { min: 35, max: 70, average: 50, unit: 'quintals/hectare' },
        
        economics: {
          investment: { min: 18000, max: 28000, currency: 'INR/hectare' },
          marketPrice: { min: 1900, max: 2500, currency: 'INR/quintal' },
          profitability: 'medium'
        },
        
        regions: {
          suitable: ['wb', 'odisha', 'ap', 'telangana', 'tn', 'kerala', 'assam', 'bihar'],
          optimal: ['wb', 'odisha', 'ap', 'tn']
        },
        
        care: {
          irrigation: ['continuous-flooding', 'maintain-2-5cm-water'],
          fertilizer: {
            basal: 'NPK 100:50:50',
            topdressing: 'Urea at tillering and panicle initiation'
          },
          pestManagement: ['Brown planthopper', 'Blast', 'Bacterial blight'],
          weedControl: 'Manual weeding and herbicides'
        }
      }
    };
  }

  initializeRegionalData() {
    return {
      punjab: {
        climate: { temp: [5, 45], rainfall: [400, 700], type: 'semi-arid' },
        soils: ['alluvial', 'loamy'],
        majorCrops: ['wheat', 'rice', 'maize', 'cotton'],
        irrigation: 'canal-tubewell'
      },
      maharashtra: {
        climate: { temp: [12, 40], rainfall: [400, 3000], type: 'tropical' },
        soils: ['black', 'red', 'alluvial'],
        majorCrops: ['cotton', 'sugarcane', 'soybean', 'wheat'],
        irrigation: 'mixed'
      },
      karnataka: {
        climate: { temp: [15, 35], rainfall: [500, 2500], type: 'tropical' },
        soils: ['red', 'black', 'laterite'],
        majorCrops: ['rice', 'maize', 'cotton', 'sugarcane'],
        irrigation: 'canal-tank'
      }
    };
  }

  initializeSoilData() {
    return {
      alluvial: {
        characteristics: 'fertile, well-drained, rich in potash',
        suitableCrops: ['wheat', 'rice', 'maize', 'sugarcane'],
        ph: [6.0, 7.5],
        fertility: 'high'
      },
      black: {
        characteristics: 'moisture-retentive, rich in lime and iron',
        suitableCrops: ['cotton', 'wheat', 'jowar', 'tur'],
        ph: [7.0, 8.5],
        fertility: 'high'
      },
      red: {
        characteristics: 'well-drained, rich in iron oxide',
        suitableCrops: ['rice', 'wheat', 'cotton', 'pulses'],
        ph: [5.5, 7.0],
        fertility: 'medium'
      }
    };
  }

  // Get crop recommendations based on multiple parameters
  getRecommendations(params) {
    const { location, season, soilType, temperature } = params;
    
    let recommendations = [];
    
    Object.values(this.crops).forEach(crop => {
      let score = 0;
      let reasons = [];
      
      // Season matching (40 points)
      if (crop.season.includes(season?.toLowerCase())) {
        score += 40;
        reasons.push(`Perfect for ${season} season`);
      }
      
      // Climate suitability (30 points)
      if (temperature >= crop.climate.temperature.min && temperature <= crop.climate.temperature.max) {
        score += 20;
        if (Math.abs(temperature - crop.climate.temperature.optimal) <= 3) {
          score += 10;
          reasons.push('Optimal temperature conditions');
        }
      }
      
      // Soil compatibility (20 points)
      if (crop.soil.types.includes(soilType?.toLowerCase())) {
        score += 20;
        reasons.push(`Suitable for ${soilType} soil`);
      }
      
      // Regional suitability (10 points)
      if (location && crop.regions.suitable.includes(location.toLowerCase())) {
        score += 5;
        if (crop.regions.optimal.includes(location.toLowerCase())) {
          score += 5;
          reasons.push('Optimal region for cultivation');
        }
      }
      
      if (score >= 30) { // Minimum threshold
        recommendations.push({
          ...crop,
          matchScore: score,
          reasons: reasons,
          suitabilityLevel: score >= 70 ? 'Excellent' : score >= 50 ? 'Good' : 'Fair'
        });
      }
    });
    
    return recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
  }

  // Get detailed crop information
  getCropDetails(cropId) {
    return this.crops[cropId] || null;
  }

  // Get crops by category
  getCropsByCategory(category) {
    return Object.values(this.crops).filter(crop => crop.category === category);
  }

  // Get regional crop data
  getRegionalCrops(region) {
    const regionData = this.regions[region?.toLowerCase()];
    if (!regionData) return [];
    
    return regionData.majorCrops.map(cropId => this.crops[cropId]).filter(Boolean);
  }
}

const cropDatabase = new CropDatabase();
export default cropDatabase;
