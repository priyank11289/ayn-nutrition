import { useState } from 'react';
import { ArrowRight, ArrowLeft, Dumbbell, Heart, Zap, Activity, Check, ShoppingCart, RotateCcw } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { useCart } from '@/context/CartContext';
import { Progress } from '@/components/ui/progress';

interface QuizState {
  currentQuestion: number;
  answers: {
    goal?: string;
    experience?: string;
    concerns?: string;
  };
  showResult: boolean;
}

const questions = [
  {
    id: 'goal',
    question: "What's your primary goal?",
    options: [
      { id: 'muscle', label: 'Muscle Building', icon: Dumbbell, description: 'Gain strength and size' },
      { id: 'hair', label: 'Hair Health', icon: Heart, description: 'Protect while building' },
      { id: 'safe', label: 'Safe Performance', icon: Activity, description: 'Gentle, effective gains' },
      { id: 'power', label: 'Maximum Power', icon: Zap, description: 'Elite performance' },
    ],
  },
  {
    id: 'experience',
    question: 'How often do you train?',
    options: [
      { id: 'beginner', label: 'Beginner', icon: Activity, description: '1-2 times/week' },
      { id: 'intermediate', label: 'Intermediate', icon: Dumbbell, description: '3-4 times/week' },
      { id: 'advanced', label: 'Advanced', icon: Zap, description: '5-6 times/week' },
      { id: 'athlete', label: 'Athlete', icon: Heart, description: 'Daily training' },
    ],
  },
  {
    id: 'concerns',
    question: 'Any specific concerns?',
    options: [
      { id: 'hair-loss', label: 'Hair Loss', icon: Heart, description: 'Family history or concern' },
      { id: 'bone-health', label: 'Bone Health', icon: Activity, description: 'Still growing' },
      { id: 'max-power', label: 'Maximum Power', icon: Zap, description: 'Competition ready' },
      { id: 'general', label: 'General Wellness', icon: Dumbbell, description: 'Overall health' },
    ],
  },
];

const productRecommendations: Record<string, { product: string; reason: string; servings: number }> = {
  'junior-safe': {
    product: 'AYN Junior Safe Creatine',
    reason: 'Formulated for growing athletes with bone-supporting nutrients and a gentle dose.',
    servings: 60,
  },
  'hair-safe': {
    product: 'AYN Hair Safe Creatine',
    reason: 'Protects against hair loss concerns while delivering maximum muscle-building benefits.',
    servings: 60,
  },
  'pro-athlete': {
    product: 'AYN Pro Athletes Creatine',
    reason: 'Triple-blend formula for elite performance, power, and endurance.',
    servings: 60,
  },
};

