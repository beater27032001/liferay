import Link from 'next/link';
import Image from "next/image";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='flex items-center justify-between px-7 py-4 bg-liferayGrey'>
      <Image src="/logoBlue.png" alt="Liferay" width={215} />

      <span className='text-black'>© 2024 Squad39. Todos os direitos reservados</span>
      <div className='flex gap-3'>
        <Link className='hover:text-liferayBlue' href="https://www.facebook.com/liferay/" target="_blank">
          <FaFacebook color='#000000' size={20} />
        </Link>
        <Link className='hover:text-liferayBlue' href="https://github.com/liferay" target="_blank">
          <FaGithub color='#000000' size={20} />
        </Link>
        <Link className='hover:text-liferayBlue' href="https://www.instagram.com/liferayinc/" target="_blank">
          <FaInstagram color='#000000' size={20} />
        </Link>
        <Link className='hover:text-liferayBlue' href="https://www.linkedin.com/company/liferay-inc-/" target="_blank">
          <FaLinkedin color='#000000' size={20} />
        </Link>
        <Link className='hover:text-liferayBlue' href="https://www.youtube.com/user/liferayinc" target="_blank">
          <FaYoutube color='#000000' size={20} />
        </Link>
      </div>
    </footer>)
}



