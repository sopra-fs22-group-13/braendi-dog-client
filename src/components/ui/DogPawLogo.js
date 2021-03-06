/*
    dog-client is the client component of an online web implementation of dog.
    Copyright (C) 2022  Luca Zwahlen, Simona Borghi, Sandro Vonlanthen, Anton Crazzolara, Shitao Zeng

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import React from "react";

export const DogPawLogo = props => {
  return (
    <svg {...props} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75 18C8.82107 18 10.5 16.3211 10.5 14.25C10.5 12.1789 8.82107 10.5 6.75 10.5C4.67893 10.5 3 12.1789 3 14.25C3 16.3211 4.67893 18 6.75 18Z" fill="black"/>
    <path d="M13.5 12C15.5711 12 17.25 10.3211 17.25 8.25C17.25 6.17893 15.5711 4.5 13.5 4.5C11.4289 4.5 9.75 6.17893 9.75 8.25C9.75 10.3211 11.4289 12 13.5 12Z" fill="black"/>
    <path d="M22.5 12C24.5711 12 26.25 10.3211 26.25 8.25C26.25 6.17893 24.5711 4.5 22.5 4.5C20.4289 4.5 18.75 6.17893 18.75 8.25C18.75 10.3211 20.4289 12 22.5 12Z" fill="black"/>
    <path d="M29.25 18C31.3211 18 33 16.3211 33 14.25C33 12.1789 31.3211 10.5 29.25 10.5C27.1789 10.5 25.5 12.1789 25.5 14.25C25.5 16.3211 27.1789 18 29.25 18Z" fill="black"/>
    <path d="M26.01 22.29C24.705 20.76 23.61 19.455 22.29 17.925C21.6 17.115 20.715 16.305 19.665 15.945C19.5 15.885 19.335 15.84 19.17 15.81C18.795 15.75 18.39 15.75 18 15.75C17.61 15.75 17.205 15.75 16.815 15.825C16.65 15.855 16.485 15.9 16.32 15.96C15.27 16.32 14.4 17.13 13.695 17.94C12.39 19.47 11.295 20.775 9.97497 22.305C8.00997 24.27 5.59497 26.445 6.04497 29.49C6.47997 31.02 7.57497 32.535 9.53997 32.97C10.635 33.195 14.13 32.31 17.85 32.31H18.12C21.84 32.31 25.335 33.18 26.43 32.97C28.395 32.535 29.49 31.005 29.925 29.49C30.39 26.43 27.975 24.255 26.01 22.29Z" fill="black"/>
    </svg>
  );
};

