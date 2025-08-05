import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrderSummary } from "../../types/order";

interface OrderConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  summary: OrderSummary;
  selectedItemsCount: number;
}

export const OrderConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
  summary,
  selectedItemsCount
}: OrderConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Confirmar Envio do Pedido
          </DialogTitle>
          <DialogDescription>
            Revise os dados do pedido antes de confirmar o envio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Itens selecionados:</span>
            <span className="font-bold">{selectedItemsCount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Quantidade total:</span>
            <span className="font-bold">{summary.qtd_total.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Valor total:</span>
            <span className="font-bold text-primary">
              R$ {summary.total_geral.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Economia:</span>
            <span className="font-bold text-success">
              R$ {summary.economia_total.toFixed(2)}
            </span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Status do pedido:</span>
              <span className={`font-bold ${
                summary.total_geral >= summary.valor_minimo_pedido
                  ? 'text-success'
                  : 'text-warning'
              }`}>
                {summary.total_geral >= summary.valor_minimo_pedido
                  ? '✓ Aprovado'
                  : '⚠ Valor mínimo não atingido'
                }
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="action-green"
            onClick={handleConfirm}
            disabled={summary.total_geral < summary.valor_minimo_pedido}
          >
            Confirmar Envio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};