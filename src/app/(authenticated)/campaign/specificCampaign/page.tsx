'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Campaign } from "@/commom/types/campaign";
import Image from 'next/image';
import { Donation } from '@/commom/types/donations';
import { Users } from '@/commom/types/users';
import EditCampaignModal from '@/components/Modal/Modals/EditCampaignModal/editCampaignModal';
import DonationModal from '@/components/Modal/Modals/DonationModal/donationModal';

export default function SpecificCampaign() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [participants, setParticipants] = useState<Users[]>([]);
  const [userMap, setUserMap] = useState<{ [key: string]: string }>({});
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDonationOpen, setIsModalDonationOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const userIdLocalSotare = localStorage.getItem("userId");
    setUserRole(role);
    setUserId(userIdLocalSotare);
    if (id) {
      fetch(`/api/campaigns/${id}`)
        .then((response) => response.json())
        .then((data) => setCampaign(data));

      fetch(`/api/donations?campaignId=${id}`)
        .then((response) => response.json())
        .then((data) => setDonations(data));

      fetch(`/api/users`)
        .then((response) => response.json())
        .then((users) => {
          const userMap = users.reduce((acc: { [key: string]: string }, user: Users) => {
            acc[user.id] = user.name;
            return acc;
          }, {});
          setUserMap(userMap);

          if (campaign) {
            const campaignParticipants = users.filter((user: Users) => campaign.participants.includes(user.id));
            setParticipants(campaignParticipants);
          }
        })
    }
  }, [id, campaign]);

  const isCampaignActive = (campaign: Campaign) => {
    const currentDate = new Date();
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    return currentDate >= startDate && currentDate <= endDate;
  };

  const isUserParticipating = (campaign: Campaign, userId: string | null) => {
    return userId !== null && campaign.participants.includes(userId);
  };

  const handleParticipate = async () => {
    if (campaign && userId) {
      const updatedParticipants = [...campaign.participants, userId];
      const updatedCampaign = { ...campaign, participants: updatedParticipants };

      const response = await fetch(`/api/campaigns/${campaign.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCampaign),
      });

      if (response.ok) {
        setCampaign(updatedCampaign);

        const userResponse = await fetch(`/api/users/${userId}`);
        const userData = await userResponse.json();
        const updatedCampaigns = [...userData.campaigns, campaign.id];
        const updatedUser = { ...userData, campaigns: updatedCampaigns };

        const userUpdateResponse = await fetch(`/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        });

        if (userUpdateResponse.ok) {
          setParticipants([...participants, userData]);
        } else {
          alert('Failed to update user campaigns');
        }
      } else {
        alert('Failed to participate in the campaign');
      }
    }
  };

  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    setCampaign(updatedCampaign);
  };

  const handleDonationAdded = (donation: Donation) => {
    setDonations([...donations, donation]);
  };

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center py-12 px-16 gap-10 ">
      <div className="flex flex-col gap-7">
        <h1 className="text-liferayBlue font-bold text-3xl">{campaign.title}</h1>
        <div className="flex flex-row justify-between">
          {isCampaignActive(campaign) && userId && !isUserParticipating(campaign, userId) && (
            <button onClick={handleParticipate} className="bg-liferayGreen text-black px-3 py-2 rounded-md hover:bg-lime-500">
              Participar da campanha
            </button>
          )}
          {userRole === "admin" && (
            <button onClick={() => setIsModalEditOpen(true)} className="bg-liferayGreen text-black px-3 py-2 rounded-md hover:bg-lime-500">
              Editar campanha
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-7 items-center">
        <div className="relative w-full h-[400px]">
          <Image
            src={campaign.image}
            alt={campaign.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="w-full items-center bg-gray-400 p-4">
          <p className='font-medium text-center text-2xl'>{campaign.description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <h1 className="text-liferayBlue font-bold text-3xl">Doações</h1>
        {donations.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-start py-2 px-4 border-b">Usuário</th>
                <th className="text-start py-2 px-4 border-b">Material</th>
                <th className="text-start py-2 px-4 border-b">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td className="py-2 px-4 border-b">{userMap[donation.userId]}</td>
                  <td className="py-2 px-4 border-b">{donation.title}</td>
                  <td className="py-2 px-4 border-b">{donation.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum material foi doado ainda</p>
        )}
        {isCampaignActive(campaign) && isUserParticipating(campaign, userId) && (
          <button onClick={() => setIsModalDonationOpen(true)} className="self-end bg-liferayGreen text-black px-3 py-2 rounded-md hover:bg-lime-500">Inserir Doação</button>
        )}
      </div>
      <div className="flex flex-col gap-7">
        <h1 className="text-liferayBlue font-bold text-3xl">Participantes</h1>
        {participants.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-start">Nome</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td className="py-2 px-4 border-b">{participant.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum usuário está participando dessa campanha</p>
        )}
      </div>
      <EditCampaignModal onUpdate={handleUpdateCampaign} isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} campaign={campaign} />
      <DonationModal materials={campaign.materials} isOpen={isModalDonationOpen} onClose={() => setIsModalDonationOpen(false)} campaignId={campaign.id} userId={userId!} onDonationAdded={handleDonationAdded} />
    </div>
  );
}