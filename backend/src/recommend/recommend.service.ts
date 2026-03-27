// recommend.service.ts — Core business logic
// Contains all mock vitamin data and the keyword-matching recommendation engine.

import { Injectable } from '@nestjs/common';
import { Vitamin, RecommendResponse } from './vitamin.interface';

const VITAMIN_DATABASE: Array<Vitamin & { keywords: string[] }> = [
  {
    name: 'Vitamin A',
    benefits:
      'Supports vision, especially night vision. Maintains healthy skin, immune function, and cell growth. Essential for proper organ function.',
    foods: ['carrot', 'sweet potato', 'spinach', 'kale', 'eggs', 'liver', 'pumpkin'],
    deficiency:
      'Night blindness, dry eyes, increased infections, dry skin, and in severe cases, complete vision loss.',
    keywords: [
      'vitamin a', 'eye', 'eyes', 'vision', 'sight', 'night', 'blind', 'fatigue',
      'carrot', 'spinach', 'skin', 'dry skin', 'immune', 'kale', 'pumpkin',
      'liver', 'sweet potato', 'retina',
    ],
  },
  {
    name: 'Vitamin B Complex',
    benefits:
      'B vitamins (B1, B2, B3, B6, B12, Folate) support energy metabolism, brain function, red blood cell formation, and a healthy nervous system.',
    foods: ['eggs', 'whole grains', 'legumes', 'nuts', 'meat', 'fish', 'dairy', 'banana', 'avocado'],
    deficiency:
      'Fatigue, anemia, nerve damage, depression, mouth sores, memory problems, and poor concentration.',
    keywords: [
      'vitamin b', 'b1', 'b2', 'b3', 'b6', 'b12', 'folate', 'folic',
      'energy', 'fatigue', 'tired', 'tiredness', 'brain', 'memory', 'nerve',
      'anemia', 'anaemia', 'headache', 'depression', 'mood', 'banana',
      'egg', 'eggs', 'grain', 'stress', 'focus', 'concentration', 'avocado',
    ],
  },
  {
    name: 'Vitamin C',
    benefits:
      'A powerful antioxidant that boosts the immune system, helps the body absorb iron, promotes collagen production, and accelerates wound healing.',
    foods: ['orange', 'strawberry', 'lemon', 'kiwi', 'bell pepper', 'broccoli', 'tomato', 'grapefruit'],
    deficiency:
      'Scurvy (bleeding gums, bruising), poor wound healing, weakened immunity, frequent colds, and joint pain.',
    keywords: [
      'vitamin c', 'immune', 'immunity', 'cold', 'flu', 'infection', 'skin', 'collagen',
      'orange', 'strawberry', 'lemon', 'kiwi', 'wound', 'healing',
      'gum', 'bleeding', 'antioxidant', 'broccoli', 'tomato', 'pepper', 'scurvy',
    ],
  },
  {
    name: 'Vitamin D',
    benefits:
      'Regulates calcium and phosphorus absorption for strong bones and teeth. Supports immune health, muscle function, and mood regulation.',
    foods: ['salmon', 'tuna', 'egg yolk', 'fortified milk', 'mushroom', 'mackerel', 'sardines'],
    deficiency:
      'Rickets in children, osteoporosis in adults, weak muscles, fatigue, depression, and increased risk of infections.',
    keywords: [
      'vitamin d', 'bone', 'bones', 'teeth', 'calcium', 'sun', 'sunlight', 'muscle',
      'weakness', 'depression', 'mood', 'salmon', 'milk', 'mushroom',
      'joint', 'back pain', 'rickets', 'osteoporosis', 'hair loss',
    ],
  },
  {
    name: 'Vitamin E',
    benefits:
      'A fat-soluble antioxidant that protects cells from damage. Supports immune function, skin health, eye health, and helps prevent inflammation.',
    foods: ['almond', 'sunflower seeds', 'avocado','olive oil', 'spinach', 'peanut', 'hazelnut'],
    deficiency:
      'Nerve damage, muscle weakness, vision problems, weakened immune response, and skin dryness.',
    keywords: [
      'vitamin e', 'antioxidant', 'skin', 'aging', 'eye', 'eyes', 'immune', 'inflammation',
      'almond', 'avocado', 'oil', 'sunflower', 'nerve', 'muscle',
      'cell', 'protection', 'hair', 'nails',
    ],
  },
  {
    name: 'Vitamin K',
    benefits:
      'Essential for blood clotting, wound healing, and bone metabolism. Helps direct calcium to bones rather than arteries.',
    foods: ['kale', 'spinach', 'broccoli', 'Brussels sprouts', 'green beans', 'parsley', 'soybean oil'],
    deficiency:
      'Excessive bleeding, easy bruising, weak bones, heavy menstrual periods, and cardiovascular complications.',
    keywords: [
      'vitamin k', 'blood', 'clotting', 'bleeding', 'bruise', 'bruising', 'bone',
      'wound', 'healing', 'kale', 'spinach', 'broccoli', 'heart',
      'cardiovascular', 'fracture', 'osteoporosis',
    ],
  },
];

@Injectable()
export class RecommendService {
  getRecommendations(query: string): RecommendResponse {
    const normalizedQuery = query.toLowerCase().trim();
    const queryWords = normalizedQuery.split(/\s+/);

    const matched: Vitamin[] = [];

    for (const vitamin of VITAMIN_DATABASE) {
      const isMatch = vitamin.keywords.some((keyword) => {
        const kw = keyword.toLowerCase();
        return (
          normalizedQuery.includes(kw) ||
          kw.includes(normalizedQuery) ||
          queryWords.some((word) => kw.includes(word) || word.includes(kw))
        );
      });

      if (isMatch) {
        matched.push({
          name: vitamin.name,
          benefits: vitamin.benefits,
          foods: vitamin.foods,
          deficiency: vitamin.deficiency,
        });
      }
    }

    return { input: query, vitamins: matched };
  }
}