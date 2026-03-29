import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

const Quiz = ({ question, currentNum, total, onNext }) => {
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedOpt(index);
    setIsAnswered(true);
  };

  const isCorrect = selectedOpt === question.correctAnswer;

  return (
    <div className="quiz-container fade-in">
      <div className="quiz-header">
        <span className="progress-pill">
          問題 {currentNum} / {total}
        </span>
        <span className="subject-tag">科目: {question.subject}</span>
      </div>

      <motion.div 
        className="glass-panel question-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="question-meta">
          <span className="year-badge">{question.year}</span>
        </div>
        <h2 className="question-text">{question.text}</h2>

        <div className="options-grid">
          {question.options.map((opt, index) => {
            let className = "option-btn";
            if (isAnswered) {
              if (index === question.correctAnswer) className += " correct";
              else if (index === selectedOpt) className += " incorrect";
            } else if (selectedOpt === index) {
              className += " selected";
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleSelect(index)}
                disabled={isAnswered}
              >
                <span className="option-number">{index + 1}</span>
                {opt}
              </button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            className={`glass-panel feedback-section ${isCorrect ? 'correct-area' : 'incorrect-area'}`}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feedback-header">
              {isCorrect ? (
                <><CheckCircle2 className="correct-text" size={28} /> <span className="correct-text">正解！</span></>
              ) : (
                <><XCircle className="incorrect-text" size={28} /> <span className="incorrect-text">不正解...正解は「{question.correctAnswer + 1}」</span></>
              )}
            </div>
            
            <div className="explanation-text">
              {question.explanation}
            </div>

            <button className="next-btn" onClick={() => {
              setSelectedOpt(null);
              setIsAnswered(false);
              onNext(isCorrect);
            }}>
              次の問題へ <ChevronRight style={{ verticalAlign: 'middle' }} size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
