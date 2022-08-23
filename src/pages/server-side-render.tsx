import { GetServerSideProps, GetServerSidePropsContext } from "next"

type Props = {
  name: string;
}

export default function ServerSideRenderPage(props: Props) {
  return (
    <div>
      Sever Side {props.name}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Conectar num banco de dados / Api externa - privada
  return {
    props: {
      name: 'full-cycle'
    }
  }
}