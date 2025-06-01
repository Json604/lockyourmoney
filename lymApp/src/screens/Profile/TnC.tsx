import React, { useContext } from 'react';
import { ScrollView, Text, View, StyleSheet, Linking } from 'react-native';
import { ThemeContext } from '../../context/useTheme';

export default function TnC() {
    const {primary,background,text,subtext} = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container,{backgroundColor:background}]}>
      <Text style={[styles.heading,{color:text}]}>Terms of Use</Text>
      <Text style={[styles.updated,{color:subtext}]}>Last updated: June 1, 2025</Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>1. Using the App</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        You must be at least 13 years old. You are responsible for the information you provide (like your name or lock amount). You agree not to misuse the app or its features.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>2. Locking Money</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        LYM helps you set a virtual lock on your monthly spending goals. We do not handle or hold your actual money. All lock features are voluntary and virtual—meant for your self-discipline and planning only.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>3. User Content</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        You own your data. We do not sell your personal information. You agree not to upload harmful or offensive content.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>4. App Updates</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        We may update the app from time to time to fix bugs or improve features. We might change the terms or features in the future. You’ll be notified in the app.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>5. Termination</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        You can stop using LYM anytime. We may suspend or terminate your access if you violate these terms.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>6. Liability</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        LYM is provided "as-is" and "as available." We are not responsible for any losses or financial decisions made using the app.
      </Text>

      <Text style={styles.heading}>Privacy Policy</Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>1. Information We Collect</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        We collect your name, phone number, and lock goals. We may also collect app usage data like how often you log in or save.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>2. How We Use Your Info</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        We use your data to show your savings progress, send reminders, and improve the app experience.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>3. Data Storage & Security</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        Your data is stored securely. We never sell, rent, or share your data with third parties.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>4. Your Rights</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        You can request deletion of your account and data anytime. You can update your info from the Profile screen.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>5. Analytics</Text>
      <Text style={[styles.sectionText,{color:text}]}>
        We may use anonymous data (not linked to your name or phone) to understand app usage and improve features.
      </Text>

      <Text style={[styles.sectionTitle,{color:subtext}]}>6. Contact Us</Text>
      <Text style={[styles.sectionText,{color:text}]}>If you have any questions, contact us at:</Text>
      <Text style={{color:primary,marginBottom:40}} onPress={() => Linking.openURL('mailto:support@lockyourmoney.app')}> support@lockyourmoney.com</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  updated: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
});
