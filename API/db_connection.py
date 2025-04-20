import sqlite3

import pandas as pd


def read_sql(query):
  with sqlite3.connect("car_database.db") as conn:
    return pd.read_sql(query, conn)
  
def to_sql(dataframe, table_name, if_exists='replace', index=False):
    with sqlite3.connect("car_database.db") as conn:
        dataframe.to_sql(table_name, conn, if_exists=if_exists, index=index)
        conn.commit()
