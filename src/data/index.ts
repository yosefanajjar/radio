import { Station } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const stations: Station[] = [
  {
    id: uuidv4(),
    name: 'Putin FM',
    frequency: 66.6,
    avatar: 'https://i.imgur.com/Q7IJ7z3.png',
    isPlaying: false,
  },
  {
    id: uuidv4(),
    name: 'Dribble FM',
    frequency: 101.2,
    avatar: 'https://i.imgur.com/Q7IJ7z3.png',
    isPlaying: false,
  },
  {
    id: uuidv4(),
    name: 'Dodge FM',
    frequency: 99.4,
    avatar: 'https://i.imgur.com/Q7IJ7z3.png',
    isPlaying: false,
  },
  {
    id: uuidv4(),
    name: 'Ballads FM',
    frequency: 87.1,
    avatar: 'https://i.imgur.com/Q7IJ7z3.png',
    isPlaying: false,
  },
  {
    id: uuidv4(),
    name: 'Maximum FM',
    frequency: 142.2,
    avatar: 'https://i.imgur.com/Q7IJ7z3.png',
    isPlaying: false,
  },
];
