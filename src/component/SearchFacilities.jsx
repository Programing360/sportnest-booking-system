"use client";

import { SearchField } from "@heroui/react";
import { Search, SlidersHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import FeatureCard from "./FeatureCard";

const SearchFacilities = ({ featureData = [] }) => {
  const [searchText, setSearchText] = useState("");
  const [filterData, setFilterData] = useState(featureData);

  const [selectedSport, setSelectedSport] = useState("All");

  const uniqueSportTypes = Array.from(
    new Set(featureData.map((item) => item.sportType).filter(Boolean)),
  );

  const applyFilter = (searchValue, sortValue) => {
    let updatedData = [...featureData];

    if (searchText.trim() !== "") {
      updatedData = updatedData.filter((item) =>
        item.name
          ?.toLowerCase()
          .trim()
          .includes(searchValue.toLowerCase().trim()),
      );
    }

    if (sortValue && sortValue.toLowerCase() !== "all") {
      updatedData = updatedData.filter(
        (item) => item.sportType?.toLowerCase() === sortValue.toLowerCase(),
      );
    }

    setFilterData(updatedData);
  };

  const handleFilterAndSearch = () => {
    applyFilter(searchText, selectedSport);
  };

  const handleFilterByType = (e) => {
    const value = e.target.value;
    setSelectedSport(value);

    applyFilter(searchText, value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-gray-100">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 w-full md:w-auto tracking-tight dark:text-white ">
          All Facilities
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
          <SearchField name="search" className="w-full sm:w-auto">
            <SearchField.Group className="relative flex items-center w-full sm:w-[320px] md:w-[360px] group">
              <SearchField.SearchIcon className="absolute left-4 text-gray-400 group-focus-within:text-orange-600 transition-colors z-10" />

              <SearchField.Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-11 pr-24 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-sm font-medium placeholder:text-gray-400 shadow-sm"
                placeholder="Search destinations..."
              />

              <div className="absolute right-2 flex items-center gap-1.5">
                <SearchField.ClearButton
                  onClick={() => setSearchText("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors mr-1"
                />
                <button
                  type="button"
                  onClick={handleFilterAndSearch}
                  className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-md shadow-orange-200"
                >
                  <Search size={14} className="stroke-[2.5]" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </SearchField.Group>
          </SearchField>
          <div className="relative w-full sm:w-[220px] shrink-0">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none z-10 flex items-center gap-2">
              <SlidersHorizontal size={14} />
            </div>

            <select
              value={selectedSport}
              onChange={(e) => handleFilterByType(e)}
              className="w-full pl-10 pr-10 py-3.5 bg-gray-50/70 hover:bg-gray-100/50 border border-gray-200 rounded-2xl outline-none focus:border-orange-500 focus:bg-white text-sm font-semibold text-gray-700 shadow-sm appearance-none cursor-pointer transition-all"
            >
              <option value="All">All Sports</option>
              {uniqueSportTypes.map((sportType) => (
                <option key={sportType} value={sportType}>
                  {sportType}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {filterData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filterData.map((feature) => (
            <FeatureCard key={feature._id} feature={feature} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200 max-w-md mx-auto px-6 mt-10">
          <p className="text-gray-400 font-bold text-lg mb-1">
            No Facilities Found
          </p>
          <p className="text-gray-400 text-xs font-medium">
            We couldn't find any matches. Try clearing filters!
          </p>
          {(searchText || selectedSport !== "") && (
            <button
              onClick={() => {
                setSearchText("");
                setSelectedSport("All");
                setFilterData(featureData);
              }}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase transition-transform active:scale-95 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFacilities;
