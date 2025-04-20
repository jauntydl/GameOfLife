
import numpy as np
import pandas as pd
from db_connection import read_sql
from fastapi.responses import JSONResponse
from main import app
from sklearn.linear_model import LinearRegression


@app.get("/MainTool/getTrueValue")
async def getTrueValue(brand:str, model:str, drivetrain:str, cooledSeat:str, heatedSteeringWheel:str):
  
  cooledSeat_ = cooledSeat
  heatedSteeringWheel_ = heatedSteeringWheel

  if cooledSeat_ == 'Yes':
    cooledSeat_ = '1'
    
  if cooledSeat_ == 'No':
    cooledSeat_ = '0'

  if heatedSteeringWheel_ == 'Yes':
    heatedSteeringWheel_ = '1'
    
  if heatedSteeringWheel_ == 'No':
    heatedSteeringWheel_ = '0'    

  def Param(param : str, attribute: str):
    if param == '-':
      return '1=1'
    
    return f"{attribute} = '{param}'"

    
  query = f"""
  -- sql
  SELECT
    model_year,
    2024 - model_year AS Age,
    mileage,
    price
  FROM main.MASTER_CARS
  WHERE 1=1
    AND {Param(brand,'brand')}
    AND {Param(model,'base_model')}
    AND {Param(drivetrain,'drivetrain')}
    AND {Param(cooledSeat_,'cooled_seats')}
    AND {Param(heatedSteeringWheel_,'heated_steering_wheel')}
  ;
  """

  df = read_sql(query)


  X = df[['Age', 'mileage']]
  y = df['price']

  model = LinearRegression()
  model.fit(X, y)

  maxAge = max(X['Age'])

  ages = [x for x in range(min(maxAge,20))]
  mileages = [x for x in range(0, 300000, 10000)]

  rows = []

  for age in ages:
    for mileage in mileages:
      input_data = pd.DataFrame({'Age': [age], 'mileage': [mileage]})
      price = model.predict(input_data)
      if price < 0:
        break
      rows.append({
        'model_year': 2024 - age,
        'Age': age,
        'Mileage' : mileage,
        'price' : price[0]
      })
      
  result = pd.DataFrame(rows)

  return JSONResponse(result.to_dict('records'))
