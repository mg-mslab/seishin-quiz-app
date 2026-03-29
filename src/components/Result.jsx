import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const Result = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  let resultMessage = "";
  if (percentage === 100) resultMessage = "完璧です！素晴らしい👏";
  else if (percentage >= 80) resultMessage = "合格圏内！あともう少しです👍";
  else if (percentage >= 50) resultMessage = "基礎はできています！復習しましょう📚";
  else resultMessage = "伸びしろしかありません！コツコツ頑張りましょう💪";

  return (
    <motion.div 
      className="glass-panel result-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="score-circle">
          <span className="score-num">{score}</span>
          <span className="score-total">/ {total}</span>
        </div>
        
        <h2 className="result-msg">{resultMessage}</h2>
        <p style={{ marginBottom: '30px', color: 'var(--text-muted)' }}>
          正答率: {percentage}%
        </p>
      </motion.div>

      <motion.button 
        className="restart-btn"
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RefreshCw size={20} />
        もう一度挑戦する
      </motion.button>
    </motion.div>
  );
};

export default Result;
