import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from '@/layouts';
import store, { persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

//* Global CSS
import '@/assets/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tooltip/dist/react-tooltip.css'
import '@/assets/css/common.css';
import '@/assets/css/responsive.css';

//* CSS

// Projects Page
import '@/assets/css/projects.css';

// Employees Page
import '@/assets/css/employees.css';
import '@/assets/css/employees-responsive.css';

// Teams Page
import '@/assets/css/teams.css';
import '@/assets/css/teams-responsive.css';

// Project Details Page
import '@/assets/css/project.css';
import '@/assets/css/project-details-responsive.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
