// Media Query
import { useMediaQuery } from 'react-responsive';

const useRwd = () => {
  // Media query
  const isMobile = useMediaQuery({ query: '(max-width: 557px)' });
  return {
    isMobile,
  };
};

export default useRwd;
