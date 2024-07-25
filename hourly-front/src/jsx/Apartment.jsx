const Apartment = (apartment) => {


    return (
        <div className='apartment-card'>
            <img
                src={apartment.apartment.image_url} // Предполагаем, что у вас есть поле imageUrl
                // alt={apartment.apartment.name}
                // onError={(e) => { e.target.src = placeholderImage; }} // Замена на запасное изображение
                style={{ width: '100%', height: 'auto' }} // Настройте стили по вашему усмотрению
            />
            <p className="apartment-card-text apartment-title">{apartment.apartment.title}</p>
            <p className="apartment-card-text apartment-room-type">{apartment.apartment.room_type}</p>
            <p className="apartment-card-text apartment-location">{apartment.apartment.location}</p>
            <p className="apartment-card-text apartment-price-per-day">{apartment.apartment.price_per_day}</p>
            <p className="apartment-card-text apartment-rating">{apartment.apartment.rating}</p>
            <p className="apartment-card-text apartment-size">{apartment.apartment.size}</p>

        </div>

    );
};


export default Apartment;