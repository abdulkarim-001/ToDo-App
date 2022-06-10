import React from "react";

const List = ({ items, removeItem, editItem }) => {
    return (
        <div className="grocery-list">
            {items.map((item) => {
                const { id, title } = item;
                return (
                    <div className="grocery-item" key={id}>
                        <p className="title">{title}</p>
                        <div className="btn-container">
                            <button type="button" className="edit-btn" onClick={() => editItem(id)}>
                                Edit
                            </button>
                            <button type="button" className="delete-btn" onClick={() => removeItem(id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default List;