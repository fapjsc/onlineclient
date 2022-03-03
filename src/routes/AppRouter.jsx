// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { useSelector } from 'react-redux';

// import Layout from '../pages/Layout/Layout';

// import PublicRouter from './PublicRouter';
// import PrivateRouter from './PrivateRoute';
// import AuthRouter from './AuthRouter';

// import HomePage from '../pages/home/HomePage';

// import GamePlay from '../components/game-play/Aristocrat/Aristocrat';

// const AppRouter = () => {
//   const { data } = useSelector((state) => state.user);
//   return (
//     <>
//       <Router>
//         <Layout>
//           <Routes>
//             <Route
//               path="/auth/*"
//               element={
//                 <PublicRouter isAuthenticated={data} element={AuthRouter} />
//               }
//             />

//             <Route
//               path="/game-play"
//               element={<PrivateRouter isAuthenticated element={GamePlay} />}
//             />

//             <Route
//               path="/"
//               element={
//                 <PrivateRouter isAuthenticated={data} element={HomePage} />
//               }
//             />
//           </Routes>
//         </Layout>
//       </Router>
//     </>
//   );
// };
// export default AppRouter;
