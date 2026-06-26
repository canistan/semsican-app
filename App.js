import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
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

export default function App() {
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

  return (
    <SafeAreaProvider>
      <AuroraBackground />
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
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
            {/* Profil Resmi */}
            <View className="w-32 h-32 rounded-full border-4 border-zinc-800 p-1 mb-6 shadow-2xl shadow-teal-500/20">
              <Image 
                source={require('./assets/images/profile.png')} 
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </View>

            <View className="bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full mb-6">
              <Text className="text-zinc-300 text-sm font-medium">✨ Dijital Danışman</Text>
            </View>
            
            <Text className="text-xl text-zinc-400 mb-2">Merhaba, ben</Text>
            <Text className="text-4xl font-extrabold text-white text-center mb-4">
              Şemsi Can <Text className="text-teal-400">Albayrak</Text>
            </Text>
            
            <Text className="text-lg text-zinc-300 text-center font-medium mb-6 px-4">
              Dijital Üretici & Dünya Gezgini
            </Text>

            <Text className="text-zinc-500 text-center leading-relaxed mb-10 px-4 text-base">
              Dijital dünyada fikirleri gerçeğe dönüştürüyorum. Modern web teknolojileri ile kullanıcı odaklı, etkileyici ve performanslı deneyimler tasarlıyorum.
            </Text>
            
            <View className="flex-row gap-4 w-full px-4">
              <TouchableOpacity 
                onPress={openWhatsApp}
                className="flex-1 bg-teal-500 flex-row items-center justify-center py-4 rounded-full shadow-lg shadow-teal-500/30"
                activeOpacity={0.7}
              >
                <Text className="text-white font-bold text-lg">WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={openMail}
                className="flex-1 bg-zinc-800 flex-row items-center justify-center py-4 rounded-full border border-zinc-700"
                activeOpacity={0.7}
              >
                <Mail color="white" size={20} style={{ marginRight: 8 }} />
                <Text className="text-white font-bold text-lg">E-posta</Text>
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
              <Text className="text-2xl font-bold text-white">Neler Yapıyorum?</Text>
            </View>

            <Text className="text-lg font-semibold text-zinc-300 mb-2">Teknik Operasyonlar ve Dijital Strateji</Text>
            <Text className="text-zinc-500 mb-8 leading-relaxed">
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
                    <Text className="text-white font-bold text-base mb-1">{item.title}</Text>
                    <Text className="text-zinc-400 leading-relaxed text-sm">{item.desc}</Text>
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
              <Text className="text-2xl font-bold text-white">Son Çalışmalarım</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible pb-4">
              <TouchableOpacity 
                onPress={() => openProject('https://thecliff.com.tr/')}
                activeOpacity={0.9}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 mr-4 w-72"
              >
                <View className="bg-teal-500/20 px-3 py-1 rounded-full self-start mb-4">
                  <Text className="text-teal-400 text-xs font-bold">Kurumsal</Text>
                </View>
                <Text className="text-white font-bold text-lg mb-2">The Cliff Sustainability</Text>
                <Text className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Sürdürülebilirlik alanında dönüşüm yaratan web sitesi tasarımı.
                </Text>
                <View className="flex-row gap-2">
                  <Text className="text-zinc-500 text-xs bg-zinc-800 px-2 py-1 rounded">React</Text>
                  <Text className="text-zinc-500 text-xs bg-zinc-800 px-2 py-1 rounded">Tailwind</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => openProject('https://dilim.semsicanalbayrak.com/')}
                activeOpacity={0.9}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 mr-4 w-72"
              >
                <View className="bg-teal-500/20 px-3 py-1 rounded-full self-start mb-4">
                  <Text className="text-teal-400 text-xs font-bold">E-Ticaret</Text>
                </View>
                <Text className="text-white font-bold text-lg mb-2">Dilim</Text>
                <Text className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Modern ve kullanıcı dostu bir yaklaşımla tasarlanmış marka kimliği.
                </Text>
                <View className="flex-row gap-2">
                  <Text className="text-zinc-500 text-xs bg-zinc-800 px-2 py-1 rounded">Vite</Text>
                  <Text className="text-zinc-500 text-xs bg-zinc-800 px-2 py-1 rounded">UI/UX</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>

          {/* HAKKIMDA SECTION */}
          <Animated.View 
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="px-6 py-10 bg-zinc-900/40"
          >
            <View className="flex-row items-center mb-8">
              <View className="w-8 h-[2px] bg-teal-500 mr-4" />
              <Text className="text-2xl font-bold text-white">Bütün mümkünlerin kıyısındayız</Text>
            </View>

            <View className="flex-row flex-wrap justify-between gap-y-4 mb-6">
              {[
                { icon: Globe, title: "Dünya Gezgini", desc: "Amerika'dan Japonya'ya maceralar." },
                { icon: Music, title: "Kültür & Müzik", desc: "Yeni ritimler ve kültürler keşfi." },
                { icon: Trees, title: "Doğa Tutkunu", desc: "Doğaya ve yaşama derin sevgi." },
                { icon: Activity, title: "Dinamik Yaşam", desc: "Futbol, sörf ve bitmeyen enerji." }
              ].map((item, index) => (
                <View key={index} className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl w-[48%]">
                  <item.icon color="#14b8a6" size={28} className="mb-3" />
                  <Text className="text-white font-bold mb-1">{item.title}</Text>
                  <Text className="text-zinc-500 text-xs leading-relaxed">{item.desc}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* FOOTER */}
          <View className="px-6 py-16 items-center">
            <Rocket color="#14b8a6" size={48} className="mb-6 opacity-80" />
            <Text className="text-2xl text-white font-bold text-center mb-2">
              Birlikte çalışalım
            </Text>
            <Text className="text-zinc-400 text-center mb-8 px-4 leading-relaxed">
              Bir projeniz mi var? Birlikte harika şeyler yaratmak için benimle iletişime geçin.
            </Text>
            <TouchableOpacity onPress={openMail} activeOpacity={0.6}>
              <Text className="text-teal-400 font-semibold text-lg border-b border-teal-500/30 pb-1">info@semsicanalbayrak.com</Text>
            </TouchableOpacity>
            <Text className="text-zinc-600 text-xs mt-12">
              © 2025 Şemsi Can Albayrak. Tüm hakları saklıdır.
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
