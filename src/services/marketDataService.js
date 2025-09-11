// Market Data and Price Analysis Service
class MarketDataService {
  constructor() {
    this.priceData = this.initializePriceData();
    this.marketTrends = this.initializeMarketTrends();
  }

  initializePriceData() {
    return {
      wheat: {
        currentPrice: { min: 2200, max: 2800, average: 2500, unit: 'INR/quintal' },
        monthlyTrend: [2300, 2400, 2450, 2500, 2550, 2600],
        seasonalPattern: {
          'harvest': { months: ['Apr', 'May'], priceChange: -15 },
          'sowing': { months: ['Nov', 'Dec'], priceChange: +10 },
          'growing': { months: ['Jan', 'Feb', 'Mar'], priceChange: +5 }
        },
        demandFactors: ['government-procurement', 'export-demand', 'flour-mills'],
        qualityPremium: { protein: 5, moisture: -3, foreign_matter: -8 }
      },
      
      maize: {
        currentPrice: { min: 1800, max: 2400, average: 2100, unit: 'INR/quintal' },
        monthlyTrend: [1900, 2000, 2050, 2100, 2150, 2200],
        seasonalPattern: {
          'harvest': { months: ['Oct', 'Nov'], priceChange: -20 },
          'sowing': { months: ['Jun', 'Jul'], priceChange: +15 },
          'lean': { months: ['Aug', 'Sep'], priceChange: +25 }
        },
        demandFactors: ['poultry-feed', 'starch-industry', 'ethanol-production'],
        qualityPremium: { moisture: -5, broken: -10, aflatoxin: -15 }
      },
      
      rice: {
        currentPrice: { min: 1900, max: 2500, average: 2200, unit: 'INR/quintal' },
        monthlyTrend: [2000, 2100, 2150, 2200, 2250, 2300],
        seasonalPattern: {
          'harvest': { months: ['Nov', 'Dec'], priceChange: -18 },
          'sowing': { months: ['Jun', 'Jul'], priceChange: +12 },
          'festival': { months: ['Sep', 'Oct'], priceChange: +20 }
        },
        demandFactors: ['msp-procurement', 'export-policy', 'consumer-demand'],
        qualityPremium: { length: 8, broken: -12, chalky: -6 }
      },
      
      cotton: {
        currentPrice: { min: 5500, max: 7500, average: 6500, unit: 'INR/quintal' },
        monthlyTrend: [6000, 6200, 6400, 6500, 6600, 6800],
        seasonalPattern: {
          'harvest': { months: ['Oct', 'Nov', 'Dec'], priceChange: -25 },
          'sowing': { months: ['May', 'Jun'], priceChange: +20 },
          'peak': { months: ['Aug', 'Sep'], priceChange: +30 }
        },
        demandFactors: ['textile-industry', 'export-demand', 'global-prices'],
        qualityPremium: { staple_length: 12, micronaire: 8, strength: 6 }
      },
      
      mustard: {
        currentPrice: { min: 5200, max: 6800, average: 6000, unit: 'INR/quintal' },
        monthlyTrend: [5500, 5700, 5900, 6000, 6100, 6300],
        seasonalPattern: {
          'harvest': { months: ['Mar', 'Apr'], priceChange: -22 },
          'sowing': { months: ['Oct', 'Nov'], priceChange: +18 },
          'oil_season': { months: ['Dec', 'Jan'], priceChange: +25 }
        },
        demandFactors: ['oil-extraction', 'export-demand', 'crushing-industry'],
        qualityPremium: { oil_content: 15, moisture: -8, admixture: -10 }
      }
    };
  }

  initializeMarketTrends() {
    return {
      global: {
        wheat: { trend: 'stable', factors: ['ukraine-crisis', 'climate-change'] },
        maize: { trend: 'rising', factors: ['biofuel-demand', 'feed-demand'] },
        rice: { trend: 'volatile', factors: ['export-restrictions', 'weather'] },
        cotton: { trend: 'declining', factors: ['synthetic-competition', 'trade-war'] }
      },
      
      domestic: {
        wheat: { trend: 'stable', factors: ['msp-increase', 'buffer-stock'] },
        maize: { trend: 'rising', factors: ['ethanol-blending', 'poultry-growth'] },
        rice: { trend: 'stable', factors: ['pds-offtake', 'export-ban'] },
        cotton: { trend: 'volatile', factors: ['monsoon-dependency', 'pest-issues'] }
      }
    };
  }

  getCurrentPrice(cropId, location = null) {
    const crop = this.priceData[cropId];
    if (!crop) return null;

    // Location-based price adjustment
    const locationMultiplier = this.getLocationPriceMultiplier(location);
    
    return {
      ...crop.currentPrice,
      average: Math.round(crop.currentPrice.average * locationMultiplier),
      min: Math.round(crop.currentPrice.min * locationMultiplier),
      max: Math.round(crop.currentPrice.max * locationMultiplier),
      location: location,
      lastUpdated: new Date().toISOString()
    };
  }

