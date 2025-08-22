import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const LabsScreen = ({ navigation }: any) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for experiment cards
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation for atoms
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const experiments = [
    {
      id: '1',
      title: 'Quantum Entanglement',
      description: 'Experimental quantum state manipulation',
      status: 'active',
      icon: '⚛️',
      progress: 0.7,
      color: '#6366f1',
    },
    {
      id: '2',
      title: 'Neural Interface',
      description: 'Brain-computer interface prototype',
      status: 'testing',
      icon: '🧠',
      progress: 0.4,
      color: '#8b5cf6',
    },
    {
      id: '3',
      title: 'Time Crystal',
      description: 'Temporal manipulation research',
      status: 'experimental',
      icon: '💎',
      progress: 0.2,
      color: '#d946ef',
    },
    {
      id: '4',
      title: 'Gravity Well',
      description: 'Gravitational field generator',
      status: 'theoretical',
      icon: '🌌',
      progress: 0.1,
      color: '#ec4899',
    },
  ];

  const handleExperimentPress = (experiment: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      experiment.title,
      `Status: ${experiment.status.toUpperCase()}\nProgress: ${Math.round(experiment.progress * 100)}%\n\n${experiment.description}`,
      [
        {
          text: 'Close',
          style: 'cancel',
        },
        {
          text: 'Activate',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Experiment Activated', `${experiment.title} is now running in the background`);
          },
        },
      ]
    );
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
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Research Lab</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Lab Status */}
          <View style={styles.statusCard}>
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.05)']}
              style={styles.statusGradient}
            >
              <View style={styles.statusHeader}>
                <Text style={styles.statusTitle}>Lab Status</Text>
                <View style={styles.statusIndicator}>
                  <Animated.View
                    style={[
                      styles.statusDot,
                      { transform: [{ scale: pulseAnim }] },
                    ]}
                  />
                  <Text style={styles.statusText}>OPERATIONAL</Text>
                </View>
              </View>
              
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>42</Text>
                  <Text style={styles.statLabel}>Experiments</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>∞</Text>
                  <Text style={styles.statLabel}>Possibilities</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>99%</Text>
                  <Text style={styles.statLabel}>Success Rate</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Experiments */}
          <Text style={styles.sectionTitle}>Active Experiments</Text>
          
          {experiments.map((experiment) => (
            <TouchableOpacity
              key={experiment.id}
              onPress={() => handleExperimentPress(experiment)}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[
                  styles.experimentCard,
                  experiment.status === 'active' && {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                <LinearGradient
                  colors={[
                    `${experiment.color}20`,
                    `${experiment.color}10`,
                  ]}
                  style={styles.experimentGradient}
                >
                  <View style={styles.experimentHeader}>
                    <View style={styles.experimentIcon}>
                      <Animated.Text
                        style={[
                          styles.iconText,
                          { transform: [{ rotate: rotation }] },
                        ]}
                      >
                        {experiment.icon}
                      </Animated.Text>
                    </View>
                    <View style={styles.experimentInfo}>
                      <Text style={styles.experimentTitle}>
                        {experiment.title}
                      </Text>
                      <Text style={styles.experimentDescription}>
                        {experiment.description}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <LinearGradient
                        colors={[experiment.color, `${experiment.color}80`]}
                        style={[
                          styles.progressFill,
                          { width: `${experiment.progress * 100}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {Math.round(experiment.progress * 100)}%
                    </Text>
                  </View>
                  
                  <View style={styles.statusBadge}>
                    <Text
                      style={[
                        styles.statusBadgeText,
                        { color: experiment.color },
                      ]}
                    >
                      {experiment.status.toUpperCase()}
                    </Text>
                  </View>
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          ))}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              "The future is already here — it's just not evenly distributed."
            </Text>
            <Text style={styles.footerAuthor}>- William Gibson</Text>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  backText: {
    color: '#6366f1',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  statusCard: {
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statusGradient: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusIndicator: {
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
    color: '#22c55e',
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  experimentCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  experimentGradient: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  experimentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  experimentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  experimentInfo: {
    flex: 1,
  },
  experimentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  experimentDescription: {
    fontSize: 12,
    color: '#9ca3af',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#9ca3af',
    minWidth: 35,
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerAuthor: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default LabsScreen;