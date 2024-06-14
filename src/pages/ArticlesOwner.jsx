import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ArticlesOwner = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 2;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `http://103.164.54.252:8000/api/articles?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
          }
        );

        setArticles(response.data.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{article.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Halaman {currentPage} dari {totalPage}
        </span>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleNext}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticlesOwner;
