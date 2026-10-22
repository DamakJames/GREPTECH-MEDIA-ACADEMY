import { Facility } from '../types';

export const facilitiesData: Facility[] = [
  {
    id: 'photography-studio',
    name: 'Photography Studio',
    category: 'Visual Arts',
    description: 'A fully equipped cyclorama and backdrop studio featuring ceiling-mounted pantographs, motorized backdrop rollers, high-speed flash strobes, and tethered capture stations.',
    image: '/assets/facilities/photography-studio.jpg',
    keyGear: [
      'Motorized 9-foot seamless paper backdrop system (multiple colors)',
      'High-speed sync studio strobes with softboxes, beauty dishes, and snoots',
      'C-stands, boom arms, sandbags, and Matthews grip gear',
      'Calibrated 32-inch 4K tethered preview monitor on rolling workstation'
    ]
  },
  {
    id: 'editing-room',
    name: 'Editing Room',
    category: 'Post-Production',
    description: 'High-performance post-production suites featuring color-accurate OLED reference grading monitors, DaVinci Resolve color surfaces, and ultra-fast NVMe storage arrays.',
    image: '/assets/facilities/editing-room.jpg',
    keyGear: [
      'Apple Silicon Mac Studio workstations with 64GB unified memory',
      'DaVinci Resolve Mini Panels for tactile color timing',
      'Dual-display 4K IPS color-calibrated monitors',
      'Ultra-fast 10GbE network storage server for shared project editing'
    ]
  },
  {
    id: 'classroom',
    name: 'Classroom',
    category: 'Theory & Collaboration',
    description: 'Modern collaborative training room designed for masterclasses, script read-throughs, film screening critiques, and interactive design critiques.',
    image: '/assets/facilities/classroom.jpg',
    keyGear: [
      'High-lumen 4K laser projection system with surround audio',
      'Modular mobile workstations with integrated charging hubs',
      'Interactive digital whiteboard for storyboarding and shot planning',
      'Ergonomic studio seating for comfortable long sessions'
    ]
  },
  {
    id: 'production-studio',
    name: 'Production Studio',
    category: 'Cinema & Broadcast',
    description: 'A high-ceiling sound stage featuring a full curved green screen cyclorama, overhead DMX-controlled lighting grid, multi-camera broadcast switcher, and talkback intercom.',
    image: '/assets/facilities/production-studio.jpg',
    keyGear: [
      'Full-height curved green screen infinity cyc wall',
      'Overhead pipe grid with DMX-controlled bi-color and RGB LED panels',
      'Blackmagic ATEM broadcast switcher control desk',
      'Wireless crew intercom headsets and tally lights'
    ]
  }
];

