import { useState, useEffect } from "react";
import { OrderItem, ColumnFilter, SortConfig } from "../../types/order";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp, ChevronDown, Search, Loader2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, formatDateToPtBR, formatDateToYYYYMMDD, parseYYYYMMDDToDate, formatCNPJ, applyCNPJMask } from "@/lib/utils";
import { fetchOrders, type ApiOrderItem, OrderFilterParams } from "@/services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface OrderTableProps {
  data: OrderItem[];
  onDataChange: (data: OrderItem[]) => void;
  selectedItems: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export const OrderTable = ({
  onDataChange,
  selectedItems,
  onSelectionChange
}: OrderTableProps) => {
  const [filters, setFilters] = useState<ColumnFilter>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const { toast } = useToast();
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  
  // Filtro de data - usando período com data inicial e data final
  const today = formatDateToYYYYMMDD(new Date());
  const [dateFrom, setDateFrom] = useState<string>(today);
  const [dateTo, setDateTo] = useState<string>(today);
  
  // Formato de data para o input - YYYY-MM-DD para o elemento HTML input type="date"
  const formatDateForInput = (date: Date) => {
    // Ensure valid date
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }
    
    // Format as YYYY-MM-DD for the HTML date input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Preparar parâmetros para a chamada da API
        const params: OrderFilterParams = {
          page: currentPage,
          pageSize: pageSize
        };
        
        // Adicionar filtros de data (período)
        params.dateFrom = dateFrom;
        params.dateTo = dateTo;

        // Adicionar filtro de demanda se existir
        if (filters['demanda']) {
          params.demanda = parseInt(filters['demanda']);
        }
        
        const response = await fetchOrders(params);
        
        // Atualizar o contador total de itens para a paginação
        setTotalItems(response['@odata.count'] || response.value.length);
        
        // Map API data to OrderItem format
        const mappedOrders = response.value.map((item: ApiOrderItem, index: number) => ({
          id: `${item.COD_PROD}-${index}`,
          uf: item.UF,
          cd: item.CD.toString(),
          loja: item.LOJA,
          cnpj: item.CNPJ,
          tabela: item.TABELA,
          demanda: item.DEMANDA,
          ean: item.EAN,
          produto: item.PROD,
          preco_bruto: item.P_BRUTO,
          desconto: item.DESC,
          total: item.TOT_P_LIQ_SOMA,
          qtd_comprada: item.QTD || 0,
          preco_liquido: item.P_LIQ || 0,
          // Ensure date is properly formatted as YYYY-MM-DD
          data: typeof item.DATA === 'string' ? item.DATA.split('T')[0] : formatDateToYYYYMMDD(new Date(item.DATA))
        }));

        setOrders(mappedOrders);
        onDataChange(mappedOrders);
      } catch (err) {
        setError('Erro ao carregar pedidos. Por favor, tente novamente.');
        console.error('Error loading orders:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [onDataChange, currentPage, pageSize, dateFrom, dateTo, filters['demanda']]);

  // Colunas da tabela
  const columns = [
    { key: 'demanda', label: 'Demanda', width: 'min-w-[100px] whitespace-nowrap', type: 'raw-number' },
    { key: 'data', label: 'Data', width: 'min-w-[120px] whitespace-nowrap', type: 'date' },
    { key: 'uf', label: 'UF', width: 'min-w-[80px] whitespace-nowrap' },
    { key: 'cd', label: 'CD', width: 'min-w-[80px] whitespace-nowrap' },
    { key: 'loja', label: 'Loja', width: 'min-w-[250px]' },
    { key: 'cnpj', label: 'CNPJ', width: 'min-w-[180px] whitespace-nowrap' },
    { key: 'tabela', label: 'Tabela', width: 'min-w-[300px]' },
    { key: 'ean', label: 'EAN', width: 'min-w-[150px] whitespace-nowrap' },
    { key: 'produto', label: 'Produto', width: 'min-w-[300px]' },
    { key: 'preco_bruto', label: 'Preço Bruto', width: 'min-w-[150px] whitespace-nowrap', type: 'currency' },
    { key: 'desconto', label: 'Desconto (%)', width: 'min-w-[150px] whitespace-nowrap', type: 'percent' },
    { key: 'qtd_comprada', label: 'Quantidade', width: 'min-w-[130px] whitespace-nowrap', type: 'number' },
    { key: 'total', label: 'Total', width: 'min-w-[150px] whitespace-nowrap', type: 'currency' }
  ];

  // Filtrar dados
  const filteredData = orders.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      
      // Tratamento especial para o CNPJ - comparar ignorando formatação
      if (key === 'cnpj') {
        const itemCNPJ = String(item[key as keyof OrderItem]).replace(/\D/g, '');
        const filterCNPJ = value.replace(/\D/g, '');
        return itemCNPJ.includes(filterCNPJ);
      }
      
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
    const updatedData = orders.map(item => {
      if (item.id === id) {
        const total = newQuantity * item.preco_liquido;
        return { ...item, qtd_comprada: newQuantity, total };
      }
      return item;
    });
    setOrders(updatedData);
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
        return value !== undefined && value !== null ? Number(value).toLocaleString() : '-';
      case 'raw-number':
        // Return the number as is, without any formatting
        return value !== undefined && value !== null ? String(value) : '-';
      case 'date':
        // Handle date format from API and display in Brazilian format (DD/MM/YYYY)
        if (!value) return '-';
        // Use the utility function to format the date
        return formatDateToPtBR(value);
      default:
        // Format CNPJ if the value looks like a CNPJ
        if (typeof value === 'string' && value.length > 8 && value.includes('/')) {
          return formatCNPJ(value);
        }
        return String(value);
    }
  };
  
  // Manipular mudança de página
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  
  // Manipular mudança de tamanho da página
  const handlePageSizeChange = (newSize: string) => {
    setPageSize(Number(newSize));
    setCurrentPage(1); // Resetar para a primeira página quando mudar o tamanho
  };
  
  // Manipular mudança no filtro de data
  const handleDateFilterChange = () => {
    // Validar datas
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      toast({
        title: "Erro no filtro de data",
        description: "Por favor, verifique as datas selecionadas.",
        variant: "destructive"
      });
      return;
    }
    
    if (fromDate > toDate) {
      toast({
        title: "Erro no filtro de data",
        description: "A data inicial não pode ser posterior à data final.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentPage(1); // Resetar para a primeira página quando aplicar filtro
  };
  
  // Calcular total de páginas
  const totalPages = Math.ceil(totalItems / pageSize);

  const allSelected = sortedData.length > 0 && selectedItems.length === sortedData.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < sortedData.length;

  return (
    <div className="bg-card rounded-lg shadow-card w-full max-w-full overflow-hidden">
      {/* Cabeçalho da tabela - dois containers lado a lado */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
          {/* Container da esquerda - filtro de data alinhado à esquerda */}
          <div className="w-full md:flex-1 justify-start">
            {/* Filtro de data permanente - formato brasileiro */}
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-xs text-muted-foreground mb-1">Filtro por Data</label>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-col">
                    <label className="text-xs text-muted-foreground mb-1">Data Inicial</label>
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="h-8 text-xs w-32"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-xs text-muted-foreground mb-1">Data Final</label>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="h-8 text-xs w-32"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-xs text-muted-foreground mb-1">&nbsp;</label>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleDateFilterChange}
                        className="h-8"
                      >
                        <Search className="h-4 w-4 mr-1" />
                        Filtrar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Container da direita - espaço vazio */}
          <div className="w-full md:w-auto flex items-end justify-end mt-4 md:mt-0">
            {/* Botão de mostrar/ocultar filtros */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-8 px-4 w-full md:w-auto"
            >
              <Search className="h-4 w-4 mr-2" />
              {showFilters ? 'Ocultar Filtros Avançados' : 'Mostrar Filtros Avançados'}
            </Button>
          </div>
        </div>
        

        {/* Filtros */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            {/* Mostrar apenas os filtros que queremos - filtros personalizados */}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Demanda
              </label>
              <Input
                placeholder="Filtrar por Demanda"
                value={filters['demanda'] || ''}
                onChange={(e) => handleFilterChange('demanda', e.target.value)}
                className="h-9 text-sm"
                type="number"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                UF
              </label>
              <Input
                placeholder="Filtrar UF"
                value={filters['uf'] || ''}
                onChange={(e) => handleFilterChange('uf', e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Loja
              </label>
              <Input
                placeholder="Filtrar Loja"
                value={filters['loja'] || ''}
                onChange={(e) => handleFilterChange('loja', e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                CNPJ
              </label>
              <Input
                placeholder="Filtrar CNPJ (XX.XXX.XXX/XXXX-XX)"
                value={filters['cnpj'] || ''}
                onChange={(e) => {
                  // Apply CNPJ mask while preserving filter functionality
                  const maskedValue = applyCNPJMask(e.target.value);
                  handleFilterChange('cnpj', maskedValue);
                }}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Tabela
              </label>
              <Input
                placeholder="Filtrar Tabela"
                value={filters['tabela'] || ''}
                onChange={(e) => handleFilterChange('tabela', e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                EAN
              </label>
              <Input
                placeholder="Filtrar EAN"
                value={filters['ean'] || ''}
                onChange={(e) => handleFilterChange('ean', e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Produto
              </label>
              <Input
                placeholder="Filtrar Produto"
                value={filters['produto'] || ''}
                onChange={(e) => handleFilterChange('produto', e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Loading e Error states */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Tabela */}
      <div className="responsive-table-container">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="bg-table-header">
            <tr>
              <th className="p-2 text-left w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={cn(
                    "p-2 text-left font-medium text-sm cursor-pointer hover:bg-table-row-hover transition-colors",
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
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {sortedData.map((item, index) => {
              const isSelected = selectedItems.includes(item.id);
              return (
                <tr
                  key={item.id}
                  className={cn(
                    "border-b border-border transition-colors h-10",
                    index % 2 === 0 ? "bg-table-row-even" : "bg-table-row-odd",
                    isSelected && "bg-table-row-selected",
                    "hover:bg-table-row-hover"
                  )}
                >
                  <td className="p-2">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectItem(item.id, !!checked)}
                    />
                  </td>
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={cn("p-2 text-sm align-middle", column.width)}
                    >
                      {column.key === 'qtd_comprada' ? (
                        <div className="px-1 py-0.5">
                          {formatValue(item.qtd_comprada || 0, 'number')}
                        </div>
                      ) : column.key === 'cnpj' ? (
                        formatCNPJ(String(item.cnpj))
                      ) : column.key === 'demanda' ? (
                        String(item.demanda) // Display the demanda value without any formatting
                      ) : (
                        formatValue(item[column.key as keyof OrderItem], column.type)
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && !isLoading && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum item encontrado com os filtros aplicados
        </div>
      )}
      
      {/* Controles de paginação */}
      <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-muted-foreground text-center sm:text-left">
            Mostrando {sortedData.length ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(currentPage * pageSize, totalItems)} de {totalItems} itens
          </span>
          
          <Select
            value={String(pageSize)}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 text-xs w-24 mt-2 sm:mt-0">
              <SelectValue placeholder="Itens por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 itens</SelectItem>
              <SelectItem value="25">25 itens</SelectItem>
              <SelectItem value="50">50 itens</SelectItem>
              <SelectItem value="100">100 itens</SelectItem>
            </SelectContent>
          </Select>
          
          <span className="text-xs text-muted-foreground italic hidden md:inline-block">
            Paginação e filtros via parâmetros de URL
          </span>
        </div>
        
        <div className="flex items-center justify-center sm:justify-end gap-1 w-full sm:w-auto mt-2 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Primeira página</span>
            <ChevronLeft className="h-4 w-4" />
            <ChevronLeft className="h-4 w-4 -ml-2" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Página anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-xs px-2">
            Página {currentPage} de {totalPages || 1}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Próxima página</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage >= totalPages}
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Última página</span>
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 -ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};