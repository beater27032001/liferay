import { Material } from "@/commom/types/campaign";
import Modal from "../../modal";
import { useState } from "react";
import { Donation } from "@/commom/types/donations";
import { v4 as uuidv4 } from 'uuid';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  materials: Material[]
  campaignId: string
  userId: string
  onDonationAdded: (donation: Donation) => void
}

export default function DonationModal({ isOpen, onClose, materials, campaignId, onDonationAdded, userId }: DonationModalProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaterial(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleDonate = async () => {
    if (selectedMaterial && quantity > 0) {
      const donation: Donation = {
        id: uuidv4(),
        title: selectedMaterial,
        quantity,
        userId,
        campaignId
      };

      // Save the donation to the JSON server
      const response = await fetch('http://localhost:3001/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donation),
      });

      if (response.ok) {
        // Update the user's donations
        const userResponse = await fetch(`http://localhost:3001/users/${userId}`);
        const userData = await userResponse.json();
        const updatedUserDonations = [...userData.donations, donation.id];
        const updatedUser = { ...userData, donations: updatedUserDonations };

        await fetch(`http://localhost:3001/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        });

        // Update the campaign's donations
        const campaignResponse = await fetch(`http://localhost:3001/campaigns/${campaignId}`);
        const campaignData = await campaignResponse.json();
        const updatedCampaignDonations = [...campaignData.donations, donation.id];
        const updatedMaterials = campaignData.materials.map((material: Material) => {
          if (material.name === selectedMaterial) {
            return { ...material, quantity: material.quantity + quantity };
          }
          return material;
        });
        const updatedCampaign = { ...campaignData, donations: updatedCampaignDonations, materials: updatedMaterials };

        await fetch(`http://localhost:3001/campaigns/${campaignId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCampaign),
        });

        onDonationAdded(donation);
        onClose();
      } else {
        alert('Failed to add donation');
      }
    } else {
      alert('Please select a material and enter a valid quantity');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-black">Inserir Doação</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <select
              id="dataType"
              value={selectedMaterial}
              onChange={handleSelectChange}
              className="bg-liferayGrey rounded-md text-black p-2"
            >
              <option value="" disabled>
                Tipo de material
              </option>
              {materials.map((material) => (
                <option key={material.name} value={material.name}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-black">
              Quantidade:
            </label>
            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              className="bg-liferayGrey rounded-md p-2 text-black w-14"
            />
          </div>
        </div>
        <button onClick={handleDonate} className="bg-liferayGreen rounded-md px-3 py-1 self-end hover:bg-lime-500">Doar</button>
      </div>
    </Modal>
  )
}