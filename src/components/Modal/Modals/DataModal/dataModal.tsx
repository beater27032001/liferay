import { useEffect, useState } from "react";
import Modal from "@/components/Modal/modal";
import { DataTitle, DataTitleType } from "@/commom/types/data";

interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (title: DataTitleType, quantity: number) => void;
}

export default function DataModal({ isOpen, onClose, onInsert }: DataModalProps) {
  const [selectedData, setSelectedData] = useState(DataTitle[0]);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSelectedData("");
      setQuantity("");
    }
  }, [isOpen]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedData(event.target.value as DataTitleType);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleInsert = () => {
    if (selectedData && quantity) {
      onInsert(selectedData, Number(quantity));
      onClose();
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-black">Inserir Dados</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <select
              id="dataType"
              value={selectedData}
              onChange={handleSelectChange}
              className="bg-liferayGrey rounded-md text-black p-2"
            >
              <option value="" disabled>
                Tipo de dados
              </option>
              {DataTitle.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-black">
              Quantidade(Kg):
            </label>
            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              className="bg-liferayGrey rounded-md p-2 text-black w-14"
            />
          </div>
        </div>
        <button onClick={handleInsert} className="bg-liferayGreen rounded-md px-3 py-1 self-end hover:bg-lime-500">Inserir</button>
      </div>
    </Modal >
  );
}
