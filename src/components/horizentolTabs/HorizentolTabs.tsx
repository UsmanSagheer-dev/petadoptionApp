import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './HorizontalTabsStyles';
interface Tab {
  id: string;
  label: string;
}
interface TabsProps {
  tabs: Tab[];
  onTabPress: (tabId: string) => void;
}

const HorizontalTabs: React.FC<TabsProps> = ({tabs, onTabPress}) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]?.id || '');

  const handleTabPress = (tabId: string) => {
    setSelectedTab(tabId);
    onTabPress(tabId);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, selectedTab === tab.id && styles.selectedTab]}
          onPress={() => handleTabPress(tab.id)}>
          <Text
            style={[
              styles.tabText,
              selectedTab === tab.id && styles.selectedTabText,
            ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HorizontalTabs;
