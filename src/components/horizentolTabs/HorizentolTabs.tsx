import COLOR from '../../constant/constant';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabPress: (tabId: string) => void;
}

const HorizontalTabs: React.FC<TabsProps> = ({ tabs, onTabPress }) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]?.id || '');

  const handleTabPress = (tabId: string) => {
    setSelectedTab(tabId);
    onTabPress(tabId);
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            selectedTab === tab.id && styles.selectedTab, // Highlight selected tab
          ]}
          onPress={() => handleTabPress(tab.id)}
        >
          <Text 
            style={[
              styles.tabText,
              selectedTab === tab.id && styles.selectedTabText, // Highlight text of selected tab
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HorizontalTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    // backgroundColor: '#f5f5f5',
  },
  selectedTab: {
    backgroundColor: '#f4a261',
  },
  tabText: {
    color:COLOR.primary,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'MontserratRegular',
    
  },
  selectedTabText: {
    color: '#fff',
  },
});
