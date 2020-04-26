import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        description: "",
        type: "Nature",
        points: "",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    description: "",
    type: "Nature",
    points: "",
  });

  const { name, description, type, points } = contact;
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      name: "",
      description: "",
      type: "Nature",
      points: "",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Challenge" : "Add Challenge"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        name="description"
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Points"
        value={points}
        name="points"
        onChange={onChange}
      />
      <h5>Challenge Type</h5>
      <input
        type="radio"
        name="type"
        value="Nature"
        checked={type === "Nature"}
        onChange={onChange}
      />{" "}
      Nature{" "}
      <input
        type="radio"
        name="type"
        value="Energy"
        checked={type === "Energy"}
        onChange={onChange}
      />{" "}
      Energy
      <div>
        <input
          type="submit"
          value={current ? "Update Challenge" : "Add Challenge"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
