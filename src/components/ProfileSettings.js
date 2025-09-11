import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  MapPin, 
  Crop, 
  Globe, 
  Bell, 
  Shield, 
  Save,
  Edit3,
  Camera,
  Settings
} from 'lucide-react';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, updateUser, language } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    location: user.location,
    farmSize: user.farmSize
  });

  const translations = {
    hindi: {
      pageTitle: 'प्रोफाइल और सेटिंग्स',
      pageSubtitle: 'अपनी जानकारी प्रबंधित करें',
      personalInfo: 'व्यक्तिगत जानकारी',
      farmInfo: 'खेत की जानकारी',
      preferences: 'प्राथमिकताएं',
      notifications: 'सूचनाएं',
      security: 'सुरक्षा',
      name: 'नाम',
      phone: 'फोन नंबर',
      location: 'स्थान',
      farmSize: 'खेत का आकार',
      language: 'भाषा',
      edit: 'संपादित करें',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      changePhoto: 'फोटो बदलें',
      pushNotifications: 'पुश नोटिफिकेशन',
      emailNotifications: 'ईमेल नोटिफिकेशन',
      weatherAlerts: 'मौसम अलर्ट',
      pestAlerts: 'कीट अलर्ट',
      marketUpdates: 'बाजार अपडेट',
      changePassword: 'पासवर्ड बदलें',
      twoFactor: 'दो-कारक प्रमाणीकरण',
      dataPrivacy: 'डेटा गोपनीयता',
      accountSettings: 'खाता सेटिंग्स',
      deleteAccount: 'खाता हटाएं',
      exportData: 'डेटा निर्यात करें',
      helpSupport: 'सहायता और समर्थन',
      about: 'के बारे में',
      version: 'संस्करण',
      updated: 'जानकारी अपडेट हो गई',
      enabled: 'सक्षम',
      disabled: 'अक्षम'
    },
    english: {
      pageTitle: 'Profile & Settings',
      pageSubtitle: 'Manage your information',
      personalInfo: 'Personal Information',
      farmInfo: 'Farm Information',
      preferences: 'Preferences',
      notifications: 'Notifications',
      security: 'Security',
      name: 'Name',
      phone: 'Phone Number',
      location: 'Location',
      farmSize: 'Farm Size',
      language: 'Language',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      changePhoto: 'Change Photo',
      pushNotifications: 'Push Notifications',
      emailNotifications: 'Email Notifications',
      weatherAlerts: 'Weather Alerts',
      pestAlerts: 'Pest Alerts',
      marketUpdates: 'Market Updates',
      changePassword: 'Change Password',
      twoFactor: 'Two-Factor Authentication',
      dataPrivacy: 'Data Privacy',
      accountSettings: 'Account Settings',
      deleteAccount: 'Delete Account',
      exportData: 'Export Data',
      helpSupport: 'Help & Support',
      about: 'About',
      version: 'Version',
      updated: 'Information updated successfully',
      enabled: 'Enabled',
      disabled: 'Disabled'
    },
    marathi: {
      pageTitle: 'प्रोफाइल आणि सेटिंग्ज',
      pageSubtitle: 'तुमची माहिती व्यवस्थापित करा',
      personalInfo: 'वैयक्तिक माहिती',
      farmInfo: 'शेताची माहिती',
      preferences: 'प्राधान्ये',
      notifications: 'सूचना',
      security: 'सुरक्षा',
      name: 'नाव',
      phone: 'फोन नंबर',
      location: 'स्थान',
      farmSize: 'शेताचा आकार',
      language: 'भाषा',
      edit: 'संपादित करा',
      save: 'जतन करा',
      cancel: 'रद्द करा',
      changePhoto: 'फोटो बदला',
      pushNotifications: 'पुश सूचना',
      emailNotifications: 'ईमेल सूचना',
      weatherAlerts: 'हवामान अलर्ट',
      pestAlerts: 'कीड अलर्ट',
      marketUpdates: 'बाजार अपडेट',
      changePassword: 'पासवर्ड बदला',
      twoFactor: 'द्वि-घटक प्रमाणीकरण',
      dataPrivacy: 'डेटा गोपनीयता',
      accountSettings: 'खाते सेटिंग्ज',
      deleteAccount: 'खाते हटवा',
      exportData: 'डेटा निर्यात करा',
      helpSupport: 'मदत आणि समर्थन',
      about: 'बद्दल',
      version: 'आवृत्ती',
      updated: 'माहिती यशस्वीरित्या अपडेट झाली',
      enabled: 'सक्षम',
      disabled: 'अक्षम'
    },
    gujarati: {
      pageTitle: 'પ્રોફાઇલ અને સેટિંગ્સ',
      pageSubtitle: 'તમારી માહિતીનું સંચાલન કરો',
      personalInfo: 'વ્યક્તિગત માહિતી',
      farmInfo: 'ખેતરની માહિતી',
      preferences: 'પસંદગીઓ',
      notifications: 'સૂચનાઓ',
      security: 'સુરક્ષા',
      name: 'નામ',
      phone: 'ફોન નંબર',
      location: 'સ્થાન',
      farmSize: 'ખેતરનું કદ',
      language: 'ભાષા',
      edit: 'સંપાદિત કરો',
      save: 'સાચવો',
      cancel: 'રદ કરો',
      changePhoto: 'ફોટો બદલો',
      pushNotifications: 'પુશ સૂચનાઓ',
      emailNotifications: 'ઇમેઇલ સૂચનાઓ',
      weatherAlerts: 'હવામાન અલર્ટ',
      pestAlerts: 'જંતુ અલર્ટ',
      marketUpdates: 'બજાર અપડેટ',
      changePassword: 'પાસવર્ડ બદલો',
      twoFactor: 'બે-પરિબળ પ્રમાણીકરણ',
      dataPrivacy: 'ડેટા ગોપનીયતા',
      accountSettings: 'એકાઉન્ટ સેટિંગ્સ',
      deleteAccount: 'એકાઉન્ટ ડિલીટ કરો',
      exportData: 'ડેટા એક્સપોર્ટ કરો',
      helpSupport: 'મદદ અને સપોર્ટ',
      about: 'વિશે',
      version: 'સંસ્કરણ',
      updated: 'માહિતી સફળતાપૂર્વક અપડેટ થઈ',
      enabled: 'સક્રિય',
      disabled: 'નિષ્ક્રિય'
    }
  };

  const t = translations[language] || translations.hindi;

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    weatherAlerts: true,
    pestAlerts: true,
    marketUpdates: false
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    // Show success message (in a real app, you'd use a toast notification)
    alert(t.updated);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      phone: user.phone,
      location: user.location,
      farmSize: user.farmSize
    });
    setIsEditing(false);
  };

  const toggleNotification = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
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
                <h1 className="text-2xl font-bold text-gray-800">{t.pageTitle}</h1>
                <p className="text-sm text-gray-600">{t.pageSubtitle}</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.phone}</p>
              <p className="text-gray-600">{user.location}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? t.cancel : t.edit}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <span>{t.personalInfo}</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.name}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{user.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{user.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.location}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{user.location}</p>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.save}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            )}
          </div>

          {/* Farm Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Crop className="w-5 h-5 text-green-500" />
              <span>{t.farmInfo}</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.farmSize}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="farmSize"
                    value={formData.farmSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{user.farmSize}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'english' ? 'Crop Types' : 
                   language === 'marathi' ? 'पीक प्रकार' :
                   language === 'gujarati' ? 'પાક પ્રકાર' : 'फसल के प्रकार'}
                </label>
                <p className="text-gray-800">
                  {language === 'english' ? 'Wheat, Rice, Sugarcane' : 
                   language === 'marathi' ? 'गहू, तांदूळ, ऊस' :
                   language === 'gujarati' ? 'ઘઉં, ચોખા, શેરડી' : 'गेहूं, चावल, गन्ना'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'english' ? 'Farming Experience' : 
                   language === 'marathi' ? 'शेती अनुभव' :
                   language === 'gujarati' ? 'ખેતી અનુભવ' : 'खेती का अनुभव'}
                </label>
                <p className="text-gray-800">
                  {language === 'english' ? '15 years' : 
                   language === 'marathi' ? '15 वर्षे' :
                   language === 'gujarati' ? '15 વર્ષ' : '15 साल'}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-orange-500" />
              <span>{t.notifications}</span>
            </h3>
            <div className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700">{t[key]}</span>
                  <button
                    onClick={() => toggleNotification(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Account */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-red-500" />
              <span>{t.security}</span>
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="font-medium text-gray-800">{t.changePassword}</div>
                <div className="text-sm text-gray-600">
                  {language === 'english' ? 'Last changed 3 months ago' : 
                   language === 'marathi' ? '3 महिन्यांपूर्वी शेवटचे बदलले' :
                   language === 'gujarati' ? '3 મહિના પહેલા છેલ્લે બદલાયું' : '3 महीने पहले अंतिम बार बदला गया'}
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="font-medium text-gray-800">{t.twoFactor}</div>
                <div className="text-sm text-gray-600">{t.disabled}</div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="font-medium text-gray-800">{t.dataPrivacy}</div>
                <div className="text-sm text-gray-600">
                  {language === 'english' ? 'Manage your data preferences' : 
                   language === 'marathi' ? 'तुमच्या डेटा प्राधान्यांचे व्यवस्थापन करा' :
                   language === 'gujarati' ? 'તમારી ડેટા પસંદગીઓનું સંચાલન કરો' : 'अपनी डेटा प्राथमिकताओं का प्रबंधन करें'}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-purple-500" />
            <span>{t.about}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="font-medium text-gray-800">{t.version}</div>
              <div className="text-sm text-gray-600">CropAI v1.0.0</div>
            </div>
            <div>
              <div className="font-medium text-gray-800">{t.helpSupport}</div>
              <div className="text-sm text-gray-600">support@cropai.com</div>
            </div>
            <div>
              <div className="font-medium text-gray-800">
                {language === 'english' ? 'Last Updated' : 
                 language === 'marathi' ? 'शेवटचे अपडेट' :
                 language === 'gujarati' ? 'છેલ્લે અપડેટ' : 'अंतिम अपडेट'}
              </div>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString(language === 'english' ? 'en-IN' : 'hi-IN')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
