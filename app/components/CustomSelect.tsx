import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/CustomSelectBase";

interface Props {
  selectList: { selectDisplayName: string | number }[];
  selectListLabel?: string;
  selectLabelTitle?: string;
  isSelectLabelTitleEnable?: boolean;
  selectTriggerPlaceholder?: string;
  isListOptionsLoading?: boolean | null;
  selectedItem: any;
  disabled?: boolean;
  isSelectListLabelEnable?: false;
  callBack: any;
}

interface selectListProps {
  selectDisplayName: string | number;
}

/* 
selectList must be in this Format 
const selectList = [
  {
    selectDisplayName: string,
    ...item,
  },
];

Example -> 
    const selectList = [
      {
        id: 1,
        selectDisplayName: "Dark",
      },
      {
        id: 2,
        selectDisplayName: "System",
      },
    ]
*/

/* This is Custom Select using ShadCN.
This has various Props and Use can use Props Value for Enabling Label Title also */

export default function CustomSelect({
  selectList = [],
  selectListLabel = "Select Item",
  selectLabelTitle = "Default Title",
  isSelectLabelTitleEnable = true,
  selectTriggerPlaceholder = "Default Trigger",
  isListOptionsLoading = false,
  selectedItem,
  disabled,
  isSelectListLabelEnable,
  callBack,
}: Props) {
  return (
    <>
      {isSelectLabelTitleEnable ? (
        <div className="relative">
          <CustomLabel>{selectLabelTitle}</CustomLabel>
          {isListOptionsLoading ? (
            <SelectDropDownLoader />
          ) : (
            <SelectBase
              selectList={selectList}
              callBack={callBack}
              selectTriggerPlaceholder={selectTriggerPlaceholder}
              selectListLabel={selectListLabel}
              selectedItem={selectedItem}
              disabled={disabled}
              isSelectListLabelEnable={isSelectListLabelEnable}
            />
          )}
        </div>
      ) : isListOptionsLoading ? (
        <SelectDropDownLoader />
      ) : (
        <SelectBase
          selectList={selectList}
          callBack={callBack}
          selectTriggerPlaceholder={selectTriggerPlaceholder}
          selectListLabel={selectListLabel}
          selectedItem={selectedItem}
          disabled={disabled}
          isSelectListLabelEnable={isSelectListLabelEnable}
        />
      )}
    </>
  );
}

/* Custom Component for Select Base*/
function SelectBase({
  selectTriggerPlaceholder,
  selectListLabel,
  selectList,
  selectedItem,
  disabled,
  isSelectListLabelEnable,
  callBack,
}: Props) {
  // useState for storing Selected List Item Value
  const [selectedValue, setSelectedValue] = useState<any>();

  // Function for Handling Select Change
  function handleSelectChange(selectedValue: any) {
    setSelectedValue(selectedValue);
    callBack(selectedValue);
  }

  return (
    <Select
      onValueChange={(value: any) => handleSelectChange(JSON.parse(value))}
      value={JSON.stringify(selectedItem)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full border border-[#CECECE] shadow-md">
        <SelectValue placeholder={selectTriggerPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {isSelectListLabelEnable && (
            <SelectLabel>{selectListLabel}</SelectLabel>
          )}
          {Array.isArray(selectList) &&
            selectList?.length > 0 &&
            selectList?.map((item: selectListProps, index: number) => {
              return (
                <SelectItem key={index} value={JSON.stringify(item)}>
                  {item?.selectDisplayName}
                </SelectItem>
              );
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

/* Custom JSX Element with Wrapper for Base Loader */
export function SelectDropDownLoader() {
  return (
    <div className="relative mx-auto flex max-h-60 items-center justify-center rounded-lg border border-[#CECECE] bg-white p-3 shadow-md">
      <Loader />
    </div>
  );
}

/* Custom SVG Loader */
export function Loader() {
  return (
    <svg
      className="-ml-1 mr-3 h-5 w-5 animate-spin text-slate-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

/* Custom Select Drop Down Label */
export function CustomLabel({
  children = "Default Title",
}: {
  children: string;
}) {
  return (
    <label className="absolute start-1 top-1.5 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
      {children}
    </label>
  );
}
