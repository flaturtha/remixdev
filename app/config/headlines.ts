type ImagePosition = string | {
  mobile: string;
  desktop: string;
};

type HeadlineEntry = {
  title: string;
  highlights: string[];
  description: string;
  styles?: {
    [key: string]: string;
  };
  image?: string;
  imagePosition?: ImagePosition;
};

export const HEADLINES: { [key: string]: HeadlineEntry } = {
  '1': {
    title: "Can you outwit the detectives who defined a genre?",
    highlights: ["you", "the detectives"],
    description: "A Vintage Mystery Library"
  },
  '2': {
    title: "More thrilling than Sherlock, yet nearly lost to history.",
    highlights: ["Sherlock"],
    description: "A Vintage Mystery Library"
  },
  '3': {
    title: "Can you solve what the original readers never could?",
    highlights: ["you"],
    description: "A Vintage Mystery Library"
  },
  '4': {
    title: "Before Holmes, before Poirot — these sleuths led the way.",
    highlights: ["Holmes", "Poirot"],
    description: "A Vintage Mystery Library"
  },
  '5': {
    title: "Forgotten tales of suspense — find out what you've been missing.",
    highlights: ["suspense"],
    description: "A Vintage Mystery Library"
  },
  '6': {
    title: "The best mysteries you've never heard of, waiting to be solved.",
    highlights: ["you've never heard of"],
    description: "A Vintage Mystery Library"
  },
  '7': {
    title: "More than just stories — these mysteries are time capsules.",
    highlights: ["time capsules"],
    description: "A Vintage Mystery Library"
  },
  '8': {
    title: "Forgotten sleuths, timeless mysteries — your next obsession awaits.",
    highlights: ["your next obsession"],
    description: "A Vintage Mystery Library"
  },
  '9': {
    title: "Legends of the past, mysteries that still beg for answers.",
    highlights: ["legends of the past"],
    description: "A Vintage Mystery Library"
  },
  '10': {
    title: "Unlock the secrets of forgotten detectives and lost cases.",
    highlights: ["forgotten detectives", "lost cases"],
    description: "A Vintage Mystery Library"
  },
  '11': {
    title: "The best mysteries you've never read",
    highlights: ["never read"],
    description: "A Vintage Mystery Library"
  },
  '12': {
    title: "Vintage detectives, timeless plots — rediscover the roots of suspense.",
    highlights: ["rediscover", "roots of suspense"],
    description: "A Vintage Mystery Library"
  },
  '13': {
    title: "135 years old?! Reads like it was written yesterday.",
    highlights: ["135 years old"],
    description: "A Vintage Mystery Library"
  },
  '14': {
    title: "Mysteries so gripping, even Sherlock would lose sleep.",
    highlights: ["Sherlock"],
    description: "A Vintage Mystery Library"
  },
  '15': {
    title: "Dusty pages, deadly secrets — get lost in history's mysteries.",
    highlights: ["history's mysteries"],
    description: "A Vintage Mystery Library"
  },
  '16': {
    title: "More action & suspense than Sherlock.",
    highlights: ["Sherlock"],
    description: "A Vintage Mystery Library"
  },
  '17': {
    title: "Another sleepless night: just had to read one more chapter.",
    highlights: ["one more chapter"],
    description: "A Vintage Mystery Library"
  },
  '18': {
    title: "My new obsession: Old Broadbrim and the forgotten detectives!",
    highlights: ["forgotten detectives"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Hv18.png",
    imagePosition: "center 30%"
  },
  '19': {
    title: "Old-school detectives, hard-hitting cases — suspense that endures.",
    highlights: ["suspense that endures"],
    description: "A Vintage Mystery Library"
  },
  '20': {
    title: "Mystery's early days: as shadowy, suspenseful, and brilliant as ever.",
    highlights: ["shadowy", "suspenseful", "brilliant"],
    description: "A Vintage Mystery Library"
  },
  '21': {
    title: "“OLD BROADBRIM's cases are pure classic suspense. These stories have grit and twists that today's books can't match.”",
    highlights: ["pure classic suspense", "grit", "twists"],
    description: "A Vintage Mystery Library"
  },
  '22': {
    title: "“Reading these stories felt like uncovering buried treasure. As a lifelong Christie fan, I'm hooked on these forgotten classics.”",
    highlights: ["buried treasure", "forgotten classics"],
    description: "A Vintage Mystery Library"
  },
  '23': {
    title: "“If you're tired of predictable mysteries, meet OLD BROADBRIM. These vintage stories redefine suspense.”",
    highlights: ["predictable mysteries", "redefine suspense"],
    description: "A Vintage Mystery Library"
  },
  '24': {
    title: "“Old Search is the detective every mystery fan needs to meet. These stories bring suspense back to its gritty roots.”",
    highlights: ["every mystery fan needs to meet", "gritty roots"],
    description: "A Vintage Mystery Library"
  },
  '25': {
    title: "Into the Heart of Australia read like it was written yesterday—gritty, fast-paced, and impossible to put down. A true hidden gem.",
    highlights: ["Into the Heart of Australia", "hidden gem"],
    description: "A Vintage Mystery Library",
    styles: {
      "Into the Heart of Australia": "italic",
    },
    image: "/images/hero-backgrounds/TEv25.png"
  },
  '26': {
    title: "“Every twist in OLD SEARCH AND THE STRANGLERS kept me guessing. This is how detective stories are supposed to be.”",
    highlights: ["OLD SEARCH AND THE STRANGLERS", "kept me guessing", "supposed to be"],
    description: "A Vintage Mystery Library",
    styles: {
      "OLD SEARCH AND THE STRANGLERS": "italic"
    }
  },
  '27': {
    title: "“THE LAWYER DETECTIVE is full of surprises—sharp twists, gritty cases, and detectives who make you think.”",
    highlights: ["THE LAWYER DETECTIVE", "surprises", "sharp twists", "gritty cases"],
    description: "A Vintage Mystery Library",
    styles: {
      "THE LAWYER DETECTIVE": "italic"
    }
  },
  '28': {
    title: "“If you're a mystery fan who thinks they've read it all, try THE HYPNOTIST'S CRIME. Suspenseful, unpredictable, and filled with old-school detective charm.”",
    highlights: ["THE HYPNOTIST'S CRIME", "read it all", "old-school detective charm"],
    description: "A Vintage Mystery Library",
    styles: {
      "THE HYPNOTIST'S CRIME": "italic"
    }
  },
  '29': {
    title: "“These books are timeless. Each story feels like uncovering a lost world of suspense and unforgettable detectives.”",
    highlights: ["timeless", "lost world"],
    description: "A Vintage Mystery Library"
  },
  '30': {
    title: "“If you love Sherlock Holmes, prepare to be equally captivated by these detectives. Each book in this series is a masterpiece of tension and suspense.”",
    highlights: ["Sherlock Holmes", "masterpiece of tension and suspense"],
    description: "A Vintage Mystery Library"
  },
  '31': {
    title: "BEFORE HOLMES, BEFORE POIROT --- THESE SLEUTHS LED THE WAY",
    highlights: ["Holmes", "Poirot"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Tv4.png"
  },
  '32': {
    title: "“IF YOU LOVE SHERLOCK HOLMES PREPARE TO BE EQUALLY CAPTIVATED BY THESE DETECTIVES. EACH BOOK IN THIS SERIES IS A MASTERPIECE OF TENSION AND SUSPENSE.”",
    highlights: ["Sherlock Holmes", "masterpiece of tension and suspense"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/TEv30.png"
  },
  '33': {
    title: "MORE THRILLING THAN SHERLOCK, YET NEARLY LOST TO HISTORY.",
    highlights: ["Sherlock"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Tv2.png",
    imagePosition: "25% center"
  },
  '34': {
    title: "“READING THESE STORIES FELT LIKE UNCOVERING BURIED TREASURE. AS A LIFELONG CHRISTIE FAN, I'M HOOKED ON THESE FORGOTTEN CLASSICS.”",
    highlights: ["buried treasure", "forgotten classics"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/TEv22.png"
  },
  '35': {
    title: "MORE ACTION & SUSPENSE THAN SHERLOCK.",
    highlights: ["Sherlock"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Hv16.png"
  },
  '36': {
    title: "“INTO THE HEART OF AUSTRALIA READ LIKE IT WAS WRITTEN YESTERDAY — GRITTY, FAST-PACED, AND IMPOSSIBLE TO PUT DOWN. A TRUE HIDDEN GEM.”",
    highlights: ["Into the Heart of Australia", "hidden gem"],
    description: "A Vintage Mystery Library",
    styles: {
      "Into the Heart of Australia": "italic"
    },
    image: "/images/hero-backgrounds/TEv25.png"
  },
  '37': {
    title: "THE BEST MYSTERIES YOU'VE NEVER HEARD OF, WAITING TO BE SOLVED.",
    highlights: ["you've never heard of"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Tv6.png",
    imagePosition: "25% center"
  },
  '38': {
    title: "DUSTY PAGES, DEADLY SECRETS --- GET LOST IN HISTORY'S MYSTERIES",
    highlights: ["history's mysteries"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Hv15.png"
  },
  '39': {
    title: "CAN YOU OUTWIT THE DETECTIVES WHO DEFINED A GENRE?",
    highlights: ["you", "the detectives"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Tv1.png"
  },
  '40': {
    title: "“IF YOU'RE TIRED OF PREDICTABLE MYSTERIES, MEET OLD BROADBRIM. THESE VINTAGE STORIES REDEFINE SUSPENSE.”",
    highlights: ["predictable mysteries", "redefine suspense"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/TEv23.png",
    imagePosition: "85% center"
  },
  '41': {
    title: "135 YEARS OLD?! READS LIKE IT WAS WRITTEN YESTERDAY.",
    highlights: ["135 years old"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Hv13.png"
  },
  '42': {
    title: "MY NEW OBSESSION: OLD BROADBRIM AND THE FORGOTTEN DETECTIVES!",
    highlights: ["forgotten detectives"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Hv18.png",
    imagePosition: "85% center"
  },
  '43': {
    title: "THE BEST MYSTERIES YOU'VE NEVER READ",
    highlights: ["never read"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Hv11.png"
  },
  '44': {
    title: "“THESE BOOKS ARE TIMELESS. EACH STORY FEELS LIKE UNCOVERING A LOST WORLD OF SUSPENSE AND UNFORGETABLE DETECTIVES.”",
    highlights: ["timeless", "lost world"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/TEv29.png"
  },
  '45': {
    title: "UNLOCK THE SECRETS OF FORGOTTEN DETECTIVES AND LOST CASES.",
    highlights: ["forgotten detectives", "lost cases"],
    description: "A Vintage Mystery Library",
    image: "/images/hero-backgrounds/Tv10.png"
  }
};
