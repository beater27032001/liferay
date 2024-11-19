import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { Campaign } from "@/commom/types/campaign";
import CampaignCard from "../CampaignCard/campaignCard";
import { getFilteredCampaigns } from "@/utils/campaignUtils";
import Link from "next/link";

export default function CampaignCarousel() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/campaigns")
      .then((response) => response.json())
      .then((data) => setCampaigns(data));
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="flex w-full px-10">
      {getFilteredCampaigns(campaigns, 'active').map((item) => (
        <Link key={item.id} href={`/campaign/specificCampaign?id=${item.id}`}>
          <CampaignCard
            title={item.title}
            image={item.image}
            className="h-[350px] max-w-lg"
          />
        </Link>
      ))}
    </Slider>
  );
}
