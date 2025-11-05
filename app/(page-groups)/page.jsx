import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'Lóvi — Cosmetics Fit Score',
  description: 'Science-backed AI-Cosmetologist you can trust',
};

// Reusable component for the score explanation cards
const ScoreCard = ({ title, score, safety, effectiveness, suitability, color, bgColor }) => {
  return (
    <div className={`rounded-3xl bg-white shadow-lg p-6 flex flex-col ${bgColor}`}>
      <div className={`rounded-full py-2 px-4 self-start ${color} font-medium`}>
        {score}
      </div>
      <h3 className="text-2xl font-medium text-[#151581] mt-4">{title}</h3>
      <div className="mt-4 space-y-3 text-gray-700">
        <p><strong>Safety:</strong> {safety}</p>
        <p><strong>Effectiveness:</strong> {effectiveness}</p>
        <p><strong>Skin Type Suitability:</strong> {suitability}</p>
      </div>
    </div>
  );
};

export default function FitScorePage() {
  return (
    <div className="bg-white">
      <section className="w-full max-w-6xl mx-auto px-4 md:px-12 py-32 lg:py-48 text-center">
        <h1 className="text-4xl md:text-6xl font-medium leading-tight! max-w-4xl mx-auto text-[#151581]">
          Ultimate score
          <br />
          to see if cosmetics
          <br />
          fit your skin
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mt-6">
          Lovi Score is a science-based evaluation tool designed to help users
          find the best cosmetic products for their unique skin characteristics
          and goals. It analyzes the entire formulation of a product to
          provide a reliable score.
        </p>
      </section>

      <section className="w-full bg-[#f6f6fa] rounded-t-[40px] py-12 lg:py-24">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-12">
          <h2 className="text-3xl md:text-5xl font-medium text-[#151581] text-center leading-tight! max-w-2xl mx-auto mb-12">
            Scores. Explained.
          </h2>
          
          {/* Score Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScoreCard
              title="Excellent"
              score="91-100%"
              safety="Excellent"
              effectiveness="Superior"
              suitability="Superior"
              color="text-white bg-[#9d61f0]"
              bgColor="bg-white"
            />
            <ScoreCard
              title="Very Good"
              score="76-90%"
              safety="No risk or irritation"
              effectiveness="Well-performing"
              suitability="No risks, beneficial ingredients"
              color="text-white bg-[#44b87c]"
              bgColor="bg-white"
            />
            <ScoreCard
              title="Good"
              score="51-75%"
              safety="Low risk of irritation"
              effectiveness="Average"
              suitability="Good, but could be better"
              color="text-white bg-[#8ccc3a]"
              bgColor="bg-white"
            />
            <ScoreCard
              title="OK"
              score="36-50%"
              safety="Moderate risk of irritation"
              effectiveness="Basic"
              suitability="OK, but not ideal"
              color="text-white bg-[#ffc201]"
              bgColor="bg-white"
            />
            <ScoreCard
              title="Poor"
              score="21-35%"
              safety="High risk of irritation"
              effectiveness="Poor"
              suitability="Bad for your skin type"
              color="text-white bg-[#ff9301]"
              bgColor="bg-white"
            />
            <ScoreCard
              title="Harmful"
              score="0-20%"
              safety="Extreme risk, contains allergens"
              effectiveness="Extremely poor"
              suitability="Crucially bad for your skin"
              color="text-white bg-[#ef6142]"
              bgColor="bg-white"
            />
          </div>
        </div>
      </section>
    </div>
  );
}