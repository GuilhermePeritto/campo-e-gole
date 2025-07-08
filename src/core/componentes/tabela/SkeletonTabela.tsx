
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PropsSkeletonTabela {
  colunas: number;
  linhas?: number;
}

const SkeletonTabela = ({ colunas, linhas = 5 }: PropsSkeletonTabela) => {
  return (
    <div className="rounded-md border h-full">
      <Table className="h-full">
        <TableHeader>
          <TableRow>
            {Array.from({ length: colunas }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-5 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: linhas }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: colunas }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-5 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SkeletonTabela;
