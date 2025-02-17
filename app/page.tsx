import type { Metadata } from 'next';
import { GlobalMeta } from '@/lib/metadata';
import Landing from '@/components/pages/home-content';

export const metadata: Metadata = GlobalMeta;

export default function LandingPage() {
  return <Landing />;
}
