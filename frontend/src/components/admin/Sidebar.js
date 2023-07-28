import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
        <nav id="sidebar">
            <ul className="list-unstyled components">
                <li>
                    <Link to="/dashboard"><i className='fa fa-tachometer-alt'></i> Dashboard</Link>
                </li>
                <li>
                    <Link to="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className='fa fa-box-open'></i> Products</Link>
                    <ul className="collapse list-unstyled" id="productSubmenu">
                        <li>
                            <Link to="/admin/products"><i className='fa fa-clipboard-list'></i> All</Link>
                        </li>
                        <li>
                            <Link to="/admin/product"><i className='fa fa-plus'></i> Create</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/admin/orders"><i className='fa fa-shopping-cart'></i> Orders</Link>
                </li>
                <li>
                    <Link to="/admin/users"><i className='fa fa-users'></i> Users</Link>
                </li>
                <li>
                    <Link to="/admin/reviews"><i className='fa fa-star'></i> Reviews</Link>
                </li>
                <li>
                    <Link to="/admin/categories"><i className='fa fa-list'></i> Categories</Link>
                </li>
            </ul>

            <ul className="list-unstyled CTAs">
                <li>
                    <Link to="/"><i className='fa fa-home'></i> Home</Link>
                </li>
            </ul>
                            
        </nav>
    </div>
  )
}
