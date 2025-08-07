import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const localToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzQTk0RkM4MTg4Qzg3NkE5Njk2Mzg1QjU4NTUxQzg4OTYxNDE0RDdSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IlU2bFB5QmlNaDJxV2xqaGJXRlVjaUpZVUZOYyJ9.eyJuYmYiOjE3NTQ1OTM0OTUsImV4cCI6MTc1NDU5NzA5NSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvc21vc3Byby5jb20uYnIiLCJhdWQiOiJodHRwczovL2F1dGguY29zbW9zcHJvLmNvbS5ici9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJKYXZhc2NyaXB0Q2xpZW50Iiwic3ViIjoiMTU3NjAxIiwiYXV0aF90aW1lIjoxNzU0NTc3MDAyLCJpZHAiOiJsb2NhbCIsIkxvZ2luU2Vzc2lvbklEIjoiYjIwY2NmNzYtMGE1NS00ZTZlLTk2NjEtMTA5YjAyYTNkMjQwIiwiTmFtZSI6ImFkbWluQHJlZGVub3NzYWZhcm1hLmNvbS5iciIsIkZyaWVuZGx5TmFtZSI6IkFkbWluaXN0cmFkb3IgLSBOb3NzYSBGYXJtYSIsIlByb2ZpbGUiOiIxIiwiSm9iUm9sZSI6IjYiLCJJbml0aWFscyI6IkFGIiwiVXNlcklkZW50aWZpY2F0aW9uQ2hhdCI6IlRJZC0xMDE1NDpVSWQtMTU3NjAxIiwiVXNlckNoYXRTaWduYXR1cmUiOiIyMzM1MzkxNGZlYWU5MDhhNGY0MmE0Mzc4NDJkOTc0YmFhMDllZDRhYTgwMTQ5Y2I3YTIwOWFhYTBiMmI3MDlkIiwiV2Vla2VuZFNjYWxlIjoiMSIsIlVzZXJQaWN0dXJlIjoiYjY2ZTc3YjktNzVjMS00YTM2LTlkNDItN2M5NjdlMjhmMmYwLnBuZyIsInJvbGUiOiJhZG1pbiIsIlRlbmFudElkIjoiMTAxNTQiLCJMb2dvIjoiMjk3YWM0MjAtM2M2Ny00NDMxLWFmZDUtNTg3MmEwYjBkMGY2LnBuZyIsIkljb24iOiIiLCJCYWNrZ3JvdW5kSW1hZ2UiOiIiLCJNYWluQ29sb3IiOiIjM2M0Y2NjIiwiRm9udENvbG9yIjoiI2ZmZmZmZiIsIlRlbmFudE5hbWUiOiJOb3NzYSBGYXJtYSIsIlRlbmFudEtleSI6IlJORiIsIkJyYW5jaCI6IiIsIkVtYWlsIjoiYWRtaW5AcmVkZW5vc3NhZmFybWEuY29tLmJyIiwiVGVuYW50RG9tYWluIjoicmVkZW5vc3NhZmFybWEiLCJBc3NvY2lhdGVkVGVuYW50cyI6WyJyZWRlbm9zc2FmYXJtYSJdLCJUZW5hbnRNaWdyYXRlZCI6IlRydWUiLCJqdGkiOiJEQkFBRkE2MDM3OURBQUM2RkQyMDYzMDJDMzY0NzI4RCIsInNpZCI6IjJBRTdFNTFDNDYyOThGQzNGOTE3MjVCRTJDMUJFOUM4IiwiaWF0IjoxNzU0NTkzNDk1LCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJXRUJBUElQT1JUQUwiLCJDb3Ntb3NQcm9XZWJBcGkiLCJJZGVudGl0eVNlcnZlckFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.hDlgpcZAxf-LSE7090mPEU0wku1tjuMpqczA6xakYklUCReiGdh1ZGJ5Ev8QCZrmGt-gZvXqnDuxh7Q6Tg4Co6o_n6Jc97bCf5pZzPpyKEHDg5-1J7EGlN2qUKW0NxCz9rJpLSQy31vsI6zHSgj_d3K5mDI1mJH9GL1y4g_Z89Pu6P7sHDK8xCVkMCd99l6ICpiXwGvCNc3cuaReB6KOECDQFWEEFCo1pXZA2z18C_R88n4UmYkRTj0qTbhtCWmR9sY235dZ8at9k2QbH1F7TMkIOK0pkcK5TfqM8hgNfGYmB_jUa3doAl2i6Z9MjrneuMjGPHr_6HFknRZTHnDydw";

// Função para verificar se está rodando localmente
const isLocalhost = () => 
  window.location.href.match(/^http:\/\/localhost/) !== null;

// Função para obter o token atual
const getToken = () => {
  if (isLocalhost()) {
    return localToken;
  }
  return window.localStorage.getItem('Token');
};

// Criação da instância do axios com interceptor
const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: 'https://portal.cosmospro.com.br:9191',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Interceptor para adicionar o token em todas as requisições
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Interceptor para tratamento de erros
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expirado ou inválido
        window.localStorage.removeItem('Token');
        // Redirecionar para login ou mostrar mensagem
        console.error('Sessão expirada ou token inválido');
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApi();

export interface ApiOrderItem {
  UF: string;
  CD: number;
  NOME_CD: string;
  CONDIC_COMERC: string;
  FABRICANTE: string;
  TABELA_COD: number;
  TABELA: string;
  TIPO_ENVIO: string;
  EMAIL: string;
  COD_PROD: number;
  EAN: string;
  PROD: string;
  P_BRUTO: number;
  P_BRUTO_SOMA: number;
  DESC: number;
  P_LIQ: number;
  TOT_P_LIQ_SOMA: number;
}

export interface OrderResponse {
  '@odata.context': string;
  '@odata.count': number;
  value: ApiOrderItem[];
}

export const fetchOrders = async (): Promise<OrderResponse> => {
  try {
    const response = await api.post('/odata/CustomViews(Name=\'Mmc_ListaPedidosEmail\')/ExecuteAndReceiveData()', {
      Parameters: {
        DATAINI: "01/08/2025",
        DATAFIM: "01/08/2025"
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
