import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTable } from 'react-table';

const ArticlesAdmin = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'index',
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Link URL',
        accessor: 'source_url',
      },
    ],
    []
  );

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          'http://103.164.54.252:8000/api/articles',
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
          }
        );
        // Adding 'index' property to each article for the custom 'ID' column
        const articlesWithIndex = response.data.data.map((article, index) => ({
          ...article,
          index,
        }));
        setArticles(articlesWithIndex);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: articles });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Articles</h2>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="px-6 py-4  text-sm text-gray-500"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesAdmin;
