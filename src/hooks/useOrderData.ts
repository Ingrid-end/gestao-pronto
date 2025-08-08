import { useState, useMemo } from 'react';
import { OrderItem, OrderSummary } from '../types/order';
import { mockOrderData } from '../data/mockData';

export const useOrderData = () => {
  const [orderData, setOrderData] = useState<OrderItem[]>(mockOrderData);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Calcular resumo do pedido
  const orderSummary = useMemo<OrderSummary>(() => {
    const selectedData = orderData.filter(item => selectedItems.includes(item.id));
    
    const total_geral = selectedData.reduce((sum, item) => sum + item.total, 0);
    
    // Cálculo da economia (desconto aplicado)
    const valor_bruto_total = selectedData.reduce((sum, item) => 
      sum + (item.preco_bruto * item.qtd_comprada), 0
    );
    const economia_total = valor_bruto_total - total_geral;

    return {
      total_geral,
      economia_total
    };
  }, [orderData, selectedItems]);

  // Exportar dados para CSV
  const exportToCSV = () => {
    const selectedData = orderData.filter(item => selectedItems.includes(item.id));
    
    if (selectedData.length === 0) {
      alert('Selecione pelo menos um item para exportar');
      return;
    }

    const headers = [
      'UF', 'CD', 'Nome CD', 'Fabricante', 'Tabela Cod', 'Tabela',
      'Tipo Envio', 'E-mail', 'Cód Prod', 'EAN', 'Produto', 'Preço Bruto',
      'Desconto (%)', 'Preço Líquido', 'Estoque', 'Qtd. Mínima', 'Qtd. Comprada', 'Total'
    ];

    const csvContent = [
      headers.join(','),
      ...selectedData.map(item => [
        item.uf, item.cd, `"${item.nome_cd}"`, item.fabricante,
        item.tabela_cod, item.tabela, item.tipo_envio, item.email, item.cod_prod,
        item.ean, `"${item.produto}"`, item.preco_bruto, item.desconto,
        item.preco_liquido, item.estoque, item.qtd_minima, item.qtd_comprada, item.total
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `pedido_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    orderData,
    setOrderData,
    selectedItems,
    setSelectedItems,
    orderSummary,
    exportToCSV
  };
};