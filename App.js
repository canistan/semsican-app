import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Linking, Image, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { 
  Users, 
  Settings, 
  BarChart, 
  Cloud, 
  ShieldCheck, 
  Rocket, 
  Mail, 
  ChevronDown,
  Globe,
  Music,
  Trees,
  Activity
} from 'lucide-react-native';
import './global.css';
import AuroraBackground from './components/AuroraBackground';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SpaceGrotesk_400Regular, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';

const travelPhotos = [
  { id: 1, country: "Yunanistan", flag: "🇬🇷", src: "https://semsicanalbayrak.com/travel/athina.jpg" },
  { id: 2, country: "Japonya", flag: "🇯🇵", src: "https://semsicanalbayrak.com/travel/japonya.jpg" },
  { id: 3, country: "Küba", flag: "🇨🇺", src: "https://semsicanalbayrak.com/travel/kuba.jpg" },
  { id: 4, country: "Bali", flag: "🇮🇩", src: "https://semsicanalbayrak.com/travel/bali.jpg" },
  { id: 5, country: "İngiltere", flag: "🇬🇧", src: "https://semsicanalbayrak.com/travel/londra.jpg" },
  { id: 6, country: "Hollanda", flag: "🇳🇱", src: "https://semsicanalbayrak.com/travel/amsterdam.jpg" },
  { id: 7, country: "Meksika", flag: "🇲🇽", src: "https://semsicanalbayrak.com/travel/meksika.jpg" },
  { id: 8, country: "Fas", flag: "🇲🇦", src: "https://semsicanalbayrak.com/travel/fas.jpg" },
  { id: 9, country: "Danimarka", flag: "🇩🇰", src: "https://semsicanalbayrak.com/travel/danimarka.jpg" },
  { id: 10, country: "Sri Lanka", flag: "🇱🇰", src: "https://semsicanalbayrak.com/travel/srilanka.jpg" },
  { id: 11, country: "Maldivler", flag: "🇲🇻", src: "https://semsicanalbayrak.com/travel/maldivler.jpg" },
  { id: 12, country: "Almanya", flag: "🇩🇪", src: "https://semsicanalbayrak.com/travel/almanya.jpg" },
  { id: 13, country: "Fransa", flag: "🇫🇷", src: "https://semsicanalbayrak.com/travel/fransa.jpg" },
  { id: 14, country: "Belçika", flag: "🇧🇪", src: "https://semsicanalbayrak.com/travel/belcika.jpg" },
  { id: 15, country: "İtalya", flag: "🇮🇹", src: "https://semsicanalbayrak.com/travel/italya.jpg" }
];

const visitedCountries = [
  { name: 'Amerika', flag: '🇺🇸' }, { name: 'Kolombiya', flag: '🇨🇴' }, { name: 'Küba', flag: '🇨🇺' },
  { name: 'Meksika', flag: '🇲🇽' }, { name: 'İngiltere', flag: '🇬🇧' }, { name: 'Fas', flag: '🇲🇦' },
  { name: 'Fransa', flag: '🇫🇷' }, { name: 'Belçika', flag: '🇧🇪' }, { name: 'Hollanda', flag: '🇳🇱' },
  { name: 'Almanya', flag: '🇩🇪' }, { name: 'İsviçre', flag: '🇨🇭' }, { name: 'Danimarka', flag: '🇩🇰' },
  { name: 'Polonya', flag: '🇵🇱' }, { name: 'İtalya', flag: '🇮🇹' }, { name: 'Hırvatistan', flag: '🇭🇷' },
  { name: 'Yunanistan', flag: '🇬🇷' }, { name: 'Rusya', flag: '🇷🇺' }, { name: 'Gürcistan', flag: '🇬🇪' },
  { name: 'Sri Lanka', flag: '🇱🇰' }, { name: 'Japonya', flag: '🇯🇵' }, { name: 'Malezya', flag: '🇲🇾' },
  { name: 'Singapur', flag: '🇸🇬' }, { name: 'Endonezya', flag: '🇮🇩' }, { name: 'Maldivler', flag: '🇲🇻' }
];

