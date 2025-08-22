import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CommandLine {
  id: string;
  type: 'input' | 'output' | 'system';
  content: string;
  timestamp: Date;
}

const TerminalScreen = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLine[]>([
    {
      id: '1',
      type: 'system',
      content: 'KoH Labs Quantum Terminal v1.0.0',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'system',
      content: 'Type "help" for available commands',
      timestamp: new Date(),
    },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);
  const cursorAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Cursor blink animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    const responses: { [key: string]: string } = {
      'help': `Available commands:
• help - Show this help message
• about - About KoH Labs
• clear - Clear terminal
• status - System status
• quantum - Quantum system check
• exit - Return to home`,
      'about': 'KoH Labs - A quantum research environment where imagination meets innovation. Build without limits.',
      'status': `System Status:
• Quantum Core: ONLINE ✓
• AI Engine: ACTIVE ✓
• Neural Network: SYNCED ✓
• Memory: 87% available
• Processing: Optimal`,
      'quantum': '⚡ Quantum entanglement established. Reality manipulation ready.',
      'clear': 'CLEAR',
      'exit': 'EXIT',
    };

    if (cmd === 'clear') {
      setHistory([
        {
          id: Date.now().toString(),
          type: 'system',
          content: 'Terminal cleared',
          timestamp: new Date(),
        },
      ]);
    } else if (cmd === 'exit') {
      navigation.goBack();
    } else if (responses[cmd]) {
      return responses[cmd];
    } else {
      return `Command not found: ${command}\nType "help" for available commands`;
    }
    
    return null;
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const newInput: CommandLine = {
      id: Date.now().toString(),
      type: 'input',
      content: `> ${input}`,
      timestamp: new Date(),
    };
    
    const response = processCommand(input);
    
    if (response && response !== 'CLEAR' && response !== 'EXIT') {
      const newOutput: CommandLine = {
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: response,
        timestamp: new Date(),
      };
      setHistory([...history, newInput, newOutput]);
    } else if (response !== 'CLEAR' && response !== 'EXIT') {
      setHistory([...history, newInput]);
    }
    
    setInput('');
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <LinearGradient
      colors={['#000000', '#0a0a2e']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Quantum Terminal</Text>
            <View style={styles.statusIndicator}>
              <Animated.View
                style={[
                  styles.statusDot,
                  { opacity: cursorAnim },
                ]}
              />
            </View>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.outputContainer}
            contentContainerStyle={styles.outputContent}
            showsVerticalScrollIndicator={false}
          >
            {history.map((line) => (
              <View key={line.id} style={styles.line}>
                <Text
                  style={[
                    styles.lineText,
                    line.type === 'input' && styles.inputText,
                    line.type === 'system' && styles.systemText,
                  ]}
                >
                  {line.content}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <Text style={styles.prompt}>{'>'}</Text>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSubmit}
              placeholder="Enter command..."
              placeholderTextColor="#4a5568"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <Text style={styles.sendButtonText}>RUN</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)',
  },
  backButton: {
    padding: 5,
  },
  backText: {
    color: '#6366f1',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusIndicator: {
    width: 30,
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  outputContainer: {
    flex: 1,
    padding: 20,
  },
  outputContent: {
    paddingBottom: 20,
  },
  line: {
    marginBottom: 10,
  },
  lineText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
  },
  inputText: {
    color: '#6366f1',
  },
  systemText: {
    color: '#22c55e',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  prompt: {
    color: '#6366f1',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  sendButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  sendButtonText: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TerminalScreen;