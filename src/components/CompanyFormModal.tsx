import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import CampoDocumento from '@/core/components/CampoDocumento';
import CampoEmail from '@/core/components/CampoEmail';
import CampoTelefone from '@/core/components/CampoTelefone';
import { useEmpresas } from '@/hooks/useEmpresas';
import { Empresa } from '@/types/empresa';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const empresaSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cnpj: z.string().min(14, 'CNPJ deve ter 14 dígitos'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  endereco: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  estado: z.string().length(2, 'Estado deve ter 2 caracteres'),
  cep: z.string().min(8, 'CEP deve ter 8 dígitos'),
});

type EmpresaFormData = z.infer<typeof empresaSchema>;

interface CompanyFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empresa?: Empresa | null;
  onSuccess?: () => void;
}

export default function CompanyFormModal({
  open,
  onOpenChange,
  empresa,
  onSuccess,
}: CompanyFormModalProps) {
  const { createEmpresa, updateEmpresa } = useEmpresas();
  const isEditing = !!empresa;

  const form = useForm<EmpresaFormData>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      nome: '',
      cnpj: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
    },
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (empresa && open) {
      reset({
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        email: empresa.email,
        telefone: empresa.telefone,
        endereco: empresa.endereco,
        cidade: empresa.cidade,
        estado: empresa.estado,
        cep: empresa.cep,
      });
    } else if (!empresa && open) {
      reset({
        nome: '',
        cnpj: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
      });
    }
  }, [empresa, open, reset]);

  const onSubmit = async (data: EmpresaFormData) => {
    try {
      const empresaData = {
        nome: data.nome,
        cnpj: data.cnpj,
        email: data.email,
        telefone: data.telefone,
        endereco: data.endereco,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
        ativo: true,
        tenantId: 1 // Valor padrão, pode ser obtido do contexto de autenticação
      };

      if (isEditing && empresa) {
        await updateEmpresa(empresa.id, empresaData);
        toast.success('Empresa atualizada com sucesso!');
      } else {
        await createEmpresa(empresaData);
        toast.success('Empresa criada com sucesso!');
      }
      
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      // O erro já é tratado no hook
      console.error('Erro ao salvar empresa:', error);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">
                {isEditing ? 'Editar Empresa' : 'Nova Empresa'}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {isEditing 
                  ? 'Atualize as informações da empresa selecionada'
                  : 'Preencha os dados para cadastrar uma nova empresa'
                }
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">
                  Informações Básicas
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Empresa *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Arena Sports Club"
                            className="h-10"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ *</FormLabel>
                        <FormControl>
                          <CampoDocumento
                            id="cnpj"
                            value={field.value}
                            onChange={field.onChange}
                            tipo="cnpj"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <CampoEmail
                            id="email"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone *</FormLabel>
                        <FormControl>
                          <CampoTelefone
                            id="telefone"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">
                  Endereço
                </h4>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="endereco"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Endereço *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Rua, Avenida, número"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="00000-000"
                              className="h-10"
                              maxLength={9}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="cidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="São Paulo"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="estado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="SP"
                              className="h-10"
                              maxLength={2}
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? 'Atualizando...' : 'Criando...'}
                  </>
                ) : (
                  <>
                    {isEditing ? 'Atualizar' : 'Criar Empresa'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}