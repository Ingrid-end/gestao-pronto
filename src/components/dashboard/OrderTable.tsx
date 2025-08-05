import { useState } from "react";
import { OrderItem, ColumnFilter, SortConfig } from "../../types/order";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTableProps {
  data: OrderItem[];
  onDataChange: (data: OrderItem[]) => void;
  selectedItems: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export const OrderTable = ({
  data,
  onDataChange,
  selectedItems,
  onSelectionChange
}: OrderTableProps) => {
  const [filters, setFilters] = useState<ColumnFilter>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);

  // Colunas da tabela
  const columns = [
    { key: 'uf', label: 'UF', width: 'w-16' },
    { key: 'cd', label: 'CD', width: 'w-20' },
    { key: 'nome_cd', label: 'Nome CD', width: 'w-48' },
    { key: 'cond_com', label: 'Cond. Com', width: 'w-24' },
    { key: 'fabricante', label: 'Fabricante', width: 'w-32' },
    { key: 'tabela_cod', label: 'Tabela Cod', width: 'w-24' },
    { key: 'tabela', label: 'Tabela', width: 'w-32' },
    { key: 'tipo_envio', label: 'Tipo Envio', width: 'w-24' },
    { key: 'email', label: 'E-mail', width: 'w-48' },
    { key: 'cod_prod', label: 'Cód Prod', width: 'w-24' },
    { key: 'ean', label: 'EAN', width: 'w-32' },
    { key: 'produto', label: 'Produto', width: 'w-32' },
    { key: 'preco_bruto', label: 'Preço Bruto', width: 'w-28', type: 'currency' },
    { key: 'desconto', label: 'Desconto (%)', width: 'w-28', type: 'percent' },
    { key: 'preco_liquido', label: 'Preço Líquido', width: 'w-28', type: 'currency' },
    { key: 'estoque', label: 'Estoque', width: 'w-24', type: 'number' },
    { key: 'qtd_minima', label: 'Qtd. Mínima', width: 'w-28', type: 'number' },
    { key: 'qtd_comprada', label: 'Qtd. Comprada', width: 'w-28', type: 'number' },
    { key: 'total', label: 'Total', width: 'w-28', type: 'currency' }
  ];

  // Filtrar dados
  const filteredData = data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const itemValue = String(item[key as keyof OrderItem]).toLowerCase();
      return itemValue.includes(value.toLowerCase());
    });
  });

  // Ordenar dados
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Manipular ordenação
  const handleSort = (key: keyof OrderItem) => {
    setSortConfig(prevSort => ({
      key,
      direction: prevSort.key === key && prevSort.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Manipular filtros
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Manipular seleção
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(sortedData.map(item => item.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, id]);
    } else {
      onSelectionChange(selectedItems.filter(item => item !== id));
    }
  };

  // Atualizar quantidade comprada
  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        const total = newQuantity * item.preco_liquido;
        return { ...item, qtd_comprada: newQuantity, total };
      }
      return item;
    });
    onDataChange(updatedData);
  };

  // Formatar valores
  const formatValue = (value: any, type?: string) => {
    switch (type) {
      case 'currency':
        return `R$ ${Number(value).toFixed(2)}`;
      case 'percent':
        return `${Number(value).toFixed(1)}%`;
      case 'number':
        return Number(value).toLocaleString();
      default:
        return String(value);
    }
  };

  const allSelected = sortedData.length > 0 && selectedItems.length === sortedData.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < sortedData.length;

  return (
    <div className="bg-card rounded-lg shadow-card">
      {/* Controles da tabela */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            Itens do Pedido ({sortedData.length})
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Search className="h-4 w-4" />
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
            {columns.slice(0, 12).map(column => (
              <div key={column.key}>
                <label className="text-xs text-muted-foreground mb-1 block">
                  {column.label}
                </label>
                <Input
                  placeholder={`Filtrar ${column.label}`}
                  value={filters[column.key] || ''}
                  onChange={(e) => handleFilterChange(column.key, e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead className="bg-table-header">
            <tr>
              <th className="p-3 text-left w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={cn(
                    "p-3 text-left font-medium text-sm cursor-pointer hover:bg-table-row-hover transition-colors",
                    column.width
                  )}
                  onClick={() => handleSort(column.key as keyof OrderItem)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {sortConfig.key === column.key && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="h-3 w-3" /> : 
                        <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
              ))}
              <th className="p-3 text-left w-28">Ações</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {sortedData.map((item, index) => {
              const isSelected = selectedItems.includes(item.id);
              const isHighStock = item.estoque > 1000;
              
              return (
                <tr
                  key={item.id}
                  className={cn(
                    "border-b border-border transition-colors",
                    index % 2 === 0 ? "bg-table-row-even" : "bg-table-row-odd",
                    isSelected && "bg-table-row-selected",
                    isHighStock && "bg-table-row-warning",
                    "hover:bg-table-row-hover"
                  )}
                >
                  <td className="p-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectItem(item.id, !!checked)}
                    />
                  </td>
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={cn("p-3 text-sm", column.width)}
                    >
                      {formatValue(item[column.key as keyof OrderItem], column.type)}
                    </td>
                  ))}
                  <td className="p-3">
                    <Input
                      type="number"
                      min="0"
                      value={item.qtd_comprada}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      className="w-20 h-8 text-xs"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum item encontrado com os filtros aplicados
        </div>
      )}
    </div>
  );
};