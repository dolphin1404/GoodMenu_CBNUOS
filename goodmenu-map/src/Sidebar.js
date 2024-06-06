import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <a href="#" className="d-block p-3 link-body-emphasis text-decoration-none" title="CBNU">
        <img src="https://i.imgur.com/3XbMneV.png" alt="Icon" width="50" height="50" />
        <span className="visually-hidden">Icon-only</span>
      </a>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <a href="/" className="nav-link active py-3 border-bottom rounded-0" title="Home">
            <i className="fa-solid fa-house fa-xl"></i>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link py-3 border-bottom rounded-0" title="search" data-bs-toggle="modal" data-bs-target="#searchModal">
            <i className="fa-solid fa-magnifying-glass fa-lg"></i>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link py-3 border-bottom rounded-0" title="Customers">
            <i className="fa-solid fa-school-flag fa-lg"></i>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link py-3 border-bottom rounded-0" title="Stars">
            <i className="fa-solid fa-star fa-lg"></i>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link py-3 border-bottom rounded-0" title="Products">
            <i className="fa-solid fa-shuffle fa-lg"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
