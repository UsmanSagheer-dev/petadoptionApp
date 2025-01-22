import IMAGES from '../../assets/images/index';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

interface PetDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  petData: {
    name: string;
    type: string;
    age: string;
    gender: string;
    vaccinated: string;
    price: string;
    description?: string;
    ownerName: string;
  };
}

const { height } = Dimensions.get('window');

const PetDetailsModal: React.FC<PetDetailsModalProps> = ({
  visible,
  onClose,
  petData,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image 
              source={IMAGES.BACKICOn}
              style={styles.closeIcon} 
            />
          </TouchableOpacity>

          <Text style={styles.title}>{petData.name}</Text>
          <Text style={styles.subtitle}>{petData.type}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{petData.age}</Text>
              <Text style={styles.statLabel}>Age</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{petData.gender}</Text>
              <Text style={styles.statLabel}>Gender</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{petData.vaccinated}</Text>
              <Text style={styles.statLabel}>Vaccinated</Text>
            </View>
          </View>

          <View style={styles.ownerContainer}>
            <View style={styles.ownerImageContainer}>
              <View style={styles.ownerImage} />
            </View>
            <View style={styles.ownerInfo}>
              <Text style={styles.ownerName}>{petData.ownerName}</Text>
              <Text style={styles.ownerLabel}>Owner</Text>
            </View>
            <Text style={styles.price}>${petData.price}</Text>
          </View>

          <Text style={styles.description}>{petData.description}</Text>

          <TouchableOpacity style={styles.adoptButton}>
            <Text style={styles.adoptButtonText}>Adopt Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: height * 0.65,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ownerImageContainer: {
    marginRight: 12,
  },
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C4C4C4',
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  ownerLabel: {
    fontSize: 14,
    color: '#666666',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 20,
  },
  adoptButton: {
    backgroundColor: '#000000',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  adoptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PetDetailsModal;