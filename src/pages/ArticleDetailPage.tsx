import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '../data/articles';
import { healthArticles } from '../data/healthArticles';
import ReactMarkdown from 'react-markdown';
import CommentSection from '../components/CommentSection';
import TableOfContents from '../components/TableOfContents';

// Helper functie voor categorie info
const getCategoryInfo = (category: string) => {
  switch (category.toLowerCase()) {
    case 'economy':
    case 'economie':
      return { 
        color: 'bg-blue-100 text-blue-800',
        label: 'Economische dimensie'
      };
    case 'gezondheid':
    case 'health':
      return { 
        color: 'bg-green-100 text-green-800',
        label: 'Vitaal burgerschap'
      };
    case 'sociaal':
    case 'social':
      return { 
        color: 'bg-purple-100 text-purple-800',
        label: 'Sociale dimensie'
      };
    case 'politiek':
    case 'political':
      return { 
        color: 'bg-red-100 text-red-800',
        label: 'Politieke dimensie'
      };
    default:
      return { 
        color: 'bg-gray-100 text-gray-800',
        label: category.charAt(0).toUpperCase() + category.slice(1)
      };
  }
};

const ArtikelDetailPagina: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Probeer artikel te vinden in zowel reguliere als gezondheidsartikelen
  const numericId = Number(id);
  const alleArtikelen = [...articles, ...healthArticles];
  const artikel = alleArtikelen.find(artikel => artikel.id === numericId);
  
  // Voeg IDs toe aan h2-koppen voor navigatie
  useEffect(() => {
    setTimeout(() => {
      const artikelInhoud = document.querySelector('.article-content');
      if (artikelInhoud) {
        const h2Elementen = artikelInhoud.querySelectorAll('h2');
        h2Elementen.forEach((h2) => {
          const id = h2.textContent?.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') || '';
          h2.id = id;
        });
      }
    }, 100); // Kleine vertraging om te zorgen dat markdown is weergegeven
  }, [artikel]);
  
  if (!artikel) {
    return <Navigate to="/artikelen" />;
  }

  const categorieInfo = getCategoryInfo(artikel.category);

  return (
    <div className="relative">
      <Link to="/artikelen" className="text-accent hover:underline mb-6 inline-block">
        &larr; Terug naar artikelen
      </Link>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Hoofdinhoud */}
        <div className="lg:col-span-8">
          {artikel.imageUrl && (
            <div className="relative mb-6">
              <img 
                src={artikel.imageUrl} 
                alt={artikel.title} 
                className="w-full h-64 object-cover rounded-lg"
              />
              <span className={`absolute top-4 right-4 text-sm font-medium px-3 py-1 rounded-full ${categorieInfo.color}`}>
                {categorieInfo.label}
              </span>
            </div>
          )}
          
          <h1 className="text-3xl font-bold mb-2 text-primary">{artikel.title}</h1>
          <p className="text-secondary mb-6">
            Door {artikel.author} • {artikel.date}
          </p>
          
          <div className="prose max-w-full article-content">
            <ReactMarkdown>{artikel.content}</ReactMarkdown>
          </div>
          
          {/* Bronvermelding sectie */}
          {artikel.references && artikel.references.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-3">Bronvermelding</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {artikel.references.map((referentie, index) => (
                  <li key={index} className="text-sm">{referentie}</li>
                ))}
              </ul>
            </div>
          )}
          
          <CommentSection comments={[]} articleId={artikel.id} />
        </div>
        
        {/* Zijbalk met inhoudsopgave */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="toc-container">
            <TableOfContents content={artikel.content} />
          </div>
        </aside>
        
        {/* Mobiele inhoudsopgave - vast aan onderkant */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <div className="shadow-lg">
            <TableOfContents content={artikel.content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtikelDetailPagina;
