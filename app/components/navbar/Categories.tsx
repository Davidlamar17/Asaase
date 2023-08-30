'use client';

import Container from "../Container";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

import { BiHotel } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { MdApartment } from 'react-icons/md';
import { TbHotelService } from 'react-icons/tb';
import {SiHotelsdotcom } from 'react-icons/si';
import { MdHotelClass } from 'react-icons/md';


export const categories = [
    {
        label: 'Hostel',
        icon: BiHotel,
        description: ' This property is a hostel'
    },
    {
        label: 'Homestel',
        icon: AiOutlineHome,
        description: ' This property is a homestel'
    },
    {
        label: 'Apartment',
        icon: MdApartment,
        description: ' This property is an apartment'
    },
    {
        label: 'Ghana Hostels',
        icon: MdHotelClass,
        description: ' This is a property of Ghana Hostels'
    },
    {
        label: 'Guest House',
        icon: TbHotelService,
        description: ' This property is a Guest House'
    },
    {
        label: 'GUSS Hostel',
        icon: SiHotelsdotcom,
        description: 'This is a property of GUSS'
    },
    
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname(); 
    
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
            "
            >
             {categories.map((item) => (
                <CategoryBox
                key={ item.label}
                label={item.label}
               selected={category === item.label}
                icon={item.icon}
                />
             ))}
            </div>
        </Container>
    );
}

export default Categories;