export default function QuizWidget() {
  const [quiz, setQuiz] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    showResult: false,
  });
  const { addToCart } = useCart();
  const handleAnswer = (answerId: string) => {
    const currentQ = questions[quiz.currentQuestion];
    setQuiz((prev) => ({
      ...prev,
      answers: { ...prev.answers, [currentQ.id]: answerId },
    }));
  };

  const handleNext = () => {
    if (quiz.currentQuestion < questions.length - 1) {
      setQuiz((prev) => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
    } else {
      setQuiz((prev) => ({ ...prev, showResult: true }));
    }
  };

  const handleBack = () => {
    if (quiz.currentQuestion > 0) {
      setQuiz((prev) => ({ ...prev, currentQuestion: prev.currentQuestion - 1 }));
    }
  };

  const handleRestart = () => {
    setQuiz({
      currentQuestion: 0,
      answers: {},
      showResult: false,
    });
  };

  const getRecommendation = () => {
    const { goal, concerns } = quiz.answers;
    
    if (concerns === 'hair-loss' || goal === 'hair') {
      return 'hair-safe';
    }
    if (concerns === 'bone-health' || goal === 'safe') {
      return 'junior-safe';
    }
    if (concerns === 'max-power' || goal === 'power') {
      return 'pro-athlete';
    }
    if (goal === 'muscle') {
      return 'pro-athlete';
    }
    return 'hair-safe';
  };

  const recommendation = getRecommendation();
  const productInfo = productRecommendations[recommendation];

  const progress = ((quiz.currentQuestion + 1) / questions.length) * 100;

  return (
    <section id="quiz" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ayn-teal/5 via-transparent to-ayn-coral/5"></div>
      
      <div className="w-full section-padding relative z-10">
        {/* Section Header */}
        <FadeIn delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-ayn-teal font-semibold text-sm tracking-wider uppercase mb-4 block">
              Formula Finder
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ayn-dark mb-6">
              Not Sure Which One?
            </h2>
            <p className="text-lg text-ayn-text-light">
              Take our 60-second quiz to find your perfect formula based on your goals, experience, and concerns.
            </p>
          </div>
        </FadeIn>

        {/* Quiz Container */}
        <FadeIn delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-10">
            {!quiz.showResult ? (
              <>
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-ayn-text-light mb-2">
                    <span>Question {quiz.currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-ayn-dark mb-6">
                    {questions[quiz.currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {questions[quiz.currentQuestion].options.map((option) => {
                      const currentQ = questions[quiz.currentQuestion];
                      const isSelected = quiz.answers[currentQ.id as keyof typeof quiz.answers] === option.id;
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleAnswer(option.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            isSelected
                              ? 'border-ayn-teal bg-ayn-teal/5'
                              : 'border-gray-200 hover:border-ayn-teal/50 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-ayn-teal text-white' : 'bg-gray-100 text-ayn-dark'
                          }`}>
                            <option.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="font-semibold text-ayn-dark block">{option.label}</span>
                            <span className="text-sm text-ayn-text-light">{option.description}</span>
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5 text-ayn-teal ml-auto" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    disabled={quiz.currentQuestion === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      quiz.currentQuestion === 0
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-ayn-dark hover:bg-gray-100'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!quiz.answers[questions[quiz.currentQuestion].id as keyof typeof quiz.answers]}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      quiz.answers[questions[quiz.currentQuestion].id as keyof typeof quiz.answers]
                        ? 'bg-ayn-teal text-white hover:bg-opacity-90'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {quiz.currentQuestion === questions.length - 1 ? 'See Result' : 'Next'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              /* Result */
              <div className="text-center">
                <div className="w-20 h-20 bg-ayn-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-ayn-teal" />
                </div>
                
                <h3 className="text-2xl font-bold text-ayn-dark mb-2">
                  Your Perfect Match
                </h3>
                <p className="text-ayn-text-light mb-8">
                  Based on your answers, we recommend:
                </p>

                <div className="bg-gradient-to-br from-ayn-teal/10 to-ayn-coral/10 rounded-2xl p-6 mb-8">
                  <h4 className="text-xl font-bold text-ayn-dark mb-2">
                    {productInfo.product}
                  </h4>
                  <p className="text-ayn-text-light mb-4">
                    {productInfo.reason}
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-3xl font-black text-ayn-dark">
                      ₹{recommendation === 'junior-safe' ? 1499 : recommendation === 'hair-safe' ? 2199 : 2499}
                    </span>
                    <span className="text-xl text-gray-400 font-medium line-through">
                      ₹{recommendation === 'junior-safe' ? 1999 : recommendation === 'hair-safe' ? 2899 : 3299}
                    </span>
                    <span className="text-ayn-text-light ml-1">/ {productInfo.servings} servings</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      addToCart({
                        id: recommendation,
                        name: productInfo.product,
                        variant: 'Unflavored',
                        servings: productInfo.servings,
                        price: recommendation === 'junior-safe' ? 1499 : recommendation === 'hair-safe' ? 2199 : 2499,
                        image: `/images/${recommendation === 'junior-safe' ? 'Junior-Safe' : recommendation === 'hair-safe' ? 'Hair-Safe' : 'Athletes'}.png`,
                      });
                    }}
                    className="btn-primary flex items-center justify-center gap-2 flex-1"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleRestart}
                    className="btn-outline flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
