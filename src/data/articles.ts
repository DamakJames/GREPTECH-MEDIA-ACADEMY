import { Article } from '../types';

export const articlesData: Article[] = [
  {
    id: 'art-1',
    slug: 'cinematic-lighting-on-a-budget',
    title: 'The Blueprint for Cinematic Lighting on an Indie Budget',
    summary: 'How to manipulate negative fill, practical lamps, and single-source key lighting to make indie projects look like multi-million dollar cinema.',
    content: [
      'Many budding cinematographers assume that cinematic images require towering lighting trucks and six-figure budgets. In reality, cinema lighting is far more about what you take away than what you add.',
      'Controlling negative fill by placing solid black flags opposite your key light immediately adds dramatic contrast and three-dimensional depth to your subject’s face.',
      'Always motivate your light from believable in-world practical sources—a bedside lamp, an open window, or a computer monitor. When light behaves organically, the audience immerses themselves into the story.'
    ],
    category: 'Cinematography',
    author: {
      name: 'Chris',
      role: 'Lead Cinematography Instructor'
    },
    publishedAt: 'October 14, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'art-2',
    slug: 'importance-of-sound-in-film',
    title: 'Why Poor Sound Destroys Good Cinematography Every Single Time',
    summary: 'Audiences will forgive grain and handheld camera movement, but they will instantly turn off muddy, echoing dialogue.',
    content: [
      'In visual media, sound does not merely accompany the image—it anchors the human brain into believing the reality of the scene.',
      'Understanding microphone polar patterns, proximity effect, and acoustic reflections in location recording is the first line of defense before you ever touch a noise reduction plugin.',
      'Foley effects like footsteps and subtle cloth rustles give physical weight to actors on screen. Without them, even the sharpest 8K video feels hollow and sterile.'
    ],
    category: 'Sound Production',
    author: {
      name: 'Chris',
      role: 'Lead Audio Instructor'
    },
    publishedAt: 'October 08, 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'art-3',
    slug: 'brand-identity-vs-logo-design',
    title: 'Brand Identity vs. A Logo: What High-Paying Clients Actually Buy',
    summary: 'A logo is merely an identifier. A brand identity is a comprehensive visual grammar that solves business problems.',
    content: [
      'Beginner designers often compete at the bottom of the market selling stand-alone logo marks for minimal fees. High-tier commercial clients, however, look for comprehensive brand architecture.',
      'A true brand identity system accounts for typographic scale, color psychology across print and digital, packaging dielines, UI components, and brand voice guidelines.',
      'When you learn to think in complete systems, you shift from being an aesthetic technician to a high-value strategic partner.'
    ],
    category: 'Graphic Design',
    author: {
      name: 'Valentina Williams',
      role: 'Lead Design Instructor'
    },
    publishedAt: 'September 29, 2026',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80'
  }
];

