import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LanguageSwitcher from './LanguageSwitcher';
import { ArrowLeft, Bell, AlertCircle, CheckCircle, Clock, Calendar, Droplets, Sun } from 'lucide-react';

const AlertsReminders = () => {
  const navigate = useNavigate();
  const { language } = useUser();
  const [filter, setFilter] = useState('all');

  // Translations for alerts and reminders
  const translations = {
    hindi: {
      pageTitle: 'अलर्ट और रिमाइंडर',
      pageSubtitle: 'महत्वपूर्ण सूचनाएं और याददाश्त',
      alertsTitle: 'अलर्ट्स',
      remindersTitle: 'रिमाइंडर',
      addReminderTitle: 'नया रिमाइंडर जोड़ें',
      reminderName: 'रिमाइंडर का नाम',
      time: 'समय',
      addReminder: 'रिमाइंडर जोड़ें',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
      all: 'सभी',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      daily: 'दैनिक',
      weekly: 'साप्ताहिक',
      monthly: 'मासिक',
      custom: 'कस्टम'
    },
    english: {
      pageTitle: 'Alerts & Reminders',
      pageSubtitle: 'Important notifications and reminders',
      alertsTitle: 'Alerts',
      remindersTitle: 'Reminders',
      addReminderTitle: 'Add New Reminder',
      reminderName: 'Reminder Name',
      time: 'Time',
      addReminder: 'Add Reminder',
      active: 'Active',
      inactive: 'Inactive',
      all: 'All',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      custom: 'Custom'
    },
    marathi: {
      pageTitle: 'अलर्ट आणि रिमाइंडर',
      pageSubtitle: 'महत्त्वाच्या सूचना आणि स्मरणपत्रे',
      alertsTitle: 'अलर्ट्स',
      remindersTitle: 'रिमाइंडर',
      addReminderTitle: 'नवीन रिमाइंडर जोडा',
      reminderName: 'रिमाइंडरचे नाव',
      time: 'वेळ',
      addReminder: 'रिमाइंडर जोडा',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
      all: 'सर्व',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कमी',
      daily: 'दैनिक',
      weekly: 'साप्ताहिक',
      monthly: 'मासिक',
      custom: 'कस्टम'
    },
    gujarati: {
      pageTitle: 'અલર્ટ અને રિમાઇન્ડર',
      pageSubtitle: 'મહત્વપૂર્ણ સૂચનાઓ અને રિમાઇન્ડર',
      alertsTitle: 'અલર્ટ્સ',
      remindersTitle: 'રિમાઇન્ડર',
      addReminderTitle: 'નવું રિમાઇન્ડર ઉમેરો',
      reminderName: 'રિમાઇન્ડરનું નામ',
      time: 'સમય',
      addReminder: 'રિમાઇન્ડર ઉમેરો',
      active: 'સક્રિય',
      inactive: 'નિષ્ક્રિય',
      all: 'બધા',
      high: 'ઊંચું',
      medium: 'મધ્યમ',
      low: 'ઓછું',
      daily: 'દૈનિક',
      weekly: 'સાપ્તાહિક',
      monthly: 'માસિક',
      custom: 'કસ્ટમ'
    }
  };

  const t = translations[language] || translations.hindi;

  // Mock alerts and reminders data
  const alerts = [
    {
      id: 1,
      type: 'weather',
      priority: 'high',
      title: {
        hindi: 'बारिश की चेतावनी',
        english: 'Rain Warning',
        marathi: 'पाऊस चेतावणी',
        gujarati: 'વરસાદની ચેતવણી'
      },
      message: {
        hindi: 'अगले 2 दिनों में भारी बारिश की संभावना है। फसल की सुरक्षा के लिए तैयार रहें।',
        english: 'Heavy rain expected in next 2 days. Prepare to protect your crops.',
        marathi: 'पुढील 2 दिवसांत मुसळधार पाऊस होण्याची शक्यता आहे. पिकांच्या संरक्षणासाठी तयार रहा.',
        gujarati: 'આગામી 2 દિવસમાં ભારે વરસાદની શક્યતા છે. તમારા પાકોની સુરક્ષા માટે તૈયાર રહો.'
      },
      timestamp: new Date('2024-01-15T10:30:00'),
      icon: <Droplets className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      type: 'pest',
      priority: 'medium',
      title: {
        hindi: 'कीट नियंत्रण',
        english: 'Pest Control',
        marathi: 'कीड नियंत्रण',
        gujarati: 'જંતુ નિયંત્રણ'
      },
      message: {
        hindi: 'आपके क्षेत्र में कीटों की गतिविधि बढ़ रही है। निवारक उपाय करें।',
        english: 'Pest activity increasing in your area. Take preventive measures.',
        marathi: 'तुमच्या भागात कीडांची हालचाल वाढत आहे. प्रतिबंधात्मक उपाययोजना करा.',
        gujarati: 'તમારા વિસ્તારમાં જંતુઓની પ્રવૃત્તિ વધી રહી છે. નિવારક પગલાં લો.'
      },
      timestamp: new Date('2024-01-14T14:20:00'),
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 3,
      type: 'irrigation',
      priority: 'low',
      title: {
        hindi: 'सिंचाई का समय',
        english: 'Irrigation Time',
        marathi: 'सिंचनाची वेळ',
        gujarati: 'સિંચાઈનો સમય'
      },
      message: {
        hindi: 'गेहूं की फसल को आज सिंचाई की आवश्यकता है।',
        english: 'Wheat crop needs irrigation today.',
        marathi: 'गहू पिकाला आज सिंचनाची गरज आहे.',
        gujarati: 'ઘઉંના પાકને આજે સિંચાઈની જરૂર છે.'
      },
      timestamp: new Date('2024-01-13T08:00:00'),
      icon: <Droplets className="w-5 h-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 4,
      type: 'harvest',
      priority: 'medium',
      title: {
        hindi: 'कटाई का समय',
        english: 'Harvest Time',
        marathi: 'कापणीची वेळ',
        gujarati: 'લણણીનો સમય'
      },
      message: {
        hindi: 'गेहूं की फसल कटाई के लिए तैयार है। अगले सप्ताह कटाई करें।',
        english: 'Wheat crop is ready for harvest. Harvest next week.',
        marathi: 'गहू पीक कापणीसाठी तयार आहे. पुढील आठवड्यात कापणी करा.',
        gujarati: 'ઘઉંનો પાક લણણી માટે તૈયાર છે. આગલા અઠવાડિયે લણણી કરો.'
      },
      timestamp: new Date('2024-01-12T16:45:00'),
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 5,
      type: 'fertilizer',
      priority: 'low',
      title: {
        hindi: 'उर्वरक का समय',
        english: 'Fertilizer Time',
        marathi: 'खताची वेळ',
        gujarati: 'ખાતરનો સમય'
      },
      message: {
        hindi: 'अगले सप्ताह नाइट्रोजन उर्वरक डालने का समय है।',
        english: 'Time to apply nitrogen fertilizer next week.',
        marathi: 'पुढील आठवड्यात नायट्रोजन खत टाकण्याची वेळ आहे.',
        gujarati: 'આગલા અઠવાડિયે નાઇટ્રોજન ખાતર નાખવાનો સમય છે.'
      },
      timestamp: new Date('2024-01-11T12:30:00'),
      icon: <Sun className="w-5 h-5" />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  const reminders = [
    {
      id: 1,
      title: {
        hindi: 'साप्ताहिक फसल निरीक्षण',
        english: 'Weekly Crop Inspection',
        marathi: 'साप्ताहिक पीक तपासणी',
        gujarati: 'સાપ્તાહિક પાક નિરીક્ષણ'
      },
      time: {
        hindi: 'हर रविवार सुबह 9:00 बजे',
        english: 'Every Sunday at 9:00 AM',
        marathi: 'दर रविवारी सकाळी 9:00 वाजता',
        gujarati: 'દર રવિવારે સવારે 9:00 વાગ્યે'
      },
      type: 'weekly',
      isActive: true
    },
    {
      id: 2,
      title: {
        hindi: 'मासिक मिट्टी परीक्षण',
        english: 'Monthly Soil Testing',
        marathi: 'मासिक माती चाचणी',
        gujarati: 'માસિક માટી પરીક્ષણ'
      },
      time: {
        hindi: 'हर महीने की 1 तारीख',
        english: '1st of every month',
        marathi: 'दर महिन्याच्या 1 तारखेला',
        gujarati: 'દર મહિનાની 1 તારીખે'
      },
      type: 'monthly',
      isActive: true
    },
    {
      id: 3,
      title: {
        hindi: 'कीट नियंत्रण स्प्रे',
        english: 'Pest Control Spray',
        marathi: 'कीड नियंत्रण फवारणी',
        gujarati: 'જંતુ નિયંત્રણ સ્પ્રે'
      },
      time: {
        hindi: 'हर 15 दिन',
        english: 'Every 15 days',
        marathi: 'दर 15 दिवसांनी',
        gujarati: 'દર 15 દિવસે'
      },
      type: 'biweekly',
      isActive: false
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'high') return alert.priority === 'high';
    if (filter === 'medium') return alert.priority === 'medium';
    if (filter === 'low') return alert.priority === 'low';
    return true;
  });

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return t.high;
      case 'medium': return t.medium;
      case 'low': return t.low;
      default: return priority;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
                  {t.pageTitle}
                </h1>
                <p className="text-sm text-gray-600">
                  {t.pageSubtitle}
                </p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-4 shadow-sm border mb-6">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: t.all, count: alerts.length },
              { key: 'high', label: t.high, count: alerts.filter(a => a.priority === 'high').length },
              { key: 'medium', label: t.medium, count: alerts.filter(a => a.priority === 'medium').length },
              { key: 'low', label: t.low, count: alerts.filter(a => a.priority === 'low').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t.alertsTitle}</h2>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`${alert.bgColor} ${alert.borderColor} border-2 rounded-xl p-4`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${alert.color} flex-shrink-0`}>
                    {alert.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{alert.title[language] || alert.title.hindi}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {getPriorityText(alert.priority)}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{alert.message[language] || alert.message.hindi}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{alert.timestamp.toLocaleString('hi-IN')}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t.remindersTitle}</h2>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`bg-white border-2 rounded-xl p-4 ${
                  reminder.isActive ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      reminder.isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <h3 className="font-bold text-gray-800">{reminder.title[language] || reminder.title.hindi}</h3>
                      <p className="text-sm text-gray-600">{reminder.time[language] || reminder.time.hindi}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reminder.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {reminder.isActive ? t.active : t.inactive}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Reminder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t.addReminderTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.reminderName}
              </label>
              <input
                type="text"
                placeholder={language === 'english' ? 'Example: Irrigation time' : 
                           language === 'marathi' ? 'उदाहरण: सिंचनाची वेळ' :
                           language === 'gujarati' ? 'ઉદાહરણ: સિંચાઈનો સમય' : 'उदाहरण: सिंचाई का समय'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.time}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>{t.daily}</option>
                <option>{t.weekly}</option>
                <option>{t.monthly}</option>
                <option>{t.custom}</option>
              </select>
            </div>
          </div>
          <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors">
            {t.addReminder}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsReminders;
