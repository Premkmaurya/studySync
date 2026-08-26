import React from 'react';

/**
 * FaqCard
 * Reusable card for a single FAQ item.
 */
export const FaqCard = ({ question, answer }) => {
  return (
    <div className="flex flex-col items-start gap-3 p-4 sm:gap-4 sm:p-6 bg-white rounded-xl shadow-md border border-black/5 hover:shadow-lg transition-shadow w-72 sm:w-96 shrink-0 faq-card">
      <h3 className="text-lg font-bold text-black sm:text-xl faq-title">{question}</h3>
      <p className="text-sm leading-relaxed text-gray-600 sm:text-base faq-answer">{answer}</p>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 */
export const HorizontalScroller = ({ children, speed = '30s', direction = 'left' }) => {
  const animationClass =
    direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';

  // Inline style to set the CSS custom property for scroll duration.
  const style = { '--scroll-duration': speed };

  return (
    <div className="w-full overflow-hidden group relative scroller-mask">
      <div className={`flex ${animationClass}`} style={style}>
        <div className="flex items-stretch justify-center shrink-0 gap-6 px-3">
          {children}
        </div>
        {/* duplicate for seamless loop */}
        <div className="flex items-stretch justify-center shrink-0 gap-6 px-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 */
const FaqSection = ({ data }) => {
  return (
    <div className="relative flex flex-col items-center gap-10 p-6 sm:p-10 w-full max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-4 text-center z-10 max-w-2xl">
        <h2
          className="text-2xl font-bold text-black leading-tight tracking-tight sm:text-5xl"
          style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 0.2s forwards' }}
        >
          {data.mainTitle}
        </h2>
        <p
          className="text-sm text-gray-600 sm:text-lg"
          style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 0.4s forwards' }}
        >
          {data.mainSubtitle}
        </p>
      </div>

      <div className="flex flex-col gap-6 z-10 w-full overflow-hidden">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard key={item.id} question={item.question} answer={item.answer} />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
