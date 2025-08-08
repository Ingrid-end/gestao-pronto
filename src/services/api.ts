import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const localToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzQTk0RkM4MTg4Qzg3NkE5Njk2Mzg1QjU4NTUxQzg4OTYxNDE0RDdSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IlU2bFB5QmlNaDJxV2xqaGJXRlVjaUpZVUZOYyJ9.eyJuYmYiOjE3NTQ2ODQ2ODcsImV4cCI6MTc1NDY4ODI4NywiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvc21vc3Byby5jb20uYnIiLCJhdWQiOiJodHRwczovL2F1dGguY29zbW9zcHJvLmNvbS5ici9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJKYXZhc2NyaXB0Q2xpZW50Iiwic3ViIjoiMTU3NjAxIiwiYXV0aF90aW1lIjoxNzU0NjU1OTM1LCJpZHAiOiJsb2NhbCIsIkxvZ2luU2Vzc2lvbklEIjoiNzFlNWQzZGYtMDliNi00YTViLTk3MjctMmQ2ZTI5YzE3M2Y4IiwiTmFtZSI6ImFkbWluQHJlZGVub3NzYWZhcm1hLmNvbS5iciIsIkZyaWVuZGx5TmFtZSI6IkFkbWluaXN0cmFkb3IgLSBOb3NzYSBGYXJtYSIsIlByb2ZpbGUiOiIxIiwiSm9iUm9sZSI6IjYiLCJJbml0aWFscyI6IkFGIiwiVXNlcklkZW50aWZpY2F0aW9uQ2hhdCI6IlRJZC0xMDE1NDpVSWQtMTU3NjAxIiwiVXNlckNoYXRTaWduYXR1cmUiOiIyMzM1MzkxNGZlYWU5MDhhNGY0MmE0Mzc4NDJkOTc0YmFhMDllZDRhYTgwMTQ5Y2I3YTIwOWFhYTBiMmI3MDlkIiwiV2Vla2VuZFNjYWxlIjoiMSIsIlVzZXJQaWN0dXJlIjoiYjY2ZTc3YjktNzVjMS00YTM2LTlkNDItN2M5NjdlMjhmMmYwLnBuZyIsInJvbGUiOiJhZG1pbiIsIlRlbmFudElkIjoiMTAxNTQiLCJMb2dvIjoiMjk3YWM0MjAtM2M2Ny00NDMxLWFmZDUtNTg3MmEwYjBkMGY2LnBuZyIsIkljb24iOiIiLCJCYWNrZ3JvdW5kSW1hZ2UiOiIiLCJNYWluQ29sb3IiOiIjM2M0Y2NjIiwiRm9udENvbG9yIjoiI2ZmZmZmZiIsIlRlbmFudE5hbWUiOiJOb3NzYSBGYXJtYSIsIlRlbmFudEtleSI6IlJORiIsIkJyYW5jaCI6IiIsIkVtYWlsIjoiYWRtaW5AcmVkZW5vc3NhZmFybWEuY29tLmJyIiwiVGVuYW50RG9tYWluIjoicmVkZW5vc3NhZmFybWEiLCJBc3NvY2lhdGVkVGVuYW50cyI6WyJyZWRlbm9zc2FmYXJtYSJdLCJUZW5hbnRNaWdyYXRlZCI6IlRydWUiLCJqdGkiOiJENjEwNDY5RjM3RjYyMUEyMDI2RDYyRDlBMTE1MDFBQSIsInNpZCI6IjgxMEZBNTdCMkIzQUExOTg0OTQzM0JGREUzQkI3NEQyIiwiaWF0IjoxNzU0Njg0Njg3LCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJXRUJBUElQT1JUQUwiLCJDb3Ntb3NQcm9XZWJBcGkiLCJJZGVudGl0eVNlcnZlckFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.nlXaBFSVRAN040kga5NA3jzGXC33iK0Urx8EzHW38SUmYJexeByiggwFCFsufAXxkDGpfMKzekcLdKksLmkktEklHImq5QUFVhJGGNegPGPKuyK4eYoPhs0p7K9EIVyeyOiQ3IMvAN7Pm-_gsM-ZoZMYKY1WQHNGqsqoTusxLEtJrbLW__Zqmk3hbuBHmIXjhuFabQ7C2R4ce80Qo16p8PEFEbPPVHJEMekPuAWq26nvduse5n7slF0MH-pHblm2DxnH2VSLp8Gdxx9OMHX2A0huuprWBZaPwp14Fq6PZLMLp8tHiVtOvTCdW__Ug2jvrtrS9Zz14-f19dVeyJsPCA";

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
  USUARIO: string;
  COD_USER: string;
  DEMANDA: number;
  DATA: string; // Format: YYYY-MM-DD
  HORA: string;
  LOJA: string;
  ENTIDADE: string;
  CNPJ: string;
  UF: string;
  CD: number;
  FORN: string;
  TABELA_COD: number;
  TABELA: string;
  TIPO_ENVIO: string;
  EMAIL: string;
  COD_PROD: number;
  EAN: string;
  PROD: string;
  FABRICANTE: string;
  QTD: number;
  P_BRUTO: number;
  P_BRUTO_SOMA: number;
  DESC: number;
  P_LIQ: number;
  TOT_P_LIQ_SOMA: number;
  COD_COMPRADOR: string;
  CARGO: string;
  NOME_CD: string;
}

