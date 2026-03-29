import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const Home = ({ onStart }) => {
  return (
    <motion.div 
      className="glass-panel home-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <BookOpen size={64} className="title-gradient" style={{ margin: '0 auto 20px', display: 'block' }} />
        <h1 className="home-title title-gradient">精神保健福祉士<br/>過去問ドリル</h1>
        <p className="home-subtitle">隙間時間でサクサク解いて、絶対合格！</p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <motion.button 
          className="start-btn"
          onClick={() => onStart('common')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: '80%' }}
        >
          共通問題を解く
        </motion.button>
        
        <motion.button 
          className="start-btn"
          onClick={() => onStart('specialized')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: '80%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
        >
          専門問題を解く
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Home;
