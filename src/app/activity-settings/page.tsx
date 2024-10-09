"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ActivitySettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/activity-settings/1");
  }, [router])
}
