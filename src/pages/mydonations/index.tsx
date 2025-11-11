/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, Navigate, useLoaderData } from '@tanstack/react-router'
import { Container } from '@/components/structuralComponents/Container';
import { MiniCard, type MiniCardItem } from '@/components/structuralComponents/MiniCard';
import { Title } from '@/components/structuralComponents/Title';
import { apiFetch } from '@/utils/fetchApi'
import styles from './MyDonations.module.css'
import { Section } from '@/components/structuralComponents/Section';

export const Route = createFileRoute('/mydonations/')({
  component: RouteComponent,
  onError: () => {
    return () => <Navigate to="/login" />;
  },
  loader: async () => {
    const {access, refresh} = JSON.parse(localStorage.getItem("tokens")!);
    const myDonations: MiniCardItem[] = await apiFetch({
    apiPath: "http://srv1037558.hstgr.cloud:8001/api/token/refresh/",
    apiMethod: "POST",
    apiHeaders: {
      "Authorization": `Bearer ${access}`,
      "Content-Type": "application/json"
    },
    apiBody: { refresh: refresh }
    })
    .then((data: any) => {
      localStorage.setItem("tokens", JSON.stringify({ refresh, access: data.access }));

      return apiFetch<MiniCardItem[]>({
          apiPath: "http://srv1037558.hstgr.cloud:8001/api/doacoes/independentes/minhas/",
          apiHeaders: { "Authorization": `Bearer ${data.access}` }
        })
      
      // Promise.all([
      //   apiFetch({
      //     apiPath: "http://srv1037558.hstgr.cloud:8001/api/doacoes/independentes/minhas/",
      //     apiHeaders: { "Authorization": `Bearer ${data.access}` }
      //   }),
      //   apiFetch({
      //     apiPath: "http://srv1037558.hstgr.cloud:8001/api/oportunidades/minhas/",
      //     apiHeaders: { "Authorization": `Bearer ${data.access}` }
      //   })
      // ]);
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
  
    return { myDonations }
  }
})

function RouteComponent() {
  const { myDonations } = useLoaderData({from: "/mydonations/"})

  return (
    <Container classCss={styles.container}>
      <Title.Level1 text='Minhas doações' classCss=''/>
      <Section classCss={styles.section} aria-label='Minhas doações criadas'>
      {myDonations && myDonations.map((donation: any) => {
        const card = {
          cardId: donation.id,
          cardName: donation.titulo,
          cardImage: donation.imagem_url,
          cardLocation: donation.localizacao_nome,
          cardTag: donation.categorias_detalhadas,
        }
       return <MiniCard card={card} cardType='donations' key={card.cardId}/>
      })}
      </Section>
    </Container>
  )
}
