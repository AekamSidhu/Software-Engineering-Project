'use client'
import React, { useState } from 'react';
import { MessageCircle, User, Upload, FileText, Send, Moon } from 'lucide-react';

export default function ChestXrayReport() {
  const [zoomLevel, setZoomLevel] = useState(2.0);
  const [question, setQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'assistant',
      text: 'Welcome! Ask me about the findings, impression, or specific details in the report above.'
    }
  ]);

  const exampleQuestions = [
    'What are the main findings?',
    'Are there any tubes or lines mentioned?',
    'Summarize the impression',
    'Is the heart size normal?',
    'Any signs of pleural effusion?'
  ];

  const handleQuestionClick = (q) => {
    setQuestion(q);
  };

  const handleSendQuestion = () => {
    if (question.trim()) {
      setChatMessages([...chatMessages, { type: 'user', text: question }]);
      setQuestion('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          type: 'assistant',
          text: 'Based on the report, I can help you with that. The main findings include stable positioning of central venous catheters, stable cardiomegaly, mild pulmonary edema, and bilateral pleural effusions with bibasilar opacities.'
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendQuestion();
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full h-full bg-white rounded-xl shadow-lg border-2 border-blue-500 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b-2 border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">
            X-ray Report Generation
          </h1>
          <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
            <Moon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-0 flex-1 overflow-hidden">
          {/* Left Panel - Chat */}
          <div className="flex flex-col h-full border-r-2 border-gray-200">
            {/* Chat Header */}
            <div className="bg-white border-b-2 border-gray-200 px-6 py-3">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                <MessageCircle className="w-5 h-5" />
                Chat about Report
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Ask questions based *only* on the generated report
              </p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 ${
                    msg.type === 'user' ? 'flex justify-end' : ''
                  }`}
                >
                  <div
                    className={`p-4 rounded-lg text-base max-w-[90%] ${
                      msg.type === 'assistant'
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t-2 border-gray-200 p-6 bg-white">
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendQuestion}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Example Questions */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Example Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuestionClick(q)}
                      className="px-3 py-1.5 text-sm bg-white text-blue-600 rounded-full hover:bg-blue-50 transition border border-blue-300"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Image and Report */}
          <div className="flex flex-col h-full bg-white">
            {/* Patient Info */}
            <div className="border-b-2 border-gray-200 px-6 py-3">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 mb-2">
                <User className="w-5 h-5" />
                Patient Information
              </h2>
              <div className="text-sm text-gray-700">
                <span className="font-medium">View:</span> Frontal-AP | <span className="font-medium">Age:</span> 31 | <span className="font-medium">Gender:</span> Male | <span className="font-medium">Ethnicity:</span> White
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Uploaded Image Section */}
                <div>
                  <h3 className="text-base font-semibold flex items-center gap-2 mb-3 text-gray-900">
                    <Upload className="w-5 h-5" />
                    Uploaded Image
                  </h3>
                  <div className="bg-black rounded-lg overflow-hidden relative mb-3">
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs font-medium">
                      SEMI-UPRIGHT
                    </div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Chest_Xray_PA_3-8-2010.png/800px-Chest_Xray_PA_3-8-2010.png"
                      alt="Chest X-ray"
                      className="w-full h-auto"
                      style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 text-center mb-2">
                      Hover over image to zoom (on desktop)
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Zoom Level: {zoomLevel.toFixed(1)}x</span>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoomLevel}
                        onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Generated Report Section */}
                <div>
                  <h3 className="text-base font-semibold flex items-center gap-2 mb-3 text-gray-900">
                    <FileText className="w-5 h-5" />
                    Generated Report
                  </h3>
                  <div className="bg-white rounded-lg border-2 border-gray-300 p-4 text-sm text-gray-800 leading-relaxed min-h-[250px]">
                    stable positioning of right internal jugular central venous catheter and right 
                    internal jugular central venous catheter stable cardiomegaly and mild pulmonary 
                    edema with bilateral pleural effusions and bibasilar opacities
                  </div>
                </div>
              </div>

              {/* Start Over Button */}
              <button className="w-full py-3 border-2 border-gray-300 rounded-lg text-base text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Start Over / New Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}