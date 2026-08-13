import React from "react";
import FaqSection from "@/components/ui/habit-faq-scroller";

export default function DemoOne() {
  // --- EASY TO REMIX ---
  // Just change the values in this object to update the FAQ Section
  const faqData = {
    mainTitle: "Frequently Asked Questions",
    mainSubtitle:
      "Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.",
    rows: [
      {
        id: 'row1',
        speed: '60s',
        direction: 'left' as const,
        faqItems: [
          {
            id: 'q1',
            question: 'How do I track a new habit?',
            answer:
              'Simply click the "Add Habit" button on your dashboard, give it a name, set your schedule (daily, weekly, etc.), and you\'re ready to go!'
          },
          {
            id: 'q2',
            question: 'Is my data private and secure?',
            answer:
              'Absolutely. We use industry-standard encryption to protect your data. You are the only one who can see your personal progress.'
          },
          {
            id: 'q3_extra',
            question: 'How do StudySync groups work?',
            answer:
              'StudySync groups give you live messaging, markdown note sharing, member permissions, and instant AI summaries.'
          }
        ]
      },
      {
        id: 'row2',
        speed: '45s',
        direction: 'right' as const,
        faqItems: [
          {
            id: 'q3',
            question: 'Can I use this app with my team?',
            answer:
              'Yes! Our "Team" plan is designed for collaboration. You can create team goals, track shared habits, and view team-wide progress reports.'
          },
          {
            id: 'q4',
            question: 'What happens if I miss a day?',
            answer:
              'Life happens! Missing a day won\'t break your streak. Our app focuses on long-term consistency, not 100% perfection.'
          },
          {
            id: 'q5_extra',
            question: 'Is there an AI study assistant?',
            answer:
              'Yes, StudySync includes an integrated AI assistant to summarize notes, answer subject questions, and build practice quizzes.'
          }
        ]
      },
      {
        id: 'row3',
        speed: '70s',
        direction: 'left' as const,
        faqItems: [
          {
            id: 'q5',
            question: 'Is there a free trial?',
            answer:
              'Yes, you can try all our Pro features for 7 days, no credit card required. You can downgrade to the Free plan at any time.'
          },
          {
            id: 'q6',
            question: 'How do I cancel my subscription?',
            answer:
              'You can cancel your subscription at any time from your account settings page. Your access will continue until the end of your billing period.'
          },
          {
            id: 'q7_extra',
            question: 'Can I take rich text notes?',
            answer:
              'StudySync features a full TipTap markdown editor with support for code blocks, tables, formatting, and live autosave.'
          }
        ]
      }
    ]
  };
  // --- END REMIX AREA ---

  return (
    <div className="text-gray-800 min-h-screen flex items-center justify-center py-20 px-4 bg-[#f6f5f4]">
      <FaqSection data={faqData} />
    </div>
  );
}
