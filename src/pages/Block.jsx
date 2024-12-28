import Sidebar from "../components/components-sidebar-07";
import React from "react";
import Dash from "../components/Dash";
import Dash2 from "../components/Dash2";
import Dash3 from "../components/Dash3";
import Activity from "@/components/Activity";
import Sajivan from "../components/Sajivan";
import TaskTable from "@/components/TaskTable";
import Marquee from "@/components/ui/marquee";
import MultiSelectCombobox from "@/components/MultiSelectComboBox";

const statuses = [
  {
    value: "todo",
    label: "Todo",
    // icon: Circle,
    count: 53,
  },
  {
    value: "in-progress",
    label: "In Progress",
    // icon: ArrowUpCircle,
    count: 36,
  },
  // ... other status items
];
const Block = () => {
  const handleSelectionChange = (selectedItems) => {
    console.log("Selected items:", selectedItems);
  };
  return (
    <div>
      <Sidebar/>
      {/* <Dash/>
      <Dash2/> */}
      {/* <Dash3/> */}

      {/* <TiptapEditor/> */}
      {/* <Sajivan />
      <Activity /> */}
      {/* Forward Marquee */}
      {/* <Marquee pauseOnHover className="[--duration:20s]">
        <div className="flex gap-6">
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-lg font-semibold">"Great service!"</p>
            <p className="text-sm text-gray-600">- John Doe</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-lg font-semibold">"Amazing quality products."</p>
            <p className="text-sm text-gray-600">- Jane Smith</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-lg font-semibold">"Fast delivery and great support!"</p>
            <p className="text-sm text-gray-600">- Michael Brown</p>
          </div>
        </div>
      </Marquee> */}

      {/* Reverse Marquee */}
      {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        <div className="flex gap-6">
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-lg font-semibold">"Highly recommend!"</p>
            <p className="text-sm text-gray-600">- Emily Davis</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-lg font-semibold">"Affordable prices and quality."</p>
            <p className="text-sm text-gray-600">- Chris Johnson</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-lg font-semibold">"Best shopping experience ever."</p>
            <p className="text-sm text-gray-600">- Sarah Lee</p>
          </div>
        </div>
      </Marquee> */}
      {/* <TaskTable/>
     <MultiSelectCombobox/> */}
      {/* <MultiSelectCombobox/> */}
      {/* <MultiSelectCombobox
        label="Status"
        items={statuses}
        placeholder="Change status..."
        onSelectionChange={handleSelectionChange}
      /> */}
   
    </div>
  );
};

export default Block;
