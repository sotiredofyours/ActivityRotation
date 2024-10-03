'use client'

import { useRouter } from "next/navigation";

export default function ActivitySettingsPage() {
  const router = useRouter();
  router.push('/activity-settings/1');
}
