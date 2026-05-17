import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-extrabold text-primary/20 select-none">404</h1>
          <div className="relative -mt-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Page not found</h2>
            <p className="text-muted-foreground mb-10">
              The page you are looking for doesn't exist or has been moved to another URL.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="w-full sm:w-auto bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto bg-muted text-foreground px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-muted/80 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
