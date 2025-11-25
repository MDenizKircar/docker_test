import { notifyError, notifySuccess } from "../toastUtil";
import { getRandomName } from "./utils";
import { mutate } from "swr";

const API_URL = import.meta.env.VITE_API_URL;

export const fetcher = async (url: string) => {
  // console.log(`${API_URL}${url}`)
  try {
      const res = await fetch(`${API_URL}${url}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const result = await res.json();
        return result;
  } catch (error) {
    console.error(error);
    return null;
  }
  
};

export const getRequest = async (id: number) => {

  try {
      const res = await fetch(`${API_URL}items/${id}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
        });
      
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        const result = await res.json();
        console.log(result)
        return result;
  } catch (error) {
    console.error(error);
    return null;
  }
  
};

export const pushRequest = async () => {
  const name = getRandomName()

    try {
        const res = await fetch(`${API_URL}items`, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name: name })
          });
        
          if (!res.ok) {
            throw new Error('Failed to push');
          }
          
          mutate(`${API_URL}items`)
          const result = await res.json();
          // console.log(`Successfully Pushed: ` + name)
          notifySuccess(`Successfully Pushed: ${name}`)
          return result;
    } catch (error) {
      console.error(error);
      notifyError('Failed to push name: ' + name)
      return null;
    }
    
  };