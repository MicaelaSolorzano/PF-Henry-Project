import React from 'react';
import Card from "../card/Card";

interface CardsProps {
    allHotels: {
        id: string;
        name: string;
        address: string;
        details: string;
        rooms: {
            id: string;
            typeOfRoom: string;
            description: string;
            price: string;
            images: string[]; // Agregar la propiedad images al tipo de objeto rooms
        }[];
        images: {
            url: string;
            alt: string;
        }[];
    }[];
}

const Cards: React.FC<CardsProps> = ({ allHotels }) => {
    console.log('En cards la lista que recibe cómo props:', allHotels);

    return (
        <div>
            {allHotels.map((hotel, id_hotel) => (
                hotel.rooms.map((room, id_room) => (
                    <Card
                        key={`${id_hotel}-${id_room}`}
                        id_hotel={parseInt(hotel.id)} // Convertir a número
                        id_room={parseInt(room.id)} // Convertir a número
                        hotel_name={hotel.name}
                        hotel_detail={hotel.details}
                        room_type={room.typeOfRoom}
                        room_description={room.description}
                        address={hotel.address}
                        price={parseFloat(room.price)} // Convertir a número
                        images={hotel.images[id_room].url} // Pasar las imágenes del cuarto
                    />
                ))
            ))}
        </div>
    );
};

export default Cards;

// import React from 'react';
// import Card from "../card/Card";

// interface CardsProps {
//     allHotels: {
//         id: string;
//         name: string;
//         address: string;
//         details: string;
//         rooms: {
//             id: string;
//             typeOfRoom: string;
//             description: string;
//             price: string;
//         }[];
//         images: {
//             url: string;
//             alt: string;
//         }[];
//     }[];
// }

// const Cards: React.FC<CardsProps> = ({ allHotels }) => {
//     console.log('En cards la lista que recibe cómo props:', allHotels);

//     return (
//         <div>
//             {allHotels.map((hotel, id_hotel) => (
//                 hotel.rooms.map((room, id_room) => (
//                     <Card
//                         key={`${id_hotel}-${id_room}`}
//                         id_hotel={Number(hotel.id)} // Convertir a número
//                         id_room={Number(room.id)} // Convertir a número
//                         hotel_name={hotel.name}
//                         hotel_detail={hotel.details}
//                         room_type={room.typeOfRoom}
//                         room_description={room.description}
//                         address={hotel.address}
//                         price={Number(room.price)} // Convertir a número
//                         images={hotel.images[id_room].url} // Tomar solo la URL de la imagen
//                     />
//                 ))
//             ))}
//         </div>
//     );
// };

// export default Cards;





// import Card from "../card/Card";

// // interface CardsProps {
// //   id?: string;
// //   name: string;
// //   address: string;
// //   price: string;
// //   images: ImageC[];
// // }

// // interface ImageC {
// //   url: string;
// //   alt: string;
// // }
// // const Cards: React.FC<CardsProps> = (props: CardsProps) => {
//   interface CardsProps {
//     allHotels: any[]; 
//   }
  
//   const Cards: React.FC<CardsProps> = ({ allHotels }) => {
//     console.log('En cards la lista que recibe cómo props:', allHotels)
//     return (
//       <div>
//         {allHotels.map((hotel: any, id_hotel: number) => (
//           hotel.rooms.map((room: any, id_room: number) => (
//             <Card
//               key={`${id_hotel}-${id_room}`}
//               id_hotel={id_hotel}
//               id_room={id_room}
//               hotel_name={hotel.name}
//               hotel_detail={hotel.details}
//               room_type={room.typeOfRoom}
//               room_description={room.description}
//               address={hotel.address}
//               price={room.price}
//               images={hotel.images[id_room]}
//             />
//           ))
//         ))}
//       </div>
//     );
//   };



//   export default Cards;


