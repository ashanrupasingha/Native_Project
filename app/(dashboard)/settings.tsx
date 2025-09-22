import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [techModalVisible, setTechModalVisible] = useState(false);

  const handleThemeChange = (value: boolean) => {
    setDarkMode(value);
    Alert.alert(
      'Theme Changed',
      `Switched to ${value ? 'Dark' : 'Light'} mode`,
      [{ text: 'OK' }]
    );
  };

  const handleNotificationChange = (value: boolean) => {
    setNotifications(value);
    Alert.alert(
      'Notifications',
      `Notifications ${value ? 'enabled' : 'disabled'}`,
      [{ text: 'OK' }]
    );
  };

  const handleLocationChange = (value: boolean) => {
    setLocationServices(value);
    Alert.alert(
      'Location Services',
      `Location services ${value ? 'enabled' : 'disabled'}`,
      [{ text: 'OK' }]
    );
  };

  const handleSocialPress = (platform: string, url: string): void => {
    Alert.alert(
      `Open ${platform}`,
      `Would you like to open ${platform}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => Linking.openURL(url) }
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }: any) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 20,
        marginVertical: 6,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
      </View>
      
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#fff',
          marginBottom: 2,
        }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            {subtitle}
          </Text>
        )}
      </View>
      
      {rightComponent || (
        <Text style={{
          fontSize: 16,
          color: 'rgba(255, 255, 255, 0.6)',
        }}>
          ›
        </Text>
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginHorizontal: 24,
      marginTop: 32,
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: 1,
    }}>
      {title}
    </Text>
  );

  const AboutModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={aboutModalVisible}
      onRequestClose={() => setAboutModalVisible(false)}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 24,
          margin: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          maxHeight: '80%',
        }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: 20,
            }}>
              About FloraLink 🌿
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: '#666',
              lineHeight: 24,
              marginBottom: 16,
              textAlign: 'center',
            }}>
              FloraLink is your smart plant companion — helping you care for your plants with tips, reminders, and guides.
            </Text>
            
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                🌱 Features:
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                • Smart plant care reminders{'\n'}
                • Identify plants with AI recognition{'\n'}
                • Tips for watering & sunlight{'\n'}
                • Track your plant collection{'\n'}
                • Community sharing & learning
              </Text>
            </View>
            
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                📱 Version: 1.0.0
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                Released: September 2025
              </Text>
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#888',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              Made with ❤️ for plant lovers
            </Text>
          </ScrollView>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#16a34a',
              borderRadius: 12,
              paddingVertical: 12,
              marginTop: 20,
            }}
            onPress={() => setAboutModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const TechnologiesModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={techModalVisible}
      onRequestClose={() => setTechModalVisible(false)}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 24,
          margin: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          maxHeight: '80%',
        }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: 20,
            }}>
              Technologies Used 🚀
            </Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                📱 Frontend:
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                • React Native - Cross-platform mobile development{'\n'}
                • Expo Router - Navigation and routing{'\n'}
                • TypeScript - Type-safe development
              </Text>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                🔧 Tools & Libraries:
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                • React Hooks - State management{'\n'}
                • AsyncStorage - Local data persistence{'\n'}
                • Expo Image Picker - Plant photo uploads{'\n'}
                • Vector Icons - Beautiful iconography
              </Text>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                🌐 Backend & Services:
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                • REST API - Plant data communication{'\n'}
                • Firebase - Authentication & Cloud storage{'\n'}
                • AI Plant Recognition API - Identify plants
              </Text>
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#888',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              Built with modern tech for plant care enthusiasts
            </Text>
          </ScrollView>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#059669',
              borderRadius: 12,
              paddingVertical: 12,
              marginTop: 20,
            }}
            onPress={() => setTechModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#16a34a' }}>
      {/* Background */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#16a34a',
      }} />
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
      }} />

      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 32,
          paddingHorizontal: 20,
        }}>
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <Text style={{ fontSize: 36 }}>🌿</Text>
          </View>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}>
            Settings
          </Text>
          <Text style={{
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            marginTop: 4,
          }}>
            Customize your FloraLink experience
          </Text>
        </View>

        {/* Preferences Section */}
        <SectionHeader title="Preferences" />
        
        <SettingItem
          icon="🌙"
          title="Dark Mode"
          subtitle={darkMode ? "Dark theme enabled" : "Light theme enabled"}
          rightComponent={
            <Switch
              value={darkMode}
              onValueChange={handleThemeChange}
              trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#059669' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          }
        />
        
        <SettingItem
          icon="🔔"
          title="Notifications"
          subtitle={notifications ? "Get plant care reminders" : "Notifications disabled"}
          rightComponent={  
            <Switch
              value={notifications}
              onValueChange={handleNotificationChange}
              trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#059669' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          }
        />
        
        <SettingItem
          icon="📍"
          title="Location Services"
          subtitle={locationServices ? "Enable plant zone detection" : "Location access disabled"}
          rightComponent={
            <Switch
              value={locationServices}
              onValueChange={handleLocationChange}
              trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#059669' }}
              thumbColor={locationServices ? '#fff' : '#f4f3f4'}
            />
          }
        />

        {/* Account Section */}
        <SectionHeader title="Account" />
        
        <SettingItem
          icon="👤"
          title="Profile"
          subtitle="Manage your FloraLink account"
          onPress={() => Alert.alert('Profile', 'Profile settings coming soon!')}
        />
        
        <SettingItem
          icon="🔒"
          title="Privacy & Security"
          subtitle="Control your app privacy"
          onPress={() => Alert.alert('Privacy', 'Privacy settings coming soon!')}
        />

        {/* About Section */}
        <SectionHeader title="Information" />
        
        <SettingItem
          icon="ℹ️"
          title="About"
          subtitle="Learn more about FloraLink"
          onPress={() => setAboutModalVisible(true)}
        />
        
        <SettingItem
          icon="🔧"
          title="Technologies"
          subtitle="View technologies powering this app"
          onPress={() => setTechModalVisible(true)}
        />
        
        <SettingItem
          icon="📱"
          title="Version"
          subtitle="1.0.0 - Latest version"
          onPress={() => Alert.alert('Version', 'You are using the latest version!')}
        />

        {/* Social Section */}
        <SectionHeader title="Connect" />
        
        <SettingItem
          icon="🐦"
          title="Twitter"
          subtitle="Follow FloraLink updates"
          onPress={() => handleSocialPress('Twitter', 'https://twitter.com')}
        />
        
        <SettingItem
          icon="💼"
          title="LinkedIn"
          subtitle="Connect with FloraLink team"
          onPress={() => handleSocialPress('LinkedIn', 'https://linkedin.com')}
        />
        
        <SettingItem
          icon="💻"
          title="GitHub"
          subtitle="View FloraLink source code"
          onPress={() => handleSocialPress('GitHub', 'https://github.com/hansakaV')}
        />

        {/* Support Section */}
        <SectionHeader title="Support" />
        
        <SettingItem
          icon="💬"
          title="Contact Support"
          subtitle="Get help with FloraLink"
          onPress={() => Alert.alert('Support', 'Contact: support@floralink.com')}
        />
        
        <SettingItem
          icon="⭐"
          title="Rate App"
          subtitle="Rate us on the app store"
          onPress={() => Alert.alert('Rate App', 'Thank you for supporting FloraLink!')}
        />
        
        <SettingItem
          icon="🚪"
          title="Sign Out"
          subtitle="Sign out of your account"
          onPress={() => Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Sign Out', style: 'destructive', onPress: () => Alert.alert('Signed Out', 'You have been signed out.') }
            ]
          )}
        />

        {/* Footer */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 32,
          paddingHorizontal: 40,
        }}>
          <Text style={{
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            lineHeight: 20,
          }}>
            Made with 🌱 by FloraLink{'\n'}
            © 2025 FloraLink
          </Text>
        </View>
      </ScrollView>

      {/* Modals */}
      <AboutModal />
      <TechnologiesModal />
    </SafeAreaView>
  );
};

export default SettingsScreen;
