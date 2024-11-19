import Image from "next/image";

interface CampaignCardProps {
  title: string;
  image: string;
  className?: string;
}

export default function CampaignCard({ title, image, className }: CampaignCardProps) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <Image
        src={`${image}`}
        alt={`Imagem de ${title}`}
        width={500}
        height={350}
        className="rounded-lg"
      />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-end p-2">
        <span className="text-lg font-bold">{title}</span>
      </div>

    </div>
  )
}