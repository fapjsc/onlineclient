import React from 'react';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    // eslint-disable-next-line
    trackExtraHooks: [[require('react-redux/lib'), 'useSelector']],
  });
}
