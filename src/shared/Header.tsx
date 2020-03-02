import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header(props: any) {

    const loggedIn: boolean = useSelector((state: any) => state.loggedInReducer);

    const megaMenu = () => {
        let megaMenu: any[] = [];
        const topNavContent: any = props.headerdata['contents'][0]['HeaderContent'][1]['contents'][0];
        // topNavContent.allProductsTitle
        const rootCategories: any[] = topNavContent.allProducts.categoryTree;
        for (let rootCategory of rootCategories) {
            let innerCats: any[] = [];
            const secondLevelCategories: any[] = rootCategory.secondLevelCategories;
            for (let secondLevelCategory of secondLevelCategories) {
                innerCats.push(<Link key={secondLevelCategory.repositoryId} to={secondLevelCategory.link}>{secondLevelCategory.name}</Link>);
            }
            megaMenu.push(<div key={rootCategory.repositoryId} className="column"><h3>{rootCategory.name}</h3>
                {innerCats}
            </div>);
        }
        return megaMenu;
    }

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            {loggedIn ? <Link to="/account/dashboard">Dashboard</Link> : <Link to="/login">Login</Link>}
            <div className="dropdown">
                <button className="dropbtn">Dropdown
      <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <div className="header">
                        <h2>Mega Menu</h2>
                    </div>
                    <div className="row">
                        {megaMenu()}
                    </div>
                </div>
            </div>
        </div>
    )
}