'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaGithub, FaTwitter, FaDownload, FaTimes } from 'react-icons/fa';
import { BusinessCard } from '../types/businessCard';
import { Language } from '../i18n/config';
import Image from 'next/image';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

interface BusinessCardWebsiteProps {
  card: BusinessCard;
  lang: Language;
}

type Template = 'modern' | 'classic' | 'minimal' | 'dark';

export default function BusinessCardWebsite({ card, lang }: BusinessCardWebsiteProps) {
  const [downloading, setDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');

  const templates = [
    {
      id: 'modern',
      name: 'Modern Gradient',
      nameZh: '現代漸層',
      preview: '/templates/modern.png'
    },
    {
      id: 'classic',
      name: 'Classic Elegant',
      nameZh: '經典優雅',
      preview: '/templates/classic.png'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      nameZh: '簡約清新',
      preview: '/templates/minimal.png'
    },
    {
      id: 'dark',
      name: 'Dark Professional',
      nameZh: '深色專業',
      preview: '/templates/dark.png'
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = async (template: Template = selectedTemplate as Template) => {
    try {
      setDownloading(true);
      const element = document.getElementById(`preview-card-${template}`);
      if (!element) return;

      const size = 1200;
      const canvas = await html2canvas(element, {
        width: size,
        height: size,
        backgroundColor: template === 'dark' ? '#1a1a1a' : '#ffffff',
        scale: 2,
        useCORS: true,
      });

      const dataUrl = canvas.toDataURL('image/png');
      setPreviewImage(dataUrl);
      setShowPreview(true);
      setShowTemplates(false);
    } catch (error) {
      console.error('Error generating preview:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedTemplate) return;
    
    try {
      const element = document.getElementById('business-card');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${card.name}_business_card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const getCardUrl = () => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/website/${card.id}`;
  };

  const renderTemplatePreview = (template: Template) => {
    switch (template) {
      case 'modern':
        return (
          <div id={`preview-card-${template}`} className="fixed -left-[9999px] -top-[9999px] w-[1200px] h-[1200px]">
            {/* Modern Template (Current Design) */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-white" />
            {/* ... Rest of the modern template code ... */}
          </div>
        );
      
      case 'classic':
        return (
          <div id={`preview-card-${template}`} className="fixed -left-[9999px] -top-[9999px] w-[1200px] h-[1200px]">
            <div className="absolute inset-0 bg-amber-50" />
            <div className="absolute inset-0 border-[20px] border-amber-100" />
            <div className="relative flex flex-col items-center justify-center h-full p-12">
              <div className="w-full max-w-2xl mx-auto">
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-200 shadow-lg">
                    <Image
                      src={card.avatarImage || '/default-avatar.png'}
                      alt={card.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-serif text-amber-800 mb-3">{card.name}</h1>
                  <p className="text-2xl text-amber-700 mb-2 font-medium">{card.title}</p>
                  <p className="text-xl text-amber-600">{card.company}</p>
                </div>
                
                <div className="space-y-6 mb-12">
                  {card.email && (
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <FaEnvelope className="text-amber-700 text-lg" />
                      </div>
                      <span className="text-amber-800 text-xl">{card.email}</span>
                    </div>
                  )}
                  {card.phone && (
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <FaPhone className="text-amber-700 text-lg" />
                      </div>
                      <span className="text-amber-800 text-xl">{card.phone}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <QRCodeSVG
                      value={getCardUrl()}
                      size={150}
                      level="H"
                      includeMargin
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'minimal':
        return (
          <div id={`preview-card-${template}`} className="fixed -left-[9999px] -top-[9999px] w-[1200px] h-[1200px]">
            <div className="absolute inset-0 bg-white" />
            <div className="relative flex flex-col items-center justify-center h-full p-16">
              <div className="w-full max-w-2xl mx-auto">
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <Image
                    src={card.avatarImage || '/default-avatar.png'}
                    alt={card.name}
                    fill
                    className="object-cover rounded-lg shadow-sm"
                  />
                </div>
                
                <div className="text-center mb-12">
                  <h1 className="text-3xl font-light text-gray-800 mb-3">{card.name}</h1>
                  <p className="text-xl text-gray-600 mb-2">{card.title}</p>
                  <p className="text-lg text-gray-500">{card.company}</p>
                </div>
                
                <div className="space-y-4 mb-12">
                  {card.email && (
                    <div className="flex items-center justify-center space-x-3">
                      <FaEnvelope className="text-gray-400 text-lg" />
                      <span className="text-gray-600 text-lg">{card.email}</span>
                    </div>
                  )}
                  {card.phone && (
                    <div className="flex items-center justify-center space-x-3">
                      <FaPhone className="text-gray-400 text-lg" />
                      <span className="text-gray-600 text-lg">{card.phone}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-center">
                  <QRCodeSVG
                    value={getCardUrl()}
                    size={120}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'dark':
        return (
          <div id={`preview-card-${template}`} className="fixed -left-[9999px] -top-[9999px] w-[1200px] h-[1200px]">
            <div className="absolute inset-0 bg-gray-900" />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
            <div className="relative flex flex-col items-center justify-center h-full p-12">
              <div className="w-full max-w-2xl mx-auto">
                <div className="relative w-44 h-44 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse" 
                       style={{ transform: 'scale(1.05)' }} />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-800 shadow-lg">
                    <Image
                      src={card.avatarImage || '/default-avatar.png'}
                      alt={card.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                    {card.name}
                  </h1>
                  <p className="text-2xl text-gray-300 mb-2">{card.title}</p>
                  <p className="text-xl text-gray-400">{card.company}</p>
                </div>
                
                <div className="space-y-6 mb-12">
                  {card.email && (
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <FaEnvelope className="text-white text-lg" />
                      </div>
                      <span className="text-gray-300 text-xl">{card.email}</span>
                    </div>
                  )}
                  {card.phone && (
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <FaPhone className="text-white text-lg" />
                      </div>
                      <span className="text-gray-300 text-xl">{card.phone}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="p-4 bg-gray-800 rounded-xl">
                    <QRCodeSVG
                      value={getCardUrl()}
                      size={150}
                      level="H"
                      includeMargin
                      bgColor="#1f2937"
                      fgColor="#e5e7eb"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const getTemplateStyle = (templateId: string) => {
    switch (templateId) {
      case 'modern':
        return 'bg-gradient-to-br from-sky-400 to-indigo-600 text-white';
      case 'classic':
        return 'bg-[#f5e6d3] text-gray-800 border-4 border-[#d4af37]';
      case 'minimal':
        return 'bg-white text-gray-800 border border-gray-200';
      case 'dark':
        return 'bg-gray-900 text-white';
      default:
        return 'bg-white text-gray-800';
    }
  };

  return (
    <>
      {/* Main Website View */}
      <div className="min-h-screen pt-16 bg-gradient-to-br from-sky-50 to-white">
        <div id="business-card">
          {/* Hero Section */}
          <div className="relative h-[60vh] min-h-[400px] w-full">
            {card.backgroundImage ? (
              <Image
                src={card.backgroundImage}
                alt="Cover"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-600" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            
            {/* Profile Info */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="space-y-6 p-4">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-40 h-40 mx-auto"
                >
                  <Image
                    src={card.avatarImage || '/default-avatar.png'}
                    alt={card.name}
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl font-bold text-white mb-2">{card.name}</h1>
                  <p className="text-xl text-gray-200">{card.title}</p>
                  <p className="text-lg text-gray-300">{card.company}</p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Contact Grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <FaEnvelope className="text-sky-500 text-2xl" />
                  <span className="text-gray-700">{card.email}</span>
                </a>
              )}
              {card.phone && (
                <a
                  href={`tel:${card.phone}`}
                  className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <FaPhone className="text-sky-500 text-2xl" />
                  <span className="text-gray-700">{card.phone}</span>
                </a>
              )}
              {card.socialLinks?.website && (
                <a
                  href={card.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <FaGlobe className="text-sky-500 text-2xl" />
                  <span className="text-gray-700">Website</span>
                </a>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex justify-center space-x-6"
            >
              {card.socialLinks?.linkedin && (
                <a
                  href={card.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-500 transition-colors"
                >
                  <FaLinkedin className="text-3xl" />
                </a>
              )}
              {card.socialLinks?.github && (
                <a
                  href={card.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-500 transition-colors"
                >
                  <FaGithub className="text-3xl" />
                </a>
              )}
              {card.socialLinks?.twitter && (
                <a
                  href={card.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-500 transition-colors"
                >
                  <FaTwitter className="text-3xl" />
                </a>
              )}
            </motion.div>

            {/* QR Code Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex justify-center"
            >
              <div className="bg-white p-4 rounded-xl shadow-md">
                <QRCodeSVG
                  value={getCardUrl()}
                  size={150}
                  level="H"
                  includeMargin
                  imageSettings={{
                    src: card.avatarImage || '/default-avatar.png',
                    x: undefined,
                    y: undefined,
                    height: 30,
                    width: 30,
                    excavate: true,
                  }}
                />
                <p className="mt-2 text-center text-sm text-gray-500">
                  {lang === 'en' ? 'Scan to view digital card' : '掃描查看數位名片'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Preview Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8"
      >
        <button
          onClick={() => setShowTemplates(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 transition-colors"
        >
          <FaDownload />
          <span>{lang === 'en' ? 'Download Card' : '下載名片'}</span>
        </button>
      </motion.div>

      {/* Template Selection Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex space-x-6">
                {/* Template Selection */}
                <div className="w-1/2">
                  <h2 className="text-2xl font-bold mb-4">
                    {lang === 'en' ? 'Choose Template' : '選擇模板'}
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                          selectedTemplate === template.id ? 'ring-4 ring-sky-500' : 'hover:ring-2 hover:ring-sky-300'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="relative aspect-[1.6] bg-gray-100">
                          <Image
                            src={template.preview}
                            alt={template.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 text-white px-3 py-1.5 rounded-full text-sm">
                            {lang === 'en' ? template.name : template.nameZh}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview Section */}
                <div className="w-1/2">
                  <h2 className="text-2xl font-bold mb-4">
                    {lang === 'en' ? 'Preview' : '預覽'}
                  </h2>
                  <div className="relative aspect-[1.6] bg-gray-100 rounded-lg overflow-hidden">
                    <div className={`w-full h-full ${getTemplateStyle(selectedTemplate)}`}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="relative w-20 h-20 mb-3">
                          <Image
                            src={card.avatarImage || '/default-avatar.png'}
                            alt={card.name}
                            fill
                            className="rounded-full object-cover border-2 border-white shadow-lg"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-center mb-1">{card.name}</h3>
                        <p className="text-sm text-center mb-1">{card.title}</p>
                        <p className="text-sm text-center mb-3">{card.company}</p>
                        <div className="flex items-center space-x-3 text-sm">
                          {card.email && <span>{card.email}</span>}
                          {card.phone && <span>{card.phone}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowTemplates(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  {lang === 'en' ? 'Cancel' : '取消'}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!selectedTemplate}
                  className={`px-6 py-2 rounded-lg ${
                    selectedTemplate
                      ? 'bg-sky-600 hover:bg-sky-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {lang === 'en' ? 'Download' : '下載'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {lang === 'en' ? 'Preview Card' : '預覽名片'}
                </h2>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    setShowTemplates(true);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full rounded-lg shadow-lg"
                  />
                )}
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowPreview(false);
                    setShowTemplates(true);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  {lang === 'en' ? 'Change Template' : '更換模板'}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  {lang === 'en' ? 'Download' : '下載'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Template Cards */}
      {Object.keys(templates).map((templateId) => renderTemplatePreview(templateId as Template))}
    </>
  );
}
