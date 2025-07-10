import { useBaseCrud } from '../hooks/useBaseCrud';

// Interface para local
interface Local {
  id: string;
  nome: string;
  endereco: string;
  capacidade: number;
  situacao: 'ativo' | 'inativo';
  dataCadastro: string;
}

// Hook específico para locais - SEM dados mockados
export function useLocaisBase() {
  return useBaseCrud<Local>('/api/locais', {
    // Transformar dados do backend
    transformData: (data: any) => {
      console.log('🔄 Transformando dados de locais do backend:', data);
      
      return data.map((item: any) => ({
        id: item.id,
        nome: item.nome || item.name,
        endereco: item.endereco || item.address,
        capacidade: item.capacidade || item.capacity || 0,
        situacao: item.situacao === 'active' ? 'ativo' : 'inativo',
        dataCadastro: item.dataCadastro || item.createdAt
      }));
    },
    // Transformar paginação do backend
    transformPagination: (pagination: any) => {
      console.log('📊 Transformando paginação de locais do backend:', pagination);
      
      return {
        currentPage: pagination.currentPage || pagination.page || 1,
        totalPages: pagination.totalPages || pagination.pages || 1,
        totalItems: pagination.totalItems || pagination.total || 0,
        pageSize: pagination.pageSize || pagination.limit || 10,
        startIndex: pagination.startIndex || 1,
        endIndex: pagination.endIndex || 0,
        hasNextPage: pagination.hasNextPage || false,
        hasPreviousPage: pagination.hasPreviousPage || false,
      };
    }
  });
}

// Exemplo de uso em uma página:
// 
// const LocaisPage = () => {
//   const hook = useLocaisBase();
// 
//   const columns = [
//     {
//       key: 'nome',
//       label: 'Nome',
//       sortable: true,
//       filterable: true,
//       filterType: 'select'
//     },
//     {
//       key: 'endereco',
//       label: 'Endereço',
//       sortable: true,
//       filterable: true,
//       filterType: 'select'
//     },
//     {
//       key: 'capacidade',
//       label: 'Capacidade',
//       sortable: true,
//       render: (local: Local) => `${local.capacidade} pessoas`
//     },
//     {
//       key: 'situacao',
//       label: 'Situação',
//       sortable: true,
//       filterable: true,
//       filterType: 'select',
//       render: (local: Local) => (
//         <Badge variant={local.situacao === 'ativo' ? 'default' : 'destructive'}>
//           {local.situacao === 'ativo' ? 'Ativo' : 'Inativo'}
//         </Badge>
//       )
//     }
//   ];
// 
//   const summaryCards = [
//     {
//       title: 'Total de Locais',
//       value: (data: Local[]) => data.length,
//       description: 'Locais cadastrados',
//       icon: MapPin,
//       color: 'bg-blue-500'
//     },
//     {
//       title: 'Locais Ativos',
//       value: (data: Local[]) => data.filter(local => local.situacao === 'ativo').length,
//       description: 'Locais ativos',
//       icon: CheckCircle,
//       color: 'bg-green-500'
//     }
//   ];
// 
//   return (
//     <BaseCrudPage<Local>
//       title="Locais"
//       icon={<MapPin className="h-6 w-6" />}
//       moduleColor="bg-blue-500"
//       entityName="Local"
//       entityNamePlural="Locais"
//       entityRoute="/eventos/locais"
//       hook={hook}
//       columns={columns}
//       summaryCards={summaryCards}
//       createButton={{
//         label: 'Novo Local',
//         icon: <Plus className="h-4 w-4" />,
//         route: '/eventos/locais/novo'
//       }}
//       searchFields={['nome', 'endereco']}
//       searchPlaceholder="Buscar locais..."
//       showExport={true}
//       exportFilename="locais"
//       defaultSort="nome"
//       defaultPageSize={10}
//     />
//   );
// }; 