import { Campaign } from "@/commom/types/campaign";

export const getFilteredCampaigns = (campaigns: Campaign[], filter: string): Campaign[] => {
  const currentDate = new Date();
  return campaigns.filter((campaign) => {
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    const isActive = currentDate >= startDate && currentDate <= endDate;

    if (filter === 'active') {
      return isActive;
    } else if (filter === 'inactive') {
      return !isActive;
    } else {
      return true;
    }
  });
};