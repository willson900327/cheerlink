'use client';

import { useRouter } from 'next/navigation';
import CreateCardModal from '../components/CreateCardModal';

export default function CreatePage() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/cards');
  };

  return (
    <CreateCardModal onClose={handleClose} />
  );
}