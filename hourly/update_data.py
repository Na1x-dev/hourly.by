
import requests
from PyQt5.QtGui import QIcon, QPixmap, QImage
from bs4 import BeautifulSoup
import psycopg2
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QPushButton, QListWidget, QListWidgetItem, QLabel, \
    QScrollArea, QHBoxLayout
import psycopg2

url = 'https://www.21vek.by/graphic_cards/'

DB_TABLE = "graphic_cards"


def match_class_info(class_name):
    return class_name and 'CardInfo_info' in class_name


def match_class_price(class_name):
    return class_name and 'CardPrice_currentPrice' in class_name


def match_class_block(class_name):
    return class_name and 'style_product' in class_name


def create_connect():
    conn = psycopg2.connect(
        dbname="hourly",
        user="root",
        password="1234",
        host="localhost",
        port="5432"
    )
    # conn = sqlite3.connect('graphic_cards.db')
    return conn


# def update_data_into_table(conn):
#     cur = conn.cursor()
#     cur.execute(f"drop table if exists {DB_TABLE};")
#     cur.execute(f"CREATE TABLE IF NOT EXISTS {DB_TABLE}("
#                 "id serial,"
#                 "title varchar(255),"
#                 "price decimal(18, 2),"
#                 "link text,"
#                 "img text);")


def get_products():
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    with open("bd.txt", 'w') as file:
        file.write(str(soup))
        file.close()
    products = soup.find_all('li', class_='result__item')
    return products


def parse_product(product):
    price = product.find('span', class_='j-item-data')['content']
    title = product.find('span', class_='result__name').text
    link = product.find('a', class_='result__link')['href']
    img = product.find('img')['src']

    return title, price, link, img


def put_data_into_table(conn, data):
    cur = conn.cursor()
    cur.execute(f"INSERT INTO {DB_TABLE} (title, price, link, img) VALUES (?, ?, ?, ?)", data)
    conn.commit()


def get_data_from_url():
    try:
        conn = create_connect()
        with conn:
            update_data_into_table(conn)
            for product in get_products():
                put_data_into_table(conn, parse_product(product))
    except (psycopg2.Error, requests.RequestException) as error:
        print("Error:", error)
    finally:
        pass
