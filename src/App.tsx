import { motion } from 'framer-motion';
import Layout from './components/Layout';
import StatusDashboard from './components/StatusDashboard';
import { ServiceProvider } from './context/ServiceContext';

function App() {
  return (
    <ServiceProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background text-text-primary"
      >
        <Layout>
          <StatusDashboard />
        </Layout>
      </motion.div>
    </ServiceProvider>
  );
}

export default App