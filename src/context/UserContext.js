import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const initialLang = typeof window !== 'undefined' ? (localStorage.getItem('lang') || 'hindi') : 'hindi';

  const [user, setUser] = useState({
    name: 'राम कुमार',
    phone: '+91 98765 43210',
    location: 'मध्य प्रदेश, भारत',
    farmSize: '5 एकड़',
    language: initialLang,
    isLoggedIn: false,
    loginTime: null
  });

  const [language, setLanguage] = useState(initialLang);

  // Centralized translations for multi-language support
  const translations = {
    hindi: {
      appName: 'क्रॉपएआई',
      appSubtitle: 'स्मार्ट खेती प्लेटफॉर्म',
      welcome: 'नमस्ते',
      online: 'ऑनलाइन',
      logout: 'लॉगआउट',
      back: 'वापस जाएं',
      season: 'मौसम',
      duration: 'अवधि',
      water: 'पानी',
      temp: 'तापमान',
      yield: 'उपज',
      care: 'खेती के निर्देश',
      economics: 'आर्थिक जानकारी',
      marketPrice: 'बाजार कीमत',
      investment: 'निवेश',
      expectedProfit: 'अनुमानित लाभ',
      chooseCrop: 'इस फसल को चुनें',
      viewOthers: 'अन्य विकल्प देखें',
      recentActivity: 'हाल की गतिविधियां',
      farmSize: 'खेत का आकार',
      currentSeason: 'वर्तमान मौसम',
      successRate: 'सफलता दर',
    },
    english: {
      appName: 'CropAI',
      appSubtitle: 'Smart Farming Platform',
      welcome: 'Hello',
      online: 'Online',
      logout: 'Logout',
      back: 'Back',
      season: 'Season',
      duration: 'Duration',
      water: 'Water',
      temp: 'Temperature',
      yield: 'Yield',
      care: 'Care Instructions',
      economics: 'Economic Information',
      marketPrice: 'Market Price',
      investment: 'Investment',
      expectedProfit: 'Estimated Profit',
      chooseCrop: 'Choose this crop',
      viewOthers: 'View other options',
      recentActivity: 'Recent Activity',
      farmSize: 'Farm Size',
      currentSeason: 'Current Season',
      successRate: 'Success Rate',
    },
    marathi: {
      appName: 'क्रॉपएआई',
      appSubtitle: 'स्मार्ट शेती प्लॅटफॉर्म',
      welcome: 'नमस्कार',
      online: 'ऑनलाइन',
      logout: 'लॉगआउट',
      back: 'परत जा',
      season: 'हंगाम',
      duration: 'कालावधी',
      water: 'पाणी',
      temp: 'तापमान',
      yield: 'उत्पादन',
      care: 'शेतीचे निर्देश',
      economics: 'आर्थिक माहिती',
      marketPrice: 'बाजार भाव',
      investment: 'गुंतवणूक',
      expectedProfit: 'अनुमानित नफा',
      chooseCrop: 'हे पीक निवडा',
      viewOthers: 'इतर पर्याय पहा',
      recentActivity: 'अलीकडील क्रियाकलाप',
      farmSize: 'शेताचा आकार',
      currentSeason: 'सध्याचा हंगाम',
      successRate: 'यश दर',
    },
    gujarati: {
      appName: 'ક્રોપએઆઈ',
      appSubtitle: 'સ્માર્ટ ખેતી પ્લેટફોર્મ',
      welcome: 'નમસ્તે',
      online: 'ઓનલાઇન',
      logout: 'લોગઆઉટ',
      back: 'પાછા જાઓ',
      season: 'મોસમ',
      duration: 'અવધિ',
      water: 'પાણી',
      temp: 'તાપમાન',
      yield: 'ઉત્પાદન',
      care: 'કાળજી સૂચનાઓ',
      economics: 'આર્થિક માહિતી',
      marketPrice: 'બજાર ભાવ',
      investment: 'રોકાણ',
      expectedProfit: 'અંદાજિત નફો',
      chooseCrop: 'આ ફસલ પસંદ કરો',
      viewOthers: 'અન્ય વિકલ્પો જુઓ',
      recentActivity: 'તાજેતરની પ્રવૃત્તિ',
      farmSize: 'ખેતરનું કદ',
      currentSeason: 'વર્તમાન મોસમ',
      successRate: 'સફળતા દર',
    }
  };

  const [recommendations, setRecommendations] = useState([]);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'मौसम चेतावनी',
      titleEn: 'Weather Alert',
      titleMr: 'हवामान चेतावणी',
      titleGu: 'હવામાન ચેતવણી',
      message: 'आज शाम को बारिश की संभावना है',
      messageEn: 'Rain expected this evening',
      messageMr: 'आज संध्याकाळी पाऊस होण्याची शक्यता आहे',
      messageGu: 'આજે સાંજે વરસાદની શક્યતા છે',
      priority: 'high',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      title: 'कीट प्रबंधन',
      titleEn: 'Pest Management',
      titleMr: 'कीड व्यवस्थापन',
      titleGu: 'જંતુ વ્યવસ્થાપન',
      message: 'गेहूं में कीट का खतरा',
      messageEn: 'Pest threat in wheat crops',
      messageMr: 'गहू पिकात कीडांचा धोका',
      messageGu: 'ઘઉંના પાકમાં જંતુનો ખતરો',
      priority: 'medium',
      timestamp: new Date().toISOString()
    }
  ]);

  const updateUser = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  const loginUser = (userData) => {
    setUser(prev => ({ 
      ...prev, 
      ...userData, 
      isLoggedIn: true, 
      loginTime: new Date().toISOString() 
    }));
  };

  const logoutUser = () => {
    setUser(prev => ({ 
      ...prev, 
      isLoggedIn: false, 
      loginTime: null 
    }));
  };

  const addRecommendation = (recommendation) => {
    setRecommendations(prev => [recommendation, ...prev]);
  };

  const addAlert = (alert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setUser(prev => ({ ...prev, language: newLanguage }));
  };

  useEffect(() => {
    try {
      localStorage.setItem('lang', language);
    } catch (_) {}
  }, [language]);

  // Current language bundle and available languages list
  const t = translations[language] || translations.hindi;
  const languages = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' }
  ];

  const value = {
    user,
    updateUser,
    loginUser,
    logoutUser,
    recommendations,
    addRecommendation,
    alerts,
    addAlert,
    language,
    changeLanguage,
    translations,
    t,
    languages
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
