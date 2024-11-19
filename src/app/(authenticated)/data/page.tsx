"use client";
import DataGraph from "@/components/DataGraph/dataGraph";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DataBase from "../../../../database.json";
import { useEffect, useRef, useState } from "react";
import DataModal from "@/components/Modal/Modals/DataModal/dataModal";
import type { Data, DataTitleType } from "@/commom/types/data";

export default function Data() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const exportDataToPDF = async () => {
    const doc = new jsPDF();
    const dataInfo = DataBase.data;

    doc.setFontSize(18);
    const title = "Dados do Dashboard";
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(title, titleX, 20);

    doc.setFontSize(12);
    dataInfo.forEach((item, index) => {
      const yPosition = 40 + index * 10;
      doc.text(`${item.title}: ${item.quantity}`, 10, yPosition);
    });

    if (graphRef.current) {
      const canvas = await html2canvas(graphRef.current);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 10, 60 + dataInfo.length * 10, imgWidth, imgHeight);
    }

    doc.save("dados_dashboard.pdf");
  };

  const handleInsertData = (title: DataTitleType, quantity: number) => {
    const updatedData = data.map((item) =>
      item.title === title ? { ...item, quantity: item.quantity + quantity } : item
    );
    setData(updatedData);

    const updatedItem = updatedData.find((item) => item.title === title);

    if (updatedItem) {
      fetch(`/api/data/${updatedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 px-16 gap-10">
      <div className="flex flex-col gap-7">
        <h1 className="text-liferayBlue font-bold text-3xl">Dashboard</h1>
        <div ref={graphRef}>
          <DataGraph />
        </div>
      </div>
      <div className="flex justify-between px-40">
        {userRole === "admin" && (
          <button
            className="bg-liferayGreen text-black px-3 py-2 rounded-md hover:bg-lime-500"
            onClick={() => setIsModalOpen(true)}
          >
            Inserir dados
          </button>
        )}
        <button
          onClick={exportDataToPDF}
          className=" bg-liferayGreen text-black px-3 py-2 rounded-md hover:bg-lime-500"
        >
          Exportar dados
        </button>
      </div>
      <DataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInsert={handleInsertData}
      />
    </div>
  );
}