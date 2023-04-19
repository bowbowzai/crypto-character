export type CharacterPart = {
  styleURI: string;
  owner: string;
  highestBid: BigInt;
};

export type Character = {
  cloth?: {
    styleURI: string;
    owner: string;
    highestBid: BigInt;
  };
  eye?: {
    styleURI: string;
    owner: string;
    highestBid: BigInt;
  };
  hair?: {
    styleURI: string;
    owner: string;
    highestBid: BigInt;
  };
  mouth?: {
    styleURI: string;
    owner: string;
    highestBid: BigInt;
  };
  [index: number]: [string, string, BigInt];
};
