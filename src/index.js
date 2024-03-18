import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient,QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import PageRoutes from './Routes/PageRoutes';
// import './Styling/Sass/index.scss';
const queryClient=new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RecoilRoot>
        <ToastContainer />
          <PageRoutes/>
      </RecoilRoot>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

