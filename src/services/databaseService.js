// Database Service for storing user data and recommendations
class DatabaseService {
  constructor() {
    this.dbName = 'CropAI_DB';
    this.version = 1;
    this.db = null;
    this.initDB();
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Users store
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'phone' });
          userStore.createIndex('name', 'name', { unique: false });
        }
        
        // Recommendations store
        if (!db.objectStoreNames.contains('recommendations')) {
          const recStore = db.createObjectStore('recommendations', { keyPath: 'id', autoIncrement: true });
          recStore.createIndex('userPhone', 'userPhone', { unique: false });
          recStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        
        // Farm data store
        if (!db.objectStoreNames.contains('farmData')) {
          const farmStore = db.createObjectStore('farmData', { keyPath: 'id', autoIncrement: true });
          farmStore.createIndex('userPhone', 'userPhone', { unique: false });
        }
        
        // Alerts store
        if (!db.objectStoreNames.contains('alerts')) {
          const alertStore = db.createObjectStore('alerts', { keyPath: 'id', autoIncrement: true });
          alertStore.createIndex('userPhone', 'userPhone', { unique: false });
          alertStore.createIndex('priority', 'priority', { unique: false });
        }
      };
    });
  }

  async saveUser(userData) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      
      const userToSave = {
        ...userData,
        lastLogin: new Date().toISOString(),
        createdAt: userData.createdAt || new Date().toISOString()
      };
      
      await store.put(userToSave);
      return userToSave;
    } catch (error) {
      console.error('Error saving user:', error);
      // Fallback to localStorage
      localStorage.setItem(`user_${userData.phone}`, JSON.stringify(userData));
      return userData;
    }
  }

  async getUser(phone) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      
      return new Promise((resolve, reject) => {
        const request = store.get(phone);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting user:', error);
      // Fallback to localStorage
      const userData = localStorage.getItem(`user_${phone}`);
      return userData ? JSON.parse(userData) : null;
    }
  }

  async saveRecommendation(recommendation) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['recommendations'], 'readwrite');
      const store = transaction.objectStore('recommendations');
      
      const recToSave = {
        ...recommendation,
        timestamp: new Date().toISOString(),
        id: Date.now() // Simple ID generation
      };
      
      await store.add(recToSave);
      return recToSave;
    } catch (error) {
      console.error('Error saving recommendation:', error);
      // Fallback to localStorage
      const existing = JSON.parse(localStorage.getItem('recommendations') || '[]');
      existing.unshift(recommendation);
      localStorage.setItem('recommendations', JSON.stringify(existing.slice(0, 50))); // Keep last 50
      return recommendation;
    }
  }

  async getUserRecommendations(userPhone, limit = 10) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['recommendations'], 'readonly');
      const store = transaction.objectStore('recommendations');
      const index = store.index('userPhone');
      
      return new Promise((resolve, reject) => {
        const request = index.getAll(userPhone);
        request.onsuccess = () => {
          const results = request.result
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
          resolve(results);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Fallback to localStorage
      const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
      return recommendations.filter(rec => rec.userPhone === userPhone).slice(0, limit);
    }
  }

  async saveFarmData(farmData) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['farmData'], 'readwrite');
      const store = transaction.objectStore('farmData');
      
      const dataToSave = {
        ...farmData,
        timestamp: new Date().toISOString()
      };
      
      await store.add(dataToSave);
      return dataToSave;
    } catch (error) {
      console.error('Error saving farm data:', error);
      // Fallback to localStorage
      const existing = JSON.parse(localStorage.getItem('farmData') || '[]');
      existing.unshift(farmData);
      localStorage.setItem('farmData', JSON.stringify(existing.slice(0, 20)));
      return farmData;
    }
  }

  async saveAlert(alert) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['alerts'], 'readwrite');
      const store = transaction.objectStore('alerts');
      
      const alertToSave = {
        ...alert,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      await store.add(alertToSave);
      return alertToSave;
    } catch (error) {
      console.error('Error saving alert:', error);
      // Fallback to localStorage
      const existing = JSON.parse(localStorage.getItem('alerts') || '[]');
      existing.unshift(alert);
      localStorage.setItem('alerts', JSON.stringify(existing.slice(0, 100)));
      return alert;
    }
  }

  async getUserAlerts(userPhone, limit = 20) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['alerts'], 'readonly');
      const store = transaction.objectStore('alerts');
      const index = store.index('userPhone');
      
      return new Promise((resolve, reject) => {
        const request = index.getAll(userPhone);
        request.onsuccess = () => {
          const results = request.result
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
          resolve(results);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting alerts:', error);
      // Fallback to localStorage
      const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
      return alerts.filter(alert => alert.userPhone === userPhone).slice(0, limit);
    }
  }

  async markAlertAsRead(alertId) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['alerts'], 'readwrite');
      const store = transaction.objectStore('alerts');
      
      const alert = await store.get(alertId);
      if (alert) {
        alert.read = true;
        await store.put(alert);
      }
      return alert;
    } catch (error) {
      console.error('Error marking alert as read:', error);
      return null;
    }
  }

  async clearUserData(userPhone) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['users', 'recommendations', 'farmData', 'alerts'], 'readwrite');
      
      // Clear user
      await transaction.objectStore('users').delete(userPhone);
      
      // Clear user's recommendations
      const recStore = transaction.objectStore('recommendations');
      const recIndex = recStore.index('userPhone');
      const recRequest = recIndex.openCursor(userPhone);
      recRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
      
      // Clear user's farm data
      const farmStore = transaction.objectStore('farmData');
      const farmIndex = farmStore.index('userPhone');
      const farmRequest = farmIndex.openCursor(userPhone);
      farmRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
      
      // Clear user's alerts
      const alertStore = transaction.objectStore('alerts');
      const alertIndex = alertStore.index('userPhone');
      const alertRequest = alertIndex.openCursor(userPhone);
      alertRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
      
      return true;
    } catch (error) {
      console.error('Error clearing user data:', error);
      // Fallback - clear localStorage
      localStorage.removeItem(`user_${userPhone}`);
      return false;
    }
  }

  // Sync data to cloud (placeholder for future implementation)
  async syncToCloud(userData) {
    // This would integrate with Firebase, Supabase, or other cloud services
    console.log('Cloud sync placeholder - data would be synced here:', userData);
    return { success: true, message: 'Data synced locally (cloud sync not implemented)' };
  }
}

const databaseService = new DatabaseService();
export default databaseService;
