import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  const handlePress = (screen: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate(screen);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#000000', '#0a0a2e', '#16213e']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.logoBackground}>
              <Animated.View
                style={[
                  styles.rotatingBorder,
                  { transform: [{ rotate: rotation }] },
                ]}
              />
              <LinearGradient
                colors={['#6366f1', '#8b5cf6', '#d946ef']}
                style={styles.logo}
              >
                <Text style={styles.logoText}>koH</Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>KoH Labs</Text>
            <Text style={styles.subtitle}>Quantum Research Environment</Text>
          </Animated.View>

          {/* Feature Cards */}
          <Animated.View
            style={[
              styles.cardsContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => handlePress('Terminal')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(99, 102, 241, 0.2)', 'rgba(139, 92, 246, 0.1)']}
                style={styles.cardGradient}
              >
                <View style={styles.cardIcon}>
                  <Text style={styles.iconText}>⚡</Text>
                </View>
                <Text style={styles.cardTitle}>Quantum Terminal</Text>
                <Text style={styles.cardDescription}>
                  Access the command-line interface with AI-powered assistance
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => handlePress('Labs')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(217, 70, 239, 0.2)', 'rgba(99, 102, 241, 0.1)']}
                style={styles.cardGradient}
              >
                <View style={styles.cardIcon}>
                  <Text style={styles.iconText}>🧪</Text>
                </View>
                <Text style={styles.cardTitle}>Research Lab</Text>
                <Text style={styles.cardDescription}>
                  Explore experimental features and bleeding-edge innovations
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(34, 197, 94, 0.2)', 'rgba(99, 102, 241, 0.1)']}
                style={styles.cardGradient}
              >
                <View style={styles.cardIcon}>
                  <Text style={styles.iconText}>🚀</Text>
                </View>
                <Text style={styles.cardTitle}>DeFi Portal</Text>
                <Text style={styles.cardDescription}>
                  Coming soon: Connect to decentralized finance protocols
                </Text>
                <View style={styles.comingSoonBadge}>
                  <Text style={styles.comingSoonText}>SOON</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Status Bar */}
          <Animated.View
            style={[
              styles.statusBar,
              { opacity: fadeAnim },
            ]}
          >
            <View style={styles.statusItem}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Quantum Ready</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#8b5cf6' }]} />
              <Text style={styles.statusText}>AI Enhanced</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logoBackground: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  rotatingBorder: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderStyle: 'dashed',
    opacity: 0.3,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
  },
  cardsContainer: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 24,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  statusText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default HomeScreen;