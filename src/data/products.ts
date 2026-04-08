import { Shield, Zap, Sparkles } from 'lucide-react';
import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'junior-safe',
    slug: 'junior-safe',
    name: 'AYN Junior Safe Creatine',
    badge: "India's First | Teen & Young Athletes",
    description: 'Low-dose creatine with bone support for growing athletes',
    longDescription: "India's first creatine formulated for teen & young athletes (ages 13–21). Junior Safe provides the benefits of creatine supplementation while supporting healthy bone development and growth.",
    image: '/images/Junior-Safe.png',
    color: 'blue',
    accentColor: 'bg-blue-500',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    ingredients: [
      { name: 'Creatine Monohydrate', amount: '2-3g', benefit: 'Muscle strength & safely dosed power' },
      { name: 'Calcium + D3', amount: '200mg', benefit: 'Bone health during growth phases' },
      { name: 'Magnesium', amount: '100mg', benefit: 'Muscle function' },
      { name: 'Electrolytes', amount: 'Blend', benefit: 'Hydration support' },
    ],
    benefits: [
      'Safe for ages 13-21',
      'Supports bone health',
      'Gentle on the system',
      'Lower optimal dosing',
    ],
    variants: [
      { servings: 30, price: 899, originalPrice: 1199, perServing: 29.97 },
      { servings: 60, price: 1499, originalPrice: 1999, perServing: 24.98 },
    ],
    flavors: ['Unflavored', 'Fruit Punch', 'Blue Raspberry'],
    icon: Shield,
    whoIsThisFor: [
      {
        icon: '🧑‍🎓',
        title: 'TEEN ATHLETES',
        desc: 'Young athletes looking for safe strength gains without overloading their growing systems.'
      },
      {
        icon: '🦴',
        title: 'BONE HEALTH FOCUS',
        desc: 'Includes essential Calcium and D3 to support bone density during critical growth phases.'
      },
      {
        icon: '🛡️',
        title: 'CAUTIOUS PARENTS',
        desc: 'Finally, a creatine formula parents can trust, with fully transparent and conservative dosing.'
      }
    ],
    howToUse: [
      { step: '01', title: 'MIX', desc: 'Mix 1 scoop with 200–250ml cold water. Shake well.' },
      { step: '02', title: 'TIMING', desc: 'Take daily — before or after training.' },
      { step: '03', title: 'CONSISTENCY', desc: 'Consistent daily use is key. No loading phase required.' },
    ],
    science: [
      { name: 'CREATINE MONOHYDRATE', dose: '2-3G PER SERVING', mechanism: 'A calibrated dose specifically selected for adolescent and young adult physiology. It provides the ATP regeneration needed for high-intensity sports without overwhelming the renal system.', research: 'Studies indicate lower doses (2-3g) are effective and safe for younger athletes when taken consistently without loading protocols.' },
      { name: 'CALCIUM + VITAMIN D3', dose: 'OPTIMIZED BLEND', mechanism: 'Critical co-factors for skeletal development during teenage years. As muscle mass increases from training, bone density must be supported.', research: 'Vitamin D3 increases calcium absorption by up to 65%, essential for structural integrity.' }
    ]
  },
  {
    id: 'hair-safe',
    slug: 'hair-safe',
    name: 'AYN Hair Safe Creatine',
    badge: "India's First | Hair Protection Formula",
    description: 'Advanced creatine with DHT blockers and hair nutrients',
    longDescription: "The first creatine formula designed to support muscle growth while protecting against hair loss concerns. Full 5g dose with Saw Palmetto, Biotin, and Ashwagandha. Train hard without worrying about DHT-related hair thinning.",
    image: '/images/Hair-Safe.png',
    color: 'emerald',
    accentColor: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    ingredients: [
      { name: 'Creatine Monohydrate', amount: '5g', benefit: 'Maximum muscle growth' },
      { name: 'Saw Palmetto', amount: '50mg', benefit: 'DHT blocker' },
      { name: 'Biotin (B7)', amount: '30-50mcg', benefit: 'Hair strength' },
      { name: 'Zinc Glyconate', amount: '5-10mg', benefit: 'Hair health' },
      { name: 'L-Methionine', amount: '100-250mg', benefit: 'Keratin production' },
      { name: 'Ashwagandha', amount: '100mg', benefit: 'Stress reduction' },
    ],
    benefits: [
      'Full 5g Creatine Dose',
      'DHT-blocking formula',
      'Hair Keratin Support',
      'Stress reduction support',
    ],
    variants: [
      { servings: 30, price: 1299, originalPrice: 1699, perServing: 43.30 },
      { servings: 60, price: 2199, originalPrice: 2899, perServing: 36.65 },
    ],
    flavors: ['Unflavored', 'Watermelon', 'Orange Burst'],
    icon: Sparkles,
    whoIsThisFor: [
      {
        icon: '🏋️',
        title: 'HAIR-CONSCIOUS GYM-GOERS',
        desc: 'Those who stopped or avoided creatine due to hair concerns. Get all the performance benefits without the anxiety.'
      },
      {
        icon: '🧬',
        title: 'GENETIC PREDISPOSITION',
        desc: 'Men with family history of male pattern baldness who want to train hard while being proactive about hair protection.'
      },
      {
        icon: '✨',
        title: 'PERFORMANCE + HAIR HEALTH',
        desc: "Anyone wanting full creatine benefits without compromising hair health. You shouldn't have to choose."
      }
    ],
    howToUse: [
      { step: '01', title: 'MIX', desc: 'Mix 1 scoop with 200–250ml cold water. Shake well until fully dissolved.' },
      { step: '02', title: 'TIMING', desc: 'Take daily — before or after training, morning on rest days.' },
      { step: '03', title: 'CONSISTENCY', desc: 'Consistent daily use is more important than timing.' },
      { step: '04', title: 'PATIENCE', desc: 'Give 4–8 weeks for hair-protective ingredients to build up.' }
    ],
    science: [
      { name: 'CREATINE MONOHYDRATE', dose: '5G PER SERVING', mechanism: 'The most researched and proven form of creatine. It saturates muscle creatine stores for maximum ATP regeneration during high-intensity exercise.', research: 'Hundreds of studies confirm 5g daily creatine monohydrate significantly improves strength, power, and lean muscle mass.' },
      { name: 'SAW PALMETTO EXTRACT', dose: '50MG PER SERVING', mechanism: 'Saw Palmetto is a natural 5-alpha reductase inhibitor. This enzyme converts testosterone to DHT (dihydrotestosterone), which accelerates hair follicle miniaturization in predisposed individuals.', research: 'Clinical studies demonstrate Saw Palmetto\'s effectiveness in reducing DHT levels and supporting hair retention.' },
      { name: 'BIOTIN (VITAMIN B7)', dose: '30-50MCG PER SERVING', mechanism: 'Essential for keratin production — the protein that makes up hair, skin, and nails. Supports structural integrity of hair strands.', research: 'Supplementation improves hair strength and quality.' },
      { name: 'L-METHIONINE', dose: '100-250MG PER SERVING', mechanism: 'A sulfur-containing essential amino acid and a precursor to cysteine — a key component of keratin.', research: 'Sulfur amino acids like methionine are crucial for healthy hair growth and the disulfide bonds that give hair its strength.' }
    ]
  },
  {
    id: 'pro-athlete',
    slug: 'pro-athlete',
    name: 'AYN Pro Athletes Creatine',
    badge: 'Maximum Performance',
    description: 'Triple-blend creatine complex for elite performance',
    longDescription: 'Our most advanced formula featuring a triple-blend creatine complex designed for elite athletes seeking maximum power, endurance, and muscle volumization.',
    image: '/images/Athletes.png',
    color: 'red',
    accentColor: 'bg-red-700',
    textColor: 'text-red-800',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    ingredients: [
      { name: 'Creatine Monohydrate', amount: '3g', benefit: 'Proven strength' },
      { name: 'Creatine HCL', amount: '1g', benefit: 'Enhanced absorption' },
      { name: 'Tri-Creatine Malate', amount: '1g', benefit: 'Endurance boost' },
      { name: 'Taurine', amount: '1g', benefit: 'Muscle pumps' },
      { name: 'Betaine', amount: '2.5g', benefit: 'Power output' },
    ],
    benefits: [
      'Explosive power',
      'Enhanced endurance',
      'Maximum muscle volumization',
      'Rapid absorption',
    ],
    variants: [
      { servings: 30, price: 1499, originalPrice: 1999, perServing: 49.97 },
      { servings: 60, price: 2499, originalPrice: 3299, perServing: 41.65 },
    ],
    flavors: ['Unflavored', 'Green Apple', 'Watermelon'],
    icon: Zap,
    whoIsThisFor: [
      {
        icon: '🏆',
        title: 'COMPETITIVE ATHLETES',
        desc: 'Powerlifters, sprinters, and elite athletes requiring the highest degree of cellular energy regeneration.'
      },
      {
        icon: '⚡',
        title: 'PLATEAU BREAKERS',
        desc: 'Experienced lifters who have stalled out on standard creatine monohydrate alone.'
      },
      {
        icon: '💪',
        title: 'MAXIMUM VOLUMIZATION',
        desc: 'Bodybuilders seeking intense cell-swelling effects from the Betaine and Taurine inclusion.'
      }
    ],
    howToUse: [
      { step: '01', title: 'MIX', desc: 'Mix 1 scoop with 300ml cold water. Drink immediately for best absorption.' },
      { step: '02', title: 'TIMING', desc: 'Best taken 30-45 minutes pre-workout to maximize the Taurine & Betaine effects.' },
      { step: '03', title: 'HYDRATION', desc: 'Ensure you drink at least 3-4 liters of water daily due to the intense intracellular volumization.' },
    ],
    science: [
      { name: 'TRI-CREATINE COMPLEX', dose: '5G TOTAL', mechanism: 'A precise blend of Monohydrate, HCL, and Malate forms. Targets multiple absorption pathways to ensure maximum cellular uptake without gastrointestinal distress.', research: 'Utilizing varied creatine salts has been shown to improve solubility and time-to-peak plasma concentration.' },
      { name: 'BETAINE ANHYDROUS', dose: '2.5G PER SERVING', mechanism: 'An osmolyte that regulates cellular hydration. It pulls water into muscle cells, protecting them against stress and significantly increasing power output.', research: '2.5g daily betaine supplementation has been clinically proven to enhance bench press power and muscle volume.' },
      { name: 'TAURINE', dose: '1G PER SERVING', mechanism: 'Works synergistically with creatine to enhance intracellular water retention and muscle endurance, while improving neuromuscular firing.', research: 'Taurine supplementation mitigates exercise-induced oxidative stress and improves time to exhaustion.' }
    ]
  },
];
