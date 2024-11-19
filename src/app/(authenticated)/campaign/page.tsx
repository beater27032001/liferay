'use client';
import type { Campaign } from "@/commom/types/campaign";
import CampaignCard from "@/components/CampaignCard/campaignCard";
import CampaignModal from "@/components/Modal/Modals/CapaignModal/campaignModal";
import { getFilteredCampaigns } from "@/utils/campaignUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Campaign() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    fetch("http://localhost:3001/campaigns")
      .then((response) => response.json())
      .then((data) => setCampaigns(data));
  }, []);

  const handleInsertCampaign = (newCampaign: Campaign) => {
    setCampaigns([...campaigns, newCampaign]);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };


  return (
    <div className="flex flex-col justify-center py-12 px-16 gap-10">
      <div className="flex flex-col gap-7">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-liferayBlue font-bold text-3xl">Campanha</h1>
          {userRole === "admin" && (
            <button
              className="bg-liferayGreen text-black px-3 py-2 rounded-md hover:bg-lime-500"
              onClick={() => setIsModalOpen(true)}
            >
              Inserir campanha
            </button>
          )}
        </div>
        <div className="flex items-center">
          <select value={filter} onChange={handleFilterChange} className="bg-liferayGrey rounded-md p-2 text-black">
            <option value="all">Todas as campanhas</option>
            <option value="active">Campanhas ativas</option>
            <option value="inactive">Campanhas inativas</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {getFilteredCampaigns(campaigns, filter).map((campaign) => (
            <Link className="w-1/5" key={campaign.id} href={`/campaign/specificCampaign?id=${campaign.id}`}>
              <CampaignCard
                title={campaign.title}
                image={campaign.image}
              /></Link>
          ))}
        </div>
      </div>
      <CampaignModal onInsert={handleInsertCampaign} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}