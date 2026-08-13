import React from "react";
import SearchInput from "../../../../design-system/Input";
import Pill from "../../../../design-system/Pill";
import { PageHeader } from "../../../../design-system/SectionHeader";

const CATEGORIES = [
  { id: "All", label: "All Groups" },
  { id: "Engineering", label: "Engineering" },
  { id: "dsa", label: "Algorithms" },
  { id: "ai-ml", label: "AI & ML" },
  { id: "cybersecurity", label: "Security" },
  { id: "design", label: "Design" },
  { id: "other", label: "Other" },
];

const Header = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-10">
      <PageHeader
        title="Find your study group"
        description="Discover student study groups across engineering, algorithms, security, and design."
        badge={<Pill variant="sky" size="sm">Group Directory</Pill>}
      />

      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Search Control */}
        <div className="w-full md:w-96">
          <SearchInput
            placeholder="Search study groups by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Pill
              key={cat.id}
              variant={selectedCategory === cat.id ? "blue" : "gray"}
              size="md"
              active={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;