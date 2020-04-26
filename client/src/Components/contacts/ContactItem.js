import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { id, name, type, description, points } = contact;
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " + (type === "Nature" ? "badge-success" : "badge-primary")
          }
        >
          {type}
        </span>
      </h3>
      <ul className="list">
        {description && (
          <li>
            <i className="fas fa-envelope-open" /> {description}
          </li>
        )}
        {points && (
          <li>
            <i className="fas fa-clipboard-check" /> {points}
          </li>
        )}
      </ul>
      <button
        className="btn btn-dark btn-sm"
        onClick={() => setCurrent(contact)}
      >
        Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={onDelete}>
        Delete
      </button>
      <button className="btn btn-success btn-sm">Complete Task</button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
