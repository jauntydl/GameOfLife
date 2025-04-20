
from db_connection import read_sql
from fastapi.responses import JSONResponse
from main import app


@app.get("/MainTool/getInitData")
async def getInitData():
  
  query = f"""
  -- sql
  SELECT DISTINCT
    brand,
    base_model,
    drivetrain,
    CASE WHEN cooled_seats = '1' THEN 'Yes' ELSE 'No' END AS cooled_seats,
    CASE WHEN heated_steering_wheel = '1' THEN 'Yes' ELSE 'No' END AS heated_steering_wheel
  FROM main.CARS_FILTERED
  ;
  """

  df = read_sql(query)
  
  return JSONResponse(df.to_dict('records'))
