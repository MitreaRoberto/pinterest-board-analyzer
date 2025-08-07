import { Suspense } from "react";
import DashboardContent from "@/components/DashboardContent";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}