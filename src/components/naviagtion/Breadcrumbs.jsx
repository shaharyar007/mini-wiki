import useBreadcrumbs from 'use-react-router-breadcrumbs';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CustomNavLink = styled(NavLink)`
color: #EA0029;
background-color: #0000000d;
-webkit-text-decoration: none;
text-decoration: none;
margin-right: 15px;
padding: 5px 10px;
border-radius: 5px;
font-size: 0.9rem;
font-weight: 500;
transition:all 0.35s ease;
position:relative;

  :hover {
    color: #fff;
    background-color: #EA0029;
    transition:all 0.35s ease;
  }

  :
`;

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <>
   
    {breadcrumbs.map(({
      match,
      breadcrumb
    }) => (
      <span key={match.pathname}>
        <CustomNavLink  to={match.pathname}>{breadcrumb}</CustomNavLink>

      </span>
    ))}
  
  </>
  );
}

export default Breadcrumbs;