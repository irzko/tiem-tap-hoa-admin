"use client";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR, { Fetcher } from "swr";
import Button from "./common/button";

const categoriesFetcher: Fetcher<ICategory[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function SelectCategory({
  toggle,
  setToggle,
  setCatg,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  setCatg: Dispatch<SetStateAction<ISubSubcategory | undefined>>;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] =
    useState<string>("");
  const [selectedSubSubcategories, setSelectedSubSubcategories] =
    useState<ISubSubcategory>();

  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [subSubcategories, setSubSubcategories] = useState<ISubSubcategory[]>(
    []
  );

  const { data: categories } = useSWR("/api/catgs", categoriesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleCategoryChange = (id: string) => {
    setSelectedCategories(id);
    setSubcategories([]);
    fetch(`/api/catgs/${id}/subcatgs`)
      .then((res) => res.json())
      .then((data) => {
        setSubcategories(data);
      });
  };

  const handleSubcategoryChange = (id: string) => {
    setSelectedSubcategories(id);
    setSubSubcategories([]);
    fetch(`/api/subcatgs/${id}/sub-subcatgs`)
      .then((res) => res.json())
      .then((data) => {
        setSubSubcategories(data);
      });
  };

  const handleSubSubcategoryChange = (catg: ISubSubcategory) => {
    setSelectedSubSubcategories(catg);
  };

  const handleClick = () => {
    setCatg(selectedSubSubcategories);
    setToggle(false);
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto bg-gray-900/80 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-full ${
        toggle ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Chọn danh mục
            </h3>
            <button
              onClick={() => setToggle(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="updateProductModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-2 h-96">
            <div className="overflow-y-auto">
              <ul className="flex flex-col w-full gap-2">
                {categories?.map((category) => (
                  <li key={category.category_id}>
                    <input
                      onChange={() =>
                        handleCategoryChange(category.category_id)
                      }
                      type="radio"
                      id={category.category_id}
                      name="category"
                      value={selectedCategories}
                      className="hidden peer"
                      required
                    />
                    <label
                      htmlFor={category.category_id}
                      className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block">
                        <div className="w-full">{category.category_name}</div>
                      </div>
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
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-y-auto">
              <ul className="flex flex-col w-full gap-2">
                {subcategories?.map((subcategory) => (
                  <li key={subcategory.subcategory_id}>
                    <input
                      onChange={() =>
                        handleSubcategoryChange(subcategory.subcategory_id)
                      }
                      type="radio"
                      id={subcategory.subcategory_id}
                      name="subcategory"
                      value={selectedSubcategories}
                      className="hidden peer"
                      required
                    />
                    <label
                      htmlFor={subcategory.subcategory_id}
                      className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block">
                        <div className="w-full">
                          {subcategory.subcategory_name}
                        </div>
                      </div>
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
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-y-auto">
              <ul className="flex flex-col w-full gap-2">
                {subSubcategories?.map((subSubcategory) => (
                  <li key={subSubcategory.subsubcategory_id}>
                    <input
                      onChange={() =>
                        handleSubSubcategoryChange(subSubcategory)
                      }
                      type="radio"
                      id={subSubcategory.subsubcategory_id}
                      name="subsubcategory"
                      value={selectedSubSubcategories?.subsubcategory_id}
                      className="hidden peer"
                      required
                    />
                    <label
                      htmlFor={subSubcategory.subsubcategory_id}
                      className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block">
                        <div className="w-full">
                          {subSubcategory.subsubcategory_name}
                        </div>
                      </div>
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
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button type="button" onClick={handleClick}>
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
``;
