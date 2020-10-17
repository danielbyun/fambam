import { useEffect, useState } from "react";

const useTheme = (initialValue) => {
  const [value, setValue] = useState(() => {
    console.log(initialValue);
  });

  useEffect(() => {
    console.log(initialValue);
    if (initialValue) console.log("run action");
  }, [initialValue]);

  return [value, setValue];
};

export default useTheme;