export interface OrderResponse {
  '@odata.context': string;
  '@odata.count': number;
  value: ApiOrderItem[];
}

export interface OrderFilterParams {
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}

export const fetchOrders = async (params?: OrderFilterParams): Promise<OrderResponse> => {
  try {
    // Construir a URL base
    let url = '/odata/CustomViews(Name=\'Mmc_ListaPedidosEmail\')/ExecuteAndReceiveData()';
    
    // Adicionar parâmetros de paginação na URL
    const urlParams: string[] = [];
    
    // Adicionar parâmetros de paginação na URL
    if (params?.page !== undefined && params?.pageSize !== undefined) {
      const skipValue = (params.page - 1) * params.pageSize;
      urlParams.push(`$skip=${skipValue}`);
      urlParams.push(`$top=${params.pageSize}`);
    }
    
    // Adicionar os parâmetros à URL
    if (urlParams.length > 0) {
      url += '?' + urlParams.join('&');
    }
    
    // Preparar os parâmetros para o body da requisição no formato correto
    const bodyParams: any = {
      Parameters: {}
    };
    
    // Adicionar data inicial ao body se existir
    if (params?.dateFrom) {
      try {
        bodyParams.Parameters.DATA_INI = params.dateFrom;
      } catch (error) {
        console.error('Erro ao formatar data inicial para filtro:', error);
      }
    }
    
    // Adicionar data final ao body se existir
    if (params?.dateTo) {
      try {
        bodyParams.Parameters.DATA_FIM = params.dateTo;
      } catch (error) {
        console.error('Erro ao formatar data final para filtro:', error);
      }
    }
    
    console.log('URL da requisição:', url);
    console.log('Parâmetros de paginação:', urlParams);
    console.log('Parâmetros de corpo:', bodyParams);
    
    // Fazer a chamada com os parâmetros no body
    const response = await api.post(url, bodyParams);
    
    // Log da resposta para debug
    if (response.data.value && response.data.value.length > 0) {
      console.log('Formato da data na resposta:', response.data.value[0].DATA);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Interfaces para o envio dos pedidos
interface OrderProduct {
  idProduto: number;
}

interface OrderRequest {
  idDemanda: number;
  produtos: OrderProduct[];
}

// Função para transformar os itens selecionados no formato da API
const transformItemsToApiFormat = (items: ApiOrderItem[]): OrderRequest[] => {
  if (!items || items.length === 0) {
    console.warn('Nenhum item recebido para transformação');
    return [];
  }

  console.log('Items recebidos para transformação:', JSON.stringify(items, null, 2));

  // Agrupa os itens por demanda
  const groupedByDemanda = items.reduce((acc, item) => {
    // Log detalhado do item sendo processado
    console.log('Processando item completo:', JSON.stringify(item, null, 2));

    // Verifica apenas o produto, não mais a quantidade
    if (item.DEMANDA === undefined || item.DEMANDA === null || !item.COD_PROD) {
      console.warn('Item inválido. Valores:', {
        demanda: item.DEMANDA,
        codProd: item.COD_PROD
      });
      return acc;
    }

    const demandaGroup = acc.get(item.DEMANDA) || {
      idDemanda: item.DEMANDA,
      produtos: []
    };

    demandaGroup.produtos.push({
      idProduto: item.COD_PROD
    });

    acc.set(item.DEMANDA, demandaGroup);
    return acc;
  }, new Map<number, OrderRequest>());

  const result = Array.from(groupedByDemanda.values());
  console.log('Dados transformados:', result);
  return result;
};

interface ApiResponse {
  status: string;
  title: string;
}

// Função para enviar pedidos selecionados
export const sendOrders = async (items: ApiOrderItem[]): Promise<void> => {
  try {
    if (!items || items.length === 0) {
      throw new Error('Nenhum item selecionado para envio');
    }

    const token = getToken();
    console.log('Token atual:', token ? 'Present' : 'Missing');
    
    const requestData = transformItemsToApiFormat(items);
    if (requestData.length === 0) {
      throw new Error('Nenhum item válido para envio');
    }

    console.log('Enviando pedidos:', requestData);
    
    // Envia diretamente o array de pedidos
    console.log('Payload completo:', requestData);
    
    const response = await api.post('/api/ExecuteCustomAction/ExecuteAction?ActionName=Mmc_ListaPedidosEmail', requestData);
    console.log('Resposta da API:', response.data);

    // Valida a resposta da API
    const apiResponse = response.data as ApiResponse;
    if (apiResponse.status !== 'success' || apiResponse.title !== 'sucesso') {
      throw new Error('Resposta inválida da API: ' + (apiResponse.title || 'Erro desconhecido'));
    }
  } catch (error: any) {
    console.error('Erro ao enviar pedidos:', error.response?.data || error);
    // Personaliza a mensagem de erro baseada na resposta da API ou no erro
    let errorMessage = 'Erro ao enviar pedidos';
    if (error.response?.data?.title) {
      errorMessage = error.response.data.title;
    } else if (error.message) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};
