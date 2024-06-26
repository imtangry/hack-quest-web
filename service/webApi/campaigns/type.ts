export interface CertificationType {
  name: string;
  description: string;
  image: string;
  exp: number;
  credits: number;
  id: string;
  claimed: boolean;
  mint: boolean;
  signatureId: number;
}
export interface MantleType {
  id: string;
  name: string;
  title: string;
  description: string;
  progress: [number, number];
  sequence: number;
  completed: boolean;
  claimed: boolean;
  certification: CertificationType;
}

export enum TargetType {
  COURSE = 'COMPLETE_COURSE',
  LEARNING_TRACK = 'COMPLETE_LEARNING_TRACK',
  TWITTER = 'FOLLOW_TWITTER',
  DISCORD = 'JOIN_DISCORD',
  GIUHUB = 'CONNECT_GITHUB'
}
export interface TargetsType {
  id: string;
  campaignId: string;
  name: string;
  title: string;
  progress: [number, number];
  sequence: number;
  completed: boolean;
  claimed: boolean;
  reward: number;
  type: TargetType;
  extra?: {
    url: string;
  };
}

export interface GetSignatureParams {
  sourceType: 'Certification';
  sourceId: string;
  address: string;
}

export interface SignatureData {
  hashResult: string;
  sig: {
    v: number;
    r: `0x${string}`;
    s: `0x${string}`;
  };
}
