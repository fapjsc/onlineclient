// Media Query
import { useMediaQuery } from 'react-responsive';

const useRwd = () => {
  // Media query
  const isMobile = useMediaQuery({ query: '(max-width: 557px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 820px)' });
  return {
    isMobile,
    isTablet,
  };
};

export default useRwd;
