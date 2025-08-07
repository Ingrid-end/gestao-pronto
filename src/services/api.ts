import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const localToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzQTk0RkM4MTg4Qzg3NkE5Njk2Mzg1QjU4NTUxQzg4OTYxNDE0RDdSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IlU2bFB5QmlNaDJxV2xqaGJXRlVjaUpZVUZOYyJ9.eyJuYmYiOjE3NTQ2MDA2NTEsImV4cCI6MTc1NDYwNDI1MSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvc21vc3Byby5jb20uYnIiLCJhdWQiOiJodHRwczovL2F1dGguY29zbW9zcHJvLmNvbS5ici9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJKYXZhc2NyaXB0Q2xpZW50Iiwic3ViIjoiMTU3NjAxIiwiYXV0aF90aW1lIjoxNzU0NjAwNjQ0LCJpZHAiOiJsb2NhbCIsIkxvZ2luU2Vzc2lvbklEIjoiNWU4NjZjNjEtYzk5Yi00NzhjLWI1MjgtMjU5OTdlYzZlNTM3IiwiTmFtZSI6ImFkbWluQHJlZGVub3NzYWZhcm1hLmNvbS5iciIsIkZyaWVuZGx5TmFtZSI6IkFkbWluaXN0cmFkb3IgLSBOb3NzYSBGYXJtYSIsIlByb2ZpbGUiOiIxIiwiSm9iUm9sZSI6IjYiLCJJbml0aWFscyI6IkFGIiwiVXNlcklkZW50aWZpY2F0aW9uQ2hhdCI6IlRJZC0xMDE1NDpVSWQtMTU3NjAxIiwiVXNlckNoYXRTaWduYXR1cmUiOiIyMzM1MzkxNGZlYWU5MDhhNGY0MmE0Mzc4NDJkOTc0YmFhMDllZDRhYTgwMTQ5Y2I3YTIwOWFhYTBiMmI3MDlkIiwiV2Vla2VuZFNjYWxlIjoiMSIsIlVzZXJQaWN0dXJlIjoiYjY2ZTc3YjktNzVjMS00YTM2LTlkNDItN2M5NjdlMjhmMmYwLnBuZyIsInJvbGUiOiJhZG1pbiIsIlRlbmFudElkIjoiMTAxNTQiLCJMb2dvIjoiMjk3YWM0MjAtM2M2Ny00NDMxLWFmZDUtNTg3MmEwYjBkMGY2LnBuZyIsIkljb24iOiIiLCJCYWNrZ3JvdW5kSW1hZ2UiOiIiLCJNYWluQ29sb3IiOiIjM2M0Y2NjIiwiRm9udENvbG9yIjoiI2ZmZmZmZiIsIlRlbmFudE5hbWUiOiJOb3NzYSBGYXJtYSIsIlRlbmFudEtleSI6IlJORiIsIkJyYW5jaCI6IiIsIkVtYWlsIjoiYWRtaW5AcmVkZW5vc3NhZmFybWEuY29tLmJyIiwiVGVuYW50RG9tYWluIjoicmVkZW5vc3NhZmFybWEiLCJBc3NvY2lhdGVkVGVuYW50cyI6WyJyZWRlbm9zc2FmYXJtYSJdLCJUZW5hbnRNaWdyYXRlZCI6IlRydWUiLCJqdGkiOiJENkVFRkM1ODRGNzhGMzVDMEY3QzY2MkI3RUUwOTE2MiIsInNpZCI6IjI3M0MwRkE0QTg4MDkzNTIwOEUyOTU4NjcyMEVEMzdEIiwiaWF0IjoxNzU0NjAwNjUxLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJXRUJBUElQT1JUQUwiLCJDb3Ntb3NQcm9XZWJBcGkiLCJJZGVudGl0eVNlcnZlckFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.byaRn8K07unD3wjGG-wbp99NUbzS1OdOTP_DXTQY8dHqljdERXBiz9IHunZWOD9SVAar1a2JYk2PUE_PKJ-bSIxj8js6OnN1Ms_r7sUE8zEwcRJptroWHitMt4OPUUiYyEX-VoUx5ZCuMv5heI62oq8f0tK0q7Ku1HN82HTw2Q6wY3vg3-rXNpYWhPkWK7nC3wZl5OGhkaVeZVTWjJ9HCfAF6VFiL9ELInrR3Bj-OHPsc4mnG5AMfZEX9Rs4k962qy_PRWQpdU76KSLjD1UjCQinN5woexTpeTisHa9Epq9GSPGQFob8ORt8_pFUa5-M4z1XS5hgSnmRUn3jg7XCEQ";

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

// Interface para o envio dos itens selecionados
interface SendOrderItem {
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
  DESC: number;
  P_LIQ: number;
  TOT_P_LIQ_SOMA: number;
}

// Função para enviar pedidos selecionados
export const sendOrders = async (items: SendOrderItem[]): Promise<void> => {
  try {
    const token = getToken();
    console.log('Token atual:', token ? 'Present' : 'Missing');
    console.log('Enviando pedidos:', items);
    console.log('URL da requisição:', api.defaults.baseURL + '/odata/ExecuteCustomAction/ExecuteAction');
    
    const response = await api.post('/odata/ExecuteCustomAction/MmcSalvaProdutosPedidos/ExecuteAction', {
      Parameters: {
        SelectedItems: items
      }
    });
    console.log('Resposta da API:', response.data);
  } catch (error: any) {
    console.error('Erro ao enviar pedidos:', error.response?.data || error);
    throw error;
  }
};
