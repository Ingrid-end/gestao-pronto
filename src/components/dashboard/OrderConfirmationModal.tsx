import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrderItem } from "../../types/order";

interface OrderConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  selectedItems: OrderItem[];
}

export const OrderConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
  selectedItems
}: OrderConfirmationModalProps) => {
  const groupedItems = selectedItems.reduce((acc, item) => {
    const key = item.tabela_cod;
    if (!acc[key]) {
      acc[key] = {
        items: [],
        total: 0,
        tabela: item.tabela
      };
    }
    acc[key].items.push(item);
    acc[key].total += item.total;
    return acc;
  }, {} as Record<string, { items: OrderItem[]; total: number; tabela: string }>);
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
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium">Itens selecionados:</span>
            <span className="font-bold">{selectedItems.length}</span>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedItems).map(([tabelaCod, group]) => (
              <div key={tabelaCod} className="space-y-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">{group.tabela}</span>
                    <span className="text-sm text-muted-foreground ml-2">(Cód: {tabelaCod})</span>
                  </div>
                  <span className="font-bold text-primary">
                    R$ {group.total.toFixed(2)}
                  </span>
                </div>
                
                {group.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm pl-4">
                    <span className="text-muted-foreground">{item.produto}</span>
                    <span>R$ {item.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ))}
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
          >
            Confirmar Envio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};