import { Course } from '../types';

export const coursesData: Course[] = [
  {
    id: '1',
    slug: 'professional-photography',
    title: 'Professional Photography',
    category: 'visual',
    duration: '3 Months',
    format: 'Practical In-Studio',
    shortDescription: 'Master manual camera controls, studio flash lighting, portraiture, product photography, and high-end Adobe Lightroom/Photoshop workflows.',
    fullOverview: 'The Professional Photography program at Greptech Media Academy is designed for aspiring and emerging photographers who want to transition from casual shooting to commercial-standard image creation. You will work inside professional photo studios with studio strobes, modifiers, backdrops, and tethered shooting setups.',
    image: '/assets/courses/professional-photography.jpg',
    highResImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    learningOutcomes: [
      'Master exposure triangle, metering modes, and lens selection for diverse scenarios',
      'Architect 1-point, 2-point, and multi-point studio strobe lighting setups',
      'Execute professional commercial product, editorial portrait, and event shoots',
      'Perform color-accurate raw processing in Lightroom and retouching in Photoshop',
      'Build a commercial portfolio and establish pricing, licensing, and client contracts'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Camera Optics, Sensor Mechanics & Exposure Masterclass',
        topics: ['Camera anatomy & sensor dynamics', 'Aperture, Shutter Speed, ISO synergy', 'Metering modes & histogram mastery', 'Focal lengths and lens compression']
      },
      {
        week: 2,
        title: 'Studio Lighting & Light Shaping',
        topics: ['Flash vs Continuous light', 'Softboxes, beauty dishes, umbrellas, grids', 'Lighting ratios & fill dynamics', 'Tethered shooting workflows']
      },
      {
        week: 3,
        title: 'Portraiture & Editorial Photography',
        topics: ['Subject posing & communication', 'High-key & low-key portraits', 'Environmental portraiture on location', 'Color gel effects']
      },
      {
        week: 4,
        title: 'Commercial Product & Still Life',
        topics: ['Tabletop lighting', 'Controlling reflections on glass and metal', 'Macro photography techniques', 'Creative flat lays']
      },
      {
        week: 5,
        title: 'Digital Darkroom: Lightroom & Photoshop',
        topics: ['RAW development & color calibration', 'Frequency separation skin retouching', 'Dodge and burn artistry', 'Batch export & print profiles']
      },
      {
        week: 6,
        title: 'Portfolio Review, Capstone & Exhibition',
        topics: ['Curating a cohesive portfolio body', 'Client pitching & rate cards', 'Final capstone photo exhibition', 'Certification assessment']
      }
    ],
    practicalProjects: [
      'Commercial Studio Editorial Shoot with Fashion Model',
      'High-Gloss Cosmetic Product Commercial Campaign',
      'Documentary Photo Essay of a Local Artisan'
    ],
    equipmentProvided: [
      'Full-frame mirrorless studio cameras (Sony / Canon)',
      'Godox & Profoto strobe flash systems with diverse softboxes',
      'Calibrated color-accurate IPS display editing stations',
      'Reflectors, C-stands, backdrops, and light meters'
    ],
    softwareCovered: ['Adobe Lightroom Classic', 'Adobe Photoshop', 'Capture One Pro'],
    instructor: {
      name: 'Michael Adebayo',
      role: 'Lead Photography Mentor & Commercial Photographer',
      bio: 'Over a decade of editorial and commercial photography experience for major fashion houses and corporate brands across West Africa.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    tuitionFee: 'Details to be announced',
    startDate: 'Upcoming Cohort — Admissions Open',
    certification: 'Greptech Professional Certificate in Commercial Photography',
    featured: true
  },
  {
    id: '2',
    slug: 'cinematography-filmmaking',
    title: 'Cinematography & Filmmaking',
    category: 'visual',
    duration: '3 Months',
    format: 'Practical Studio & On-Location',
    shortDescription: 'From script breakdown to final color grade. Learn visual storytelling, camera operating, cinematic lighting, directing, and DaVinci Resolve.',
    fullOverview: 'Immerse yourself in authentic film production. This comprehensive conservatory-style course trains students on cinema rigs, multi-point lighting grids, gimbal stabilization, optical framing, and post-production workflows that mirror international film sets.',
    image: '/assets/courses/cinematography-filmmaking.jpg',
    highResImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    learningOutcomes: [
      'Translate cinematic scripts into shot lists, overheads, and storyboards',
      'Operate cinema cameras, wireless video transmitters, and follow-focus systems',
      'Design dramatic lighting using key, fill, rim, and practical lights on set',
      'Direct camera movements with sliders, dolly tracks, and electronic gimbals',
      'Perform color grading and timeline assembly in DaVinci Resolve & Premiere Pro'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Cinematic Visual Language & Camera Systems',
        topics: ['Aspect ratios & composition rules', 'Frame rates, shutter angles, and motion cadence', 'Log color spaces and dynamic range', 'Cinema lenses vs photo lenses']
      },
      {
        week: 2,
        title: 'The Art of Cinematic Lighting',
        topics: ['Three-point lighting and chiaroscuro', 'Color temperature, gels, and diffusion textiles', 'Lighting for mood, genre, and skin tones', 'Working safely with grip and C-stands']
      },
      {
        week: 3,
        title: 'Camera Movement & Visual Dynamics',
        topics: ['Dolly shots, pans, tilts, and tracking moves', 'Ronin/gimbal balance and motor calibration', 'Handheld documentary camera technique', 'Blocking actors and camera synergy']
      },
      {
        week: 4,
        title: 'Sound for Cinema & Production Protocols',
        topics: ['Boom mic operating on set', 'Wireless lavalier placement', 'Onset slating and audio sync', 'Assistant camera (AC) focus pulling protocols']
      },
      {
        week: 5,
        title: 'Editorial & DaVinci Resolve Color Grading',
        topics: ['Rough cut assembly & narrative pacing', 'Color management (ACES & DaVinci YRGB)', 'Primary balance and secondary grading', 'Audio mix & sound design integration']
      },
      {
        week: 6,
        title: 'Short Film Production & Graduation Screening',
        topics: ['Directing and shooting the final student short film', 'Post-production finishing & DCP delivery', 'Audience test screening and critique']
      }
    ],
    practicalProjects: [
      'Narrative 3-Minute Dramatic Short Film (Crew Rotation)',
      'Cinematic Commercial Brand Advert',
      'Music Video Sequence with Dynamic Lighting Cues'
    ],
    equipmentProvided: [
      'Blackmagic Cinema Cameras & Sony FX Cinema line',
      'Aputure & Nanlite high-output LED spotlights and tubes',
      'Wireless video transmission & Atomos directors monitors',
      'DJI Ronin cinema gimbals and heavy-duty fluid head tripods'
    ],
    softwareCovered: ['DaVinci Resolve Studio', 'Adobe Premiere Pro', 'Final Draft'],
    instructor: {
      name: 'David Nwosu',
      role: 'Director of Photography & Filmmaker',
      bio: 'Award-winning cinematographer with feature film and commercial directing credits across Nollywood and international festivals.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    tuitionFee: 'Details to be announced',
    startDate: 'Upcoming Cohort — Admissions Open',
    certification: 'Greptech Diploma in Cinematography & Directing',
    featured: true
  },
  {
    id: '3',
    slug: 'graphic-design',
    title: 'Graphic Design',
    category: 'design',
    duration: '3 Months',
    format: 'Practical Lab & Studio',
    shortDescription: 'Master brand identity systems, typography, editorial layout, advertising design, and industry standard Adobe Creative Cloud tools.',
    fullOverview: 'Transform creative intuition into strategic visual communication. Students master typography theory, grid systems, print production, packaging, digital UI graphics, and identity guidelines that businesses pay top dollar for.',
    image: '/assets/courses/graphic-design.jpg',
    highResImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    learningOutcomes: [
      'Develop complete brand identity systems (logos, color systems, typography)',
      'Construct harmonic grid layouts for print editorials and digital packaging',
      'Master vector illustration in Adobe Illustrator and raster design in Photoshop',
      'Prepare print-ready pre-press files with bleed, slug, and spot colors',
      'Build a cohesive design portfolio showcasing commercial client case studies'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Design Foundations, Color Theory & Gestalt Principles',
        topics: ['Visual balance, contrast, hierarchy', 'Color psychology & harmonic palettes', 'Vector vs Raster mechanics', 'Adobe Illustrator interface mastery']
      },
      {
        week: 2,
        title: 'Typography & Layout Systems',
        topics: ['Anatomy of letterforms and font pairing', 'Grid systems (modular, baseline, hierarchical)', 'Editorial publication layout in Adobe InDesign', 'Micro and macro typography']
      },
      {
        week: 3,
        title: 'Brand Identity Architecture',
        topics: ['Brand discovery & strategy', 'Logo design process (sketching to vectorization)', 'Brand collateral (stationery, merchandise, signage)', 'Authoring a comprehensive brand guidelines book']
      },
      {
        week: 4,
        title: 'Digital Marketing & Social Media Design',
        topics: ['High-converting social ad creatives', 'Thumbnails, banners, and digital display assets', 'Photoshop compositing & photo manipulation', 'Creating mockups for client presentation']
      },
      {
        week: 5,
        title: 'Packaging & Pre-Press Production',
        topics: ['Dielines, box folds, and label packaging design', 'Color modes: CMYK, RGB, Pantone/Spot colors', 'Exporting print-ready PDFs without errors', 'Paper stocks, finishes, and printing techniques']
      },
      {
        week: 6,
        title: 'Portfolio Presentation & Freelance Operations',
        topics: ['Building a Behance and PDF case study portfolio', 'Pitching clients and pricing creative work', 'Contracts, copyright, and delivery handoff']
      }
    ],
    practicalProjects: [
      'Comprehensive Brand Identity System for a New Enterprise',
      'Editorial Magazine Layout (Cover & 8-page feature spread)',
      'Product Packaging Design with Custom 3D Mockups'
    ],
    equipmentProvided: [
      'High-performance iMac and PC design workstations',
      'Wacom drawing tablets and color-calibrated displays',
      'Extensive typography libraries and design paper samples'
    ],
    softwareCovered: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma'],
    instructor: {
      name: 'Chioma Okeke',
      role: 'Brand Designer & Creative Director',
      bio: 'Senior brand identity specialist who has created visual identities and packaging for leading African consumer brands.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    tuitionFee: 'Details to be announced',
    startDate: 'Upcoming Cohort — Admissions Open',
    certification: 'Greptech Certificate in Graphic & Brand Design',
    featured: true
  },
  {
    id: '4',
    slug: 'content-creation',
    title: 'Content Creation',
    category: 'production',
    duration: '3 Months',
    format: 'Practical Studio & Hybrid',
    shortDescription: 'Produce viral video, YouTube programming, podcasts, and digital storytelling with smartphone & mirrorless setups, lighting, and pacing.',
    fullOverview: 'In an era driven by algorithmic media, this course provides creators with the blueprint to script, shoot, edit, and package captivating content. Learn lighting tricks on any budget, storytelling structures that hook audiences, sound optimization, and multi-platform growth strategies.',
    image: '/assets/courses/content-creation.jpg',
    highResImage: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1200&q=80',
    learningOutcomes: [
      'Structure high-retention video hooks, storylines, and calls to action',
      'Shoot cinematic content using smartphones and mirrorless cameras',
      'Optimize studio lighting, keylights, and aesthetic RGB background setups',
      'Edit dynamic fast-paced videos with subtitles, B-roll, sound effects, and zooms',
      'Master YouTube SEO, thumbnail psychology, and monetization strategies'
    ],
    curriculum: [
      {
        week: 1,
        title: 'The Creator Economy & Visual Storytelling Blueprint',
        topics: ['Algorithm mechanics across YouTube, Instagram, and TikTok', 'Niche selection and audience profiling', '3-act structure and the crucial 3-second hook', 'Scripting and teleprompter workflows']
      },
      {
        week: 2,
        title: 'Creator Studio Setup & Gear Mastery',
        topics: ['Smartphone pro video apps (Blackmagic Cam, Filmic Pro)', 'Mirrorless creator kits (Sony ZV, Canon R)', 'Budget lighting setups and background accents', 'Compact wireless audio microphones (DJI Mic / Rode)']
      },
      {
        week: 3,
        title: 'Dynamic Video Editing & Retention Hacking',
        topics: ['CapCut & Premiere Pro for short-form video', 'Pacing, jump cuts, and pattern interrupts', 'Animated kinetic typography & auto-captions', 'Sound effects (SFX) that bring footage to life']
      },
      {
        week: 4,
        title: 'Long-Form YouTube Production & Podcasting',
        topics: ['Multi-camera video podcast production', 'B-roll shooting strategies that illustrate ideas', 'Lighting a two-person conversational setup', 'Audio level normalization & loudness standards']
      },
      {
        week: 5,
        title: 'Packaging: High-CTR Thumbnails & Metadata',
        topics: ['Click-through-rate (CTR) thumbnail design in Photoshop', 'Title testing and search optimization', 'Community management & audience retention analytics']
      },
      {
        week: 6,
        title: 'Creator Monetization & Brand Partnerships',
        topics: ['Building a creator media kit', 'Sponsorship outreach & brand pitching', 'Digital products, affiliate marketing, and consulting']
      }
    ],
    practicalProjects: [
      '3 High-Retention Short-Form Reels/TikToks with 50K+ Hook Framework',
      '10-Minute Polished YouTube Video Essay with Custom Thumbnail',
      'Video Podcast Episode with Two-Camera Switching'
    ],
    equipmentProvided: [
      'Studio ring lights, softboxes, and RGB ambient lights',
      'Rode Wireless Pro & DJI Mic systems',
      'Smartphone cages, gimbals, and teleprompter stations'
    ],
    softwareCovered: ['CapCut Pro', 'Adobe Premiere Pro', 'Adobe Photoshop', 'Descript'],
    instructor: {
      name: 'Tunde Bakare',
      role: 'Digital Strategist & Content Creator',
      bio: 'Prolific tech and lifestyle content creator who has amassed over 500k followers across digital platforms and consulted for top media agencies.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80'
    },
    tuitionFee: 'Details to be announced',
    startDate: 'Upcoming Cohort — Admissions Open',
    certification: 'Greptech Certificate in Digital Content Creation & Video Marketing',
    featured: true
  },
  {
    id: '5',
    slug: 'foley-sound-production',
    title: 'Foley & Sound Production',
    category: 'audio',
    duration: '3 Months',
    format: 'Practical Soundstage Lab',
    shortDescription: 'The magic of sound for film and television. Master foley generation, ADR, field audio recording, sound synthesis, and multi-track DAW mixing.',
    fullOverview: 'Sound represents half of the cinematic experience. In this rare, specialized course, students step inside dedicated acoustic foley studios and vocal booths to create footfalls, cloth rustles, cinematic impacts, ambient soundscapes, and dialog replacements that breathe life into picture.',
    image: '/assets/courses/foley-sound-production.jpg',
    highResImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    learningOutcomes: [
      'Perform realistic foley cues (footsteps, movement, props) in sync to film',
      'Record pristine field sound effects using shotgun mics and parabolic dishes',
      'Execute Automated Dialogue Replacement (ADR) and clean up location audio',
      'Synthesize futuristic and surreal cinematic sound effects in modern DAWs',
      'Deliver multi-channel film sound mixes (5.1 surround and stereo delivery)'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Acoustics, Psychoacoustics & Sound Stage Physics',
        topics: ['Sound propagation, frequencies, and decibel scales', 'Microphone polar patterns (Omni, Cardioid, Shotgun)', 'Acoustic treatment and reflection control', 'DAW signal flow & audio interfaces']
      },
      {
        week: 2,
        title: 'Foley Artistry: The Craft of Physical Sound',
        topics: ['Foley pit walking: matching surface textures (gravel, wood, concrete)', 'Cloth movement passes & micro-prop handling', 'Prop selection and creative kitchen foley', 'Spotting a film scene for sound cues']
      },
      {
        week: 3,
        title: 'Field Audio & Location Sound Recording',
        topics: ['Operating field recorders (Sound Devices, Zoom)', 'Wind protection and boom pole technique', 'Capturing natural room tones and urban ambiences', 'Stereo recording techniques (X/Y, ORTF, Mid-Side)']
      },
      {
        week: 4,
        title: 'Audio Restoration & Dialogue Cleanup',
        topics: ['iZotope RX spectral repair and noise reduction', 'De-reverb, de-click, and wind mitigation', 'ADR session setup and actor directing', 'Dialogue leveling and automation']
      },
      {
        week: 5,
        title: 'Sound Design & Synthesis for Screen',
        topics: ['Layering organic and synthesized audio elements', 'Sub-bass impacts, risers, and cinematic whooshes', 'EQ, compression, spatial reverb, and delay design', 'Time-stretching and pitch manipulation']
      },
      {
        week: 6,
        title: 'Final Film Sound Re-recording Mix',
        topics: ['Dialogue, Music, and Effects (DME) stem deliverables', 'Loudness standards for broadcast and streaming (LUFS)', 'Mixing to picture and final exhibition screening']
      }
    ],
    practicalProjects: [
      'Complete Foley & SFX Rescore for a 2-Minute Action Sequence',
      'Location Ambience Sound Library (20 Pristine Recorded Field Cues)',
      'Dialogue Restoration & ADR Replacement for a Short Film Scene'
    ],
    equipmentProvided: [
      'Acoustically isolated foley stage with multiple surface pits',
      'Sennheiser MKH416 & Neumann studio condenser microphones',
      'Sound Devices professional field recorders and boom setups',
      'Pro Tools and Logic Pro multi-monitor audio mixing desks'
    ],
    softwareCovered: ['Avid Pro Tools', 'Apple Logic Pro', 'iZotope RX Advanced'],
    instructor: {
      name: 'Emeka Eze',
      role: 'Lead Sound Designer & Re-Recording Mixer',
      bio: 'Veteran audio engineer with sound design credits on multiple Netflix and Amazon Prime feature productions.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    tuitionFee: 'Details to be announced',
    startDate: 'Upcoming Cohort — Admissions Open',
    certification: 'Greptech Diploma in Foley Artistry & Film Sound Production',
    featured: true
  },
  {
    id: '6',
    slug: 'live-streaming-production',
    title: 'Live Streaming & Production',
    category: 'production',
    duration: '3 Months',
    format: 'Hands-on Production Control Room',
    shortDescription: 'Master broadcast switching, multi-camera setups, Blackmagic ATEM, OBS Studio, network encoding, graphics, and live event production.',
    fullOverview: 'From high-stakes church services and esports tournaments to corporate conferences and hybrid concerts, live production demands unflinching technical precision. Train in our broadcast control room on multi-camera tally systems, PTZ cameras, SDI cabling, and live audio integration.',
    image: '/assets/courses/live-streaming-production.jpg',
    highResImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    learningOutcomes: [
      'Operate multi-camera video switchers (Blackmagic ATEM Television Studio)',
      'Design live broadcast lower-thirds, scoreboards, and animated overlays',
      'Route video signals over SDI, HDMI, and NDI IP network protocols',
      'Manage multi-channel live audio mixing and eliminate echo/delay',
      'Configure redundant network failovers for flawless live broadcasts'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Broadcast Signal Architecture & Protocols',
        topics: ['SDI vs HDMI vs NDI: Video signal transmission', 'Video frame rates, color spaces, and resolution syncing', 'Understanding RTMP, SRT, and HLS streaming protocols', 'Cabling, converters, and cable management in venues']
      },
      {
        week: 2,
        title: 'Multi-Camera Switcher Operations',
        topics: ['Blackmagic ATEM hardware and software control', 'Program/Preview buses and cut transitions', 'Picture-in-picture (PiP) and chroma key green screens', 'Macros and automated switcher sequences']
      },
      {
        week: 3,
        title: 'Camera Direction & Crew Intercom Communication',
        topics: ['Directing multi-cam operators via wireless intercom headsets', 'Callout commands: Standby, Take, Pan, Tilt, Zoom', 'Operating remote robotic PTZ cameras with joystick controllers', 'Tally light signaling systems']
      },
      {
        week: 4,
        title: 'Broadcast Graphics & Software Systems',
        topics: ['vMix and OBS Studio advanced workflows', 'Generating real-time lower thirds, titles, and scoreboards', 'Integrating live audience comments and polls on screen', 'Instant replay systems for sporting events']
      },
      {
        week: 5,
        title: 'Live Audio Engineering for Broadcast',
        topics: ['Routing audio from front-of-house (FOH) to broadcast feed', 'Audio-to-video delay synchronization (fixing lip sync)', 'Compressors, limiters, and broadcast loudness control', 'Handling multiple presenter wireless mics seamlessly']
      },
      {
        week: 6,
        title: 'Live Simulation & Capstone Broadcast',
        topics: ['Simulating a multi-camera live stage event with full crew', 'Network redundancy, bonded cellular routers, and failovers', 'Recording ISO camera feeds for post-production editing']
      }
    ],
    practicalProjects: [
      'Live 4-Camera Concert Broadcast with Real-Time Graphics and Audio Mix',
      'Corporate Hybrid Conference with Remote Zoom/Teams Video Call-Ins',
      'Church/Event Service Stream Setup with Automated PTZ Presets'
    ],
    equipmentProvided: [
      'Blackmagic ATEM Television Studio Pro 4K',
      'PTZ Optics robotic broadcast cameras with IP controller',
      'Behringer X32 digital audio consoles with Dante network cards',
      'Dedicated bonded internet routers and hardware video encoders'
    ],
    softwareCovered: ['Blackmagic ATEM Software', 'vMix Pro', 'OBS Studio', 'ProPresenter'],
    instructor: {
      name: 'Kenneth Danjuma',
      role: 'Broadcast Operations Director & Live Production Engineer',
      bio: 'Technical lead responsible for live broadcast operations for major concerts, national conferences, and international television feeds.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
    },
    tuitionFee: 'Details to be announced',
    startDate: 'Upcoming Cohort — Admissions Open',
    certification: 'Greptech Certificate in Live Broadcast & Streaming Engineering',
    featured: true
  },
  {
    id: '7',
    slug: 'voiceover-audio-production',
    title: 'Voiceover & Audio Production',
    category: 'audio',
    duration: '3 Months',
    format: 'Vocal Studio & Audio Lab',
    shortDescription: 'Master vocal control, commercial voiceovers, audiobook narration, audio drama acting, vocal booth acoustics, and broadcast mastering.',
    fullOverview: 'Your voice is an instrument that can command commercials, animate games, narrate documentaries, and host top podcasts. Students train inside broadcast vocal booths on pristine microphones, perfecting vocal modulation, inflection, breathing control, script interpretation, and commercial delivery.',
    image: '/assets/courses/voiceover-audio-production.jpg',
    highResImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    learningOutcomes: [
      'Master diaphragm breath support, vocal resonance, and diction clarity',
      'Interpret and deliver diverse script genres (commercial, narrative, animation)',
      'Operate broadcast condenser microphones and eliminate plosives/mouth noise',
      'Edit vocal takes, remove breaths, and build seamless vocal composites',
      'Produce an industry-standard commercial voiceover demonstration reel'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Vocal Instrument Mechanics & Breathing Foundations',
        topics: ['Diaphragmatic breathing and posture', 'Vocal warmups, resonance, and articulation exercises', 'Overcoming regional accents and speech impediments', 'Microphone positioning and proximity effect']
      },
      {
        week: 2,
        title: 'Commercial Voiceover & Advertising Scripts',
        topics: ['Deconstructing 30-second and 60-second commercial spots', 'The friendly conversational tone vs authoritative corporate read', 'Finding the operative words and pacing in advertising copy', 'Taking live direction from clients and directors']
      },
      {
        week: 3,
        title: 'Narration, Audiobooks & Documentary Voicing',
        topics: ['Long-form stamina and breath control', 'Audiobook industry standards (ACX specifications)', 'Documentary gravitas and pacing', 'Character voicing for animation and video games']
      },
      {
        week: 4,
        title: 'The Home Studio & Vocal Booth Engineering',
        topics: ['Selecting microphones: Large diaphragm condensers vs dynamics', 'Acoustic treatment for home recording spaces', 'Audio interfaces, preamps, and headphone monitoring', 'Clean room recording without background noise']
      },
      {
        week: 5,
        title: 'Vocal Editing, Processing & Mastering',
        topics: ['Cutting breaths, clicks, and sibilance with de-essers', 'Vocal EQ and gentle compression techniques', 'Adding music beds and sound effects under narration', 'Mastering audio to ACX and broadcast loudness targets']
      },
      {
        week: 6,
        title: 'The Business of Voiceover & Demo Reel Launch',
        topics: ['Recording your official commercial and narration demo reels', 'Setting up profiles on voice marketplaces (Voices.com, Fiverr Pro)', 'Direct marketing to production companies and agencies', 'Rate negotiation and recording contracts']
      }
    ],
    practicalProjects: [
      'Professional Commercial Voiceover Demo Reel (3 Distinct Commercials)',
      '15-Minute Polished Audiobook Chapter Produced to ACX Spec',
      'Documentary Voiceover Sequence Layered Over Cinematic Video'
    ],
    equipmentProvided: [
      'Acoustically treated WhisperRoom vocal recording booths',
      'Neumann TLM 103, Rode NT1, and Shure SM7B microphones',
      'Universal Audio Apollo preamps and pristine headphone monitors'
    ],
    softwareCovered: ['Adobe Audition', 'Reaper', 'iZotope Ozone & Nectar'],
    instructor: {
      name: 'Victoria Alabi',
      role: 'Commercial Voice Actor & Vocal Coach',
      bio: 'Leading African voice talent whose voice has powered national TV campaigns, audiobooks, and international animation productions.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
    },
    tuitionFee: 'Details to be announced',
    startDate: 'Upcoming Cohort — Admissions Open',
    certification: 'Greptech Certificate in Professional Voiceover & Audio Production',
    featured: true
  }
];

