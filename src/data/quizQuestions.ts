import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What psychological principle explains why consumers often prefer a product that is the middle option in pricing?',
    options: [
      'Paradox of choice',
      'Anchoring effect',
      'Compromise effect',
      'Loss aversion'
    ],
    correctAnswerIndex: 2,
    explanation: 'The compromise effect describes how consumers tend to avoid extreme options and prefer intermediate choices, which explains why retailers often place their preferred product in the middle of a price range.'
  },
  {
    id: 2,
    question: 'Which factor has been shown to have the strongest influence on healthy eating habits?',
    options: [
      'Knowledge about nutrition',
      'Income level',
      'Food environment and accessibility',
      'Willpower and motivation'
    ],
    correctAnswerIndex: 2,
    explanation: 'While all factors play a role, research consistently shows that the food environment—what foods are available, affordable, and convenient—has the strongest impact on eating habits across populations.'
  },
  {
    id: 3,
    question: 'When does economic scarcity most strongly affect consumer decision-making?',
    options: [
      'Only for luxury purchases',
      'For all decisions equally',
      'For immediate needs like food and housing',
      'For health-related expenditures'
    ],
    correctAnswerIndex: 2,
    explanation: 'Under economic scarcity, consumers prioritize immediate needs over long-term considerations, which can lead to decisions that address short-term problems but create longer-term issues.'
  },
  {
    id: 4,
    question: 'What is "choice architecture" in behavioral economics?',
    options: [
      'The range of product options available to consumers',
      'How choices are presented to influence decision-making',
      'The architectural design of retail environments',
      'A consumer\'s mental framework for making decisions'
    ],
    correctAnswerIndex: 1,
    explanation: 'Choice architecture refers to how choices are presented to consumers, and how this presentation can nudge people toward certain decisions without restricting freedom of choice.'
  },
  {
    id: 5,
    question: 'Which economic policy approach has been most effective at reducing sugar consumption in populations?',
    options: [
      'Voluntary industry pledges to reduce sugar',
      'Educational campaigns about sugar\'s health effects',
      'Sugar taxes combined with subsidies for healthier foods',
      'Warning labels on high-sugar products'
    ],
    correctAnswerIndex: 2,
    explanation: 'Research shows that combined fiscal approaches—taxing unhealthy options while making healthy foods more affordable—create the most significant population-level changes in consumption patterns.'
  }
];
