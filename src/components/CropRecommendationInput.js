import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  ArrowLeft, 
  MapPin, 
  Ruler, 
  Droplets, 
  Wheat, 
  Zap,
  Smartphone,
  Globe,
  Calendar
} from 'lucide-react';

const CropRecommendationInput = () => {
  const navigate = useNavigate();
  const { language, t } = useUser();
  const [formData, setFormData] = useState({
    farmSize: '',
    soilType: '',
    location: '',
    previousCrop: '',
    season: '',
    irrigation: '',
    budget: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  // Multilingual dropdown options
  const soilTypeOptions = {
    hindi: [
      { value: 'clay', label: 'चिकनी मिट्टी (Clay)', description: 'भारी और पानी रोकने वाली' },
      { value: 'loamy', label: 'दोमट मिट्टी (Loamy)', description: 'सर्वोत्तम फसल उत्पादन के लिए' },
      { value: 'sandy', label: 'बलुई मिट्टी (Sandy)', description: 'हल्की और जल निकासी वाली' },
      { value: 'silt', label: 'गाद मिट्टी (Silt)', description: 'मध्यम बनावट वाली' },
      { value: 'red', label: 'लाल मिट्टी (Red Soil)', description: 'लोहे की अधिकता वाली' }
    ],
    english: [
      { value: 'clay', label: 'Clay Soil', description: 'Heavy and water-retaining' },
      { value: 'loamy', label: 'Loamy Soil', description: 'Best for crop production' },
      { value: 'sandy', label: 'Sandy Soil', description: 'Light and well-draining' },
      { value: 'silt', label: 'Silt Soil', description: 'Medium texture' },
      { value: 'red', label: 'Red Soil', description: 'High iron content' }
    ],
    marathi: [
      { value: 'clay', label: 'चिकणी माती (Clay)', description: 'जड आणि पाणी धरून ठेवणारी' },
      { value: 'loamy', label: 'दोमट माती (Loamy)', description: 'पीक उत्पादनासाठी सर्वोत्तम' },
      { value: 'sandy', label: 'वालुकामय माती (Sandy)', description: 'हलकी आणि पाणी निचरा करणारी' },
      { value: 'silt', label: 'गाळाची माती (Silt)', description: 'मध्यम रचना' },
      { value: 'red', label: 'लाल माती (Red Soil)', description: 'लोहाची जास्त मात्रा' }
    ],
    gujarati: [
      { value: 'clay', label: 'ચીકણી માટી (Clay)', description: 'ભારે અને પાણી રોકનારી' },
      { value: 'loamy', label: 'દોમટ માટી (Loamy)', description: 'પાક ઉત્પાદન માટે શ્રેષ્ઠ' },
      { value: 'sandy', label: 'રેતાળ માટી (Sandy)', description: 'હલકી અને પાણી નીકળતી' },
      { value: 'silt', label: 'કાંપવાળી માટી (Silt)', description: 'મધ્યમ રચના' },
      { value: 'red', label: 'લાલ માટી (Red Soil)', description: 'લોખંડની વધુ માત્રા' }
    ]
  };

  const seasonOptions = {
    hindi: [
      { value: 'kharif', label: 'खरीफ (जुलाई-अक्टूबर)' },
      { value: 'rabi', label: 'रबी (अक्टूबर-मार्च)' },
      { value: 'zaid', label: 'ज़ायद (मार्च-जून)' }
    ],
    english: [
      { value: 'kharif', label: 'Kharif (July-October)' },
      { value: 'rabi', label: 'Rabi (October-March)' },
      { value: 'zaid', label: 'Zaid (March-June)' }
    ],
    marathi: [
      { value: 'kharif', label: 'खरीप (जुलै-ऑक्टोबर)' },
      { value: 'rabi', label: 'रब्बी (ऑक्टोबर-मार्च)' },
      { value: 'zaid', label: 'झायद (मार्च-जून)' }
    ],
    gujarati: [
      { value: 'kharif', label: 'ખરીફ (જુલાઈ-ઓક્ટોબર)' },
      { value: 'rabi', label: 'રબી (ઓક્ટોબર-માર્ચ)' },
      { value: 'zaid', label: 'ઝાયદ (માર્ચ-જૂન)' }
    ]
  };

  const irrigationOptions = {
    hindi: [
      { value: 'rainfed', label: 'वर्षा आधारित' },
      { value: 'irrigated', label: 'सिंचित' },
      { value: 'drip', label: 'ड्रिप सिंचाई' },
      { value: 'sprinkler', label: 'स्प्रिंकलर' }
    ],
    english: [
      { value: 'rainfed', label: 'Rain-fed' },
      { value: 'irrigated', label: 'Irrigated' },
      { value: 'drip', label: 'Drip Irrigation' },
      { value: 'sprinkler', label: 'Sprinkler' }
    ],
    marathi: [
      { value: 'rainfed', label: 'पावसावर आधारित' },
      { value: 'irrigated', label: 'सिंचित' },
      { value: 'drip', label: 'ड्रिप सिंचन' },
      { value: 'sprinkler', label: 'स्प्रिंकलर' }
    ],
    gujarati: [
      { value: 'rainfed', label: 'વરસાદ આધારિત' },
      { value: 'irrigated', label: 'સિંચિત' },
      { value: 'drip', label: 'ડ્રિપ સિંચાઈ' },
      { value: 'sprinkler', label: 'સ્પ્રિંકલર' }
    ]
  };

  const soilTypes = soilTypeOptions[language] || soilTypeOptions.hindi;
  const seasons = seasonOptions[language] || seasonOptions.hindi;
  const irrigationTypes = irrigationOptions[language] || irrigationOptions.hindi;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Store form data in localStorage for the recommendation result page
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        language: language
      };
      localStorage.setItem('cropRecommendationData', JSON.stringify(submissionData));
      
      // Simulate AI processing with realistic delay
      setTimeout(() => {
        setIsLoading(false);
        navigate('/recommendation-result');
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsLoading(false);
      const errorMessages = {
        hindi: 'फॉर्म सबमिट करने में समस्या। कृपया पुनः प्रयास करें।',
        english: 'Problem submitting form. Please try again.',
        marathi: 'फॉर्म सबमिट करण्यात समस्या. कृपया पुन्हा प्रयत्न करा.',
        gujarati: 'ફોર્મ સબમિટ કરવામાં સમસ્યા. કૃપા કરીને ફરી પ્રયાસ કરો.'
      };
      alert(errorMessages[language] || errorMessages.hindi);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.error('Location error:', error);
          const errorMessages = {
            hindi: 'स्थान प्राप्त करने में समस्या। कृपया मैन्युअल रूप से दर्ज करें।',
            english: 'Problem getting location. Please enter manually.',
            marathi: 'स्थान मिळवण्यात समस्या. कृपया मॅन्युअली प्रविष्ट करा.',
            gujarati: 'સ્થાન મેળવવામાં સમસ્યા. કૃપા કરીને મેન્યુઅલી દાખલ કરો.'
          };
          alert(errorMessages[language] || errorMessages.hindi);
        }
      );
    } else {
      const browserMessages = {
        hindi: 'आपका ब्राउज़र GPS का समर्थन नहीं करता।',
        english: 'Your browser does not support GPS.',
        marathi: 'तुमचा ब्राउझर GPS चे समर्थन करत नाही.',
        gujarati: 'તમારું બ્રાઉઝર GPS ને સપોર્ટ કરતું નથી.'
      };
      alert(browserMessages[language] || browserMessages.hindi);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {language === 'english' ? 'Crop Recommendation' : 'फसल सिफारिश'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'english' ? 'Enter your farm information' : 'अपने खेत की जानकारी दर्ज करें'}
                </p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farm Size */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Ruler className="inline w-4 h-4 mr-2" />
              {language === 'english' ? 'Farm Size' : 'खेत का आकार'}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleInputChange}
                placeholder="5"
                className="input-field"
                required
              />
              <select className="input-field">
                <option value="acres">{language === 'english' ? 'Acres' : language === 'marathi' ? 'एकर' : language === 'gujarati' ? 'એકર' : 'एकड़'}</option>
                <option value="hectares">{language === 'english' ? 'Hectares' : language === 'marathi' ? 'हेक्टेयर' : language === 'gujarati' ? 'હેક્ટર' : 'हेक्टेयर'}</option>
                <option value="bigha">{language === 'english' ? 'Bigha' : language === 'marathi' ? 'बीघा' : language === 'gujarati' ? 'બીઘા' : 'बीघा'}</option>
              </select>
            </div>
          </div>

          {/* Soil Type */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Droplets className="inline w-4 h-4 mr-2" />
              {language === 'english' ? 'Soil Type' : 'मिट्टी का प्रकार'}
            </label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">{language === 'english' ? 'Select soil type' : language === 'marathi' ? 'माती प्रकार निवडा' : language === 'gujarati' ? 'માટીનો પ્રકાર પસંદ કરો' : 'मिट्टी का प्रकार चुनें'}</option>
              {soilTypes.map((soil) => (
                <option key={soil.value} value={soil.value}>
                  {soil.label} - {soil.description}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              {language === 'english' ? 'Location' : 'स्थान'}
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder={language === 'english' ? 'Village, District, State' : language === 'marathi' ? 'गाव, जिल्हा, राज्य' : language === 'gujarati' ? 'ગામ, જિલ્લો, રાજ્ય' : 'गांव, जिला, राज्य'}
                  className="input-field flex-1"
                  required
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                {language === 'english' ? 'Or press button to get GPS location' : language === 'marathi' ? 'किंवा GPS स्थान मिळविण्यासाठी बटण दाबा' : language === 'gujarati' ? 'અથવા GPS સ્થાન મેળવવા માટે બટન દબાવો' : 'या GPS स्थान प्राप्त करने के लिए बटन दबाएं'}
              </p>
            </div>
          </div>

          {/* Previous Crop */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Wheat className="inline w-4 h-4 mr-2" />
              {language === 'english' ? 'Previous Crop' : 'पिछली फसल'}
            </label>
            <input
              type="text"
              name="previousCrop"
              value={formData.previousCrop}
              onChange={handleInputChange}
              placeholder="गेहूं, धान, मक्का, आदि"
              className="input-field"
            />
          </div>

          {/* Season */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              {language === 'english' ? 'Crop Season' : 'फसल सीजन'}
            </label>
            <select
              name="season"
              value={formData.season}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">{language === 'english' ? 'Select season' : language === 'marathi' ? 'हंगाम निवडा' : language === 'gujarati' ? 'સીઝન પસંદ કરો' : 'सीजन चुनें'}</option>
              {seasons.map((season) => (
                <option key={season.value} value={season.value}>
                  {season.label}
                </option>
              ))}
            </select>
          </div>

          {/* Irrigation */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Droplets className="inline w-4 h-4 mr-2" />
              {language === 'english' ? 'Irrigation Type' : 'सिंचाई का प्रकार'}
            </label>
            <select
              name="irrigation"
              value={formData.irrigation}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">{language === 'english' ? 'Select irrigation type' : language === 'marathi' ? 'सिंचन प्रकार निवडा' : language === 'gujarati' ? 'સિંચાઈ પ્રકાર પસંદ કરો' : 'सिंचाई प्रकार चुनें'}</option>
              {irrigationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Smartphone className="inline w-4 h-4 mr-2" />
              {language === 'english' ? 'Budget Range (per acre)' : 'बजट सीमा (प्रति एकड़)'}
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">{language === 'english' ? 'Select budget' : language === 'marathi' ? 'बजेट निवडा' : language === 'gujarati' ? 'બજેટ પસંદ કરો' : 'बजट चुनें'}</option>
              <option value="low">{language === 'english' ? 'Low (₹5,000 - ₹15,000)' : language === 'marathi' ? 'कमी (₹5,000 - ₹15,000)' : language === 'gujarati' ? 'ઓછું (₹5,000 - ₹15,000)' : 'कम (₹5,000 - ₹15,000)'}</option>
              <option value="medium">{language === 'english' ? 'Medium (₹15,000 - ₹30,000)' : language === 'marathi' ? 'मध्यम (₹15,000 - ₹30,000)' : language === 'gujarati' ? 'મધ્યમ (₹15,000 - ₹30,000)' : 'मध्यम (₹15,000 - ₹30,000)'}</option>
              <option value="high">{language === 'english' ? 'High (₹30,000+)' : language === 'marathi' ? 'उच्च (₹30,000+)' : language === 'gujarati' ? 'ઊંચું (₹30,000+)' : 'उच्च (₹30,000+)'}</option>
            </select>
          </div>

          {/* AI Integration Notice */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-6 h-6 text-yellow-600" />
              <h4 className="font-bold text-yellow-800">
                {language === 'english' ? 'AI Integration Port' : 
                 language === 'marathi' ? 'AI इंटिग्रेशन पोर्ट' :
                 language === 'gujarati' ? 'AI ઇન્ટિગ્રેશન પોર્ટ' : 'AI इंटीग्रेशन पोर्ट'}
              </h4>
            </div>
            <p className="text-yellow-700 text-sm mb-3">
              {language === 'english' ? 
                <><strong>Backend Model Here:</strong> This form data will be sent to Gemini API which will provide crop recommendations based on soil, weather, and regional data.</> :
                language === 'marathi' ?
                <><strong>बॅकएंड मॉडेल येथे:</strong> हा फॉर्म डेटा Gemini API ला पाठवला जाईल जो माती, हवामान आणि प्रादेशिक डेटाच्या आधारे पीक शिफारसी प्रदान करेल.</> :
                language === 'gujarati' ?
                <><strong>બેકએન્ડ મોડેલ અહીં:</strong> આ ફોર્મ ડેટા Gemini API ને મોકલવામાં આવશે જે માટી, હવામાન અને પ્રાદેશિક ડેટાના આધારે પાક ભલામણો પ્રદાન કરશે.</> :
                <><strong>बैकएंड मॉडल यहाँ:</strong> यह फॉर्म डेटा Gemini API को भेजा जाएगा जो मिट्टी, मौसम, और क्षेत्रीय डेटा के आधार पर फसल सिफारिशें प्रदान करेगा.</>
              }
            </p>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <p className="text-yellow-800 text-xs">
                {language === 'english' ? (
                  <>
                    <strong>API Endpoint:</strong> POST /api/crop-recommendation<br/>
                    <strong>Model:</strong> Gemini Pro Vision + Custom ML Model<br/>
                    <strong>Input:</strong> Soil data, Weather data, Location, Season
                  </>
                ) : language === 'marathi' ? (
                  <>
                    <strong>API एंडपॉइंट:</strong> POST /api/crop-recommendation<br/>
                    <strong>मॉडेल:</strong> Gemini Pro Vision + Custom ML Model<br/>
                    <strong>इनपुट:</strong> माती डेटा, हवामान डेटा, स्थान, हंगाम
                  </>
                ) : language === 'gujarati' ? (
                  <>
                    <strong>API એન્ડપોઇન્ટ:</strong> POST /api/crop-recommendation<br/>
                    <strong>મોડેલ:</strong> Gemini Pro Vision + Custom ML Model<br/>
                    <strong>ઇનપુટ:</strong> માટી ડેટા, હવામાન ડેટા, સ્થાન, સીઝન
                  </>
                ) : (
                  <>
                    <strong>API एंडपॉइंट:</strong> POST /api/crop-recommendation<br/>
                    <strong>मॉडल:</strong> Gemini Pro Vision + Custom ML Model<br/>
                    <strong>इनपुट:</strong> Soil data, Weather data, Location, Season
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full btn-primary text-lg py-4 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>
                  {language === 'english' ? 'Getting AI recommendations...' :
                   language === 'marathi' ? 'AI शिफारसी मिळवत आहे...' :
                   language === 'gujarati' ? 'AI ભલામણો મેળવી રહ્યા છીએ...' : 'AI सिफारिश प्राप्त कर रहा है...'}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>
                  {language === 'english' ? 'Get Recommendations (AI Powered)' :
                   language === 'marathi' ? 'शिफारसी मिळवा (AI संचालित)' :
                   language === 'gujarati' ? 'ભલામણો મેળવો (AI સંચાલિત)' : 'सिफारिश प्राप्त करें (AI संचालित)'}
                </span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CropRecommendationInput;
