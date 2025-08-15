import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const localToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzQTk0RkM4MTg4Qzg3NkE5Njk2Mzg1QjU4NTUxQzg4OTYxNDE0RDdSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IlU2bFB5QmlNaDJxV2xqaGJXRlVjaUpZVUZOYyJ9.eyJuYmYiOjE3NTQ5NDU5NTQsImV4cCI6MTc1NDk0OTU1NCwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvc21vc3Byby5jb20uYnIiLCJhdWQiOiJodHRwczovL2F1dGguY29zbW9zcHJvLmNvbS5ici9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJKYXZhc2NyaXB0Q2xpZW50Iiwic3ViIjoiMTU3NjAxIiwiYXV0aF90aW1lIjoxNzU0OTI3MDgxLCJpZHAiOiJsb2NhbCIsIkxvZ2luU2Vzc2lvbklEIjoiZjQ1MzE0YjItZWU0Yy00NGI3LTljMDYtMmI0MzgzYTZhZTRhIiwiTmFtZSI6ImFkbWluQHJlZGVub3NzYWZhcm1hLmNvbS5iciIsIkZyaWVuZGx5TmFtZSI6IkFkbWluaXN0cmFkb3IgLSBOb3NzYSBGYXJtYSIsIlByb2ZpbGUiOiIxIiwiSm9iUm9sZSI6IjYiLCJXZWVrZW5kU2NhbGUiOiIxIiwiVXNlclBpY3R1cmUiOiJiNjZlNzdiOS03NWMxLTRhMzYtOWQ0Mi03Yzk2N2UyOGYyZjAucG5nIiwiSW5pdGlhbHMiOiJBRiIsIlVzZXJJZGVudGlmaWNhdGlvbkNoYXQiOiJUSWQtMTAxNTQ6VUlkLTE1NzYwMSIsIlVzZXJDaGF0U2lnbmF0dXJlIjoiMjMzNTM5MTRmZWFlOTA4YTRmNDJhNDM3ODQyZDk3NGJhYTA5ZWQ0YWE4MDE0OWNiN2EyMDlhYWEwYjJiNzA5ZCIsInJvbGUiOiJhZG1pbiIsIlRlbmFudElkIjoiMTAxNTQiLCJMb2dvIjoiMjk3YWM0MjAtM2M2Ny00NDMxLWFmZDUtNTg3MmEwYjBkMGY2LnBuZyIsIkljb24iOiIiLCJCYWNrZ3JvdW5kSW1hZ2UiOiIiLCJNYWluQ29sb3IiOiIjM2M0Y2NjIiwiRm9udENvbG9yIjoiI2ZmZmZmZiIsIlRlbmFudE5hbWUiOiJOb3NzYSBGYXJtYSIsIlRlbmFudEtleSI6IlJORiIsIkJyYW5jaCI6IiIsIkVtYWlsIjoiYWRtaW5AcmVkZW5vc3NhZmFybWEuY29tLmJyIiwiVGVuYW50RG9tYWluIjoicmVkZW5vc3NhZmFybWEiLCJBc3NvY2lhdGVkVGVuYW50cyI6WyJyZWRlbm9zc2FmYXJtYSJdLCJUZW5hbnRNaWdyYXRlZCI6IlRydWUiLCJqdGkiOiJBNTM1N0EzNzNCRDhDODZCNDQxODZCMjA5OUE3QUU3NSIsInNpZCI6IkRCOEI5NDcwOTc4MTdGRDc2QkM3QTkxOTJBMjg4Q0YwIiwiaWF0IjoxNzU0OTQ1OTU0LCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJXRUJBUElQT1JUQUwiLCJDb3Ntb3NQcm9XZWJBcGkiLCJJZGVudGl0eVNlcnZlckFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.SgUC7VQ2bdJgwHGRn-6fuWzDyu2bLTruTn7_vFv71Z0Hd079sKpUuLw7I6sDBbNGmUfto4GgSOqWlNipzH_3xbp0RRjZ89xg577edj3IvdPQKd8uHYAwuLBWFuIwSm00FbQay_PsvMLQG9hNReeP_71rfY-dCEKOf6uEvEa1AQ1V7Qh919rR20wWvey67KT5k4TlTDEglIgSux-bVqr8NT7QMUU8MfjiE0mczMWbpV33pwQiFv5QWOlPhrPlZce2-I1z2IMhc8cLLGmYs23FkMtQTV13NzK7qMwj0BpPUg2xV-Pzikr4VsvV0BujcVTIFHlvv0Wu4iUdsod9tAo9mA";

