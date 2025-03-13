import {useCallback} from 'react';
import {Linking} from 'react-native';
import {useAppSelector} from '../../hooks/hooks';
import {RootState} from '../../redux/store';
import useProfile from '../../hooks/useProfile';

export const useAdoptNowCard = () => {
  const {profileData} = useProfile();
  const donations = useAppSelector((state: RootState) => state.pet.donations);

  // Find all donations where the current user has made a request
  const userDonations = donations.filter(donation =>
    donation.requests?.some(request => request.userId === profileData?.uid),
  );

  const handleContactPress = useCallback((email) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  }, []);

  const getFormattedDate = useCallback((donation) => {
    if (donation?.createdAt?.toDate instanceof Function) {
      return donation.createdAt.toDate().toLocaleDateString();
    }
    return 'Date not available';
  }, []);

  const cardsData = userDonations.map(donation => ({
    id: donation.id,
    ownerPhotoURL: donation.ownerPhotoURL,
    ownerDisplayName: donation.ownerDisplayName || 'Guest User',
    petType: donation.petType || 'Unknown Type',
    ownerEmail: donation.ownerEmail || 'No email available',
    location: donation.location ?? 'Unknown Location',
    formattedDate: getFormattedDate(donation),
   
  }));

  return {
    cardsData,
    hasData: cardsData.length > 0,
    handleContactPress,
  };
};