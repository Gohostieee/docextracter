import { auth } from '@clerk/nextjs/server';
import { checkSubscription } from '@/lib/subscription';
import HomeClient from './page-client';

export default async function Home() {
  // Server-side auth and subscription checks
  const { userId } = await auth();
  const isSignedIn = !!userId;
  const hasSubscription = isSignedIn ? await checkSubscription() : false;

  return <HomeClient isSignedIn={isSignedIn} hasSubscription={hasSubscription} />;
}
