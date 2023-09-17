"use client";
import AddCategoryModal from "@/components/add-category-modal";
import CategoryActionModal from "@/components/category-action-modal";
import TableHeader from "@/components/layouts/table-header";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";

const categoriesFetcher: Fetcher<ICategory[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Page() {
  const { data: categories } = useSWR("/api/catgs", categoriesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showCategoryActionModal, setShowCategoryActionModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  return (
    <>
      {categories && (
        <div>
          <ul className="font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            <TableHeader
              toggle={showAddCategoryModal}
              setToggle={setShowAddCategoryModal}
            />
            {categories?.map((category) => (
              <li
                key={category.category_id}
                className="flex w-full items-center  border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              >
                <button
                  id={category.category_id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowCategoryActionModal(true);
                  }}
                  className="w-full flex justify-between items-center px-4 py-3.5 font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                >
                  {category.category_name}
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <AddCategoryModal
            toggle={showAddCategoryModal}
            setToggle={setShowAddCategoryModal}
          />
          <CategoryActionModal
            showModal={showCategoryActionModal}
            setShowModal={setShowCategoryActionModal}
            category={selectedCategory}
          />
        </div>
      )}
    </>
  );
}