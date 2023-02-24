import React from "react";
import { Link } from "react-router-dom";

export type TPokemonList = {
  data: any;
  onPreviousPage: () => void;
  onNextPage: () => void;
  page: number;
};

export const PokemonList = ({
  data,
  onPreviousPage,
  onNextPage,
  page,
}: TPokemonList) => {
  return (
    <>
      <table className="w-9/12 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="flex w-full text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="w-full">
            <th scope="col" className="px-6 py-3">
              Pokemon
            </th>
            <th scope="col" className="px-6 py-3">
              Link
            </th>
            <th scope="col" className="px-6 py-3">
              Like me!
            </th>
          </tr>
        </thead>
        <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full">
          {data?.results?.map((pokemon: any, index: number) => (
            <tr
              key={index}
              className="flex w-full bg-white border-b odd:bg-gray-800 even:bg-gray-700
              dark:border-gray-700 cursor-pointer"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {pokemon.name}
              </td>
              <td className="px-6 py-4">
                <Link to={`/pokemon/${pokemon.name}`}>{pokemon.url}</Link>
              </td>
              <td className="px-6 py-4">
                <button
                  name="Like"
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Like
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-5">
        <nav aria-label="Pokemon list">
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                disabled={page <= 1}
                name="Previous"
                onClick={onPreviousPage}
                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-100 
                ${page <= 1 && "cursor-not-allowed"}
                `}
              >
                Previous
              </button>
            </li>
            <li>
              <button
                name="Next"
                onClick={onNextPage}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
