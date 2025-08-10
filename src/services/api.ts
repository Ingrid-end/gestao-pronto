import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const localToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzQTk0RkM4MTg4Qzg3NkE5Njk2Mzg1QjU4NTUxQzg4OTYxNDE0RDdSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IlU2bFB5QmlNaDJxV2xqaGJXRlVjaUpZVUZOYyJ9.eyJuYmYiOjE3NTQ3OTY4MDIsImV4cCI6MTc1NDgwMDQwMiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvc21vc3Byby5jb20uYnIiLCJhdWQiOiJodHRwczovL2F1dGguY29zbW9zcHJvLmNvbS5ici9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJKYXZhc2NyaXB0Q2xpZW50Iiwic3ViIjoiMTU3NjAxIiwiYXV0aF90aW1lIjoxNzU0NTM4NTQzLCJpZHAiOiJsb2NhbCIsIkxvZ2luU2Vzc2lvbklEIjoiMzgyYjA1MmQtZjA0Ni00NjQ2LWFlZTgtNTVhN2U3NzhiYWM5IiwiTmFtZSI6ImFkbWluQHJlZGVub3NzYWZhcm1hLmNvbS5iciIsIkZyaWVuZGx5TmFtZSI6IkFkbWluaXN0cmFkb3IgLSBOb3NzYSBGYXJtYSIsIlByb2ZpbGUiOiIxIiwiSm9iUm9sZSI6IjYiLCJXZWVrZW5kU2NhbGUiOiIxIiwiVXNlclBpY3R1cmUiOiJiNjZlNzdiOS03NWMxLTRhMzYtOWQ0Mi03Yzk2N2UyOGYyZjAucG5nIiwicm9sZSI6ImFkbWluIiwiVGVuYW50SWQiOiIxMDE1NCIsIkxvZ28iOiIyOTdhYzQyMC0zYzY3LTQ0MzEtYWZkNS01ODcyYTBiMGQwZjYucG5nIiwiSWNvbiI6IiIsIkJhY2tncm91bmRJbWFnZSI6IiIsIk1haW5Db2xvciI6IiMzYzRjY2MiLCJGb250Q29sb3IiOiIjZmZmZmZmIiwiVGVuYW50TmFtZSI6Ik5vc3NhIEZhcm1hIiwiVGVuYW50S2V5IjoiUk5GIiwiQnJhbmNoIjoiIiwiRW1haWwiOiJhZG1pbkByZWRlbm9zc2FmYXJtYS5jb20uYnIiLCJUZW5hbnREb21haW4iOiJyZWRlbm9zc2FmYXJtYSIsIkFzc29jaWF0ZWRUZW5hbnRzIjpbInJlZGVub3NzYWZhcm1hIl0sIlRlbmFudE1pZ3JhdGVkIjoiVHJ1ZSIsImp0aSI6IkM4Q0MyRTI1RkVEQjI2QkJGODE3Njk5ODg1RTI2QzBFIiwic2lkIjoiQ0M4RDVBQkVCMkMwNzFCNTFENDQxNDk4RTlBOEQ5QTkiLCJpYXQiOjE3NTQ3OTY4MDIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsIldFQkFQSVBPUlRBTCIsIkNvc21vc1Byb1dlYkFwaSIsIklkZW50aXR5U2VydmVyQXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.d9r6tdtEvUsTzKStILRddhACsURSRONcrSSbG-bgXCj0SaDMX4MscbPHM5xV9CAgAuGSrk-DYlGPUDYnZa6R0unyZBbQSc2jI6N3nsrHf74iPmGvuzsxw3dDFwNWQTIYKilBdp9fuclNZYL89xQbeYfWGEHAZ7YKWoUToBV7pMR_Tl6039zT5dBmq6UPyh2dKlu2W9hZ0dKHWotuMwhHEUnu5ScJCxVzOb-85K6VMhfxpOKBqgPiURIyNfHomZ_F0Z-fx52XhoCYWuEL7ils1sRLBmfV6JwKoYq4FwW1ibfaktxMSzEh2wV7F4cwRp7YQeC5DNbhL4lZHX8nESQtmg";

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
    
    console.log('URL da requisição:', url);
    console.log('Parâmetros de paginação:', urlParams);
    console.log('Parâmetros de corpo:', bodyParams);
    
    // Fazer a chamada com os parâmetros no body
    const response = await api.post(url, bodyParams);
    
    // Log da resposta para debug
    if (response.data.value && response.data.value.length > 0) {
      console.log('Formato da data na resposta:', response.data.value[0].DATA);
    }
    
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

  console.log('Items recebidos para transformação:', JSON.stringify(items, null, 2));

  // Agrupa os itens por demanda
  const groupedByDemanda = items.reduce((acc, item) => {
    // Log detalhado do item sendo processado
    console.log('Processando item completo:', JSON.stringify(item, null, 2));

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
    console.log('Payload completo:', JSON.stringify(requestData, null, 2));
    
    // Garantir que estamos enviando um array válido
    if (!Array.isArray(requestData) || requestData.length === 0) {
      throw new Error('Dados inválidos para envio');
    }
    
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
