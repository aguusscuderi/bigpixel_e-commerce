// import Image from "next/image";
// import Widgets from "./Widgets";
// import React from "react";
// import { Menu, MenuItem } from "@mui/material";
// import { useSelector } from "react-redux";
// import { State } from 'global/store'
import { useState } from "react";
import Modal from './Auth_modal'
import CartWidget from '../components/Cart/cartWidget'


const NavBar = () => {
  // const auth = useSelector((state: State) => state.auth)

  const[anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const open = Boolean(anchorEl);

  // function handleClick(event: { currentTarget: React.SetStateAction<null>; }) {
  //   if (anchorEl !== event.currentTarget) {
  //     setAnchorEl(event.currentTarget);
  //   }
  // }

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };


  const slide = (e: any) => {
    const menu = document.querySelector(".mobile__nav-container") as HTMLDivElement;
    const links = document.querySelectorAll<HTMLElement>(".navLink");
    const blocked = document.querySelector(".blocked") as HTMLDivElement;

    if (blocked) {
      menu.style.transform = "translateY(-900px)";
      menu.classList.remove("blocked");
      links.forEach((el) => {
        el.style.animation = "";
      });
      e.currentTarget.classList.remove("toggle");
    } else {
      menu.style.transform = "translateY(96px)";
      menu.style.opacity = "1";
      menu.classList.add("blocked");
      links.forEach((el, index) => {
        el.style.animation = `navLinkFade 0.2s ease forwards ${index / 7 + 1}s`;
      });
      e.currentTarget.classList.toggle("toggle");
    }
  };

  const handlePopUpToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav>
        <div onClick={slide} className="burger">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="mobile__nav-container mb__nav-container-visible">
          {/* <Image className="petshopLogo" src={"/petshopSVG.svg"} alt="imagen del logo" width={100} height={100}/> */}
          <ul className="flex__ul">
            <li className="flex__li-item">
              <a className="navLink" href="/"> Inicio</a>
            </li>
            <li className="flex__li-item">
              <a className="navLink" href="/productos">Productos</a>
            </li>
            <li className="flex__li-item">
              <a className="navLink" href="/api/productos" 
              // onClick={handleClick}
              // onMouseOver={handleClick} 
              aria-controls={open ? 'turnos-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}>
                Turnos
              </a>
            </li>
            <li className="flex__li-item">
              <a className="navLink" href="/api/productos">Contactame</a>
            </li>
            <li className="flex__li-item">
              <a className="navLink" onClick={() => setShowModal(true)}>Inicia Sesión</a>
              <Modal show={showModal} onClose={() => handlePopUpToggle}></Modal>
            </li>
            <li className="flex__li-item">
              <a className="navLink" href="/cart">
              <CartWidget/>
              </a>
            </li>
            {/* {
              auth.status == true && auth.user.role == "admin" ?  
              <li className="flex__li-item">
                {" "}
                <i className="fas fa-users"></i>
                <a className="navLink" href="/api/productos">
                  Administrar Productos
                </a>
              </li> : ""
            } */}

          </ul>
          {/* <Widgets /> */}
        </div>
      </nav>

      {/* <Menu id="turnos-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}>
            <MenuItem><a href="/peluqueria">Peluqueria</a></MenuItem>
            <MenuItem><a href="/veterinaria">Veterinaria</a></MenuItem>
      </Menu> */}
    </>
  );
};

export default NavBar;



