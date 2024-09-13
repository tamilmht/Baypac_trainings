import psycopg2
from psycopg2.extensions import AsIs
from psycopg2.extras import RealDictCursor

connection = psycopg2.connect(
    host="localhost",
    port="5432",
    database="postgres",
    user="postgres",
    password="postgres"
    )

# Open a cursor to perform database operations
# db_cursor = connection.cursor()
db_cursor = connection.cursor(cursor_factory=RealDictCursor)