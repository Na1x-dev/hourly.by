const Apartment = (apartment) => {


    return (
        <div className='apartment-card'>
            <img className="card-image"
                src={apartment.apartment.image_url} // Предполагаем, что у вас есть поле imageUrl
                // alt={apartment.apartment.name}
                // onError={(e) => { e.target.src = placeholderImage; }} // Замена на запасное изображение
                style={{ width: '100%', height: 'auto' }} // Настройте стили по вашему усмотрению
            />
            <p className="apartment-card-text apartment-title">{apartment.apartment.title}</p>
            <div className="card-text">
                <div className="horizontal-line"></div>
                <p className="apartment-card-text apartment-room-type">{apartment.apartment.room_type}</p>
                <p className="apartment-card-text apartment-location">address: {apartment.apartment.location}</p>
                <p className="apartment-card-text apartment-price-per-day">{apartment.apartment.price_per_day} per day</p>
                <div className="horizontal-line"></div>
                <p className="apartment-card-text apartment-rating">{apartment.apartment.rating}/10</p>
                <p className="apartment-card-text apartment-size">{apartment.apartment.size}</p>
            </div>
            <button className="btn btn-primary see-card-button">See</button>
        </div>

    );
};


export default Apartment;