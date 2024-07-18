import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const ContactsSearchField = ({
  value: initialValue,
  onChange,
  debounce = 500,
  searchBoxClassName = "",
  searchIconClassName = "",
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <div className={searchBoxClassName}>
      <IoSearch className={searchIconClassName} />
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default ContactsSearchField;
