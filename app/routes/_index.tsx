import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import CustomSelect from "~/components/CustomSelect";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

/* Custom Modified Select Drop Down List */
const selectList = [
  {
    id: 1,
    selectValue: "light",
    selectDisplayName: "Light",
  },
  {
    id: 2,
    selectValue: "dark",
    selectDisplayName: "Dark",
  },
  {
    id: 3,
    selectValue: "system",
    selectDisplayName: "System",
  },
];

export default function Index() {
  // useState for string Selected Item Value
  const [selectedValue, setSelectedValue] = useState<any>();

  console.log("selectedValue :>> ", selectedValue);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>

      {/* Custom Select with Select List need to Modified from Parent. 
      This Custom select uses a useState for Selected List Item */}
      <div className="max-w-48 p-3">
        <CustomSelect
          selectList={selectList}
          callBack={(selectedValue: any) => setSelectedValue(selectedValue)}
          isSelectLabelTitleEnable={true}
          selectedItem={selectedValue}
        />
      </div>
    </div>
  );
}
