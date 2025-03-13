import {useCallback} from 'react';
import {Linking} from 'react-native';
import {useAppSelector} from '../../hooks/hooks';
import {RootState} from '../../redux/store';
import useProfile from '../../hooks/useProfile';

export const useAdoptNowCard = () => {
  const {profileData} = useProfile();
  const donations = useAppSelector((state: RootState) => state.pet.donations);

  const userDonation = donations.find(donation =>
    donation.requests?.some(request => request.userId === profileData?.uid),
  );

  const handleContactPress = useCallback(() => {
    if (userDonation?.ownerEmail) {
      Linking.openURL(`mailto:${userDonation.ownerEmail}`);
    }
  }, [userDonation]);

  const getFormattedDate = useCallback(() => {
    if (userDonation?.createdAt?.toDate instanceof Function) {
      return userDonation.createdAt.toDate().toLocaleDateString();
    }
    return 'Date not available';
  }, [userDonation]);

  const cardData = userDonation
    ? {
        ownerPhotoURL: userDonation.ownerPhotoURL,
        ownerDisplayName: userDonation.ownerDisplayName || 'Guest User',
        petType: userDonation.petType || 'Unknown Type',
        ownerEmail: userDonation.ownerEmail || 'No email available',
        location: userDonation.location ?? 'Unknown Location',
        formattedDate: getFormattedDate(),
        hasData: true,
      }
    : {
        hasData: false,
      };

  return {
    cardData,
    handleContactPress,
  };
};
