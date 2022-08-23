import { Button, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { FormEvent } from "react"
import { useSWRConfig } from "swr"
import Form from "../../components/Form"
import { http } from "../../utils/http"

type Props = {

}

const UserNewPage = (props: Props) => {
  const { cache, mutate: mutateGlboal } = useSWRConfig();
  const router = useRouter();
  async function onSubmit(event: FormEvent) {
    console.log(event);
    event.preventDefault();
    const nameField = document.getElementById('name') as HTMLInputElement;
    const nameValue = nameField.value;
    await http.post(`names`, {name: nameValue});
    
    const pattern = /^names\?/g;
    const mutates = Array.from((cache as Map<any, any>).keys()).filter(key => pattern.test(key)).map(key => mutateGlboal(key, undefined, {revalidate: true}));
    await Promise.all(mutates);
    router.push('/users');
  }

  return (
    <>
      <Typography>Novo Nome</Typography>
      <Form onSubmit={onSubmit}>
        <TextField id='name' label='Digite seu nome' variant="outlined" />
        <Button type="submit" variant="contained" >Criar</Button>
      </Form>
    </>
  )
}

export default UserNewPage;