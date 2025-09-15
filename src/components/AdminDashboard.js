import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Will be used for future navigation features
import { 
  LogOut, 
  Users, 
  BarChart3, 
  Settings, 
  TrendingUp, 
  Globe, 
  Database,
  Shield,
  Activity
} from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  // const navigate = useNavigate(); // Will be used for future navigation features

  const stats = [
    {
      title: 'कुल किसान',
      value: '2,847',
      change: '+12%',
      icon: <Users className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'सक्रिय सिफारिशें',
      value: '1,234',
      change: '+8%',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'सफलता दर',
      value: '87%',
      change: '+3%',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'ऑनलाइन उपयोगकर्ता',
      value: '456',
      change: '+15%',
      icon: <Activity className="w-8 h-8" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'राम सिंह',
      action: 'नई फसल सिफारिश मांगी',
      time: '2 मिनट पहले',
      type: 'recommendation'
    },
    {
      id: 2,
      user: 'सीता देवी',
      action: 'प्रोफाइल अपडेट किया',
      time: '5 मिनट पहले',
      type: 'profile'
    },
    {
      id: 3,
      user: 'गोपाल शर्मा',
      action: 'अलर्ट सेट किया',
      time: '10 मिनट पहले',
      type: 'alert'
    },
    {
      id: 4,
      user: 'मीरा पटेल',
      action: 'फसल विवरण देखा',
      time: '15 मिनट पहले',
      type: 'view'
    }
  ];

  const adminFeatures = [
    {
      title: 'उपयोगकर्ता प्रबंधन',
      description: 'किसानों के खातों का प्रबंधन करें',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      route: '/admin/users'
    },
    {
      title: 'डेटा एनालिटिक्स',
      description: 'फसल डेटा का विश्लेषण करें',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      route: '/admin/analytics'
    },
    {
      title: 'AI मॉडल प्रबंधन',
      description: 'क्रॉप रेकमेंडेशन मॉडल को अपडेट करें',
      icon: <Database className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      route: '/admin/models'
    },
    {
      title: 'फसल डेटाबेस अपलोड',
      description: 'नई फसल जानकारी और डेटा अपलोड करें',
      icon: <Database className="w-6 h-6" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      route: '/admin/crop-database'
    },
    {
      title: 'सिस्टम सेटिंग्स',
      description: 'प्लेटफॉर्म सेटिंग्स कॉन्फ़िगर करें',
      icon: <Settings className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      route: '/admin/settings'
    },
    {
      title: 'सुरक्षा केंद्र',
      description: 'सिस्टम सुरक्षा और लॉग्स देखें',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      route: '/admin/security'
    },
    {
      title: 'भौगोलिक डेटा',
      description: 'किसानों के स्थान और क्षेत्र डेटा',
      icon: <Globe className="w-6 h-6" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      route: '/admin/geography'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">एडमिन डैशबोर्ड</h1>
                <p className="text-sm text-gray-600">क्रॉपएआई प्रबंधन केंद्र</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">सिस्टम ऑनलाइन</span>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">लॉगआउट</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">
              नमस्ते, एडमिन! 👋
            </h2>
            <p className="text-blue-100 text-lg">
              आज का सिस्टम सारांश और प्रबंधन विकल्प
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-green-600">{stat.change}</div>
                </div>
              </div>
              <h3 className="font-bold text-gray-800">{stat.title}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Features */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-6">प्रबंधन विकल्प</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adminFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${feature.bgColor} p-3 rounded-lg`}>
                      <div className={feature.color}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">हाल की गतिविधियां</h3>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                      <p className="text-xs text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Crop Database Upload */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">फसल डेटाबेस अपलोड</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-3">CSV फाइल अपलोड</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-3">फसल डेटा CSV फाइल अपलोड करें</p>
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  id="crop-csv-upload"
                />
                <label
                  htmlFor="crop-csv-upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  फाइल चुनें
                </label>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3">AI Integration Port</h4>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="font-bold text-yellow-800">Backend Model Here</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  <strong>API Endpoint:</strong> POST /api/admin/upload-crop-database<br/>
                  <strong>Model:</strong> Gemini API + Custom ML Model<br/>
                  <strong>Input:</strong> CSV file with crop data, soil requirements, weather conditions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">सिस्टम स्थिति</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">AI मॉडल</p>
                <p className="text-sm text-gray-600">सक्रिय और काम कर रहा</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">डेटाबेस</p>
                <p className="text-sm text-gray-600">सभी सेवाएं ऑनलाइन</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">बैकअप</p>
                <p className="text-sm text-gray-600">अगला बैकअप: 2 घंटे में</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
