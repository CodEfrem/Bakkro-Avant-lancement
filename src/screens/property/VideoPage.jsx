import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SessionContext from '../../utils/SessionContext';
import { supabase } from '../../lib/supabase';
import { WebView } from 'react-native-webview';

const VideoPage = () => {
  const { session } = useContext(SessionContext);
  const [isSubscribed, setIsSubscribed] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    console.log("visite page");
    if (session) {
      getUser();
      const intervalId = setInterval(() => {
        getUser();
      }, 5000); // Toutes les 5 secondes

      return () => clearInterval(intervalId);
    }
  }, [session]);

  // useEffect(() => {
  //   if (isSubscribed === 'free') {
  //     navigation.replace('Visit');
  //   }
  // }, [isSubscribed, navigation]);

  async function getUser() {
    try {
      if (!session?.user) throw new Error('No user on the session!');
      const { data, error, status } = await supabase
        .from('users')
        .select('subscription')
        .eq('phone', session?.user.phone)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setIsSubscribed(data.subscription);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.klapty.com/tour/tunnel/SJL0VSDWXC' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color="#009688"
            size="large"
            style={styles.loading}
          />
        )}
      />
     <View style={{ width: '100%', height: 170, position: 'absolute', bottom: -100, backgroundColor: '#FFF' }}>
      <Text style={{fontWeight:'500', fontSize:20,marginTop:20,marginLeft:'4%'}}>Visite a distance</Text>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default VideoPage;
