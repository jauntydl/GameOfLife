
from db_connection import read_sql
from fastapi.responses import JSONResponse
from main import app


@app.get("/test")
async def testCall():
    query = """
    --sql
    SELECT 
        *
    FROM cars
    LIMIT 100
    ;
    """
    
    df = read_sql(query)    
    response = df.to_dict("records")
    
    return JSONResponse(response)