const projectsData = [
  { tag: "Kurumsal", title: "The Cliff Sustainability", desc: "Sürdürülebilirlik alanında dönüşüm yaratan web sitesi tasarımı.", techs: ["React", "Tailwind"], url: "https://thecliff.com.tr/", img: "https://image.thum.io/get/width/600/crop/800/https://thecliff.com.tr/" },
  { tag: "E-Ticaret", title: "Dilim", desc: "Modern ve kullanıcı dostu bir yaklaşımla tasarlanmış marka kimliği.", techs: ["Vite", "UI/UX"], url: "https://dilim.semsicanalbayrak.com/", img: "https://image.thum.io/get/width/600/crop/800/https://dilim.semsicanalbayrak.com/" },
  { tag: "Kurumsal", title: "Puzzle Derneği", desc: "Sosyal sorumluluk projeleri için geliştirilen, erişilebilir platform.", techs: ["Next.js", "Web"], url: "https://puzzledernegi.semsicanalbayrak.com/", img: "https://image.thum.io/get/width/600/crop/800/https://puzzledernegi.semsicanalbayrak.com/" },
  { tag: "E-Ticaret", title: "Manasor Olive Oil", desc: "Premium zeytinyağı markası için e-ticaret sitesi ve marka kimliği.", techs: ["React", "UI/UX"], url: "https://manasor.semsicanalbayrak.com/", img: "https://image.thum.io/get/width/600/crop/800/https://manasor.semsicanalbayrak.com/" }
];

