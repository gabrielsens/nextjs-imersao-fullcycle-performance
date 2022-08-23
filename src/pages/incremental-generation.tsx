import { GetStaticProps, GetStaticPropsContext } from "next"

type Props = {
  name: string;
}

export default function IncrementalGenerationPage(props: Props) {
  return (
    <div>
      Sever Side Static {props.name}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  // Conectar num banco de dados / Api externa - privada
  return {
    props: {
      name: new Date().toISOString(),
    },
    revalidate: 10
  }
}