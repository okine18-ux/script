export interface ScriptItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  iconUrl: string;
  tags: string[];
  badges: {
    text: string;
    type: 'hot' | 'new' | 'pro' | 'top';
  }[];
  stats: {
    rating: string;
    users: string;
    size: string;
  };
  link: string;
}

export type DeviceType = 'android' | 'ios' | 'windows' | null;

export type ModalType = 'device' | 'progress' | null;

export type VerificationState = 'idle' | 'loading' | 'verified';

declare global {
  interface Window {
    _wg?: () => void;
  }
}