export default function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % travelPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [fontsLoaded] = useFonts({
    'Inter': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'SpaceGrotesk': SpaceGrotesk_400Regular,
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
  });

  const openMail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL('mailto:info@semsicanalbayrak.com');
  };

  const openWhatsApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL('https://wa.me/905077880172');
  };

  const openProject = (url) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: '#09090b' }}>
      <AuroraBackground />
      <SafeAreaView className="flex-1 bg-transparent" edges={['top', 'left', 'right']}>
        <StatusBar style="light" />
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO SECTION */}
          <Animated.View 
            entering={FadeInDown.duration(1000).springify()}
            className="px-6 pt-12 pb-16 items-center"
          >
            {/* Dinamik Profil Resmi */}
            <View className="items-center mb-6">
              <View className="w-32 h-32 rounded-full border-4 border-zinc-800 p-1 shadow-2xl shadow-teal-500/20 overflow-hidden bg-zinc-900">
                <Image 
                  source={{ uri: travelPhotos[currentPhotoIndex].src }} 
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
              <View className="mt-3 flex-row items-center bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-800">
                <Text className="text-lg mr-2">{travelPhotos[currentPhotoIndex].flag}</Text>
                <Text className="text-zinc-300 font-sans-medium text-xs">{travelPhotos[currentPhotoIndex].country}</Text>
              </View>
            </View>

            <View className="bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full mb-6">
              <Text className="text-zinc-300 text-sm font-sans-medium">✨ Dijital Danışman</Text>
            </View>
            
            <Text className="text-xl text-zinc-400 mb-2 font-display">Merhaba, ben</Text>
            <Text className="text-4xl font-display-bold text-white text-center mb-4">
              Şemsi Can <Text className="text-teal-400">Albayrak</Text>
            </Text>
            
            <Text className="text-lg text-zinc-300 text-center font-sans-medium mb-6 px-4">
              Dijital Üretici & Dünya Gezgini
            </Text>

            <Text className="text-zinc-500 text-center leading-relaxed mb-10 px-4 text-base font-sans">
              Dijital dünyada fikirleri gerçeğe dönüştürüyorum. Modern web teknolojileri ile kullanıcı odaklı, etkileyici ve performanslı deneyimler tasarlıyorum.
            </Text>
            
            <View className="flex-row gap-4 w-full px-4">
              <TouchableOpacity 
                onPress={openWhatsApp}
                className="flex-1 bg-teal-500 flex-row items-center justify-center py-4 rounded-full shadow-lg shadow-teal-500/30"
                activeOpacity={0.7}
              >
                <Text className="text-white font-sans-bold text-lg">WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={openMail}
                className="flex-1 bg-zinc-800 flex-row items-center justify-center py-4 rounded-full border border-zinc-700"
                activeOpacity={0.7}
              >
                <Mail color="white" size={20} style={{ marginRight: 8 }} />
                <Text className="text-white font-sans-bold text-lg">E-posta</Text>
              </TouchableOpacity>
            </View>

            <Animated.View 
              entering={FadeInUp.delay(1000).duration(2000)}
              className="mt-16 opacity-40"
            >
              <ChevronDown color="#a1a1aa" size={32} />
            </Animated.View>
          </Animated.View>

          {/* HİZMETLER (Neler Yapıyorum) */}
          <Animated.View 
            entering={FadeInDown.delay(300).duration(1000).springify()}
            className="px-6 py-10 bg-zinc-900/40"
          >
            <View className="flex-row items-center mb-8">
              <View className="w-8 h-[2px] bg-teal-500 mr-4" />
              <Text className="text-2xl font-display-bold text-white">Neler Yapıyorum?</Text>
            </View>

            <Text className="text-lg font-sans-semibold text-zinc-300 mb-2">Teknik Operasyonlar ve Dijital Strateji</Text>
            <Text className="text-zinc-500 mb-8 leading-relaxed font-sans">
              E-ticaret ekosisteminde, teknik altyapı ile satış hedefleri arasındaki köprüyü yöneten; karmaşık dijital süreçleri ciroya ve verimliliğe dönüştüren bir stratejistim.
            </Text>
            
            <View className="flex-col gap-4">
              {/* Hizmet Kartları */}
              {[
                { icon: Users, title: "Talent & Team Orchestration", desc: "Yazılım ve iş birimleri arasında anlaşılır, çevik iş akışları kurgularım." },
                { icon: Settings, title: "MarTech & CRM Ekolojisi", desc: "CLV'yi maksimize eden teknik pazarlama altyapıları tasarlarım." },
                { icon: BarChart, title: "Veri Odaklı Performans Yönetimi", desc: "Karar destek mekanizmalarını e-ticaret hedefleriyle hizalarım." },
                { icon: Cloud, title: "Ölçeklenebilir Dijital Altyapı", desc: "Bulut entegrasyonları ve best-of-breed teknoloji yığınları belirlerim." },
                { icon: ShieldCheck, title: "Dijital Mevzuat & Güvenlik", desc: "İYS, GDPR/KVKK uyumlu güvenilir veri politikaları yönetirim." }
              ].map((item, index) => (
                <Animated.View 
                  key={index}
                  entering={FadeInDown.delay(400 + (index * 100)).duration(800).springify()}
                  className="bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl flex-row items-start mb-2"
                >
                  <View className="bg-teal-500/10 p-3 rounded-xl mr-4 mt-1">
                    <item.icon color="#14b8a6" size={22} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-sans-bold text-base mb-1">{item.title}</Text>
                    <Text className="text-zinc-400 leading-relaxed text-sm font-sans">{item.desc}</Text>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* PROJELER SECTION */}
          <Animated.View 
            entering={FadeInDown.delay(500).duration(1000).springify()}
            className="px-6 py-12"
          >
            <View className="flex-row items-center mb-8">
              <View className="w-8 h-[2px] bg-teal-500 mr-4" />
              <Text className="text-2xl font-display-bold text-white">Son Çalışmalarım</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible pb-4">
              {projectsData.map((project, idx) => (
                <TouchableOpacity 
                  key={idx}
                  onPress={() => openProject(project.url)}
                  activeOpacity={0.9}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl mr-4 w-72 overflow-hidden"
                >
                  <ImageBackground 
                    source={{ uri: project.img }} 
                    className="h-32 justify-end p-4"
                    imageStyle={{ opacity: 0.6 }}
                  >
                    <View className="bg-teal-500/90 px-3 py-1 rounded-full self-start mb-2 backdrop-blur-md">
                      <Text className="text-white text-[10px] font-sans-bold">{project.tag}</Text>
                    </View>
                  </ImageBackground>
                  <View className="p-5 bg-zinc-900/95">
                    <Text className="text-white font-sans-bold text-lg mb-2">{project.title}</Text>
                    <Text className="text-zinc-400 text-sm leading-relaxed mb-4 font-sans h-14">
                      {project.desc}
                    </Text>
                    <View className="flex-row gap-2">
                      {project.techs.map((tech, i) => (
                        <Text key={i} className="text-zinc-400 text-xs font-sans-medium bg-zinc-800/80 border border-zinc-700/50 px-2 py-1 rounded">
                          {tech}
                        </Text>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>

          {/* HAKKIMDA SECTION */}
          <Animated.View 
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="px-6 py-10 bg-zinc-900/40"
          >
            <View className="flex-row items-center mb-8">
              <View className="w-8 h-[2px] bg-teal-500 mr-4" />
              <Text className="text-2xl font-display-bold text-white">Bütün mümkünlerin kıyısındayız</Text>
            </View>

            <View className="flex-row flex-wrap justify-between gap-y-4 mb-6">
              {[
                { icon: Globe, title: "Dünya Gezgini", desc: "Amerika'dan Japonya'ya maceralar." },
                { icon: Music, title: "Kültür & Müzik", desc: "Yeni ritimler ve kültürler keşfi." },
                { icon: Trees, title: "Doğa Tutkunu", desc: "Doğaya ve yaşama derin sevgi." },
                { icon: Activity, title: "Dinamik Yaşam", desc: "Futbol, sörf ve bitmeyen enerji." }
              ].map((item, index) => (
                <View key={index} className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl w-[48%] shadow-sm shadow-teal-500/5">
                  <item.icon color="#14b8a6" size={28} className="mb-3 opacity-90" />
                  <Text className="text-white font-sans-bold mb-1">{item.title}</Text>
                  <Text className="text-zinc-500 text-xs leading-relaxed font-sans">{item.desc}</Text>
                </View>
              ))}
            </View>

            <View className="mt-8 mb-4">
              <View className="flex-row items-center justify-center mb-6">
                <View className="h-[1px] flex-1 bg-zinc-800" />
                <Text className="text-zinc-400 font-display-bold text-sm mx-4 uppercase tracking-widest">Keşfettiğim Ülkeler</Text>
                <View className="h-[1px] flex-1 bg-zinc-800" />
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
                <View className="flex-row gap-3 px-2">
                  {visitedCountries.map((c, i) => (
                    <View key={i} className="flex-row items-center bg-zinc-900/90 border border-zinc-800/80 px-4 py-2 rounded-full">
                      <Text className="text-lg mr-2">{c.flag}</Text>
                      <Text className="text-zinc-300 font-sans-medium text-sm">{c.name}</Text>
                    </View>
                  ))}
                  {/* Duplicate for marquee effect feel */}
                  {visitedCountries.map((c, i) => (
                    <View key={`dup-${i}`} className="flex-row items-center bg-zinc-900/90 border border-zinc-800/80 px-4 py-2 rounded-full">
                      <Text className="text-lg mr-2">{c.flag}</Text>
                      <Text className="text-zinc-300 font-sans-medium text-sm">{c.name}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </Animated.View>

          {/* FOOTER */}
          <View className="px-6 py-16 items-center">
            <View className="bg-teal-500/10 p-4 rounded-full mb-6">
              <Rocket color="#14b8a6" size={40} className="opacity-90" />
            </View>
            <Text className="text-2xl text-white font-display-bold text-center mb-2">
              Birlikte çalışalım
            </Text>
            <Text className="text-zinc-400 text-center mb-8 px-4 leading-relaxed font-sans">
              Bir projeniz mi var? Birlikte harika şeyler yaratmak için benimle iletişime geçin.
            </Text>
            <TouchableOpacity onPress={openMail} activeOpacity={0.6}>
              <Text className="text-teal-400 font-sans-semibold text-lg border-b border-teal-500/30 pb-1">info@semsicanalbayrak.com</Text>
            </TouchableOpacity>
            <Text className="text-zinc-600 text-xs mt-12 font-sans">
              © 2025 Şemsi Can Albayrak. Tüm hakları saklıdır.
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
