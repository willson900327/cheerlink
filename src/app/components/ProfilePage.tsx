import React, { useState } from 'react';
import { BusinessCard } from '@/app/types/businessCard';
import { FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import Image from 'next/image';

interface ProfilePageProps {
  card: BusinessCard;
  onDelete?: () => void;
  onEdit?: () => void;
  showActions?: boolean;
}

export default function ProfilePage({ card, onDelete, onEdit, showActions = false }: ProfilePageProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    onDelete?.();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-medium mb-4">Delete Confirmation</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-sky-500 to-sky-600">
          {card.backgroundImage && (
            <Image
              src={card.backgroundImage}
              alt="Background"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        
        <div className="relative px-4 sm:px-6 -mt-16">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white bg-white shadow-lg">
            {card.avatarImage ? (
              <Image
                src={card.avatarImage}
                alt={card.name}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl font-semibold text-gray-400">
                  {card.name[0]}
                </span>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">{card.name}</h1>
            <p className="mt-1 text-xl text-gray-600">{card.title}</p>
            <p className="mt-1 text-lg text-gray-500">{card.company}</p>
          </div>

          <div className="mt-6">
            <div className="flex flex-col space-y-4">
              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="flex items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <span className="text-gray-800">{card.email}</span>
                </a>
              )}
              {card.phone && (
                <a
                  href={`tel:${card.phone}`}
                  className="flex items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaPhone className="text-gray-500 mr-3" />
                  <span className="text-gray-800">{card.phone}</span>
                </a>
              )}
              {card.linkedin && (
                <a
                  href={card.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaGlobe className="text-gray-500 mr-3" />
                  <span className="text-gray-800">LinkedIn</span>
                </a>
              )}
              {card.github && (
                <a
                  href={card.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaGlobe className="text-gray-500 mr-3" />
                  <span className="text-gray-800">GitHub</span>
                </a>
              )}
              {card.twitter && (
                <a
                  href={card.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaGlobe className="text-gray-500 mr-3" />
                  <span className="text-gray-800">Twitter</span>
                </a>
              )}
            </div>
          </div>

          {card.bio && (
            <div className="mt-6">
              <p className="text-gray-600 text-center">{card.bio}</p>
            </div>
          )}

          {showActions && (
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={onEdit}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Edit
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
