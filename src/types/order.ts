export interface OrderItem {
  id: string;
  uf: string;
  cd: string;
  nome_cd: string;
  cond_com: string;
  fabricante: string;
  tabela_cod: string;
  tabela: string;
  tipo_envio: string;
  email: string;
  cod_prod: string;
  ean: string;
  produto: string;
  preco_bruto: number;
  desconto: number;
  preco_liquido: number;
  estoque: number;
  qtd_minima: number;
  qtd_comprada: number;
  total: number;
  selected?: boolean;
}

export interface OrderSummary {
  qtd_min_total: number;
  qtd_total: number;
  total_geral: number;
  economia_total: number;
  valor_minimo_pedido: number;
}

export interface ColumnFilter {
  [key: string]: string;
}

export interface SortConfig {
  key: keyof OrderItem | null;
  direction: 'asc' | 'desc';
}