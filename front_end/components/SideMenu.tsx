import React, { useEffect, useState } from "react";

const SideMenu = () => {
  return (
    <div className="fixed top-[50%] -translate-y-[50%] left-0 drop-shadow-lg py-3 px-3 border border-l-0 border-black rounded-tr-md rounded-br-md dark:text-gray-300 dark:border-white">
      <div className="hover-flow">Export Image</div>
      <div className="hover-flow">See Contract</div>
    </div>
  );
};

export default SideMenu;
