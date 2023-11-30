import React, { ReactNode, useState } from "react";

interface QuestionInterface {
  question: ReactNode;
  answer: ReactNode;
}

const Question: React.FC<QuestionInterface> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-zinc-900 text-white hover:text-green-500" onClick={toggleAccordion}>
        <div className="w-full flex-auto">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">{question}</h2>
            <svg className={`w-10 h-10 ml-2 transition-transform transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 29 29">
              <path xmlns="http://www.w3.org/2000/svg" d="M10 15l-5-5h10l-5 5z" />
            </svg>
          </div>
        </div>
        {isOpen && (
          <div className="text-white ml-8 mt-2">
            {answer}
          </div>
        )}
      </div>
    </>
  );
};

export default Question;