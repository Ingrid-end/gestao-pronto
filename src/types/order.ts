export interface OrderItem {
  id: string;
  uf: string;
  cd: string;
  loja: string;
  cnpj: string;
  tabela: string;
  tabela_cod: string;
  demanda: number;
  ean: string;
  produto: string;
  cod_prod: string;
  preco_bruto: number;
  desconto: number;
  total: number;
  data: string;
  estoque?: number;
  qtd_minima?: number;
  qtd_comprada: number;
  preco_liquido: number;
  selected?: boolean;
  nome_cd?: string;
  fabricante?: string;
  tipo_envio?: string;
  email?: string;
}

export interface OrderSummary {
  total_geral: number;
  economia_total: number;
}

export interface ColumnFilter {
  [key: string]: string;
}

export interface SortConfig {
  key: keyof OrderItem | null;
  direction: 'asc' | 'desc';
}