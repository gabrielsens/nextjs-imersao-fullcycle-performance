import { Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { http } from '../../utils/http';

type Props = {};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID"},
  { field: "name", headerName: "Name", width: 300 },
]

const limit = 5;

const fetcher = (url: string) => {
  return http.get(url).then(res => ({
    data: res.data,
    total: Number(res.headers["x-total-count"]),
  }));
}

const UsersPage = (props: Props) => {
  const { cache } = useSWRConfig();
  console.log(cache);
  const router = useRouter();
  const { page = 1 } = router.query;

  const { data, mutate, error } = useSWR(
    router.isReady ? `names?_limit=${limit}&_page=${page}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return (
    <div style={{height: 400, margin:'16px'}}>
      <Typography variant='h4' >Otimizar Front-end com React-js</Typography>
      <Button variant='contained' onClick={() => router.push('users/new')}>Criar Usuário</Button>
      <Button variant='contained' onClick={() => mutate()}>Revalidar pagina {page}</Button>
      <DataGrid 
        columns={columns}
        pageSize={limit}
        page={page as any - 1}
        rows={!data ? [] : data.data}
        rowCount={!data ? 0 :data.total}
        onPageChange={(nextPage) => router.push(`/users?page=${nextPage + 1}`)}
        paginationMode="server"
      />
    </div>
  )
}

export default UsersPage;