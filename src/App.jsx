import React, { useState } from 'react';
import './App.css';
import { questions as allQuestions } from './data/questions';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'quiz' | 'result'
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (category) => {
    // 選択されたカテゴリー（common または specialized）で絞り込む
    let filtered;
    if (category === 'common') {
      filtered = allQuestions.filter(q => q.category === 'common');
    } else if (category === 'specialized') {
      filtered = allQuestions.filter(q => q.category === 'specialized');
    } else {
      filtered = allQuestions; // "もう一度"等のリスタート時は前回の設定に依存するか再選択
    }
    
    // データがない場合のフェールセーフ
    if (filtered.length === 0) {
       alert("その科目の問題がまだありません");
       return;
    }

    // ランダムにシャッフルしてセット（毎回違う順番になるように）
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCurrentScreen('quiz');
  };

  const goHome = () => {
    setCurrentScreen('home');
  }

  const handleNext = (isCorrect) => {
    if (isCorrect) setScore(prev => prev + 1);

    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentScreen('result');
    }
  };

  const currentQuestion = activeQuestions[currentIndex];

  return (
    <div className="app-container">
      {currentScreen === 'home' && (
        <Home onStart={startQuiz} />
      )}
      
      {currentScreen === 'quiz' && activeQuestions.length > 0 && (
        <Quiz 
          key={currentIndex} // Force re-mount for animation
          question={currentQuestion}
          currentNum={currentIndex + 1}
          total={activeQuestions.length}
          onNext={handleNext}
        />
      )}
      
      {currentScreen === 'result' && (
        <Result 
          score={score} 
          total={activeQuestions.length} 
          onRestart={goHome} 
        />
      )}
    </div>
  );
}

export default App;
