import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { X, Trophy, AlertTriangle, Mail } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const COUNTRIES = [
  { name: 'Japonya', capital: 'Tokyo', flag: '🇯🇵' },
  { name: 'Küba', capital: 'Havana', flag: '🇨🇺' },
  { name: 'Fas', capital: 'Rabat', flag: '🇲🇦' },
  { name: 'İspanya', capital: 'Madrid', flag: '🇪🇸' },
  { name: 'Amerika Birleşik Devletleri', capital: 'Washington, D.C.', flag: '🇺🇸' },
  { name: 'İtalya', capital: 'Roma', flag: '🇮🇹' },
  { name: 'Fransa', capital: 'Paris', flag: '🇫🇷' },
  { name: 'İngiltere', capital: 'Londra', flag: '🇬🇧' },
  { name: 'Almanya', capital: 'Berlin', flag: '🇩🇪' },
  { name: 'Brezilya', capital: 'Brasília', flag: '🇧🇷' },
  { name: 'Arjantin', capital: 'Buenos Aires', flag: '🇦🇷' },
  { name: 'Mısır', capital: 'Kahire', flag: '🇪🇬' },
  { name: 'Güney Kore', capital: 'Seul', flag: '🇰🇷' },
  { name: 'Hindistan', capital: 'Yeni Delhi', flag: '🇮🇳' },
  { name: 'Rusya', capital: 'Moskova', flag: '🇷🇺' },
  { name: 'Avustralya', capital: 'Kanberra', flag: '🇦🇺' },
  { name: 'Kanada', capital: 'Ottawa', flag: '🇨🇦' },
  { name: 'Endonezya', capital: 'Cakarta', flag: '🇮🇩' },
  { name: 'Hollanda', capital: 'Amsterdam', flag: '🇳🇱' },
  { name: 'Yunanistan', capital: 'Atina', flag: '🇬🇷' }
];

// Fisher-Yates Shuffle
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function QuizGame({ visible, onClose, onContact }) {
  const [score, setScore] = useState(0);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost

  useEffect(() => {
    if (visible) {
      startGame();
    }
  }, [visible]);

  const startGame = () => {
    setScore(0);
    setGameState('playing');
    nextQuestion();
  };

  const nextQuestion = () => {
    // Select a random country
    const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    
    // Select 3 random wrong capitals
    let wrongOptions = COUNTRIES.filter(c => c.name !== country.name);
    wrongOptions = shuffleArray(wrongOptions).slice(0, 3).map(c => c.capital);
    
    // Combine and shuffle options
    const allOptions = shuffleArray([...wrongOptions, country.capital]);
    
    setCurrentCountry(country);
    setOptions(allOptions);
  };

  const handleAnswer = (selectedCapital) => {
    if (selectedCapital === currentCountry.capital) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore >= 5) {
        setGameState('won');
      } else {
        nextQuestion();
      }
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setGameState('lost');
    }
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Arka plan (Boşluğa basınca kapatmak için) */}
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={onClose} 
        className="absolute inset-0 bg-black/80" 
      />
      
      <View className="flex-1 justify-center items-center px-4" pointerEvents="box-none">
        
        {/* Kapat Butonu */}
        <TouchableOpacity 
          onPress={onClose}
          className="absolute top-16 right-6 bg-zinc-800/80 p-3 rounded-full border border-zinc-700"
          activeOpacity={0.7}
        >
          <X color="#fff" size={24} />
        </TouchableOpacity>

        {gameState === 'playing' && currentCountry && (
          <Animated.View 
            entering={ZoomIn.duration(400).springify()}
            className="bg-zinc-900/90 border border-zinc-700/50 p-6 rounded-3xl w-full max-w-sm shadow-xl shadow-teal-500/10"
          >
            <View className="items-center mb-6">
              <View className="bg-teal-500/10 px-4 py-1.5 rounded-full border border-teal-500/20 mb-6">
                <Text className="text-teal-400 font-sans-bold text-sm">Gizli Kâşif Oyunu</Text>
              </View>
              <Text className="text-8xl mb-4">{currentCountry.flag}</Text>
              <Text className="text-2xl text-white font-display-bold text-center mb-2">
                {currentCountry.name}
              </Text>
              <Text className="text-zinc-400 font-sans text-base">
                Başkenti neresidir?
              </Text>
            </View>

            <View className="gap-3">
              {options.map((opt, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleAnswer(opt)}
                  activeOpacity={0.7}
                  className="bg-zinc-800/80 border border-zinc-700 p-4 rounded-xl items-center"
                >
                  <Text className="text-white font-sans-medium text-lg">{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="mt-8 items-center">
              <Text className="text-zinc-500 font-sans-bold text-sm tracking-widest uppercase">
                SKOR: {score} / 5
              </Text>
            </View>
          </Animated.View>
        )}

        {gameState === 'lost' && (
          <Animated.View 
            entering={FadeInDown.duration(500).springify()}
            className="bg-zinc-900/90 border border-red-900/30 p-8 rounded-3xl w-full max-w-sm items-center shadow-2xl shadow-red-500/10"
          >
            <View className="bg-red-500/10 p-4 rounded-full border border-red-500/20 mb-6">
              <AlertTriangle color="#ef4444" size={48} />
            </View>
            <Text className="text-3xl text-white font-display-bold mb-4 text-center">Eyvah!</Text>
            <Text className="text-zinc-300 text-center font-sans text-base leading-relaxed mb-8">
              Başkentleri biraz karıştırmış olabilirsin ama e-ticaret süreçlerini ve dijital operasyonları asla karıştırmam! 
              {'\n\n'}Hadi iş konuşalım.
            </Text>
            
            <TouchableOpacity
              onPress={() => {
                onClose();
                onContact();
              }}
              className="bg-teal-500 w-full py-4 rounded-xl flex-row justify-center items-center mb-3 shadow-lg shadow-teal-500/30"
              activeOpacity={0.8}
            >
              <Mail color="white" size={20} className="mr-2" />
              <Text className="text-white font-sans-bold text-lg">E-posta Gönder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={startGame}
              className="bg-zinc-800 w-full py-4 rounded-xl items-center border border-zinc-700"
              activeOpacity={0.8}
            >
              <Text className="text-zinc-300 font-sans-bold text-base">Tekrar Dene</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {gameState === 'won' && (
          <Animated.View 
            entering={FadeInDown.duration(500).springify()}
            className="bg-zinc-900/90 border border-yellow-900/30 p-8 rounded-3xl w-full max-w-sm items-center shadow-2xl shadow-yellow-500/10"
          >
            <View className="bg-yellow-500/10 p-4 rounded-full border border-yellow-500/20 mb-6">
              <Trophy color="#eab308" size={48} />
            </View>
            <Text className="text-3xl text-white font-display-bold mb-4 text-center">Harika!</Text>
            <Text className="text-zinc-300 text-center font-sans text-base leading-relaxed mb-8">
              Gerçek bir dünya gezginisiniz! Coğrafyada bu kadar iyiyseniz, e-ticaret projelerinde birlikte sınırları aşabiliriz.
            </Text>
            
            <TouchableOpacity
              onPress={() => {
                onClose();
                onContact();
              }}
              className="bg-teal-500 w-full py-4 rounded-xl flex-row justify-center items-center mb-3 shadow-lg shadow-teal-500/30"
              activeOpacity={0.8}
            >
              <Mail color="white" size={20} className="mr-2" />
              <Text className="text-white font-sans-bold text-lg">Projeyi Konuşalım</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

      </View>
    </Modal>
  );
}
