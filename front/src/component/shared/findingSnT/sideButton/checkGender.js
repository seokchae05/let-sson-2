import React, { useContext } from "react";
import { SidebarContext } from "../../../../page/findStudent";

const Checkgender = () => {
  const { state, dispatch } = useContext(SidebarContext);
  const handleChange = e => {
    dispatch({ type: "sortGender", gender: e.currentTarget.value });
  };
  return (
    <div>
      성별
      <div>
        <input
          type="radio"
          name="chk_info2"
          value="m"
          onClick={handleChange}
        ></input>
        남성
      </div>
      <div>
        <input
          type="radio"
          name="chk_info2"
          value="w"
          onClick={handleChange}
        ></input>
        여성
      </div>
    </div>
  );
};

export default Checkgender;