  getLocationPriceMultiplier(location) {
    const multipliers = {
      'punjab': 1.05,      // Higher due to quality
      'haryana': 1.03,     // Good market access
      'uttar pradesh': 0.98, // Large supply
      'madhya pradesh': 0.95, // Transportation costs
      'maharashtra': 1.02,  // Industrial demand
      'karnataka': 1.00,    // Balanced
      'andhra pradesh': 0.97, // Surplus region
      'telangana': 0.98,    // Good infrastructure
      'tamil nadu': 1.01,   // Port access
      'west bengal': 0.96,  // Quality issues
      'bihar': 0.94,        // Poor infrastructure
      'odisha': 0.95,       // Limited market access
      'gujarat': 1.04,      // Industrial demand
      'rajasthan': 0.97     // Quality variations
    };
    
    return multipliers[location?.toLowerCase()] || 1.00;
  }

  getProfitabilityAnalysis(cropId, location, farmSize, investment) {
    const priceData = this.getCurrentPrice(cropId, location);
    if (!priceData) return null;

    // Get crop yield data (assuming integration with crop database)
    const yieldData = this.getExpectedYield(cropId, location);
    
    const grossIncome = (yieldData.average * farmSize * priceData.average) / 100;
    const totalInvestment = investment || (farmSize * 25000); // Default investment
    const netProfit = grossIncome - totalInvestment;
    const profitMargin = (netProfit / grossIncome) * 100;
    
    return {
      cropId,
      location,
      farmSize,
      analysis: {
        grossIncome: Math.round(grossIncome),
        totalInvestment: Math.round(totalInvestment),
        netProfit: Math.round(netProfit),
        profitMargin: Math.round(profitMargin * 100) / 100,
        roi: Math.round((netProfit / totalInvestment) * 100 * 100) / 100,
        breakeven: Math.round(totalInvestment / (yieldData.average * farmSize / 100))
      },
      risks: this.getRiskFactors(cropId),
      recommendations: this.getMarketRecommendations(cropId, profitMargin)
    };
  }

  getExpectedYield(cropId, location) {
    // Simplified yield data - should integrate with crop database
    const baseYields = {
      wheat: { min: 25, max: 45, average: 35 },
      maize: { min: 40, max: 80, average: 60 },
      rice: { min: 35, max: 70, average: 50 },
      cotton: { min: 8, max: 20, average: 14 },
      mustard: { min: 8, max: 15, average: 12 }
    };
    
    return baseYields[cropId] || { min: 20, max: 40, average: 30 };
  }

  getRiskFactors(cropId) {
    const riskFactors = {
      wheat: ['weather-dependency', 'rust-disease', 'price-volatility'],
      maize: ['pest-attacks', 'market-fluctuation', 'storage-losses'],
      rice: ['flood-risk', 'blast-disease', 'export-restrictions'],
      cotton: ['bollworm-attack', 'price-crash', 'quality-issues'],
      mustard: ['aphid-infestation', 'oil-price-link', 'weather-sensitivity']
    };
    
    return riskFactors[cropId] || ['general-market-risk'];
  }

  getMarketRecommendations(cropId, profitMargin) {
    if (profitMargin > 30) {
      return ['excellent-choice', 'consider-expansion', 'focus-on-quality'];
    } else if (profitMargin > 15) {
      return ['good-option', 'optimize-costs', 'market-timing-important'];
    } else if (profitMargin > 5) {
      return ['marginal-profit', 'cost-reduction-needed', 'consider-alternatives'];
    } else {
      return ['not-recommended', 'high-risk', 'explore-other-crops'];
    }
  }

  getSeasonalPricePattern(cropId) {
    const crop = this.priceData[cropId];
    if (!crop) return null;
    
    return {
      cropId,
      pattern: crop.seasonalPattern,
      recommendation: this.getTimingRecommendation(crop.seasonalPattern),
      currentMonth: new Date().toLocaleString('default', { month: 'short' })
    };
  }

  getTimingRecommendation(seasonalPattern) {
    const currentMonth = new Date().toLocaleString('default', { month: 'short' });
    
    for (const [phase, data] of Object.entries(seasonalPattern)) {
      if (data.months.includes(currentMonth)) {
        if (data.priceChange > 15) {
          return 'excellent-selling-time';
        } else if (data.priceChange < -15) {
          return 'good-buying-time';
        } else {
          return 'neutral-period';
        }
      }
    }
    
    return 'monitor-market';
  }
}

export default new MarketDataService();
