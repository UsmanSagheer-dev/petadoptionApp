import { useCallback } from 'react';
import { ImageSourcePropType } from 'react-native';

const useImageSource = () => {
  const getImageSource = useCallback((imageUrl: string | string[] | null): ImageSourcePropType | null => {
    try {
      if (!imageUrl) return null;

      const uri = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
      if (!uri) return null;
      if (typeof uri !== 'string') return null;

      if (uri.startsWith('http') || uri.startsWith('data:image')) {
        return { uri };
      }

      return { uri: `data:image/jpeg;base64,${uri}` };
    } catch (error) {
      console.warn('Image processing error:', error);
      return null;
    }
  }, []);

  return { getImageSource };
};

export default useImageSource;
