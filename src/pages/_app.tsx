// packages
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// analytics
import { Analytics } from '@vercel/analytics/react';
// layouts
import Layout from '@/layouts';
// store
import store, { persistor } from '@/store';
// projects page css
import '@/assets/css/projects.css';
import '@/assets/css/responsive.css';
// employees page css
import '@/assets/css/employees.css';
import '@/assets/css/employees-responsive.css';
// teams page css
import '@/assets/css/teams.css';
import '@/assets/css/teams-responsive.css';
// project-details page css
import '@/assets/css/project.css';
import '@/assets/css/project-details-responsive.css';
// my-account page css
import '@/assets/css/myaccount.css';
import '@/assets/css/myaccount-responsive.css';
// global css
import '@/assets/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tooltip/dist/react-tooltip.css'
import '@/assets/css/common.css';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