// Função para verificar se está rodando localmente
const isLocalhost = () => 
  window.location.href.match(/^http:\/\/localhost/) !== null;

// Função para obter o token atual
const getToken = () => {
  if (isLocalhost()) {
    return localToken;
  }
  const prodToken = window.localStorage.getItem('access_token');
  return prodToken;
};

// Função para obter o refresh_token
const getRefreshToken = () => {
  const refreshToken = window.localStorage.getItem('refresh_token');
  return refreshToken;
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
    } else {
      console.warn('[axios interceptor] Nenhum token encontrado para Authorization');
    }
    return config;
  });

  // Interceptor para tratamento de erros e refresh automático do token
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn('[axios interceptor] 401 recebido, tentando refresh do token...');
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            // Chame o endpoint de refresh (ajuste a URL conforme sua API)
            const refreshResponse = await axios.post('https://portal.cosmospro.com.br:9191/api/refresh-token', {
              refresh_token: refreshToken
            });
            const { access_token: newAccessToken, refresh_token: newRefreshToken } = refreshResponse.data as { access_token: string; refresh_token: string };
            if (newAccessToken) {
              window.localStorage.setItem('access_token', newAccessToken);
            }
            if (newRefreshToken) {
              window.localStorage.setItem('refresh_token', newRefreshToken);
            }
            // Repita a requisição original com o novo token
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return api.request(error.config);
          } catch (refreshError) {
            console.error('[axios interceptor] Erro ao tentar refresh do token:', refreshError);
            // Remover tokens e redirecionar para login
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('refresh_token');
            // Aqui você pode redirecionar para login se desejar
            return Promise.reject(refreshError);
          }
        } else {
          // Sem refresh_token, remover tokens e redirecionar para login
          window.localStorage.removeItem('access_token');
          window.localStorage.removeItem('refresh_token');
          console.error('Sessão expirada ou token inválido, sem refresh_token disponível');
        }
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
  demanda?: number;  // Novo campo para filtrar por demanda
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

    // Para filtrar por demanda, vamos fazer isso no código após receber os dados
    // Não enviamos o parâmetro DEMANDA para a API pois a CustomView não o suporta
    
    
    // Fazer a chamada com os parâmetros no body
    const response = await api.post(url, bodyParams);
    
    
    // Se tiver filtro de demanda, aplicar o filtro nos dados recebidos
    if (params?.demanda) {
      const filteredData = {
        ...response.data,
        value: response.data.value.filter(item => item.DEMANDA === params.demanda),
        '@odata.count': response.data.value.filter(item => item.DEMANDA === params.demanda).length
      };
      return filteredData;
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


  // Agrupa os itens por demanda
  const groupedByDemanda = items.reduce((acc, item) => {
    // Log detalhado do item sendo processado

    // Verifica se a demanda existe e se o COD_PROD é um número válido
    const demanda = item.DEMANDA;
    const codProd = item.COD_PROD;

    if (!demanda || !codProd || isNaN(Number(codProd))) {
      console.warn('Item inválido. Valores:', {
        demanda,
        codProd
      });
      return acc;
    }

    // Certifica-se que a demanda é um número
    const demandaNumber = Number(item.DEMANDA);

    const demandaGroup = acc.get(demandaNumber) || {
      idDemanda: demandaNumber,
      produtos: []
    };

    // Adiciona o produto apenas se ainda não estiver na lista
    if (!demandaGroup.produtos.some(p => p.idProduto === item.COD_PROD)) {
      demandaGroup.produtos.push({
        idProduto: item.COD_PROD
      });
    }

    acc.set(demandaNumber, demandaGroup);
    return acc;
  }, new Map<number, OrderRequest>());

  const result = Array.from(groupedByDemanda.values());
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
    
    const requestData = transformItemsToApiFormat(items);
    if (requestData.length === 0) {
      throw new Error('Nenhum item válido para envio');
    }

    
    // Envia diretamente o array de pedidos
    
    // Garantir que estamos enviando um array válido
    if (!Array.isArray(requestData) || requestData.length === 0) {
      throw new Error('Dados inválidos para envio');
    }
    
    const response = await api.post('/api/ExecuteCustomAction/ExecuteAction?ActionName=Mmc_ListaPedidosEmail', requestData);

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
