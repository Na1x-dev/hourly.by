import sqlite3
import os
import psycopg2
from bs4 import BeautifulSoup
import requests
DB_TABLE = "hourly_api_apartment"
cities = {'kaliningrad.html', 'kazan.html', 'minsk.html', 'moscow.html', 'novgorod.html', 'piter.html', 'sochi.html'}
def create_connect():
    conn = psycopg2.connect(
        dbname="hourly",
        user="postgres",
        password="1234",
        host="db",
        port="5432"
    )
    return conn
def parse_card_data(city_item):
    with open(os.path.abspath('cities/' + city_item), 'r') as file:
        city_content = file.read()
    soup = BeautifulSoup(city_content, 'html.parser')
    cards = soup.find_all('div', class_='card')
    card_data = []
    for card in cards:
        card_dict = {}
        card_dict['room_type'] = ''
        room_type_element = card.find('div',
                                           class_='card-content__object-subtext')  # Adjust the selector as needed
        if room_type_element:
            card_dict['room_type'] = room_type_element.text.strip()
        card_dict['title'] = ''
        title_element = card.find('h2', class_='card-content__object-title')
        if title_element:
            card_dict['title'] = ' '.join(title_element.text.strip().split())
        card_dict['location'] = ''
        address_element_list  = card.find_all('a', class_='card-content__property')
        address_element_spans = address_element_list[len(address_element_list)-1].find_all('span')
        address_element = address_element_spans[len(address_element_spans)-1]
        if address_element:
            card_dict['location'] = ' '.join(address_element.text.strip().split())
        card_dict['city'] = card_dict['location'].split(',')[0]
        card_dict['size'] = ''
        size_element = card.find('p', class_='card-content__facility')
        if size_element:
            card_dict['size'] = size_element.text.strip()
        card_dict['rating'] = ''
        rating_element = card.find('span', class_='rating-list__rating')
        if rating_element:
            card_dict['rating'] = rating_element.text.strip()
        card_dict['price_per_day'] = ''
        price_per_day = card.find('div', class_='price-total__number')
        if price_per_day:
            card_dict['price_per_day'] = ' '.join(price_per_day.text.strip().split())
        card_dict['image_url'] = ''
        image_element = card.find('img')
        if image_element:
            card_dict['image_url'] = image_element.get('src')
        card_data.append(card_dict)
    return card_data
def put_data_into_table(conn, data):
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {DB_TABLE} (room_type, title, location, city, size, rating, price_per_day, image_url) VALUES (%(room_type)s, %(title)s, %(location)s, %(city)s, %(size)s, %(rating)s, %(price_per_day)s,  %(image_url)s)",
        data)
    conn.commit()
def get_data_from_url():
    try:
        conn = create_connect()
        with conn:
            for city_item in cities:
                for room in parse_card_data(city_item):
                    put_data_into_table(conn, room)
                    # print(room)
    except (psycopg2.Error, requests.RequestException) as error:
        print("Error:", error)
    finally:
        pass
get_data_from_url()