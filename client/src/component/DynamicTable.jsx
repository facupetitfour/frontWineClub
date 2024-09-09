import { useState, useEffect } from "react";
import WarningModal from "./WarningModal";
import FilterTable from "./FilterTable";


const DynamicTable = (props) => {

  // En esta tabla dinamica se debera proporcinar mediante props varias cosas:
  // deleteFunction(), createItemFunction(), bodyData(data de lo que se renderizara en la tabla.), 



  const [warningModal, setWarningModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [search, setSearch] = useState("");
  const [bodyFilterData, setBodyFilterData] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedData = [...bodyFilterData].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === "boolean" && typeof valueB === "boolean") {
      return sortOrder === "asc"
        ? (valueA ? 1 : 0) - (valueB ? 1 : 0)
        : (valueB ? 1 : 0) - (valueA ? 1 : 0);
    } else {
      return 0;
    }
  });

  useEffect(() => {
    if (props.bodyData) {
      const searchFilterData = props.bodyData.filter((item) => {
        return (
          Object.keys(item).some(
            (key) =>
              typeof item[key] === "string" &&
              item[key].toLowerCase().includes(search.toLowerCase())
          ) ||
          new Date(item.createdAt)
            .toLocaleDateString("es-AR")
            .includes(search)
        );
      });

      setBodyFilterData(searchFilterData);
    }
  }, [search, props.bodyData]);

  const handleSearch = (searchText) => {
    setSearch(searchText);
  };

  const handleWarningModal = (data) => {
    setWarningModal(!warningModal);
    setItemToDelete(data);
  };

  const handleDeleteClick = (data) => {
    props.deleteFunction(data);
    setWarningModal(!warningModal);
  };

  const handleCreateClick = (data) => {
    props.createItemFunction(data);
  };

  const handleUpdateClick = (item) => {
    props.updateItemFunction(item, true);
  };

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const visibleFields = Object.keys(props.model).filter((field) =>
    props.bodyData[0].hasOwnProperty(field)
  );

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-screen max-h-screen flex items-center justify-center font-sans overflow-auto">
          <div className="w-full lg:w-11/12">
            <FilterTable onSearch={handleSearch} />
            <div className="bg-white rounded my-6">
              <table className="min-w-max w-full table-auto shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    {visibleFields.map((field) => (
                      <th
                        className="py-3 px-6 text-center"
                        key={field}
                        onClick={() => handleSort(field)}
                      >
                        {props.model[field].header}
                        <button className="ms-3">
                          {sortOrder === "asc" ? (
                            <span>&#8593;</span>
                          ) : (
                            <span>&#8595;</span>
                          )}
                        </button>
                      </th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-1000 text-md font-light">
                  {sortedData.map((body, index) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={index}
                    >
                      {visibleFields.map((field) => (
                        <td
                          className="py-3 px-6 text-center items-center whitespace-nowrap"
                          key={field}
                        >
                          {field === "imagen" ? (
                            <div className="mr-2">
                              <img
                                className="w-20 h-20 rounded-full mx-auto my-auto"
                                src={`https://cerca-tuyo-imagenes.s3.sa-east-1.amazonaws.com/${body[field]}`}
                              />
                            </div>
                          ) : field === "createdAt" ? (
                            formatDate(body[field])
                          ) : typeof body[field] === "boolean" ? (
                            body[field] ? "Sí" : "No"
                          ) : body[field] === null ? (
                            "-"
                          ) : (
                            JSON.stringify(body[field])
                          )}
                        </td>
                      ))}
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div
                            onClick={() => {
                              handleUpdateClick(body);
                            }}
                            className="w-4 mr-2 transform hover:text-rose-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div
                            onClick={() => {
                              handleWarningModal(body);
                            }}
                            className="w-4 mr-2 transform hover:text-rose-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>

                      <WarningModal
                        warning={warningModal}
                        cancelWarningModal={handleWarningModal}
                        confirmDelete={() => handleDeleteClick(itemToDelete)}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicTable;
