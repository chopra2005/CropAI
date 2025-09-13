// AI Service for Crop Recommendations using Gemini API
import { GoogleGenerativeAI } from '@google/generative-ai';
import weatherService from './weatherService';
import cropDatabase from './cropDatabase';
import locationService from './locationService';
import marketDataService from './marketDataService';

class AIService {
  constructor() {
    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    this.genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  async getCropRecommendation(farmData) {
    try {
      // Get comprehensive data for intelligent recommendations
      let weatherData = null;
      let locationData = null;
      let marketData = {};

      if (farmData.location) {
        weatherData = await weatherService.getLocationWeather(farmData.location);
        locationData = locationService.getLocationData(farmData.location);
      }

      // Use the comprehensive crop database for intelligent matching
      const recommendations = cropDatabase.getRecommendations({
        location: farmData.location,
        season: farmData.season,
        soilType: farmData.soilType,
        rainfall: weatherData?.humidity || 60,
        temperature: weatherData?.temperature || 25,
        farmSize: parseFloat(farmData.farmSize) || 1,
        budget: farmData.budget
      });

      // Enhance recommendations with market data and profitability
      const enhancedRecommendations = await Promise.all(
        recommendations.map(async (crop) => {
          const marketInfo = marketDataService.getCurrentPrice(crop.id, farmData.location);
          const profitability = marketDataService.getProfitabilityAnalysis(
            crop.id, 
            farmData.location, 
            parseFloat(farmData.farmSize) || 1,
            parseFloat(farmData.budget) || 25000
          );

          return {
            cropName: crop.name.hi || crop.name.en,
            cropNameEn: crop.name.en,
            reason: crop.reasons.join(', '),
            yield: `${crop.yield.min}-${crop.yield.max} ${crop.yield.unit}`,
            investment: `₹${crop.economics.investment.min}-${crop.economics.investment.max}/हेक्टेयर`,
            marketPrice: marketInfo ? `₹${marketInfo.min}-${marketInfo.max}/${marketInfo.unit.split('/')[1]}` : 'N/A',
            careInstructions: crop.care.irrigation || [],
            riskFactors: Object.values(crop.care.pestManagement || []),
            profitability: crop.economics.profitability,
            matchScore: crop.matchScore,
            suitabilityLevel: crop.suitabilityLevel,
            season: Array.isArray(crop.season) ? crop.season[0] : crop.season,
            duration: `${crop.duration.min}-${crop.duration.max} दिन`,
            waterRequirement: this.getWaterRequirementText(crop.climate.rainfall),
            soilTypes: crop.soil.types,
            marketTrend: profitability?.recommendations || [],
            expectedROI: profitability?.analysis?.roi || 'N/A'
          };
        })
      );

      return {
        recommendations: enhancedRecommendations,
        aiConfidence: Math.min(95, 70 + (enhancedRecommendations[0]?.matchScore || 0) / 4),
        lastUpdated: new Date().toISOString(),
        weatherAlert: weatherData ? `तापमान: ${weatherData.temperature}°C, आर्द्रता: ${weatherData.humidity}%` : 'मौसम डेटा उपलब्ध नहीं',
        farmingAdvice: weatherData ? weatherService.getFarmingRecommendations(weatherData, 'hindi') : [],
        marketTrend: 'बाजार की कीमतें स्थिर हैं',
        weatherData: weatherData,
        locationData: locationData,
        totalCropsAnalyzed: Object.keys(cropDatabase.crops).length
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getFallbackRecommendation(farmData);
    }
  }

  buildCropPrompt(farmData, weatherData) {
    const weatherInfo = weatherData ? `
      Current Weather:
      Temperature: ${weatherData.temperature}°C
      Humidity: ${weatherData.humidity}%
      Weather: ${weatherData.description}
      Location: ${weatherData.location}
    ` : '';

    return `
      As an agricultural AI expert, provide crop recommendations based on the following farm data:
      
      Location: ${farmData.location}
      Soil Type: ${farmData.soilType}
      Farm Size: ${farmData.farmSize}
      Season: ${farmData.season}
      Water Availability: ${farmData.waterAvailability}
      Budget: ${farmData.budget}
      Previous Crop: ${farmData.previousCrop || 'None'}
      ${weatherInfo}
      
      Please provide:
      1. Top 3 recommended crops with reasons (consider current weather conditions)
      2. Expected yield per acre
      3. Investment required
      4. Market price estimates
      5. Care instructions
      6. Risk factors
      
      Format the response as JSON with the following structure:
      {
        "recommendations": [
          {
            "cropName": "crop name",
            "reason": "why this crop",
            "yield": "expected yield",
            "investment": "investment needed",
            "marketPrice": "current market price",
            "careInstructions": ["instruction1", "instruction2"],
            "riskFactors": ["risk1", "risk2"],
            "profitability": "high/medium/low"
          }
        ]
      }
    `;
  }

  parseAIResponse(text) {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid AI response format');
    } catch (error) {
      return this.getDemoRecommendation();
    }
  }

  getWaterRequirementText(rainfall) {
    if (rainfall.min > 1000) return 'उच्च';
    if (rainfall.min > 500) return 'मध्यम';
    return 'कम';
  }

  getFallbackRecommendation(farmData = {}) {
    // Fallback using basic crop database
    const basicRecommendations = [
      {
        cropName: 'गेहूं (Wheat)',
        reason: 'रबी सीजन के लिए उत्तम',
        yield: '25-35 क्विंटल/हेक्टेयर',
        investment: '₹15,000-20,000/हेक्टेयर',
        marketPrice: '₹2,200-2,500/क्विंटल',
        careInstructions: ['नियमित सिंचाई', 'उर्वरक प्रबंधन'],
        riskFactors: ['रस्ट रोग', 'मौसम निर्भरता'],
        profitability: 'high',
        matchScore: 85
      }
    ];

    return {
      recommendations: basicRecommendations,
      aiConfidence: 75,
      lastUpdated: new Date().toISOString(),
      weatherAlert: 'मौसम डेटा उपलब्ध नहीं',
      farmingAdvice: ['सामान्य कृषि सलाह'],
      marketTrend: 'स्थिर'
    };
  }

  getDemoRecommendation(farmData = {}, weatherData = null) {
    // Legacy method - now redirects to new system
    return this.getFallbackRecommendation(farmData);
  }

  // Legacy crop database for backward compatibility
  getLegacyCropDatabase() {
    return {
      // Rabi crops (Winter season)
      wheat: {
        cropName: 'गेहूं (Wheat)',
        reason: 'रबी सीजन के लिए उत्तम, अच्छी मिट्टी और जलवायु के अनुकूल',
        yield: '25-30 क्विंटल प्रति एकड़',
        investment: '₹15,000-20,000 प्रति एकड़',
        marketPrice: '₹2,200-2,500 प्रति क्विंटल',
        careInstructions: [
          'बुवाई नवंबर-दिसंबर में करें',
          'नियमित सिंचाई 15-20 दिन के अंतराल पर',
          'यूरिया और DAP का संतुलित उपयोग',
          'कीट-रोग की नियमित जांच'
        ],
        riskFactors: [
          'अत्यधिक बारिश से नुकसान',
          'रस्ट रोग का खतरा',
          'बाजार मूल्य में उतार-चढ़ाव'
        ],
        profitability: 'high',
        season: ['रबी', 'winter'],
        soilTypes: ['दोमट', 'loamy', 'clay'],
        waterRequirement: 'medium',
        budgetRange: 'medium'
      },
      mustard: {
        cropName: 'सरसों (Mustard)',
        reason: 'कम पानी में अच्छी उपज, तेल की बढ़ती मांग',
        yield: '8-12 क्विंटल प्रति एकड़',
        investment: '₹8,000-12,000 प्रति एकड़',
        marketPrice: '₹5,500-6,500 प्रति क्विंटल',
        careInstructions: [
          'अक्टूबर-नवंबर में बुवाई',
          'कम पानी की आवश्यकता',
          'जैविक खाद का उपयोग करें',
          'फूल आने पर विशेष देखभाल'
        ],
        riskFactors: [
          'माहू कीट का प्रकोप',
          'तेज हवा से नुकसान',
          'बाजार में मूल्य की अस्थिरता'
        ],
        profitability: 'high',
        season: ['रबी', 'winter'],
        soilTypes: ['दोमट', 'loamy', 'sandy'],
        waterRequirement: 'low',
        budgetRange: 'low'
      },
      // Kharif crops (Summer/Monsoon season)
      maize: {
        cropName: 'मक्का (Maize)',
        reason: 'खरीफ सीजन के लिए उत्तम, अच्छी बारिश में फलती है',
        yield: '40-60 क्विंटल प्रति एकड़',
        investment: '₹20,000-25,000 प्रति एकड़',
        marketPrice: '₹1,800-2,200 प्रति क्विंटल',
        careInstructions: [
          'जून-जुलाई में बुवाई करें',
          'नियमित सिंचाई आवश्यक',
          'हाइब्रिड बीजों का उपयोग करें',
          'खरपतवार नियंत्रण जरूरी'
        ],
        riskFactors: [
          'तना छेदक कीट का खतरा',
          'अधिक बारिश से जल भराव',
          'बाजार में मूल्य की अस्थिरता'
        ],
        profitability: 'high',
        season: ['खरीफ', 'summer', 'monsoon'],
        soilTypes: ['दोमट', 'loamy', 'alluvial'],
        waterRequirement: 'high',
        budgetRange: 'medium'
      },
      rice: {
        cropName: 'धान (Rice)',
        reason: 'मानसून में उत्तम, पानी की अधिक उपलब्धता में सर्वोत्तम',
        yield: '35-50 क्विंटल प्रति एकड़',
        investment: '₹18,000-22,000 प्रति एकड़',
        marketPrice: '₹1,900-2,300 प्रति क्विंटल',
        careInstructions: [
          'जून में नर्सरी तैयार करें',
          'जुलाई में रोपाई करें',
          'खेत में पानी भरा रखें',
          'नाइट्रोजन की मात्रा संतुलित रखें'
        ],
        riskFactors: [
          'ब्लास्ट रोग का खतरा',
          'पानी की कमी से नुकसान',
          'चावल की कीमतों में गिरावट'
        ],
        profitability: 'medium',
        season: ['खरीफ', 'monsoon'],
        soilTypes: ['clay', 'चिकनी', 'alluvial'],
        waterRequirement: 'very_high',
        budgetRange: 'medium'
      },
      cotton: {
        cropName: 'कपास (Cotton)',
        reason: 'नकदी फसल, अच्छी कीमत मिलती है',
        yield: '8-15 क्विंटल प्रति एकड़',
        investment: '₹25,000-35,000 प्रति एकड़',
        marketPrice: '₹5,500-7,000 प्रति क्विंटल',
        careInstructions: [
          'मई-जून में बुवाई करें',
          'नियमित कीट नियंत्रण करें',
          'BT कॉटन का उपयोग करें',
          'समय पर तुड़ाई करें'
        ],
        riskFactors: [
          'बॉलवर्म का प्रकोप',
          'मौसम पर निर्भरता',
          'बाजार की अनिश्चितता'
        ],
        profitability: 'high',
        season: ['खरीफ', 'summer'],
        soilTypes: ['black', 'काली', 'cotton_soil'],
        waterRequirement: 'medium',
        budgetRange: 'high'
      }
    };

    // This method is now deprecated - using comprehensive crop database
    return this.getFallbackRecommendation({});
  }

  async getWeatherBasedAdvice(location) {
    try {
      const weatherData = await weatherService.getLocationWeather(location);
      const forecast = await weatherService.getWeatherForecast(
        weatherData.coordinates?.lat || 0, 
        weatherData.coordinates?.lon || 0
      );
      
      return {
        currentWeather: `${weatherData.description}, तापमान ${weatherData.temperature}°C`,
        forecast: `आने वाले दिनों में ${forecast[0]?.description || 'सामान्य मौसम'}`,
        farmingAdvice: weatherService.getFarmingRecommendations(weatherData, 'hindi'),
        weatherData,
        forecast: forecast.slice(0, 3)
      };
    } catch (error) {
      return {
        currentWeather: 'साफ मौसम, तापमान 22°C',
        forecast: '3 दिन बाद हल्की बारिश की संभावना',
        farmingAdvice: [
          'अगले 2 दिन सिंचाई के लिए उपयुक्त',
          'बारिश से पहले कटाई पूरी करें',
          'खाद डालने का अच्छा समय'
        ]
      };
    }
  }

  async getCropCareAdvice(cropName, stage) {
    const careAdvice = {
      'गेहूं': {
        'बुवाई': ['मिट्टी की जांच कराएं', 'बीज उपचार करें', 'उचित दूरी रखें'],
        'वृद्धि': ['नियमित सिंचाई', 'खरपतवार नियंत्रण', 'उर्वरक डालें'],
        'फूल': ['पानी की कमी न होने दें', 'कीट-रोग की जांच', 'स्प्रे करें'],
        'पकना': ['सिंचाई बंद करें', 'कटाई की तैयारी', 'मंडी भाव देखें']
      },
      'मक्का': {
        'बुवाई': ['हाइब्रिड बीज चुनें', 'मिट्टी तैयार करें', 'उचित गहराई पर बोएं'],
        'वृद्धि': ['नियमित निराई-गुड़ाई', 'नाइट्रोजन दें', 'पानी की व्यवस्था करें'],
        'फूल': ['पर्याप्त पानी दें', 'तना छेदक से बचाव', 'पोषक तत्व दें'],
        'पकना': ['भुट्टे की जांच करें', 'सही समय पर तोड़ें', 'भंडारण की व्यवस्था करें']
      },
      'धान': {
        'बुवाई': ['नर्सरी तैयार करें', 'बीज उपचार करें', 'खेत में पानी भरें'],
        'वृद्धि': ['खरपतवार नियंत्रण', 'पानी का स्तर बनाए रखें', 'यूरिया डालें'],
        'फूल': ['पानी की कमी न होने दें', 'ब्लास्ट रोग से बचाव', 'पोटाश दें'],
        'पकना': ['पानी सुखाएं', 'कटाई की तैयारी', 'दाने की जांच करें']
      }
    };

    return careAdvice[cropName]?.[stage] || ['सामान्य देखभाल करें'];
  }
}

export default new AIService();
