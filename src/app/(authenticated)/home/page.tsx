"use client";

import CampaignCarousel from "@/components/CampaignCarousel/campaignCarousel";
import DataGraph from "@/components/DataGraph/dataGraph";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col justify-center py-12 px-16 gap-10">
      <div className="flex flex-col gap-7">
        <Link href="/campaign" className="text-liferayBlue font-bold text-3xl">
          Campanhas Ativas
        </Link>
        <CampaignCarousel />
      </div>
      <div className="flex flex-col gap-7">
        <Link href="/data" className="text-liferayBlue font-bold text-3xl">Dashboard</Link>
        <DataGraph />
      </div>
    </div>
  );
}
