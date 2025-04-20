
from db_connection import read_sql
from fastapi.responses import JSONResponse
from main import app


@app.get("/MainTool/getMeanAndSTD")
async def getMeanAndSTD(model_year:str, mileage:str, engine_type:str, drivetrain:str, cooled_seats:str, heated_steering_wheel:str):
  
  def Param(param : str, attribute: str):
    if param == 'Unknown':
      return '1=1'
    
    return f"{attribute} = {param}"
    
  query = f"""
  -- sql
  SELECT 
      A.mean_price AS mean_price,
      SQRT(AVG((price - A.mean_price) * (price - A.mean_price))) AS stddev_price
  FROM main.MASTER_CARS
  JOIN (
  SELECT
    AVG(price) AS mean_price
  FROM main.MASTER_CARS
  WHERE 1=1
    AND {Param(model_year, 'model_year')}
    AND {Param(mileage, 'mileage_rounded')}
    AND {Param(engine_type, 'engine_type')}
    AND {Param(drivetrain, 'drivetrain')}
    AND {Param(cooled_seats, 'cooled_seats')}
    AND {Param(heated_steering_wheel, 'heated_steering_wheel')}    
    ) AS A
  ON 1=1
  WHERE 1=1
    AND {Param(model_year, 'model_year')}
    AND {Param(mileage, 'mileage_rounded')}
    AND {Param(engine_type, 'engine_type')}
    AND {Param(drivetrain, 'drivetrain')}
    AND {Param(cooled_seats, 'cooled_seats')}
    AND {Param(heated_steering_wheel, 'heated_steering_wheel')}    
  ;
  """
  
  print(Param(model_year, 'model_year'))
  
  df = read_sql(query)    
  
  print(df)
  
  response = df.to_dict("records")[0]
  
  return JSONResponse(response)
