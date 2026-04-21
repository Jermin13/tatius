import { useState } from 'react';

import img01 from '../assets/fotos_collage/tatius/4a04fc4b-74ea-48b1-a125-f646532136aa.jpg';
import img02 from '../assets/fotos_collage/tatius/0429025c-a558-442e-84ea-e6f6e1a61b73.jpg';
import img03 from '../assets/fotos_collage/tatius/c4fc609b-06f8-4ca4-9688-98fd0df7501c.jpg';
import img04 from '../assets/fotos_collage/tatius/981bf0b5-f522-4ade-b2d3-34b4a2ece674.jpg';
import img05 from '../assets/fotos_collage/tatius/177fb6f8-b5b4-42d2-b099-74520ce1e31b.jpg';
import img06 from '../assets/fotos_collage/tatius/f997cd48-9190-48df-9bb9-d3bf460e2e96.jpg';
import img07 from '../assets/fotos_collage/tatius/d88c0712-0d8b-48bf-997f-288af63535b5.jpg';
import img08 from '../assets/fotos_collage/tatius/20d4b87e-6227-45cb-a781-c35f6435c964.jpg';
import img09 from '../assets/fotos_collage/tatius/f176db9c-b43f-49e0-9045-ef2060d70006.jpg';
import img10 from '../assets/fotos_collage/tatius/b15cb924-ea75-42ca-b5c7-0f08141737f2.jpg';
import img11 from '../assets/fotos_collage/tatius/e50207b0-f725-4e05-9dab-c2bee2a01432.jpg';
import img12 from '../assets/fotos_collage/tatius/9393f30a-ba1f-4e7a-8564-0f4f03fd2227.jpg';
import img13 from '../assets/fotos_collage/tatius/d3377487-53a2-47dc-a95e-cdcff16a069e.jpg';
import img14 from '../assets/fotos_collage/tatius/f2291532-c1b3-4318-979c-115224541a46.jpg';
import img15 from '../assets/fotos_collage/tatius/991e9348-0ede-41ba-a161-455a39aeab82.jpg';
import img16 from '../assets/fotos_collage/tatius/90e32e73-5720-434b-bb17-c3881126979e.jpg';
import img17 from '../assets/fotos_collage/tatius/aa3221df-00fd-46cb-99eb-3979c28d7483.jpg';
import img18 from '../assets/fotos_collage/tatius/dbae406d-aba8-4f80-8ed2-34764c55b785.jpg';
import img19 from '../assets/fotos_collage/tatius/11024ced-aa9e-4dc8-8c6f-096b170f8d82.jpg';
import img20 from '../assets/fotos_collage/tatius/050c7aaa-6d1e-4378-be7a-d35e60da56b6.jpg';

const MEDIA_ITEMS = [
  { id: 1, src: img01, caption: 'Razón 1', description: 'Amo tus ojos y lo cristalino que son, me veo reflejado en ellos y me siento vivo.' },
  { id: 2, src: img02, caption: 'Razón 2', description: 'Cada rincón de mi mente me hace pensar en ti para poder liberar serotonina y dar lo mejor de mí.' },
  { id: 3, src: img03, caption: 'Razón 3', description: 'Amo la manera en que tus manos acarician mi cabello.' },
  { id: 4, src: img04, caption: 'Razón 4', description: 'Cada vez que me das cariño y cuidados me siento un hombre fuerte pero a la vez respaldado por una gran mujer a mi lado.' },
  { id: 5, src: img05, caption: 'Razón 5', description: 'Por tu paciencia y comprensión, que a pesar de la distancia siempre estás para mí.' },
  { id: 6, src: img06, caption: 'Razón 6', description: 'Por la bendición que traes a mi vida y mi ejemplo a seguir.' },
  { id: 7, src: img07, caption: 'Razón 7', description: 'La maravillosa persona que eres, prima, tía, hija, novía, eres la mejor.' },
  { id: 8, src: img08, caption: 'Razón 8', description: 'Amo tu estilo único y perfecto, tus manitas de mostaza.' },
  { id: 9, src: img09, caption: 'Razón 9', description: 'Por lo luchona que eres con Tasha y con lo responsable que eres.' },
  { id: 10, src: img10, caption: 'Razón 10', description: 'Porque cada vez que estoy triste soy a quien acudo.' },
  { id: 11, src: img11, caption: 'Razón 11', description: 'Porque me conoces y conoces mis males y pasado y aún así te quedaste conmigo.' },
  { id: 12, src: img12, caption: 'Razón 12', description: 'Porque cada persona que te rodeas das y aportas felicidad.' },
  { id: 13, src: img13, caption: 'Razón 13', description: 'Por tu sonrisa.' },
  { id: 14, src: img14, caption: 'Razón 14', description: 'Por lo coqueta y yummy que eres conmigo.' },
  { id: 15, src: img15, caption: 'Razón 15', description: 'Por lo interesante que es conocer de ti.' },
  { id: 16, src: img16, caption: 'Razón 16', description: 'Por tu bondad.' },
  { id: 17, src: img17, caption: 'Razón 17', description: 'Por la manera en que ves al mundo.' },
  { id: 18, src: img18, caption: 'Razón 18', description: 'Porque cada día que pasa sigues aceptando ser mi novía.' },
  { id: 19, src: img19, caption: 'Razón 19', description: 'Porque tal vez no lo sepas pero me devolviste el creer en el amor y sentirme enamorado.' },
  { id: 20, src: img20, caption: 'Razón 20', description: 'Porque te amo.' }
];

function PhotoCollage() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const openLightbox = (media) => {
    setSelectedMedia(media);
  };
  const closeLightbox = () => setSelectedMedia(null);

  const getPosition = (index) => {
    const rotations = [-3, 2, -1, 3, -2, 1, -3, 2];
    const yOffsets = [0, -8, 0, 8, 0, -8, 0, 8];
    return { rotation: rotations[index % 8], offsetY: yOffsets[index % 8] };
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-vintage text-4xl md:text-5xl text-center text-[#D4A574] mb-12 tracking-wide">
          Feliz Cumpleaños
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {MEDIA_ITEMS.map((media, index) => {
            const pos = getPosition(index);
            return (
              <div
                key={media.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
                style={{
                  transform: `rotate(${pos.rotation}deg)`,
                  marginTop: pos.offsetY === 0 ? '0' : `${pos.offsetY/4}%`
                }}
                onClick={() => openLightbox(media)}
              >
                <div className="relative bg-white p-2 pb-10 rounded-lg shadow-md border border-[#D4A574]/20">
                  <img
                    src={media.src}
                    alt={media.caption}
                    className="w-full h-36 md:h-44 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <p className="absolute bottom-1 left-2 right-2 text-center text-xs text-[#D4A574] font-medium truncate">
                    {media.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {selectedMedia && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white hover:text-[#D4A574] transition-colors bg-white/20 rounded-full z-50"
              onClick={closeLightbox}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div 
              className="bg-white p-3 rounded shadow-2xl relative"
              style={{
                width: 'min(480px, 90vw)',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedMedia.src}
                alt={selectedMedia.caption}
                className="w-full h-auto max-h-[65vh] object-contain rounded-sm"
              />
              <div className="mt-3 text-center">
                <p className="text-[#D4A574] text-sm md:text-base leading-tight">
                  {selectedMedia.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PhotoCollage;