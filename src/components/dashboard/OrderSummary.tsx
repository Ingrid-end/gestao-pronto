import { OrderSummary as OrderSummaryType } from "../../types/order";

interface OrderSummaryProps {
  summary: OrderSummaryType;
  selectedItemsCount: number;
  totalItemsCount: number;
}

export const OrderSummary = ({
  summary,
  selectedItemsCount,
  totalItemsCount
}: OrderSummaryProps) => {
  return (
    <div className="bg-card rounded-lg shadow-card p-6 mt-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">
        Resumo do Pedido
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-table-header p-4 rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Itens Selecionados
          </h3>
          <p className="text-2xl font-bold text-primary">
            {selectedItemsCount}/{totalItemsCount}
          </p>
        </div>

        <div className="bg-table-header p-4 rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Qtd. Mínima Total
          </h3>
          <p className="text-2xl font-bold text-info">
            {summary.qtd_min_total.toLocaleString()}
          </p>
        </div>

        <div className="bg-table-header p-4 rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Qtd. Total
          </h3>
          <p className="text-2xl font-bold text-success">
            {summary.qtd_total.toLocaleString()}
          </p>
        </div>

        <div className="bg-table-header p-4 rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Total Geral
          </h3>
          <p className="text-2xl font-bold text-primary">
            R$ {summary.total_geral.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-success/10 border border-success/30 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-success-foreground mb-1">
            Economia Total
          </h3>
          <p className="text-xl font-bold text-success">
            R$ {summary.economia_total.toFixed(2)}
          </p>
        </div>

        <div className={`p-4 rounded-lg border ${
          summary.total_geral >= summary.valor_minimo_pedido
            ? 'bg-success/10 border-success/30'
            : 'bg-warning/10 border-warning/30'
        }`}>
          <h3 className="text-sm font-medium mb-1">
            Valor Mínimo do Pedido
          </h3>
          <p className="text-xl font-bold">
            R$ {summary.valor_minimo_pedido.toFixed(2)}
          </p>
          <p className={`text-xs mt-1 ${
            summary.total_geral >= summary.valor_minimo_pedido
              ? 'text-success'
              : 'text-warning'
          }`}>
            {summary.total_geral >= summary.valor_minimo_pedido
              ? '✓ Valor mínimo atingido'
              : '⚠ Valor mínimo não atingido'
            }
          </p>
        </div>
      </div>
    </div>
  );
};