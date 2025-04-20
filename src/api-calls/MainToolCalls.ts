const baseURL = 'http://localhost:8000/MainTool/'

export const getInitData = () => `${baseURL}getInitData`

export const getMeanAndSTD = (input :{[key:string] : string}) => 
{
  const endpoint = 'getMeanAndSTD'
  const params = new URLSearchParams({
    ...input,
  });
  return `${baseURL}${endpoint}?${[params]}`
}

export const getTrueValue = (input :{[key:string] : string}) => 
  {
    const endpoint = 'getTrueValue'
    const params = new URLSearchParams({
      ...input,
    });
    return `${baseURL}${endpoint}?${[params]}`
  }
  
