import type { Profile, Organization, CloneOptions } from "./types";

export const mockProfile: Profile = {
  name: "Hyunsol Park",
  headline: "Design Engineer, Delphi",
  imageUrl: "https://picsum.photos/200",
  bio: "I'm working on designing a consumer platform at Delphi, helping Delphi transition into building a platform where anyone can create a digital mind and use it to preserve and expand their knowledge.\n\nBefore joining Delphi, I spent 5 years leading a team of 9 engineers and ops to build a career networking site for software builders in Korea, raised a million dollars, and scaled it to a platform that 15% of the Korean tech workforce uses.\n\nHere, I like chatting about design, psychology, and neuroscience on learning.",
  questions: [
    {
      id: "1",
      question: "What's your background and how did you get into design?",
    },
    {
      id: "2",
      question: "What advice would you give to someone starting in your field?",
    },
    {
      id: "3",
      question: "What's the biggest challenge you've faced in your career?",
    },
    { id: "4", question: "What's next for you?" },
  ],
  socials: {
    x: "https://x.com/hyunsol",
    linkedin: "https://linkedin.com/in/hyunsol",
    website: "https://hyunsol.me",
  },
};

export const mockOrganizations: Organization[] = [
  {
    iconUrl: "/delphi.svg",
    name: "Delphi",
  },
];

export const mockCloneOptions: CloneOptions = {
  customWarning: null,
};
