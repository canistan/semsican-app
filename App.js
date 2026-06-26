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
  Activity,
  Play,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react-native';
import './global.css';
import AuroraBackground from './components/AuroraBackground';
import Marquee from './components/Marquee';
import ScrollIndicator from './components/ScrollIndicator';
import QuizGame from './components/QuizGame';
import { useState, useEffect, useRef } from 'react';
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

const techStack = [
  { name: "Agile / Scrum", icon: "🔄" },
  { name: "Jira", icon: "📋" },
  { name: "Slack", icon: "💬" },
  { name: "Power BI", icon: "📊" },
  { name: "Looker", icon: "📈" },
  { name: "Dynamics 365", icon: "🏢" },
  { name: "CRM Systems", icon: "🤝" },
  { name: "Next.js", icon: "▲" },
  { name: "React", icon: "⚛️" },
  { name: "Figma", icon: "🎨" },
  { name: "Photoshop", icon: "🖼️" },
  { name: "Premiere Pro", icon: "🎬" },
  { name: "AWS", icon: "☁️" },
  { name: "GitHub", icon: "🐙" },
  { name: "Vite", icon: "⚡" },
];

export default function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [projectsYOffset, setProjectsYOffset] = useState(0);
  
  // Easter Egg states
  const [quizVisible, setQuizVisible] = useState(false);
  const [profileTapCount, setProfileTapCount] = useState(0);
  
  const scrollViewRef = useRef(null);

  const scrollToProjects = () => {
    scrollViewRef.current?.scrollTo({ y: projectsYOffset, animated: true });
  };

  const handleProfileTap = () => {
    const newCount = profileTapCount + 1;
    setProfileTapCount(newCount);
    if (newCount === 3) {
      setQuizVisible(true);
      setProfileTapCount(0);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

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

  const safeOpenURL = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log('Unable to open URL:', url, error);
    }
  };

  const openMail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    safeOpenURL('mailto:info@semsicanalbayrak.com');
  };

  const openWhatsApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    safeOpenURL('https://wa.me/905077880172');
  };

  const openProject = (url) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    safeOpenURL(url);
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
          ref={scrollViewRef}
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* HERO SECTION */}
          <Animated.View 
            entering={FadeInDown.duration(1000).springify()}
            className="px-6 pt-12 pb-16 items-center"
          >
            {/* Dinamik Profil Resmi */}
            <View className="items-center mb-6">
              <TouchableOpacity 
                activeOpacity={0.9} 
                onPress={handleProfileTap}
                className="w-32 h-32 rounded-full border-4 border-zinc-800 p-1 shadow-2xl shadow-teal-500/20 overflow-hidden bg-zinc-900"
              >
                <Image 
                  source={{ uri: travelPhotos[currentPhotoIndex].src }} 
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View className="mt-3 flex-row items-center bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-800">
                <Text className="text-lg mr-2">{travelPhotos[currentPhotoIndex].flag}</Text>
                <Text className="text-zinc-300 font-sans-medium text-xs">{travelPhotos[currentPhotoIndex].country}</Text>
              </View>
            </View>

            <View className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full mb-6 flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-teal-500 mr-2" />
              <Text className="text-zinc-300 text-sm font-sans-medium tracking-wide">Dijital Danışman</Text>
            </View>
            
            <Text className="text-4xl font-display-bold text-white text-center mb-6">
              Merhaba, ben <Text className="text-teal-400">Can</Text>
            </Text>
            
            <Text className="text-zinc-400 text-center leading-relaxed mb-10 px-2 text-base font-sans">
              Dijital dünyada fikirleri gerçeğe dönüştürüyorum. Modern web teknolojileri ile kullanıcı odaklı, etkileyici ve performanslı deneyimler tasarlıyorum.
            </Text>
            
            <View className="w-full px-2 gap-3">
              <TouchableOpacity 
                onPress={scrollToProjects}
                className="w-full bg-teal-500 flex-row items-center justify-center py-4 rounded-full shadow-lg shadow-teal-500/30"
                activeOpacity={0.8}
              >
                <Text className="text-white font-sans-bold text-lg">Projelerimi Gör →</Text>
              </TouchableOpacity>

              <View className="flex-row gap-3 w-full">
                <TouchableOpacity 
                  onPress={openMail}
                  className="flex-1 bg-zinc-900 flex-row items-center justify-center py-3.5 rounded-full border border-zinc-800"
                  activeOpacity={0.7}
                >
                  <Text className="text-zinc-300 font-sans-medium text-base">E-posta</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={openWhatsApp}
                  className="flex-1 bg-zinc-900 flex-row items-center justify-center py-3.5 rounded-full border border-zinc-800"
                  activeOpacity={0.7}
                >
                  <Text className="text-zinc-300 font-sans-medium text-base">💬 WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Animated.View 
              entering={FadeInUp.delay(1000).duration(2000)}
              className="mt-16"
            >
              <ScrollIndicator />
            </Animated.View>
          </Animated.View>

          {/* HİZMETLERİM */}
          <Animated.View 
            entering={FadeInDown.delay(300).duration(1000).springify()}
            className="px-6 py-10 bg-zinc-900/40"
          >
            <View className="flex-row items-center mb-6">
              <View className="w-8 h-[2px] bg-teal-500 mr-4" />
              <Text className="text-sm font-sans-bold text-zinc-400 tracking-widest uppercase">HİZMETLERİM</Text>
            </View>

            <View className="mb-6 flex-row items-start">
              <Text className="text-3xl mr-3">🎯</Text>
              <Text className="text-2xl font-display-bold text-white flex-1 leading-tight">Teknik Operasyonlar ve Dijital Strateji</Text>
            </View>
            <Text className="text-zinc-400 mb-8 leading-relaxed font-sans text-base">
              E-ticaret ekosisteminde, teknik altyapı ile satış hedefleri arasındaki köprüyü yöneten; karmaşık dijital süreçleri ciroya ve verimliliğe dönüştüren bir stratejistim. MarTech, CRM ve veri mimarisi odaklı yaklaşımımla, yüksek hacimli e-ticaret operasyonlarını uçtan uca kurguluyor ve yönetiyorum.
            </Text>
            
            <View className="flex-col gap-4">
              {/* Grid Hizmet Kartları */}
              {[
                { icon: Settings, title: "MarTech & CRM Ekolojisi", desc: "CLV'yi maksimize eden teknik pazarlama altyapıları tasarlarım." },
                { icon: BarChart, title: "Veri Odaklı Performans Yönetimi", desc: "Karar destek mekanizmalarını e-ticaret hedefleriyle hizalarım." },
                { icon: Cloud, title: "Ölçeklenebilir Dijital Altyapı", desc: "Bulut entegrasyonları ve best-of-breed teknoloji yığınları belirlerim." },
                { icon: ShieldCheck, title: "Dijital Mevzuat & Güvenlik", desc: "İYS, GDPR/KVKK uyumlu güvenilir veri politikaları yönetirim." }
              ].map((item, index) => (
                <Animated.View 
                  key={index}
                  entering={FadeInDown.delay(400 + (index * 100)).duration(800).springify()}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl flex-row items-start mb-2 overflow-hidden shadow-sm shadow-black/20"
                >
                  <View className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
                  <View className="bg-white/10 border border-white/10 p-3 rounded-xl mr-4 mt-1 shadow-inner shadow-black/10">
                    <item.icon color="#fff" size={22} className="opacity-90" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-sans-bold text-base mb-1 tracking-wide">{item.title}</Text>
                    <Text className="text-zinc-300 leading-relaxed text-sm font-sans">{item.desc}</Text>
                  </View>
                </Animated.View>
              ))}

              {/* Alt Geniş Kart: Talent & Team Orchestration */}
              <Animated.View 
                entering={FadeInDown.delay(900).duration(800).springify()}
                className="bg-teal-500/10 border border-teal-500/20 p-6 rounded-3xl mt-4 items-center overflow-hidden shadow-lg shadow-teal-500/10"
              >
                <View className="absolute inset-0 bg-gradient-to-b from-teal-400/10 to-transparent opacity-60" />
                <View className="bg-teal-500/20 border border-teal-400/30 p-4 rounded-2xl mb-4 shadow-inner shadow-teal-500/40">
                  <Users color="#5eead4" size={32} className="opacity-100" />
                </View>
                <Text className="text-white font-display-bold text-xl mb-3 text-center">Talent & Team Orchestration</Text>
                <Text className="text-teal-50/80 leading-relaxed text-sm font-sans text-center">
                  E-ticaretin hızıyla uyumlu çalışacak teknik uzmanları bir araya getiriyor; yazılım geliştirme süreçlerini iş birimleri için "anlaşılır ve uygulanabilir" bir iş akışına dönüştürüyorum.
                </Text>
              </Animated.View>
            </View>
          </Animated.View>

          {/* HAKIM OLDUGUM TEKNOLOJİLER */}
          <Animated.View 
            entering={FadeInDown.delay(500).duration(1000).springify()}
            className="py-10"
          >
            <View className="flex-row items-center justify-center mb-6">
              <View className="h-[1px] flex-1 bg-zinc-800" />
              <Text className="text-zinc-400 font-display-bold text-sm mx-4 uppercase tracking-widest">Hâkim Olduğum Teknolojiler</Text>
              <View className="h-[1px] flex-1 bg-zinc-800" />
            </View>
            <View className="overflow-hidden py-2">
              <Marquee speed={30} direction="left">
                <View className="flex-row gap-3 px-2">
                  {techStack.map((tech, i) => (
                    <View key={i} className="flex-row items-center bg-zinc-900/90 border border-zinc-800/80 px-4 py-2 rounded-full">
                      <Text className="text-lg mr-2">{tech.icon}</Text>
                      <Text className="text-zinc-300 font-sans-medium text-sm">{tech.name}</Text>
                    </View>
                  ))}
                </View>
              </Marquee>
            </View>
          </Animated.View>

          {/* HAKKIMDA SECTION */}
          <Animated.View 
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="px-6 py-10 bg-zinc-900/40"
          >
            <View className="mb-8">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-[2px] bg-teal-500 mr-4" />
                <Text className="text-xl font-display text-zinc-400 uppercase tracking-widest">Hakkımda</Text>
              </View>
              <Text className="text-2xl font-display-bold text-white">Bütün mümkünlerin kıyısındayız</Text>
            </View>
            
            <View className="mb-10">
              <Text className="text-zinc-300 font-sans leading-relaxed mb-4 text-base">
                Merhaba, ben Can. Ama <Text className="italic">"Bence insanın adı onunla en az ilgili olan yanıdır"</Text> diye başlar benim hikayem.
              </Text>
              <Text className="text-zinc-400 font-sans leading-relaxed mb-4 text-base">
                Amerika'dan Japonya'ya, Küba'dan Fas'a uzanan seyahatlerimde yeni kültürler ve müzikler keşfetmeye, her zaman öğrenmeye tutkunum. Doğayı, hayvanları ve yaşamın kendisini çok seviyorum. Bir yandan futbol ve sörf gibi sporlarla hayatın enerjisini yakalarken, diğer yandan teknolojiyle hayatı nasıl daha da kolaylaştırabileceğimi araştırıyorum.
              </Text>
              <Text className="text-zinc-300 font-sans leading-relaxed text-base">
                Çalışmaktan hiç yorulmayan, ürettikçe motive olan biri olarak hep şuna inanıyorum: <Text className="font-sans-bold text-white">Daha keşfetmemiz gereken kocaman bir dünya var.</Text>
              </Text>
            </View>

            <View className="flex-row flex-wrap justify-between gap-y-4 mb-6">
              {[
                { icon: Globe, title: "Dünya Gezgini", desc: "Amerika'dan Japonya'ya kültürleri ve yaşamı keşfeden maceralar." },
                { icon: Music, title: "Kültür & Müzik", desc: "Sürekli öğrenme, yeni ritimler ve kültürler keşfetme tutkusu." },
                { icon: Trees, title: "Doğa Tutkunu", desc: "Hayvanlara, doğaya ve yaşamın kendisine duyulan derin sevgi." },
                { icon: Activity, title: "Dinamik Yaşam", desc: "Futbol ve sörf gibi sporlarla hayatın enerjisini her an yakalamak." }
              ].map((item, index) => (
                <View key={index} className="bg-white/5 border border-white/10 p-5 rounded-2xl w-[48%] overflow-hidden relative shadow-sm shadow-black/20">
                  <View className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30" />
                  <View className="bg-white/10 self-start p-2.5 rounded-xl border border-white/10 mb-3 shadow-inner shadow-black/10">
                    <item.icon color="#fff" size={24} className="opacity-90" />
                  </View>
                  <Text className="text-white font-sans-bold mb-1.5 tracking-wide">{item.title}</Text>
                  <Text className="text-zinc-300 text-xs leading-relaxed font-sans">{item.desc}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              onPress={() => safeOpenURL('https://youtube.com/@semsicanalbayrak')}
              className="bg-red-950/20 border border-red-900/30 p-5 rounded-2xl flex-row items-center mb-6 shadow-sm shadow-red-500/5"
              activeOpacity={0.8}
            >
              <View className="bg-red-600/20 p-3 rounded-xl mr-4 border border-red-500/20">
                <Play color="#ef4444" size={28} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-sans-bold text-lg mb-1">YouTube Kanalımı Ziyaret Et</Text>
                <Text className="text-zinc-400 font-sans text-sm">Dünyayı geziyorum, benimle gez!</Text>
              </View>
            </TouchableOpacity>

            <View className="mt-8 mb-4">
              <View className="flex-row items-center justify-center mb-6">
                <View className="h-[1px] flex-1 bg-zinc-800" />
                <Text className="text-zinc-400 font-display-bold text-sm mx-4 uppercase tracking-widest">Keşfettiğim Ülkeler</Text>
                <View className="h-[1px] flex-1 bg-zinc-800" />
              </View>
              <View className="overflow-hidden py-2">
                <Marquee speed={35} direction="right">
                  <View className="flex-row gap-3 px-2">
                    {visitedCountries.map((c, i) => (
                      <View key={i} className="flex-row items-center bg-zinc-900/90 border border-zinc-800/80 px-4 py-2 rounded-full">
                        <Text className="text-lg mr-2">{c.flag}</Text>
                        <Text className="text-zinc-300 font-sans-medium text-sm">{c.name}</Text>
                      </View>
                    ))}
                  </View>
                </Marquee>
              </View>
            </View>
          </Animated.View>

          {/* PROJECTS SECTION */}
          <Animated.View 
            entering={FadeInDown.delay(700).duration(1000).springify()}
            className="px-6 py-12"
            onLayout={(event) => setProjectsYOffset(event.nativeEvent.layout.y)}
          >
            <View className="flex-row items-center mb-8">
              <View className="w-8 h-[2px] bg-teal-500 mr-4" />
              <Text className="text-2xl font-display-bold text-white">Son Çalışmalarım</Text>
            </View>

            <View className="overflow-hidden pb-4">
              <Marquee speed={40} direction="left">
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
              </Marquee>
            </View>
          </Animated.View>

          {/* STATS & FOOTER */}
          <View className="relative mt-4">
            <View className="absolute inset-0 bg-teal-900/5 rounded-t-[40px] border-t border-teal-500/10" />
            
            <View className="px-6 py-12">
              {/* İstatistikler */}
              <View className="flex-row flex-wrap justify-between gap-y-4 mb-16">
                {[
                  { val: "5+", text: "Yıl Deneyim" },
                  { val: "30+", text: "Tamamlanan Proje" },
                  { val: "20+", text: "Mutlu Müşteri" },
                  { val: "∞", text: "Tutku & Merak" }
                ].map((stat, idx) => (
                  <View key={idx} className="w-[48%] bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl items-center shadow-sm shadow-teal-500/5">
                    <Text className="text-3xl font-display-bold text-teal-400 mb-2">{stat.val}</Text>
                    <Text className="text-zinc-500 text-xs font-sans text-center">{stat.text}</Text>
                  </View>
                ))}
              </View>

              <View className="flex-row items-center mb-6">
                <View className="w-8 h-[2px] bg-teal-500 mr-4" />
                <Text className="text-sm font-sans-bold text-zinc-400 tracking-widest uppercase">İLETİŞİM</Text>
              </View>
              
              <Text className="text-4xl text-white font-display-bold mb-6">
                Birlikte çalışalım
              </Text>
              
              <Text className="text-zinc-400 mb-10 leading-relaxed font-sans text-base">
                Bir projeniz mi var? Birlikte harika şeyler yaratmak için benimle iletişime geçin. En kısa sürede size dönüş yapacağım.
              </Text>

              {/* İletişim Bilgileri */}
              <View className="gap-6 mb-12">
                <TouchableOpacity 
                  onPress={openMail}
                  activeOpacity={0.7}
                  className="flex-row items-center"
                >
                  <View className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/50 mr-4">
                    <Mail color="#d4d4d8" size={24} />
                  </View>
                  <View>
                    <Text className="text-white font-sans-bold mb-1">E-posta</Text>
                    <Text className="text-zinc-400 font-sans text-sm">semsicanalbayrak@gmail.com</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => safeOpenURL('tel:+905077880172')}
                  activeOpacity={0.7}
                  className="flex-row items-center"
                >
                  <View className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/50 mr-4">
                    <Phone color="#d4d4d8" size={24} />
                  </View>
                  <View>
                    <Text className="text-white font-sans-bold mb-1">Telefon</Text>
                    <Text className="text-zinc-400 font-sans text-sm">+90 507 788 01 72</Text>
                  </View>
                </TouchableOpacity>

                <View className="flex-row items-center">
                  <View className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/50 mr-4">
                    <MapPin color="#d4d4d8" size={24} />
                  </View>
                  <View>
                    <Text className="text-white font-sans-bold mb-1">Konum</Text>
                    <Text className="text-zinc-400 font-sans text-sm">Bali 🌴</Text>
                  </View>
                </View>
              </View>
              
              <View className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8" />
              <Text className="text-zinc-600 text-xs font-sans text-center">
                © 2025 Şemsi Can Albayrak. Tüm hakları saklıdır.
              </Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>

      <QuizGame 
        visible={quizVisible} 
        onClose={() => setQuizVisible(false)} 
        onContact={openMail}
      />
    </SafeAreaProvider>
  );
}
