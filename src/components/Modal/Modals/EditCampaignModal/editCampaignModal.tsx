"use client"
import { Campaign, Material } from "@/commom/types/campaign";
import Modal from "../../modal";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface EditCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
  onUpdate: (campaign: Campaign) => void;
}

export default function EditCampaignModal({ isOpen, onClose, campaign, onUpdate }: EditCampaignModalProps) {
  const [name, setName] = useState(campaign.title);
  const [description, setDescription] = useState(campaign.description);
  const [materialInput, setMaterialInput] = useState("");
  const [startDate, setStartDate] = useState(campaign.startDate);
  const [endDate, setEndDate] = useState(campaign.endDate);
  const [image, setImage] = useState<File | null>(null);
  const [materials, setMaterials] = useState<Material[]>(campaign.materials || []);

  useEffect(() => {
    if (!isOpen) {
      setName(campaign.title);
      setDescription(campaign.description);
      setMaterialInput("");
      setStartDate(campaign.startDate);
      setEndDate(campaign.endDate);
      setImage(null);
      setMaterials(campaign.materials);
    }
  }, [isOpen, campaign]);

  const handleAddMaterial = () => {
    if (materialInput) {
      setMaterials([...materials, { name: materialInput, quantity: 0 }]);
      setMaterialInput("");
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (name && description && startDate && endDate && new Date(endDate) > new Date(startDate)) {
      const updatedCampaign: Campaign = {
        ...campaign,
        title: name,
        description,
        image: image ? `/img.png` : campaign.image,
        materials,
        startDate,
        endDate,
      };

      // Update the campaign in the JSON server
      const response = await fetch(`http://localhost:3001/campaigns/${campaign.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCampaign),
      });

      if (response.ok) {
        onUpdate(updatedCampaign);
        onClose();
      } else {
        alert('Failed to update campaign');
      }
    } else {
      alert("Please fill all fields correctly and ensure the end date is after the start date.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-black">
          Editar Campanha
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label className="text-black">
              Nome da campanha:
            </label>
            <input
              type="text"
              placeholder="Digite o nome da campanha..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-liferayGrey rounded-md p-2 text-black flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-black">
              Imagem da campanha:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-liferayGrey rounded-md p-2 text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black">
              Descrição da campanha:
            </label>
            <textarea
              placeholder="Digite a descrição da campanha..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-liferayGrey rounded-md p-2 text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black">
              Materiais da campanha:
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Adicionar material..."
                value={materialInput}
                onChange={(e) => setMaterialInput(e.target.value)}
                className="bg-liferayGrey rounded-md p-2 text-black flex-1"
              />
              <button onClick={handleAddMaterial} className="bg-liferayGreen rounded-md px-3 py-1 hover:bg-lime-500">
                Adicionar Material
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {materials.map((material, index) => (
                <div key={index} className="flex items-center gap-2 bg-liferayGrey rounded-md p-2 text-black">
                  <span className="flex-1">{material.name} (Quantidade: {material.quantity})</span>
                  <button onClick={() => handleRemoveMaterial(index)}>
                    <IoMdCloseCircleOutline size={20} color="red" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <label className="text-black">
                Data de início:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-liferayGrey rounded-md p-2 text-black"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-black">
                Data de término:
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-liferayGrey rounded-md p-2 text-black"
              />
            </div>
          </div>
        </div>
        <button onClick={handleUpdate} className="bg-liferayGreen rounded-md px-3 py-1 self-end hover:bg-lime-500">Salvar</button>
      </div>
    </Modal>
  );
}